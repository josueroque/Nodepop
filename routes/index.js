'use strict';
const express = require('express');
const router = express.Router();

const Anuncio = require('../models/Anuncio');
// object destructuring
const { query, body, param, validationResult } = require('express-validator');

/* GET home page. */

router.get('/', async (req, res, next) => {

  try {
console.log('prueba');
    const name = req.query.name;
    const price = req.query.price;
    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);
    const fields = req.query.fields;
    const sort = req.query.sort;

    const filter = {};

    if (name) {
      filter.name = name;
    }
console.log( price );
    if (typeof price !== 'undefined') {
      filter.price = price;
    }
console.log(filter);
    const anuncios = await Anuncio.list({ filter: filter, skip, limit, fields, sort});

   // res.json({ success: true, results: agentes });
   res.locals.valor='valor';
   res.locals.title='Nodepop';
   res.locals.adList=anuncios;
   res.render('index'); 


  } catch (err) {
    next(err);
  }
});

module.exports = router;
