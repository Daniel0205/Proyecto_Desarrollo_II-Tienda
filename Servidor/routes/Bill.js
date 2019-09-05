const express = require('express');
const router = express.Router();
const db  =require('../config/database')
const Bill = require('../models/Bill')

/////////////////////////////////////////////////////
////////////CONSULTAS DE LAS VENTAS//////////////////
/////////////////////////////////////////////////////

//insertar una venta
router.post("/insert",function(req,res){

    Bill.create(req.body).then(x => res.json(x))
    .catch(err => console.log(err));
  
  })
  
//Consultar las ventas

router.post("/getBills",function(req,res){

    Bill.findAll()
    .then(x =>  res.json(x))
    .catch(err => console.log(err));

})
  
//Consultar una venta

router.post("/getBill",function(req,res){

    Bill.findAll({where: {
        id_bill: req.body.id_bill
    }})
    .then(x =>  res.json(x))
    .catch(err => console.log(err));

})
  
//Modificar una venta

router.put("/update", function(req,res){

    let index = req.body.id_bill;
    delete req.body.id_bill

    Bill.update(req.body,{where: {
        id_bill: index
    }}).then(x => res.json(x))
    .catch(err => console.log(err));

})

module.exports =router;