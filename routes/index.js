var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const segundo = (new Date()).getSeconds();

  res.locals.valor = '<script>alert("inyeccion de codigo")</script>';
  res.locals.condicion = {
    segundo: segundo,
    estado: segundo % 2 === 0 // es par
  };

  res.locals.users = [
    { name: 'Smith', age: 23 },
    { name: 'Jones', age: 35 },
    { name: 'Thomas', age: 21 },
  ];

  res.render('index');
});


module.exports = router;
