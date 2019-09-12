const Sequelize = require('sequelize');
const db = require('../config/database');




const BillCard = db.define ('bill_card',{},{
    freezeTableName: true,
    timestamps: false
})

Bill_card.removeAttribute('id');


module.exports = Bill;