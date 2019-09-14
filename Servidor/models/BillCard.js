const Sequelize = require('sequelize');
const db = require('../config/database');


const BillCard = db.define ('bill_card',{
    dues:{
        type: Sequelize.INTEGER,
        allowNull: false     
    },
    porcent:{
        type: Sequelize.INTEGER,
        allowNull: false     
    }
},{
    freezeTableName: true,
    timestamps: false
})
BillCard.removeAttribute('id');

module.exports = BillCard;