const Sequelize = require('sequelize');
const db = require('../config/database');
const Book  = require( './Book');


const Subcategory = db.define ('subcategory',{
    name_subcategory:{
        type: Sequelize.TEXT,
        primaryKey: true 
    },

    description:{
        type: Sequelize.TEXT,
        allowNull: false     
    }

},{
    freezeTableName: true,
    timestamps: false,
})



Subcategory.hasMany(Book,{ foreignKey: 'name_subcategory'});
Book.belongsTo(Subcategory,{ foreignKey: 'name_subcategory',source:'name_subcategory'});


module.exports = Subcategory;