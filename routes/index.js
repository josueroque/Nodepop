'use strict';
const express = require('express');
const router = express.Router();

const Anuncio = require('../models/Anuncio');

//const { query, body, param, validationResult } = require('express-validator');

router.get('/tags', async ( res, next) => {
  try {
  const anuncios = await Anuncio.listTags();
  res.json({ success: true, results: anuncios });
  } catch (err) {
    next(err);
  }
});

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

/* GET home page. */

router.get('/', async (req, res, next) => {
  try {

    const nombre = req.query.nombre;
    const precio = req.query.precio;
    const limit = parseInt(req.query.limit);
    const fields = req.query.fields;
    const sort = req.query.sort.toLowerCase();
    const venta=req.query.venta;
    const tag=req.query.tag;
    let skip;
    if(req.query.skip){
      if (isNaN(req.query.skip)){

        res.status(422); 
        throw ('Invalid skip Parameter');
      }
       else{ 
     skip=parseInt(req.query.skip);
      }
    }
    
    if(req.query.limit){
      if (isNaN(parseInt(req.query.limit))){

        res.status(422); 
        throw ('Invalid limit Parameter');
      }

    }

    if(req.query.start){
  
      if (isNaN(parseInt(req.query.start))){

        res.status(422); 
        throw ('Invalid start Parameter');
      }
       else{ 
        skip=parseInt(req.query.start);
      }
    }    

    let filter = {};
    let exp = new RegExp('^' + nombre + '','i');
   
    if(nombre){
    filter= {nombre:exp};
    }
    
    //tag filter
    if(tag){
      filter.tags=tag;
    }


    //venta filter
    if (typeof venta !== 'undefined' ){
      if(venta.toLowerCase()==='false'){
        filter.venta=false;
      }
      else if(venta.toLowerCase()==='true'){
        filter.venta=true;
      }
      else {
        res.status(422); 
        throw ('Invalid venta Parameter');
      }
    }
    
    //precio filter
  if (precio){

    let priceStr=new String();
    priceStr=precio.split('');
    let hyphen='';
    let countHyphen=0;
    let hyphenPosition=0;

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
            hyphen='start';  
            }
          else if(priceStr.indexOf(char)===(priceStr.length-1) && char==='-'){
            hyphen='end';
           }
          else if( char==='-'){
            hyphen='middle';
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

let number1=0;
let number2=0;
let objectFilter={};

    if (typeof precio !== 'undefined') {
      switch(hyphen){
        case ('start'):
          number1=precio.replace('-','');
          if(isNaN(number1)){
            res.status(422);
            throw('Invalid precio parameter');
          }
          objectFilter['$lt']=parseInt(number1);
          filter.precio=objectFilter; 
          break;
        case ('middle'):
          number1=precio.substring(0,(hyphenPosition));
          number2=precio.substring((hyphenPosition+1),(precio.length));
          if(isNaN(number1)||isNaN(number2)){
            res.status(422);
            throw('Invalid precio parameter');
          }
          objectFilter['$gt']=parseInt(number1);
          objectFilter['$lt']=parseInt(number2);
          filter.precio=objectFilter; 
          break;    
        case ('end'):
          number1=precio.replace('-','');
          if(isNaN(number1)){
            res.status(422);
            throw('Invalid precio parameter');
          }
          objectFilter['$gt']=parseInt(number1);
          filter.precio=objectFilter; 
          break;   
        case ('undef'):
            if(isNaN(precio)){
              res.status(422);
              throw('Invalid precio parameter');
            }
          filter.precio=precio; 
          break;            
        case ('notvalid'):
          res.status(422); 
          throw ('Invalid precio Parameter');
          // return;
          // break;                 
      }
      
   
    }
  }
  console.log(filter);
   const anuncios = await Anuncio.list({ filter: filter, skip, limit, fields, sort});

   res.locals.title='Nodepop';
   res.locals.adList=anuncios;
   res.render('index'); 


  } catch (err) {
    next(err);
  }
});

module.exports = router;
