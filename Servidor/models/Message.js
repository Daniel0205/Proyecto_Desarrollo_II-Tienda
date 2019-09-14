const Sequelize = require('sequelize');
const db = require('../config/database');

const Message = db.define ('message',{
    id_message:{
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    description:{
        type: Sequelize.TEXT,
        allowNull: false 
    },
    matter:{
        type: Sequelize.TEXT,
        allowNull: false
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