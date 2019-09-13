const Sequelize = require('sequelize');
const db = require('../config/database');

const Message = db.define ('message',{
    id_message:{
<<<<<<< HEAD
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true 
=======
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
>>>>>>> 65fa08ebe27d99e285806d0fc19734378a94921b
    },
    description:{
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

<<<<<<< HEAD

=======
>>>>>>> 65fa08ebe27d99e285806d0fc19734378a94921b

module.exports = Message;