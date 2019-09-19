const express = require('express');
const router = express.Router();
const db  =require('../config/database')
const Category = require('../models/Category')


//consulta todas las categorias en la base de datos
router.get("/consult", (req,res) =>{

 Category.findAll({where:{active:true}})
   .then(x =>  res.json(x))
   .catch(err => console.log(err));
})



//consulta todas las categorias en la base de datos
router.post("/create", (req,res) =>{
  
  


  // Insert into table
  Category.create(req.body)
    .then(x =>res.json({bool:true}))
    .catch(err => {
      console.log(err)
      res.json({bool:false})
    });
  
})


//actualiza una instancia de una categoria en la base de datos
router.post("/update",(req,res)=>{
  let updateValues = {
    description: req.body.description,
  };
  Category.update(updateValues, { where: { name_category: req.body.name } })
  .then((result) => {

    if(result[0]===1)res.json({bool:true})
    else  res.json({bool:false})
  })
});

//Elimina una instancia de una categoria en la base de datos
router.delete("/delete",(req,res) =>{
  Category.update({active:false},{
    where:{
      name_category:req.body.category
    }
  })
  .then(x =>  res.json({bool:true}))
  .catch(err => {
    console.log(err)
    res.json({bool:false})
  });
})


module.exports =router;