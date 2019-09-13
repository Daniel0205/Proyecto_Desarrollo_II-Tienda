const Sequelize = require('sequelize');
const db = require('../config/database');

const Admin = db.define ('admin',{
    username:{
        type: Sequelize.TEXT,
        allowNull: false,
        primaryKey: true     
    },
    password:{
        type: Sequelize.BIGINT,
        allowNull: false     
    }
},{
    freezeTableName: true,
    timestamps: false
})


module.exports = Admin;