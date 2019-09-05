////////////////////////////////////////////
///////////MODULOS  IMPORTADOS//////////////
////////////////////////////////////////////
const express = require("express");
const fileUpload = require('express-fileupload');
const app = express();
app.use(fileUpload())


////////////////////////////////////////////
//////////CONFIGURACION DEL ORM ////////////
////////////////////////////////////////////

const sequelize = require('./config/database.js')


/////////////////////////////////////////////
/////VERIFICACION DE CONEXION A LA BD////////
/////////////////////////////////////////////

sequelize.authenticate()
  .then(() => {
    console.log('Conectado')
  })
  .catch(err => {
    console.log('No se conecto'+err)
}) 

var bodyParser = require("body-parser"); // middleware  to handle HTTP POST request
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies


app.use('/Category', require('./routes/Category'));
app.use('/Subcategory', require('./routes/Subcategory'));
app.use('/Book',require('./routes/Book'));
app.use('/Client',require('./routes/Client'));
app.use('/Inventory',require('./routes/Inventory'));
app.use('/Message',require('./routes/Message'));
app.use('/Critics',require('./routes/Critics'));
app.use('/Bill',require('./routes/Bill'));
app.use('/BillBook',require('./routes/BillBook'));
app.use('/DistributionPoint',require('./routes/DistributionPoint'));

app.use('/images',express.static('images'));

/////////////////////////////////////////////////////
////////////CONFIGURACION DEL PUERTO ////////////////
/////////////////////////////////////////////////////
app.listen(3001, function () {
  console.log("Servidor escuchando en el puerto 3001!");
});
