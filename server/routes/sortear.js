const express = require('express');
const router = express.Router();
const shuffle = require('shuffle-array');

const mail = require('../helpers/mail');
const db = require('../models');

router.post('/', async (req, res, next) => {
  try {
    let amigos = await db.amigo.find({});
    let resultadoSorteio = sortear(amigos);
    resultadoSorteio.forEach(async (conjunto) => {
      conjunto.tirou.tirou = conjunto.tirado;
      await conjunto.tirou.save();
      let text = `O sorteio foi realizado e você tirou: <b>${conjunto.tirado.nome}</b>, o e-mail do seu amigo secreto é: <b>${conjunto.tirado.email}</b>`
      await mail(text, conjunto.tirou.email);
    })
    res.status(200).send({});
  }
  catch (err) {
    res.status(400).send({
      error: err.message
    });
  }
})

function sortear(amigos) {
  //Deep Clone no array
  let amigosAux = JSON.parse(JSON.stringify(amigos));
  let resultado = [];
  while (amigos.length > 0) {
    amigosAux = shuffle(amigosAux);
    if (amigos[0]._id == amigosAux[0]._id) {
      continue;
    }
    let conjunto = {
      tirou: amigos.splice(0, 1)[0],
      tirado: amigosAux.splice(0, 1)[0]
    }
    resultado.push(conjunto);
  }
  return resultado;
}

module.exports = router;
