const Sequelize = require('sequelize');
const db = require('../config/database');

const Critics = db.define ('critics',{
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

Critics.removeAttribute('id');

module.exports = Critics;