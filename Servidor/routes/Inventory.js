const express = require('express');
const router = express.Router();
const db  =require('../config/database')
const Inventory = require('../models/Inventory')


/////////////////////////////////////////////////////
///////////////CRUD DEL INVENTARIO///////////////////
/////////////////////////////////////////////////////

router.post("/insert", function(req,res){

    delete req.body.tipo

    Inventory.create(req.body)
    .then(x => res.json([{bool:true}]))
    .catch(err => {
        console.log(err)
        res.json([{bool:false}])
    });
  
})

//Consultar productos de la base de datos
router.post('/get', function(req,res){

    Inventory.findAll({where: {
        isbn: req.body.isbn,
        id_dp: req.body.id_dp
    }})
    .then(x =>  res.json(x))
    .catch(err => console.log(err));

})

//Modificar los datos de un producto especifico de la base de datos
router.post("/update", function(req,res){
    console.log(req.body)
    let index = req.body.isbn;
    let index2 = req.body.name_dp;
    delete req.body.isbn
    delete req.body.id_dp

    Inventory.findOne({where: {
        isbn: index,
        name_dp: index2
    }})
    .then(x =>{ 

        console.log(req.body.quantity)
        console.log(req.body.quantity+x.availability)
        var aux=req.body.quantity+x.availability
        Inventory.update({availability:aux},
        {where: {
            isbn: index,
            name_dp: index2
        }})
        .then(x => res.json([{bool:true}]))
        .catch(err => {
            console.log(err)
            res.json([{bool:false}])
        });
        
    })
    .catch(err => {
        console.log(err)
        res.json([{bool:false}])
    });
})

module.exports =router;