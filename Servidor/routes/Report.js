const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const BillBook = require('../models/BillBook');
const Book = require('../models/Book');
const Bill = require('../models/Bill');
const Inventory = require('../models/Inventory');
const DistributionPoint = require('../models/DistributionPoint');


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
                include: [{
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


//consulta todas los usuarios en la base de datos
router.post("/low_stocks", (req, res) => {

let quantity = req.body.quantity;

    Inventory.findAll(
        {
            where: {
                availability: {
                    [Op.lte]: quantity
                }
            },
            include: [{
                model: Book,
                required: true,
                attributes: {
                    exclude:
                        ['publication_year', 'synopsis', 'recommended_age', 'imagepath', 'images/9788476588871.jpg']
                }
            }]
        }
    )
        .then(x => res.json(x))
        .catch(err => {
            console.log(err)
            res.json({ bool: false })
        });
});


router.get("/distributionpoint", (req, res) => {

    DistributionPoint.findAll({ attributes: ['name_dp'] }
    )
        .then(x => res.json(x))
        .catch(err => {
            console.log(err)
            res.json({ bool: false })
        });
});

module.exports = router;