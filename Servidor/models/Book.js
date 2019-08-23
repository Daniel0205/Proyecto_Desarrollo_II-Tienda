const Sequelize = require('sequelize');
const db = require('../config/database')


const Book = db.define ('book',{
    isbn:{
        type: Sequelize.BIGINT,
        primaryKey: true 
    },
    publication_year:{
        type: Sequelize.TEXT,
        allowNull: false        
    },
    synopsis:{
        type: Sequelize.TEXT,
        allowNull: false        
    },
    title:{
        type: Sequelize.TEXT,
        allowNull: false             
    },
    author:{
        type: Sequelize.TEXT,
        allowNull: false             
    },
    number_of_pages:{
        type: Sequelize.INTEGER,
        allowNull: false       
    },
    price:{
        type: Sequelize.BIGINT,
        allowNull: false             
    },
    editorial:{
        type: Sequelize.TEXT,
        allowNull: false             
    },
    edition:{
        type: Sequelize.TEXT,
        allowNull: false       
    },
    lang:{
        type: Sequelize.TEXT,
        allowNull: false       
    },
    cover_type:{
        type: Sequelize.STRING(1),
        allowNull: false             
    },
    recommended_age:{
        type: Sequelize.TEXT,
        allowNull: false             
    }
},{
    freezeTableName: true,
    timestamps: false,

})

module.exports = Book;