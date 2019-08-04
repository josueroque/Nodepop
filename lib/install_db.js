'use strict';


//load library
const mongoose = require('mongoose');
const con = mongoose.connection;
const Anuncio = require('../models/Anuncio');
const fs = require('fs');
var process;


// HANDLE CONNECTION ERRORS
con.on('error', err => {
  console.log('Error', err);
  process.exit(1);
});

con.once('open',async () => {
  try {
   let anunciosArray= await convertJSON();
    await Anuncio.deleteMany();
    console.log(anunciosArray);
    await Anuncio.insertMany( anunciosArray);
    await con.close();
    console.log('Database initialized succesfully');
  //  server.close();
    
  } catch (error) {
  console.log(error);  
  }
});

function convertJSON(){
  let data;
  try {
     data = JSON.parse(fs.readFileSync('lib/anuncios.json'));
     return data['anuncios'];
  } catch ( err ) {
    console.log(err);
    throw new Error('Error reading the file');
  }
}

mongoose.connect('mongodb://localhost/Nodepop', { useNewUrlParser: true });
