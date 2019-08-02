'use strict';

const mongoose = require('mongoose');

// definimos un esquema
const anuncioSchema = mongoose.Schema({
  name: String,
  price: Number,
  sale:Boolean,
  photo:String,
  tags:Array
  
}
//, { collection: 'agentes'} // para saltarse la pluralización
);

// en los metodos de modelos de mongoose no usar arrow functions (perdemos el this a la instancia)
anuncioSchema.statics.list = function({filter, skip, limit, fields, sort,start}) {
  const query = Anuncio.find(filter);
 // console.log(filter);
  query.skip(skip);
  query.limit(limit);
  query.select(fields);   
  query.sort(sort);
 // query.start(start);
  return query.exec();
}

anuncioSchema.statics.listTags = function() {
  const query = Anuncio.distinct("tags") ;
 // console.log(filter);

 // query.start(start);
  return query.exec();
}

// creamos el modelo de agente
const Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;
