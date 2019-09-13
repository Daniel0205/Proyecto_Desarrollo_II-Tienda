const express = require('express');
const router = express.Router();
const Card = require('../models/Card')


//Eliminar una tarjeta especifico de la base de datos
router.post('/delete', function (req, res) {
    console.log(req.body)

    Card.update({active:false},{ where: req.body })
        .then(x => {
            console.log("ENTREOOOOOO")
            res.json([{ bool: true }])})
        .catch(err => res.json([{ bool: false }]));

})

module.exports =router;