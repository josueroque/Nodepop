'use strict';

const mongoose = require('mongoose');

// definimos un esquema
const anuncioSchema = mongoose.Schema({
  name: String,
  sale: Boolean,
  price:Number,
  photo:String,
  tags:Array
}
//, { collection: 'anuncios'} // para saltarse la pluralización
);

anuncioSchema.statics.list = function({filter, skip, limit, fields, sort}) {
  const query = Anuncio.find(filter);
  query.skip(skip);
  query.limit(limit);
  query.select(fields);
  query.sort(sort);
  return query.exec();
}

// creamos el modelo de anuncio
const Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;
