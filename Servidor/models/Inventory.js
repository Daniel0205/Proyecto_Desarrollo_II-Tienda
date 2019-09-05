const Sequelize = require('sequelize');
const db = require('../config/database');
const DistributionPoint = require( './DistributionPoint');
const Book = require('./Book')

const Inventory = db.define ('inventario',{
    id_dp:{
        type: Sequelize.INTEGER,
        primaryKey: true 
    },
    isbn:{
        type: Sequelize.BIGINT,
        primaryKey: true 
    },
    availability:{
        type: Sequelize.INTEGER,
        allowNull: false     
    }

},{
    freezeTableName: true,
    timestamps: false
})

Inventory.hasMany(DistributionPoint,{foreingkey: 'id_dp'});
Book.hasMany(Inventory,{foreingkey: 'isbn', sourcekey:'isbn'});

module.exports = Inventory;