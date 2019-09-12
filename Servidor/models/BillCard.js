const Sequelize = require('sequelize');
const db = require('../config/database');




const BillCard = db.define ('bill_card',{},{
    freezeTableName: true,
    timestamps: false
})

BillCard.removeAttribute('id');


module.exports = BillCard;