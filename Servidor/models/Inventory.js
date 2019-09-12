const Sequelize = require('sequelize');
const db = require('../config/database');


const Inventory = db.define ('inventory',{
    availability:{
        type: Sequelize.INTEGER,
        allowNull: false     
    }

},{
    freezeTableName: true,
    timestamps: false
})

Inventory.removeAttribute('id');

module.exports = Inventory;