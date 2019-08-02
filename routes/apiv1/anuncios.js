'use strict';

const express = require('express');
const router = express.Router();

const Anuncio = require('../../models/Anuncio');
const { query, body, param, validationResult } = require('express-validator');

router.post('/', async (req, res, next) => {
  try {
    const data = req.body;

    const anuncio = new Anuncio(data);

    const anuncioGuardado = await anuncio.save();

    res.json({ success: true, result: anuncioGuardado });

  } catch (err) {
    next(err);
  }
});

router.get('/tags', async (req, res, next) => {
  try {
  const anuncios = await Anuncio.listTags();
  res.json({ success: true, results: anuncios });
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {

  try {

    const name = req.query.name;
    const price = req.query.price;
    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);
    const fields = req.query.fields;
    const sort = req.query.sort;
    const sale=req.query.sale;
    const tag=req.query.tag;
    

    let filter = {};
    let exp = new RegExp("^" + name + "","i");
   
    if(name){
    filter= {name:exp};
    }
    
    //tag filter
    if(tag){
      filter.tags=tag;
    }

    //sale filter
    if (typeof sale !== 'undefined' ){
      if(sale.toLowerCase()==='false'||sale.toLowerCase()==='true'){
        filter.sale=sale;
      }
    }

    //price filter
  if (price){
    let priceStr=new String();
    priceStr=price.split('');
    let hyphen='';
    let countHyphen=0;
    let hyphenPosition=0;
   // console.log(priceStr);
    for (let char of priceStr){
      if (char==='-'){
        countHyphen++;
      }
      switch (countHyphen){
        case 0:
          hyphen='undef';
          break;
        case 1:
          if(priceStr.indexOf(char)===0 && char==='-'){
            hyphen='start'  
            }
          else if(priceStr.indexOf(char)===(priceStr.length-1) && char==='-'){
            hyphen='end'
           }
          else if( char==='-'){
            hyphen='middle'
            hyphenPosition=priceStr.indexOf(char);
           }
          break;  
        case 2:
          hyphen='notvalid';
          break;
        default:
          hyphen='notvalid';
          break;
        }
  }
//console.log(hyphen+countHyphen);
let number1=0;
let number2=0;
let objectFilter={};
console.log(hyphen);
    if (typeof price !== 'undefined') {
      switch(hyphen){
        case ('start'):
          number1=price.replace('-','')
          objectFilter[`$lt`]=parseInt(number1);
          filter.price=objectFilter; 
          break;
        case ('middle'):
          number1=price.substring(0,(hyphenPosition));
          number2=price.substring((hyphenPosition+1),(price.length));
          objectFilter[`$gt`]=parseInt(number1);
          objectFilter[`$lt`]=parseInt(number2);
          filter.price=objectFilter; 
          break;    
        case ('end'):
          number1=price.replace('-','')
          objectFilter[`$gt`]=parseInt(number1);
          filter.price=objectFilter; 
          break;   
        case ('undef'):
          filter.price=price; 
          break;            
        case ('notvalid'):
          console.log('prueba'); 
          res.status(422); 
          throw ('Invalid Price Parameter');
          return;
          break;                 
      }
      
      //  filter.price = price;
    }
  }
    const anuncios = await Anuncio.list({ filter: filter, skip, limit, fields, sort});

   // res.json({ success: true, results: agentes });
  //  res.locals.valor='valor';
  //  res.locals.title='Nodepop';
  //  res.locals.adList=anuncios;
   res.json({ success: true, results: anuncios });


  } catch (err) {
    next(err);
  }
});
// router.get('/', async (req, res, next) => {
//     // Agente.find().exec((err, agentes) => {
//     //   if (err) {
//     //     next(err); // ecalar el error al gestor de errores
//     //     return;
//     //   }
//     //   res.json({ success: true, agentes: agentes });
//     // });
//     try {
  
//       const name = req.query.name;
//       const price = req.query.sale;
//       const skip = parseInt(req.query.skip);
//       const limit = parseInt(req.query.limit);
//       const fields = req.query.fields;
//       const sort = req.query.sort;
  
//       const filter = {};
  
//       if (name) {
//         filter.name = name;
//       }
  
//       if (typeof price !== 'undefined') {
//         filter.price = price;
//       }
  
//       const anuncios = await Anuncio.list({ filter: filter, skip, limit, fields, sort});
  
//       res.json({ success: true, results: anuncios });
  
//     } catch (err) {
//       next(err);
//     }
//   });
  
  module.exports = router;