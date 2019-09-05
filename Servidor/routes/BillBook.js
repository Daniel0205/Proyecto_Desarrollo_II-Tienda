const express = require('express');
const router = express.Router();
const db  =require('../config/database')
const BillBook = require('../models/BillBook')

/////////////////////////////////////////////////////
///////CONSULTAS DE LOS PODUCTOS DE VENTAS///////////
/////////////////////////////////////////////////////

//insertar un producto a un venta
router.post("/insert",function(req,res){

    BillBook.create(req.body).then(x => res.json(x))
    .catch(err => console.log(err));
  
})

//Consultar un producto en una venta especifica

router.post("/getBillBookv",function(req,res){

    BillBook.findAll({where: {
        id_bill: req.body.id_bill
    }})
    .then(x =>  res.json(x))
    .catch(err => console.log(err));

})

//Consultar las ventas de un producto especifico
router.post("/getBillBookp",function(req,res){

    BillBook.findAll({where: {
        isbn: req.body.isbn
    }})
    .then(x =>  res.json(x))
    .catch(err => console.log(err));

})

//Modificar unproducto en una venta
router.put("/update", function(req,res){

    let idb = req.body.id_bill
    let idx = req.body.isbn
    delete req.body.id_bill
    delete req.body.isbn

    BillBook.update(req.body,{where: {
        id_bill: idb,
        isbn: idx
    }}).then(x => res.json(x))
    .catch(err => console.log(err));

})

module.exports =router;