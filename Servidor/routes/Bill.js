const express = require('express');
const router = express.Router();
const db  =require('../config/database')
const Bill = require('../models/Bill')
const BillBook = require('../models/BillBook')
const Book = require('../models/Book')
const BillCard = require('../models/BillCard')
const Card = require('../models/Card')

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

router.get("/getBills",function(req,res){
    Bill.findAll({ 
        
        include: [
            {
                model: Book, 
            },
            {
                model: Card, 
                required:true,                
            }
          ]})
    .then(x =>res.json(x)) 
    .catch(err => console.log(err));

})
  
//Consultar una venta


router.post("/getBill",function(req,res){

    Bill.findAll({ 
        
        include: [
            {
                model: Book, 
                               
            },
            {
                model: Card, 
                required:true,                
                where:req.body,
            }
          ]})
    .then(x =>res.json(x)) 
    .catch(err => console.log(err));

})
 
module.exports =router;