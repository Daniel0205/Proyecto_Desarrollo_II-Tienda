const Sequelize = require('sequelize');
const db = require('../config/database');



const Bill = db.define ('bill',{
    id_bill:{
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    date:{
        type: Sequelize.DATEONLY,
        allowNull: false     
    }
},{
    freezeTableName: true,
    timestamps: false
})

module.exports = Bill;