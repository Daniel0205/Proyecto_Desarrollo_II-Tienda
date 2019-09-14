 
const Sequelize = require('sequelize');
const db = require('../config/database')

const BillBook  = require( './BillBook')
const Critics = require( './Critics')
const Inventory = require('./Inventory')
const Bill = require('./Bill')


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
    cost:{
        type: Sequelize.BIGINT,
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
    },
    imagepath:{
        type: Sequelize.TEXT,
        allowNull: true             
    }
},{
    freezeTableName: true,
    timestamps: false,

})
  
Bill.belongsToMany(Book, {through:BillBook,foreignKey: 'id_bill'});
Book.belongsToMany(Bill, {through:BillBook,foreignKey: 'isbn'});


Book.hasMany(Critics,{ foreignKey: 'isbn'});
Critics.belongsTo(Book,{ foreignKey: 'isbn',source:'isbn'});

Book.hasMany(Inventory,{ foreignKey: 'isbn'});
Inventory.belongsTo(Book,{ foreignKey: 'isbn',source:'isbn'});


Book.hasMany(Critics,{ foreignKey: 'isbn'});
Critics.belongsTo(Book,{ foreignKey: 'isbn',source:'isbn'});

Book.hasMany(Inventory,{ foreignKey: 'isbn'});
Inventory.belongsTo(Book,{ foreignKey: 'isbn',source:'isbn'});

module.exports = Book;