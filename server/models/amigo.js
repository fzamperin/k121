const mongoose = require('mongoose');

let UsuarioSchema = new mongoose.Schema({
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

module.exports = UsuarioSchema;
