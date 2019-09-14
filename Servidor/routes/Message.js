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
        attributes: ['id_message','username','matter','description','solved'],
        where:{solved:false},
    })
    .then(x =>  res.json([{Message: x}]))
    .catch(err => {
        console.log(err)
        res.json({bool: false})
    });

});

//Modificar los datos de un producto especifico de la base de datos
router.post("/update", function(req,res){
    console.log(req.body)

    Message.update({solved:true},
        {where: {id_message:req.body.id_message}})
    .then(x => res.json([{bool:true}]))
    .catch(err => {
        console.log(err)
        res.json([{bool:false}])
    });
})


module.exports =router;