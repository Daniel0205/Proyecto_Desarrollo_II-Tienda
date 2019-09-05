const express = require('express');
const router = express.Router();
const BillBook = require('../models/BillBook');
const Bill = require('../models/Bill');

const Category = require( '../models/Category');
const Subcategory = require( '../models/Subcategory')

/////////////////////////////////////////////////////
///////////CONSULTAS DE LOS REPORTES/////////////////
/////////////////////////////////////////////////////


//consulta todas los usuarios en la base de datos
router.get("/consult", (req, res) => {

    Bill.findAll({
        include: [{
            model: BillBook
        }]
    })
        .then(x => res.json([x]))
        .catch(err => {
            console.log(err)
            res.json({ bool: false })
        });
});


module.exports = router;