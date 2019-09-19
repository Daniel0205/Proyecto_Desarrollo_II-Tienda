const express = require('express');
const router = express.Router();
const Card = require('../models/Card')

//Insertar tarjeta en la base de datos
router.post("/add", function (req, res) {
    console.log(req.body)

    req.body.active=true;

    Card.create(req.body)
        .then(x => res.json({ bool: true, card:x }))
        .catch(err => res.json({ bool: false }));

})

//Obtener las tarjetas de la base de datos
router.post('/getAll', function(req,res){

    Card.findAll()
    .then(x =>  res.json(x))
    .catch(err => {
        console.log(err)
        res.json({bool:false})
      })
})

//Obtener las tarjetas de la base de datos
router.post('/get', function(req,res){

    Card.findAll({where:{username:req.body.username}})
    .then(x =>  res.json(x))
    .catch(err => {
        console.log(err)
        res.json({bool:false})
      })
})

//Eliminar una tarjeta especifico de la base de datos
router.post('/delete', function (req, res) {
    console.log(req.body)

    Card.update({active:false},{ where: req.body })
        .then(x => {

            res.json([{ bool: true }])})
        .catch(err => res.json([{ bool: false }]));

})

module.exports =router;