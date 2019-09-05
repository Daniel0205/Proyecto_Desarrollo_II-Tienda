const Sequelize = require('sequelize');
const db = require('../config/database');
const Inventory = require('./Inventory')

const DistributionPoint = db.define ('distribution_point',{
    id_dp:{
        type: Sequelize.INTEGER,
        primaryKey: true 
    },
    name_dp:{
        type: Sequelize.TEXT,
        allowNull: false  
    },
    address:{
        type: Sequelize.TEXT,
        allowNull: false     
    },
    telephone:{
        type: Sequelize.INTEGER,
        allowNull: false     
    }

},{
    freezeTableName: true,
    timestamps: false
})

//DistributionPoint.hasMany(Inventory,{foreingkey: 'id_dp', sourcekey:'id_dp'});

module.exports = DistributionPoint;