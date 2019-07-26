'use strict';

// cargar libreria
const mongoose = require('mongoose');
const conn = mongoose.connection;

mongoose.set('useFindAndModify', false);

// gestionar eventos de conexión
conn.on('error', err => {
  console.log('Error de conexión', err);
  process.exit(1);
});

conn.once('open', () => {
  console.log('Conectado a MongoDB en', mongoose.connection.name);
});

// conectar
mongoose.connect('mongodb://localhost/Nodepop', { useNewUrlParser: true });

// exportar la conexión (opcional)
module.exports = conn;