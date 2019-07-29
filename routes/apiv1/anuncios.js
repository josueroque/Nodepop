'use strict';

const express = require('express');
const router = express.Router();

const Anuncio = require('../../models/Anuncio');

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
      const price = req.query.sale;
      const skip = parseInt(req.query.skip);
      const limit = parseInt(req.query.limit);
      const fields = req.query.fields;
      const sort = req.query.sort;
  
      const filter = {};
  
      if (name) {
        filter.name = name;
      }
  
      if (typeof price !== 'undefined') {
        filter.price = price;
      }
  
      const anuncios = await Anuncio.list({ filter: filter, skip, limit, fields, sort});
  
      res.json({ success: true, results: anuncios });
  
    } catch (err) {
      next(err);
    }
  });
  
  module.exports = router;