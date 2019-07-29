'use strict';
const express = require('express');
const router = express.Router();

const Anuncio = require('../models/Anuncio');
// object destructuring
const { query, body, param, validationResult } = require('express-validator');

/* GET home page. */

router.get('/', async (req, res, next) => {
  // Agente.find().exec((err, agentes) => {
  //   if (err) {
  //     next(err); // ecalar el error al gestor de errores
  //     return;
  //   }
  //   res.json({ success: true, agentes: agentes });
  // });
  try {

    const name = req.query.name;
    const age = req.query.age;
    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);
    const fields = req.query.fields;
    const sort = req.query.sort;

    const filter = {};

    if (name) {
      filter.name = name;
    }

    // if (typeof age !== 'undefined') {
    //   filter.age = age;
    // }

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


// router.get('/', function(req, res, next) {

//   res.locals.anuncios = Anuncio.list();


//   res.render('index');
// });


module.exports = router;
