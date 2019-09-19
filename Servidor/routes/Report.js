const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const BillBook = require('../models/BillBook');
const Book = require('../models/Book');
const Bill = require('../models/Bill');
const Inventory = require('../models/Inventory');
const Client = require('../models/Client');
const Card = require('../models/Card')


/////////////////////////////////////////////////////
///////////CONSULTAS DE LOS REPORTES/////////////////
/////////////////////////////////////////////////////


//consulta todas los usuarios en la base de datos
router.post("/consult", (req, res) => {

    let initDate = req.body.initDate;
    let finalDate = req.body.finalDate;

    Bill.findAll(
        {
            where: {
                date: {
                    [Op.lte]: finalDate,
                    [Op.gte]: initDate
                }
            },
            include: [{
                model: Book,
                attributes: ['title', 'author']
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


router.post("/sales", (req, res) => {

    let initDate = req.body.initDate;
    let finalDate = req.body.finalDate;

    Bill.findAll(
        {
            where: {
                date: {
                    [Op.lte]: finalDate,
                    [Op.gte]: initDate
                }
            },
            include: [{
                model: Book,
                required: true,
                attributes: {
                    exclude:
                        ['publication_year', 'synopsis', 'number_of_pages',
                            'lang', 'cover_type', ' recommended_age', 'imagepath']
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

router.post("/buyers", (req, res) => {

    let initDate = req.body.initDate;
    let finalDate = req.body.finalDate;

    Book.findAll(
        {
            attributes: ['isbn', 'price'],
            include: [{
                model: Bill,
                required: true,
                where: {
                    date: {
                        [Op.lte]: finalDate,
                        [Op.gte]: initDate
                    }
                },
                include: [{
                    model: Card,
                    required: true,
                    include: [{
                        model: Client, attributes: ["first_name", "last_name", 'email']
                    }]
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