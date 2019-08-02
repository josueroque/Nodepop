'use strict';

const mongoose = require('mongoose');

// definimos un esquema
const anuncioSchema = mongoose.Schema({
  nombre: String,
  precio: Number,
  venta:Boolean,
  foto:String,
  tags:Array
  
}

);

anuncioSchema.statics.list = function({filter, skip, limit, fields, sort}) {
  const query = Anuncio.find(filter);
 // console.log(filter);
  query.skip(skip);
  query.limit(limit);
  query.select(fields);   
  query.sort(sort);
 // query.start(start);
  return query.exec();
};

anuncioSchema.statics.listTags = function() {
  const query = Anuncio.distinct('tags') ;
 // console.log(filter);

 // query.start(start);
  return query.exec();
};


const Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;
