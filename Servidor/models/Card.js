const Sequelize = require('sequelize');
const db = require('../config/database');

const BillCard = require('./BillCard')
const Bill = require('./Bill')

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
    },
    active:{
        type: Sequelize.BOOLEAN,
        allowNull: false     
    }
},{
    freezeTableName: true,
    timestamps: false
})

Bill.belongsToMany(Card, {through:BillCard,foreignKey: 'id_bill'});
Card.belongsToMany(Bill, {through:BillCard,foreignKey: 'credit_card_number'});



module.exports = Card;