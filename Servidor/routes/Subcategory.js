 const express = require('express');
 const router = express.Router();
 const Subcategory = require('../models/Subcategory')


//consulta todas las subcategorias en la base de datos
router.get("/consult", (req,res) =>{

  Subcategory.findAll({where:{active:true}})
    .then(x =>  res.json(x))
    .catch(err => {
      console.log(err)
      res.json({bool:false})
    });
});


//consulta todas las subcategorias en la base de datos
router.post("/create", (req,res) =>{
  
  

  // Insert into table
  Subcategory.create(req.body)
    .then(x =>res.json({bool:true}))
    .catch(err => {
      console.log(err)
      res.json({bool:false})
    });  
});


//actualiza una instancia de una subcategoria en la base de datos
router.post("/update",(req,res)=>{
  let updateValues = {
    description: req.body.description,
    name_category: req.body.categoryName
  };
  Subcategory.update(updateValues, { where: { name_subcategory: req.body.name } })
  .then((result) => {
    console.log(result)
    if(result[0]===1)res.json({bool:true})
    else  res.json({bool:false})
  })
});

//Elimina una instancia de una subcategoria en la base de datos
router.delete("/delete",(req,res) =>{
  Subcategory.update({active:false},{
    where:{
      name_subcategory:req.body.subcategory
    }
  })
  .then(x =>  res.json({bool:true}))
  .catch(err => {
    console.log(err)
    res.json({bool:false})
  });
})



///////////////////////////////////////////////////
////////////////////CONSULTAS TALLER 5/////////////
///////////////////////////////////////////////////

//consulta ciertos campos de las subcategorias en la base de datos
router.post("/consult", (req,res) =>{

  Subcategory.findAll({attributes: req.body.fields})
    .then(x =>  res.json(x))
    .catch(err => console.log(err));
})


//consulta ciertos campos de las subcategorias en la base de datos
//con un filtro where
router.post("/consultFilter", (req,res) =>{

  Subcategory.findAll({
    where: {
      name_category: req.body.name_category
    }
  })
    .then(x =>  res.json(x))
    .catch(err => console.log(err));
})

//consulta una subcategoria especifica en la base de datos
router.post("/consultSubcat", (req,res) =>{

  Subcategory.findAll({
    where: {
      name_subcategory: req.body.name_subcategory
    }
  })
    .then(x =>  res.json(x))
    .catch(err => console.log(err));
})





module.exports =router;

/*

 
  

  
    //Actualiza los datos de un determinado usuario en la base de datos
  app.post("/actualizarSubCategorias", function (req, res) {
  
  
    let str;
    let vars;
    if(req.body.type==="category"){
       str="UPDATE category SET description=$2 WHERE name_category=$1;"
       vars=[req.body.name,req.body.description]
    }
    else{
       str="UPDATE subcategory SET description=$2,name_category=$3 WHERE name_subcategory=$1;"
       vars=[req.body.name,req.body.description,req.body.categoryName]
    }
  
  
    console.log(vars)
  
      connect(function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }
        //use the client for executing the query
    
        client.query(str,vars,(err, result) =>{
  
          console.log(str)
          //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
          done(err);
          if(err) {
            res.json({bool:false});
            return console.error('error running query', err);
          }
          else{
            res.json({bool:true});
          }
        });
      });
    });
  
  //elimina los datos de una determinada categoria en la base de datos
  app.delete("/eliminarSubCategorias", function (req, res) {
  
  
    let str;
    if(req.body.type==="category") str="DELETE FROM category WHERE name_category=$1;"
    else str="DELETE FROM subcategory WHERE name_subcategory=$1;"
  
    let vars = [req.body.category]
  
    console.log(vars)
  
      connect(function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }
        //use the client for executing the query
    
        client.query(str,vars,(err, result) =>{
  
          console.log(str)
          //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
          done(err);
          if(err) {
            res.json({bool:false});
            return console.error('error running query', err);
          }
          else{
            res.json({bool:true});
          }
        });
      });
    }); 



 */