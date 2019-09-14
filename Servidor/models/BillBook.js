const Sequelize = require('sequelize');
const db = require('../config/database');


const BillBook = db.define ('bill_book',{

    quantity:{
        type: Sequelize.INTEGER,
        allowNull: false     
    }
},{
    freezeTableName: true,
    timestamps: false
})

BillBook.removeAttribute('id');




module.exports = BillBook;
