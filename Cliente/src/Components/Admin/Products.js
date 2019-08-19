import React from 'react';
import {Button, Input} from '@material-ui/core'

export default class Products extends React.Component {

  constructor(props) {
    super(props);

    this.state={
      isbn : '',
      name_subcategory: '',
      publication_year: '',
      synopsis: '',
      title: '',
      author: '',
      number_of_pages:'',
      price: '', 
      editorial: '',
      edition: '',
      lang: '',
      cover_type: '',
      recommended_age:'',
      tipo: 'inicio' 
    }


    this.insertpro = this.insertpro.bind(this);
    this.getpro = this.getpro.bind(this);
    this.updatepro = this.updatepro.bind(this);
    this.deletepro = this.deletepro.bind(this);

    this.handleClick = this.handleClick.bind(this);
    this.action = this.action.bind(this);
    this.actualizarDatos = this.actualizarDatos.bind(this);

  }

  insertpro(){

      fetch("/Book/insert",{
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.state)
      })
      .then(res => res.json())
      .then(res => {
        if(res[0].bool){
          console.log("Creo que funciona");
        }
        else{
          console.log("Creo que no funciona");
        }
      }
      )

  }

  getpro(){
    fetch("/Book/get",{
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        isbn : this.state.isbn,
      })
    })
    .then(res => res.json())
    .then(res => this.setState(res[0]))
  }

  updatepro(){
    fetch("/Book/update",{
      method: "PUT",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
    .then(res => res.json())
    .then(res => {
      if(res[0].bool){
        console.log("Creo que funciona");
      }
      else{
        console.log("Creo que no funciona");
      }
    }
    )
  }

  deletepro(){
    fetch("/Book/delete",{
      method: "DELETE",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        isbn : this.state.isbn,
      })
    })
    .then(res => res.json())
    .then(res => {
      if(res[0].bool){
        console.log("Creo que funciona");
      }
      else{
        console.log("Creo que no funciona");
      }
    }
    )
  }

  handleClick(e){
        console.log(e.target.value);
        this.setState({tipo: e.target.value});
  }

  actualizarDatos(e){

    switch (e.target.name){
      case 'isbn':
        this.setState({
          isbn:e.target.value
        });
        break;
      case 'name_subcategory':
        this.setState({
          name_subcategory:e.target.value
        })
      break;
      case 'publication_year':
        this.setState({
          publication_year:e.target.value
        })
      break;
      case 'synopsis':
        this.setState({
          synopsis:e.target.value
        })
      break;
      case 'title':
        this.setState({
          title:e.target.value
        })
      break;
      case 'author':
        this.setState({
          author:e.target.value
        })
      break;
      case 'number_of_pages':
        this.setState({
          number_of_pages:e.target.value
        })
      break;
      case 'price':
        this.setState({
          price:e.target.value
        })
      break;
      case 'editorial':
        this.setState({
          editorial:e.target.value
        })
      break;
      case 'edition':
        this.setState({
          edition:e.target.value
        })
      break;
      case 'lang':
        this.setState({
          lang:e.target.value
        })
      break;
      case 'cover_type':
        this.setState({
          cover_type:e.target.value
        })
      break;
      case 'recommended_age':
        this.setState({
          recommended_age:e.target.value
        })
      break;
      default:
      break;
    }
  }

  action(){
    switch (this.state.tipo) {
      case "insertar":
        return(
          <div>
            <hr/>
            <p>Inserte los datos del producto que desea agregar</p>
            <form>
              <Input name="isbn" type="text" placeholder='ISBN*' onChange={this.actualizarDatos} value={this.state.isbn}/> <br/>
              <Input name="name_subcategory" type="text" placeholder='Subcategoria*' onChange={this.actualizarDatos} value={this.state.name_subcategory}/> <br/>
              <Input name="publication_year" type="text" placeholder='Año*' onChange={this.actualizarDatos} value={this.state.publication_year}/> <br/>
              <Input name="synopsis" type="text" placeholder='Sipnosis*' onChange={this.actualizarDatos} value={this.state.synopsis}/> <br/>
              <Input name="title" type="text" placeholder='Titulo*' onChange={this.actualizarDatos} value={this.state.title}/> <br/>
              <Input name="author" type="text" placeholder='Autor*' onChange={this.actualizarDatos} value={this.state.author}/> <br/>
              <Input name="number_of_pages" type="text" placeholder='Páginas*' onChange={this.actualizarDatos} value={this.state.number_of_pages}/> <br/>
              <Input name="price" type="text" placeholder='Precio*' onChange={this.actualizarDatos} value={this.state.price}/> <br/>
              <Input name="editorial" type="text" placeholder='Editorial*' onChange={this.actualizarDatos} value={this.state.editorial}/> <br/>
              <Input name="edition" type="text" placeholder='Edición*' onChange={this.actualizarDatos} value={this.state.edition}/> <br/>
              <Input name="lang" type="text" placeholder='Lenguaje*' onChange={this.actualizarDatos} value={this.state.lang}/><br/> 
              <Input name="cover_type" type="text" placeholder='Tipo de cubierta*' onChange={this.actualizarDatos} value={this.state.cover_type}/><br/>
              <Input name="recommended_age" type="text" placeholder='Edad recomedada*' onChange={this.actualizarDatos} value={this.state.recommended_age}/> <br/>
              <Button  onClick={this.insertpro}>Insertar producto</Button> <br/>
            </form>
          </div>
        );
      case "obtener":
        return(
          <div>
            <hr/>
            <p>Inserte el isbn del producto que desea consultar </p>
            <form>
              <Input name="isbn" type="text" placeholder='ISBN*' onChange={this.actualizarDatos} value={this.state.isbn}/>
              <Button onClick={this.getpro}>Consultar producto</Button> <br/>
              <Input name="name_subcategory" type="text" disabled placeholder='Subcategoria*' onChange={this.actualizarDatos} value={this.state.name_subcategory}/> <br/>
              <Input name="publication_year" type="text" disabled placeholder='Año*' onChange={this.actualizarDatos} value={this.state.publication_year}/> <br/>
              <Input name="synopsis" type="text" disabled placeholder='Sipnosis*' onChange={this.actualizarDatos} value={this.state.synopsis}/> <br/>
              <Input name="title" type="text" disabled placeholder='Titulo*' onChange={this.actualizarDatos} value={this.state.title}/> <br/>
              <Input name="author" type="text" disabled placeholder='Autor*' onChange={this.actualizarDatos} value={this.state.author}/> <br/>
              <Input name="number_of_pages" type="text" disabled placeholder='Páginas*' onChange={this.actualizarDatos} value={this.state.number_of_pages}/> <br/>
              <Input name="price" type="text" disabled placeholder='Precio*' onChange={this.actualizarDatos} value={this.state.price}/> <br/>
              <Input name="editorial" type="text" disabled placeholder='Editorial*' onChange={this.actualizarDatos} value={this.state.editorial}/> <br/>
              <Input name="edition" type="text" disabled placeholder='Edición*' onChange={this.actualizarDatos} value={this.state.edition}/> <br/>
              <Input name="lang" type="text" disabled placeholder='Lenguaje*' onChange={this.actualizarDatos} value={this.state.lang}/><br/> 
              <Input name="cover_type" type="text" disabled placeholder='Tipo de cubierta*' onChange={this.actualizarDatos} value={this.state.cover_type}/><br/>
              <Input name="recommended_age" type="text" disabled placeholder='Edad recomedada*' onChange={this.actualizarDatos} value={this.state.recommended_age}/> <br/>
            </form>
          </div>
        );
      case "actualizar":
        return(
          <div>
            <hr/>
            <p>Inserte los datos del producto que desea modificar</p>
            <form>
              <Input name="isbn" type="text" placeholder='ISBN*' onChange={this.actualizarDatos} value={this.state.isbn}/> 
              <Button onClick={this.getpro}>Cargar producto</Button> <br/>
              <Input name="name_subcategory" type="text" placeholder='Subcategoria*' onChange={this.actualizarDatos} value={this.state.name_subcategory}/> <br/>
              <Input name="publication_year" type="text" placeholder='Año*' onChange={this.actualizarDatos} value={this.state.publication_year}/> <br/>
              <Input name="synopsis" type="text" placeholder='Sipnosis*' onChange={this.actualizarDatos} value={this.state.synopsis}/> <br/>
              <Input name="title" type="text" placeholder='Titulo*' onChange={this.actualizarDatos} value={this.state.title}/> <br/>
              <Input name="author" type="text" placeholder='Autor*' onChange={this.actualizarDatos} value={this.state.author}/> <br/>
              <Input name="number_of_pages" type="text" placeholder='Páginas*' onChange={this.actualizarDatos} value={this.state.number_of_pages}/> <br/>
              <Input name="price" type="text" placeholder='Precio*' onChange={this.actualizarDatos} value={this.state.price}/> <br/>
              <Input name="editorial" type="text" placeholder='Editorial*' onChange={this.actualizarDatos} value={this.state.editorial}/> <br/>
              <Input name="edition" type="text" placeholder='Edición*' onChange={this.actualizarDatos} value={this.state.edition}/> <br/>
              <Input name="lang" type="text" placeholder='Lenguaje*' onChange={this.actualizarDatos} value={this.state.lang}/><br/> 
              <Input name="cover_type" type="text" placeholder='Tipo de cubierta*' onChange={this.actualizarDatos} value={this.state.cover_type}/><br/>
              <Input name="recommended_age" type="text" placeholder='Edad recomedada*' onChange={this.actualizarDatos} value={this.state.recommended_age}/> <br/>
              <Button  onClick={this.updatepro}>Actualizar producto</Button> <br/>
            </form>          
          </div>
        );
      case "eliminar":
        return(
          <div>
            <hr/>
            <p>Inserte el isbn del producto que desea eliminar</p>
            <Input name="isbn" type="text" placeholder='ISBN*' onChange={this.actualizarDatos} value={this.state.isbn}/> <br/>
            <Button  onClick={this.deletepro}>Eliminar producto</Button>
          </div>
        );
      default:
        break;
    }
  }

    render(){
      return (
        <div className='botns'>
        <h1>Products</h1>
        <Button onClick={() => this.setState({tipo: "insertar"})}>INSERTAR PRODUCTOS</Button>
        <Button onClick={() => this.setState({tipo: "obtener"})}>OBTENER PRODUCTOS</Button>
        <Button onClick={() => this.setState({tipo: "actualizar"})}>ACTUALIZAR PRODUCTOS</Button>
        <Button onClick={() => this.setState({tipo: "eliminar"})}>ELIMINAR PRODUCTOS</Button>
        {this.action()}
      </div>
      );
    }
  }