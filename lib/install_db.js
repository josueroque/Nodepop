'use strict';

// cargar libreria
const mongoose = require('mongoose');
const conn2 = mongoose.connection;
const Anuncio = require('../models/Anuncio');
var express = require('express');
var app = express();
mongoose.set('useFindAndModify', false);

// gestionar eventos de conexión
conn2.on('error', err => {
  console.log('Error de conexión', err);
  process.exit(1);
});

conn2.once('open', () => {
  console.log('Conectado a MongoDB2.2 en', mongoose.connection.name);

});


//  app.use('/:id', async (req, res, next) => {
//     try {
      console.log('Conectado a MongoDB3 ', mongoose.connection.name);
     // const _id = req.params.id;
  
      //await
       Anuncio.deleteMany().exec();
  
     // res.json({ success: true });
  
//     } catch (err) {
//       next(err);
//     }
//   });

// conectar
mongoose.connect('mongodb://localhost/Nodepop', { useNewUrlParser: true });

// exportar la conexión (opcional)
module.exports = conn2;