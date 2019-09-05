const express = require('express');
const router = express.Router();
const DistributionPoint = require('../models/DistributionPoint')


//consulta todas las subcategorias en la base de datos
router.get("/consult", (req,res) =>{

  DistributionPoint.findAll()
   .then(x =>  res.json({bool:true,data:x}))
   .catch(err => {res.json({bool:false});console.log(err)});
});


module.exports =router;