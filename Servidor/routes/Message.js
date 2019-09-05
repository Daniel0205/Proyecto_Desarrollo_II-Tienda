const express = require('express');
const router = express.Router();
const db  =require('../config/database')
const Message = require('../models/Message')


/////////////////////////////////////////////////////
//////////////CRUD DE LAS CRITICAS///////////////////
/////////////////////////////////////////////////////

//Insertar mensaje enviado a los administradores
router.post("/insert", function(req,res){

    delete req.body.tipo

    Message.create(req.body)
    .then(x => res.json([{bool:true}]))
    .catch(err => {
        console.log(err)
        res.json([{bool:false}])
    });
  
})

//Consultar mensajes enviado a los administradores
router.post('/get', function(req,res){

    Message.findAll()
    .then(x =>  res.json(x))
    .catch(err => console.log(err));

})

module.exports =router;