import React from 'react';
import {Button, Input, Select, MenuItem} from '@material-ui/core'

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
      cost: '',
      price: '', 
      editorial: '',
      edition: '',
      lang: '',
      cover_type: 'G',
      recommended_age:'',
      tipo: 'inicio',
      source: null,
      file : null 
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

      let myForm = document.getElementById('toSend');
      let formData = new FormData(myForm);
      formData.append('cover_type',this.state.cover_type)

      fetch("/Book/insert",{
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*"
          //"Content-Type": "multipart/form-data"
        },
        body: formData
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
      case 'cost':
        this.setState({
          cost:e.target.value
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
      case 'EDFile':
        this.setState({
          file:e.target.files[0]
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
            <p>Enter the product data you want to add:</p>
            <form id="toSend">
              <label>ISBN*:</label> <br/>
              <Input name="isbn" type="text" placeholder='ISBN*' onChange={this.actualizarDatos} value={this.state.isbn}/> <br/>
              <label>Subcategory*:</label> <br/>
              <Input name="name_subcategory" type="text" placeholder='Subcategory*' onChange={this.actualizarDatos} value={this.state.name_subcategory}/> <br/>
              <label>Year of publication*:</label> <br/>
              <Input name="publication_year" type="number" min="2019" onChange={this.actualizarDatos} value={this.state.publication_year}/> <br/>
              <label>Synopsis*:</label> <br/>
              <Input name="synopsis" type="text" placeholder='Synopsis*' onChange={this.actualizarDatos} value={this.state.synopsis}/> <br/>
              <label>Title*:</label> <br/>
              <Input name="title" type="text" placeholder='Title*' onChange={this.actualizarDatos} value={this.state.title}/> <br/>
              <label>Author*:</label> <br/>
              <Input name="author" type="text" placeholder='Author*' onChange={this.actualizarDatos} value={this.state.author}/> <br/>
              <label>Number of pages*:</label> <br/>
              <Input name="number_of_pages" type="number" min="1" onChange={this.actualizarDatos} value={this.state.number_of_pages}/> <br/>
              <label>Cost*:</label> <br/>
              <Input name="cost" type="text" placeholder='Cost*' onChange={this.actualizarDatos} value={this.state.cost}/> <br/>
              <label>Price*:</label> <br/>
              <Input name="price" type="text" placeholder='Price*' onChange={this.actualizarDatos} value={this.state.price}/> <br/>
              <label>Edition*:</label> <br/>
              <Input name="editorial" type="number" min="1" onChange={this.actualizarDatos} value={this.state.editorial}/> <br/>
              <label>Editorial*:</label> <br/>
              <Input name="edition" type="text" placeholder='Editión*' onChange={this.actualizarDatos} value={this.state.edition}/> <br/>
              <label>Language*:</label> <br/>
              <Input name="lang" type="text" placeholder='Language*' onChange={this.actualizarDatos} value={this.state.lang}/><br/> 
              <label>Cover type</label>
              <Select onSelect={(x)=>this.setState({cover_type:x.target.value})} value={this.state.cover_type}><br/> 
                <MenuItem value="G">Gross</MenuItem>
                <MenuItem value="B">Soft</MenuItem>               
              </Select><br/>
              <label>Recommended age*</label><br/>
              <Input name="recommended_age" type="text" placeholder='Recommended age*' onChange={this.actualizarDatos} value={this.state.recommended_age}/> <br/>
              <label>Cover image</label><br/>
              <Input name="EDFile" type="file" placeholder='Cover image' onChange={this.actualizarDatos}/> <br/>
              <Button  onClick={this.insertpro}>Insert product</Button> <br/>
            </form>
          </div>
        );
      case "obtener":
        return(
          <div>
            <hr/>
            <p>Enter the product data you want to consult:</p>
            <form>
              <label>ISBN*:</label> <br/>
              <Input name="isbn" type="text"   value={this.state.isbn}/>
              <Button onClick={this.getpro}>Consultar producto</Button> <br/>
              <label>Subcategory*:</label> <br/>
              <Input name="name_subcategory" type="text" disabled   value={this.state.name_subcategory}/> <br/>
              <label>Year of publication*:</label> <br/>
              <Input name="publication_year" type="text" disabled  value={this.state.publication_year}/> <br/>
              <label>Synopsis*:</label> <br/>
              <Input name="synopsis" type="text" disabled   value={this.state.synopsis}/> <br/>
              <label>Title*:</label> <br/>
              <Input name="title" type="text" disabled   value={this.state.title}/> <br/>
              <label>Author*:</label> <br/>
              <Input name="author" type="text" disabled    value={this.state.author}/> <br/>
              <label>Number of pages*:</label> <br/>
              <Input name="number_of_pages" type="text" disabled   value={this.state.number_of_pages}/> <br/>
              <label>Price*:</label> <br/>
              <Input name="price" type="text" disabled   value={this.state.price}/> <br/>
              <label>Editorial*:</label> <br/>
              <Input name="editorial" type="text" disabled   value={this.state.editorial}/> <br/>
              <label>Editión*:</label> <br/>
              <Input name="edition" type="text" disabled   value={this.state.edition}/> <br/>
              <label>Language*:</label> <br/>
              <Input name="lang" type="text" disabled   value={this.state.lang}/><br/> 
              <label>Cover type:</label>
              <Input name="cover_type" type="text" disabled   value={this.state.cover_type}/><br/>
              <label>Recommended age*</label>
              <Input name="recommended_age" type="text" disabled   value={this.state.recommended_age}/> <br/>
            </form>
          </div>
        );
      case "actualizar":
        return(
          <div>
            <hr/>
            <p>Enter the product data you want to update:</p>
            <form>
              <label>ISBN*:</label> <br/>
              <Input name="isbn" type="text" onChange={this.actualizarDatos} value={this.state.isbn}/> 
              <Button onClick={this.getpro}>Cargar producto</Button> <br/>
              <label>Subcategory*:</label> <br/>
              <Input name="name_subcategory" type="text" onChange={this.actualizarDatos} value={this.state.name_subcategory}/> <br/>
              <label>Year of publication*:</label> <br/>
              <Input name="publication_year" type="number" min="2019"  onChange={this.actualizarDatos} value={this.state.publication_year}/> <br/>
              <label>Synopsis*:</label> <br/>
              <Input name="synopsis" type="text" onChange={this.actualizarDatos} value={this.state.synopsis}/> <br/>
              <label>Title*:</label> <br/>
              <Input name="title" type="text" onChange={this.actualizarDatos} value={this.state.title}/> <br/>
              <label>Author*:</label> <br/>
              <Input name="author" type="text" onChange={this.actualizarDatos} value={this.state.author}/> <br/>
              <label>Number of pages*:</label> <br/>
              <Input name="number_of_pages" type="number" min="1" onChange={this.actualizarDatos} value={this.state.number_of_pages}/> <br/>
              <label>Price*:</label> <br/>
              <Input name="price" type="text"  onChange={this.actualizarDatos} value={this.state.price}/> <br/>
              <label>Editorial*:</label> <br/>
              <Input name="editorial" type="text" placeholder='Editorial*' onChange={this.actualizarDatos} value={this.state.editorial}/> <br/>
              <label>Editión*:</label> <br/>
              <Input name="edition" type="number" min="1" placeholder='Editión*' onChange={this.actualizarDatos} value={this.state.edition}/> <br/>
              <label>Language*:</label> <br/>
              <Input name="lang" type="text" placeholder='Language*' onChange={this.actualizarDatos} value={this.state.lang}/><br/> 
              <label>Cover type:</label>
              <Select onSelect={(x)=>this.setState({cover_type:x.target.value})} value="G">
                <option value="G">Gross</option>
                <option value="B">Soft</option>               
              </Select><br/>
              <label>Recommended age*</label>
              <Input name="recommended_age" type="text" placeholder='Recommended age*' onChange={this.actualizarDatos} value={this.state.recommended_age}/> <br/>
              <Button  onClick={this.updatepro}>Update product</Button> <br/>
            </form>          
          </div>
        );
      case "eliminar":
        return(
          <div>
            <hr/>
            <p>Select the product data you want to delete:</p>
            <Input name="isbn" type="text" placeholder='ISBN*' onChange={this.actualizarDatos} value={this.state.isbn}/> <br/>
            <Button  onClick={this.deletepro}>Delete product</Button>
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
        <Button onClick={() => this.setState({tipo: "insertar"})}>INSERT PRODUCT</Button>
        <Button onClick={() => this.setState({tipo: "obtener"})}>CONSULT PRODUCTS</Button>
        <Button onClick={() => this.setState({tipo: "actualizar"})}>UPDATE PRODUCTS</Button>
        <Button onClick={() => this.setState({tipo: "eliminar"})}>DELETE PRODUCTS</Button>
        {this.action()}
      </div>
      );
    }
  }