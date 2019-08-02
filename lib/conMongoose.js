'use strict';

// cargar libreria
const mongoose = require('mongoose');
const conn = mongoose.connection;
var process;//Eslint suggestion

mongoose.set('useFindAndModify', false);


conn.on('error', err => {
  console.log('Error de conexión', err);
  process.exit(1);
});

conn.once('open', () => {
  console.log('Conectado a MongoDB en', mongoose.connection.name);
});


mongoose.connect('mongodb://localhost/Nodepop', { useNewUrlParser: true });


module.exports = conn;