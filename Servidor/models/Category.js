const Sequelize = require('sequelize');
const db = require('../config/database');
const Subcategory = require('./Subcategory') ;


const Category = db.define ('category',{
    name_category:{
        type: Sequelize.TEXT,
        primaryKey: true 
    },
    description:{
        type: Sequelize.TEXT,
        allowNull: false     
    },
    active:{
        type: Sequelize.BOOLEAN,
        allowNull: true             
    }

},{
    freezeTableName: true,
    timestamps: false
})

Category.hasMany(Subcategory,{ foreignKey: 'name_category'});
Subcategory.belongsTo(Category,{ foreignKey: 'name_category',source:'name_category'});

module.exports = Category;
