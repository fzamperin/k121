/* Arquivo responsável por conter a função de enviar email */

const nodemailer = require('nodemailer');

//Cria transporter com o email base
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'pennateste12@gmail.com',
    pass: 'Kenoby120890'
  }
})

//Envia e-mail pegando o texto e o destinatário
async function enviarEmail(text, recipient) {
  try {

    const data = {
      from: 'Sorteio Kenoby <pennateste12@gmail.com>',
      to: recipient,
      subject: 'Resultado do amigo oculto',
      html: text
    };

    await transporter.sendMail(data);

  }
  catch (err) {
    throw err;
  }
}

module.exports = enviarEmail;
