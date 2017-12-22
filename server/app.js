const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();

// Seta implementação global de promises bluebird
global.Promise = require('bluebird');

// Arquivos da API que fazem a função do CRUD/Sortear
const amigo = require('./routes/amigo');
const sortear = require('./routes/sortear');

//CORS (Sei que está escancarado mas estava tentando evitar problemas)
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Access-Control-Allow-Origin');
  if(req.method == 'OPTIONS') return res.sendStatus(200);
  next();
});

// Middlewares necessário (Parsers)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Pasta do angular onde conterá os arquivos estáticos resultantes do build
app.use(express.static(path.join(__dirname, '..', 'dist')));

// Middlewares de requisição da API
app.use('/api/amigo/', amigo);
app.use('/api/sortear/', sortear);

// Outras requisições que não forem de API irão renderizar o index.html (entry point da aplicação)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Seta porta para o processo
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Rodando na porta: ${port}`));
