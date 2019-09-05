const Sequelize = require('sequelize');
const db = require('../config/database');


const BillBook = db.define ('bill_book',{
    id_bill:{
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





module.exports = BillBook;