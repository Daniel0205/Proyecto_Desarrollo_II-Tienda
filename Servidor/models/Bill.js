const Sequelize = require('sequelize');
const db = require('../config/database');

const BillBook = require( './BillBook')
const Client = require( './Client')

const Bill = db.define ('bill',{
    id_bill:{
        type: Sequelize.BIGINT,
        primaryKey: true 
    },
    username:{
        type: Sequelize.TEXT,
        primaryKey: true 
    },
    date:{
        type: Sequelize.DATE,
        allowNull: false     
    }
},{
    freezeTableName: true,
    timestamps: false
})

Bill.hasMany(Client,{foreingkey: 'username', sourcekey:'username'});

module.exports = Bill;