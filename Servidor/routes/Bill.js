const express = require('express');
const router = express.Router();
const db  =require('../config/database')
const Bill = require('../models/Bill')
const BillBook = require('../models/BillBook')
const Book = require('../models/Book')

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

    var aux = []

    Bill.findAll({where: {
        username: req.body.username
    }})
    .then(x =>{
        
        if(x.length==0){res.json(aux)}
        for (let i = 0; i < x.length; i++) {
      
            BillBook.findAll({
                attributes: ['quantity','isbn','name_dp'],
                where:{id_bill:x[i].id_bill},
                include: [{model:Book, attributes: ['title']}]
            })
            .then(z=>{
                var bill = {
                    id_bill: x[i].id_bill,
                    date: x[i].date,
                    products: z.map(x=>{
                        return({
                            quantity:x.quantity,
                            isbn:x.isbn,
                            name_dp:x.name_dp,
                            title:x.book.title})  
                    })
                }
         
                aux.push(bill)

     
                if(i+1===x.length) {res.json(aux)}
            })
            .catch(err => console.log(err));        
        }
        
    })
    .catch(err => console.log(err));

})

module.exports =router;