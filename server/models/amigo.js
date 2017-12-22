const mongoose = require('mongoose');

//Schema Usuario que guardará as informações do sorteio
let AmigoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'Nome deve ser preenchido']
  },
  email: {
    type: String,
    required: [true, 'Email deve ser preenchido'],
    unique: true
  },
  tirou: this
}, {
    collection: 'amigos',
    timestamps: true
  })

module.exports = AmigoSchema;
