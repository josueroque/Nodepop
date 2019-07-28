'use strict';

// cargar libreria
const mongoose = require('mongoose');
const con = mongoose.connection;
const Anuncio = require('../models/Anuncio');
const fs = require('fs');


// HANDLE CONNECTION ERRORS
con.on('error', err => {
  console.log('Error', err);
  process.exit(1);
});

con.once('open',async () => {
  try {
   let anunciosArray= await convertJSON();
    await Anuncio.deleteMany();
    await Anuncio.insertMany( anunciosArray);
    await con.close();
    console.log('Database initialized succesfully');
  } catch (error) {
  console.log(error);  
  }
});

function convertJSON(){
  let data;
  let array1=[];
  try {
     data = JSON.parse(fs.readFileSync('lib/anuncios.json'));
      for (let item in data){
        array1.push(item);
      }
      
     return data["anuncios"];
  } catch ( err ) {
    console.log(err);
     // handle your file not found (or other error) here
  }
}

mongoose.connect('mongodb://localhost/Nodepop', { useNewUrlParser: true });
