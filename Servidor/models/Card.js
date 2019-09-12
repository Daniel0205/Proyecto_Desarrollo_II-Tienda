const Sequelize = require('sequelize');
const db = require('../config/database');

const BillBook = require('./BillBook')

const Card = db.define ('card',{
    credit_card_number:{
        type: Sequelize.BIGINT,
        primaryKey: true
    },
    type:{
        type: Sequelize.STRING(1),
        allowNull: false     
    },
    entity:{
        type: Sequelize.TEXT,
        allowNull: false     
    }
},{
    freezeTableName: true,
    timestamps: false
})



Card.hasMany(BillBook,{ foreignKey: 'credit_card_number'});
BillBook.belongsTo(Card,{ foreignKey: 'credit_card_number',source:'credit_card_number'});

module.exports = Card;