const Sequelize = require('sequelize');
const db = require('../config/database');
const Client =require('./Client')

const Message = db.define ('message',{
    username:{
        type: Sequelize.TEXT,
        primaryKey: true 
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

Message.hasMany(Client,{foreingkey: 'username'});

module.exports = Message;