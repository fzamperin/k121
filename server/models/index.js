const mongoose = require('mongoose');
const bluebird = require('bluebird');
const path = require('path');
const config = require(path.join(__dirname, '..', 'config', 'config.json'));

//Require dos Schemas para o mongoose
const amigoSchema = require('./amigo');

//Seta o mongoose para usar a implementação de promises bluebird
mongoose.Promise = bluebird;

//Cria conexão com o banco
const connection = mongoose.createConnection(config.banco);

//Mantém os models em somente um objeto para ser importado por outros .js
let models = {
  amigo: connection.model('Amigo', amigoSchema)
};

module.exports = models;
