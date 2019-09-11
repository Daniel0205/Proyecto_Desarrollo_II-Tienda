const Sequelize = require('sequelize');
const db = require('../config/database');

const BillBook = require( './BillBook')
const Client = require( './Client')
const Book = require( './Book')


const Bill = db.define ('bill',{
    id_bill:{
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    username:{
        type: Sequelize.TEXT,
        primaryKey: true 
    },
    date:{
        type: Sequelize.DATEONLY,
        allowNull: false     
    }
},{
    freezeTableName: true,
    timestamps: false
})

Bill.hasMany(Client,{foreingkey: 'username', sourcekey:'username'});

Bill.hasMany(BillBook,{ foreignKey: 'id_bill'});
BillBook.belongsTo(Bill,{ foreignKey: 'id_bill',source:'id_bill'});

module.exports = Bill;