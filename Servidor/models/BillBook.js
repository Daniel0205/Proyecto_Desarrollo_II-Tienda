const Sequelize = require('sequelize');
const db = require('../config/database');

const Book  = require( './Book')
const DistributionPoint = require('./DistributionPoint')

const BillBook = db.define ('bill_book',{
    id_bill:{
        type: Sequelize.BIGINT,
        primaryKey: true 
    },
    isbn:{
        type: Sequelize.BIGINT,
        primaryKey: true 
    },
    quantity:{
        type: Sequelize.INTEGER,
        allowNull: false     
    }
},{
    freezeTableName: true,
    timestamps: false
})

BillBook.hasMany(Book,{foreingkey: 'isbn', sourcekey:'isbn'});
BillBook.belongsTo(DistributionPoint,{foreingkey: 'name_dp', sourcekey:'name_dp'});

module.exports = BillBook;