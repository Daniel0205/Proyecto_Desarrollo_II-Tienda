const express = require('express');
const router = express.Router();
const db  =require('../config/database')
const Message = require('../models/Message')


/////////////////////////////////////////////////////
//////////////CRUD DE LAS CRITICAS///////////////////
/////////////////////////////////////////////////////

//Insertar mensaje enviado a los administradores
router.post("/send", function(req,res){

  console.log(req.body)

    Message.create(req.body)
    .then(x => res.json([{bool:true}]))
    .catch(err => {
        console.log(err)
        res.json([{bool:false}])
    });
})

//Consultar mensajes enviado a los administradores
router.post('/get', function(req,res){

    Message.findAll({
        attributes: ['id_message','username','matter','description','solved']
    })
    .then(x =>  res.json([{Message: x}]))
    .catch(err => {
        console.log(err)
        res.json({bool: false})
    });

});

module.exports =router;