const express = require('express');
const router = express.Router();
const db = require('../models');

/* Rota responável pelo CRUD das pessoas que participarão do amigo oculto */

router.get('/getall', async (req, res, next) => {
  try {
    const results = await db.amigo.find({});
    res.status(200).send(results);
  }
  catch(err) {
    res.status(400).send({
      message: err.message
    })
  }
})

router.post('/create', async (req, res, next) => {
  try {
    const amigo = req.body;
    const result = await db.amigo.create(amigo);
    res.status(200).send(result);
  }
  catch(err) {
    res.status(400).send({
      message: err.message
    })
  }
})

router.post('/update', async(req, res, next) => {
  const amigo = req.body;
  await db.amigo.findByIdAndUpdate(amigo._id, amigo);
  res.status(200).send({
    success: true
  });
})

router.delete('/delete/:amigo_id', async (req, res, next) => {
  try {
    const id = req.params.amigo_id;
    await db.amigo.findByIdAndRemove(id);
    res.status(200).send({
      success: true
    });
  }
  catch(err) {
    res.status(400).send({
      message: err.message
    })
  }
})

module.exports = router;
