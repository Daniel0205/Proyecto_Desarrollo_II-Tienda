const express = require('express');
const router = express.Router();
const db  =require('../config/database')
const Critics = require('../models/Critics')


/////////////////////////////////////////////////////
//////////////CRUD DE LAS CRITICAS///////////////////
/////////////////////////////////////////////////////

//Insertar una critica sobre un libro
router.post("/insert", function(req,res){

    Critics.create(req.body)
    .then(x => res.json([{bool:true}]))
    .catch(err => {
        console.log(err)
        res.json([{bool:false}])
    });
  
})

//Consultar las ccriticas realizadas sobre un libro
router.post('/get', function(req,res){

    Critics.findAll({where: {
        isbn: req.body.isbn
    }})
    .then(x =>  res.json(x))
    .catch(err => console.log(err));

})

//Modificar una critica realizada por un usuario sobre un libro
router.put("/update", function(req,res){
    delete req.body.tipo

    let index = req.body.isbn;
    delete req.body.isbn

    Critics.update(req.body,{where: {
        isbn: index,
        username: req.body.username
    }})
    .then(x => res.json([{bool:true}]))
    .catch(err => {
        console.log(err)
        res.json([{bool:false}])
    });
})

//Eliminar una critica realizada por un usuario sobre un libro
router.delete('/delete', function(req,res){

    Critics.destroy({where: {
        isbn: req.body.isbn,
        username: req.body.username
    }}).then(x => res.json([{bool:true}]))
    .catch(err => {
        console.log(err)
        res.json([{bool:false}])
    });

})

module.exports =router;