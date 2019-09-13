const Sequelize = require('sequelize');
const db = require('../config/database');

const BillBook = require('./BillBook')
const Inventory = require('./Inventory')

const DistributionPoint = db.define ('distribution_point',{
    name_dp:{
        type: Sequelize.TEXT,
        primaryKey: true 
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



DistributionPoint.hasMany(BillBook,{ foreignKey: 'name_dp'});
BillBook.belongsTo(DistributionPoint,{ foreignKey: 'name_dp',source:'name_dp'});


DistributionPoint.hasMany(Inventory,{ foreignKey: 'name_dp'});
Inventory.belongsTo(DistributionPoint,{ foreignKey: 'name_dp',source:'name_dp'});


module.exports = DistributionPoint;