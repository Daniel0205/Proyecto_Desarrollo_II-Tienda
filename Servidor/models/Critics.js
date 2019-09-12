const Sequelize = require('sequelize');
const db = require('../config/database');

const Client  = require( './Client')
const Book  = require( './Book')

const Critics = db.define ('critics',{
    username:{
        type: Sequelize.TEXT,
        primaryKey: true 
    },
    isbn:{
        type: Sequelize.BIGINT,
        primaryKey: true 
    },
    comment:{
        type: Sequelize.TEXT,
        allowNull: false     
    },
    score:{
        type: Sequelize.INTEGER,
        allowNull: false     
    }

},{
    freezeTableName: true,
    timestamps: false
})



module.exports = Critics;