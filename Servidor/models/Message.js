const Sequelize = require('sequelize');
const db = require('../config/database');
const Client =require('./Client')

const Message = db.define ('message',{
    id_message:{
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    description:{
        type: Sequelize.TEXT,
        primaryKey: true 
    },
    solved:{
        type: Sequelize.BOOLEAN,
        allowNull: false     
    }

},{
    freezeTableName: true,
    timestamps: false
})


module.exports = Message;