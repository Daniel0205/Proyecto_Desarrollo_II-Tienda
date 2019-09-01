const express = require('express');
const router = express.Router();
const db  =require('../config/database')
const Bill = require('../models/Bill')
const BillBook = require('../models/BillBook')

/////////////////////////////////////////////////////
////////////CONSULTAS DE LAS VENTAS//////////////////
/////////////////////////////////////////////////////

//insertar una venta
router.post("/buy",function(req,res){


    console.log(req.body)

    Bill.create({
        username:req.body.username,
        date: db.fn('NOW')
    })
    .then(x =>{
        BillBook.bulkCreate(
            req.body.books.map((z)=>{
                return({
                    id_bill:x.id_bill,
                    isbn:z.isbn,
                    name_dp:z.name_dp,
                    quantity:z.quantity
                })
            })
        ).then(x => 
            res.json({bool:true})
        )
        .catch(err => {
            res.json({bool:false})
            console.log(err)});
    })
    .catch(err => {
        res.json({bool:false})
        console.log(err)});
  
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