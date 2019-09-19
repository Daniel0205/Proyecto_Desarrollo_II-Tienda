const express = require('express');
const router = express.Router();
const DistributionPoint = require('../models/DistributionPoint')
const Book = require('../models/Book')
const Subcategory = require('../models/Subcategory')

//consulta todas las subcategorias en la base de datos
router.get("/consult", (req,res) =>{

  DistributionPoint.findAll()
   .then(x =>  res.json({bool:true,data:x}))
   .catch(err => {res.json({bool:false});console.log(err)});
});


//consulta todas las subcategorias en la base de datos
router.get("/consultBook", (req,res) =>{

  DistributionPoint.findAll()
   .then(x => {

      Book.findAll({where:{active:true}})
      .then(z => {
        
        Subcategory.findAll()
        .then(y => res.json({bool:true,book:z,dpList:x,subcategory:y}))
        .catch(err => {
            console.log(err)
            res.json({ bool: false })
        }); 

        
      })
      .catch(err => {
          console.log(err)
          res.json({ bool: false })
      });  
  })
  .catch(err => {res.json({bool:false});console.log(err)});
});

module.exports =router;