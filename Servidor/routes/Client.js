const Sequelize = require('sequelize');
const db = require('../config/database')

const Client = db.define ('client',{
    username:{
        type: Sequelize.TEXT,
        primaryKey: true 
    },
    first_name:{
        type: Sequelize.TEXT,
        allowNull: false        
    },
    last_name:{
        type: Sequelize.TEXT,
        allowNull: false        
    },
    date_birth:{
        type: Sequelize.DATE,
        allowNull: false        
    },
    type_id:{
        type: Sequelize.STRING(2),
        allowNull: false             
    },
    id:{
        type: Sequelize.BIGINT,
        allowNull: false             
    },
    password:{
        type: Sequelize.TEXT,
        allowNull: false       
    },
    phone_number:{
        type: Sequelize.BIGINT,
        allowNull: false             
    },
    gender:{
        type: Sequelize.STRING(1),
        allowNull: false             
    },
    address:{
        type: Sequelize.TEXT,
        allowNull: false       
    },
    email:{
        type: Sequelize.TEXT,
        allowNull: false       
    },
    credit_card_number:{
        type: Sequelize.BIGINT,
        allowNull: false             
    },
    state:{
        type: Sequelize.TEXT,
        allowNull: false             
    },

},{
    freezeTableName: true,
    timestamps: false
})



module.exports = Client;