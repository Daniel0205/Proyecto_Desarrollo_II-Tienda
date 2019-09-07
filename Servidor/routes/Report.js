const express = require('express');
const router = express.Router();
const BillBook = require('../models/BillBook');
const Book = require('../models/Book');
const Bill = require('../models/Bill');

const Category = require( '../models/Category');
const Subcategory = require( '../models/Subcategory')

/////////////////////////////////////////////////////
///////////CONSULTAS DE LOS REPORTES/////////////////
/////////////////////////////////////////////////////


//consulta todas los usuarios en la base de datos
router.get("/consult", (req, res) => {

    Bill.findAll(
        { 
        // where:{
        //     date: {
        //         $between: ['2018-07-01', '2019-10-02']
        //         // $lt: '2019-10-01',
        //         // $gt: '2017-07-01'
        //     }
        // },
        include: [{
            model: BillBook,
            include:[{
                model: Book,
                attributes: ['title']
            }]
        }]
    }
    )
        .then(x => res.json(x))
        .catch(err => {
            console.log(err)
            res.json({ bool: false })
        });
});


module.exports = router;