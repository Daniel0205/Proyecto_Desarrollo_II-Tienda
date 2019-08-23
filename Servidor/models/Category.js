const Sequelize = require('sequelize');
const db = require('../config/database');
const Subcategory = require('./Subcategory') ;


const Category = db.define ('category',{
    name_category:{
        type: Sequelize.STRING(15),
        primaryKey: true 
    },
    description:{
        type: Sequelize.TEXT,
        allowNull: false     
    }

},{
    freezeTableName: true,
    timestamps: false
})

module.exports = Category;  