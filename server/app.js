const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();

// Seta implementação global de promises bluebird
global.Promise = require('bluebird');

// API file for interacting with MongoDB
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

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, '..', 'dist')));

// API location
app.use('/api/amigo/', amigo);
app.use('/api/sortear/', sortear);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Rodando na porta: ${port}`));
