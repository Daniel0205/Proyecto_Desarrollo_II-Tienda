import React from 'react';
import {Button, MenuItem} from '@material-ui/core'
import TextField from "@material-ui/core/TextField";
 

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
      file : null ,
      quantity:1,
      isbnDp:'',
      book:[],
      dp:'',
      dpList:[],
      subcategory:[]
    };

    this.insertpro = this.insertpro.bind(this);
    this.getpro = this.getpro.bind(this);
    this.updatepro = this.updatepro.bind(this);
    this.deletepro = this.deletepro.bind(this);
    this.getBookDp = this.getBookDp.bind(this);
    this.action = this.action.bind(this);
    this.isbnField = this.isbnField.bind(this);
    this.getFields = this.getFields.bind(this);
    this.addInventory = this.addInventory.bind(this);
    this.getBookDp()
  }

 
  getFields(){
    return(
      <div>
        {/*--Subcategory--*/}
        <TextField
              id="outlined-select-currency"
              name="name_subcategory"
              select
              fullWidth
              required
              disabled={this.state.tipo==="obtener"}
              label="Subcategory"
              value={this.state.name_subcategory}
              onChange={(x)=>this.setState({name_subcategory:x.target.value})}
              margin="normal"
              variant="outlined"
            >
              {this.state.subcategory.map((option,i) => (
                <MenuItem key={i} value={option.name_subcategory}>
                  {option.name_subcategory}
                </MenuItem>
              ))}
        </TextField>
        {/*--publication_year--*/}
        <TextField
         name="publication_year"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          type="number"
          inputProps={{min:"1500", max:"2019"}}
          disabled={this.state.tipo==="obtener"}
          value={this.state.publication_year}
          label="Year of publication"
          onChange={(x)=>this.setState({publication_year:x.target.value})}
        />
        {/*--synopsis--*/}
        <TextField
          name="synopsis"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          disabled={this.state.tipo==="obtener"}
          value={this.state.synopsis}
          label="Synopsis"
          onChange={(x)=>this.setState({synopsis:x.target.value})}
        />
        {/*--Title--*/}
        <TextField
          name="title"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          disabled={this.state.tipo==="obtener"}
          value={this.state.title}
          label="Title"
          onChange={(x)=>this.setState({title:x.target.value})}
        />
        {/*--Author--*/}
        <TextField
          name="author"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          disabled={this.state.tipo==="obtener"}
          value={this.state.author}
          label="Author"
          onChange={(x)=>this.setState({author:x.target.value})}
        />
        {/*--Number of pages--*/}
         <TextField
          name="number_of_pages"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          type="number"
          inputProps={{min:"1"}}
          disabled={this.state.tipo==="obtener"}
          value={this.state.number_of_pages}
          label="Number of pages"
          onChange={(x)=>this.setState({number_of_pages:x.target.value})}
        />
        {/*--Cost--*/}
        <TextField
          name="cost"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          type="number"
          inputProps={{min:"0"}}
          disabled={this.state.tipo==="obtener"}
          value={this.state.cost}
          label="Cost"
          onChange={(x)=>this.setState({cost:x.target.value})}
        />
         {/*--Price--*/}
         <TextField
          name="price"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          type="number"
          inputProps={{min:"0"}}
          disabled={this.state.tipo==="obtener"}
          value={this.state.price}
          label="Price"
          onChange={(x)=>this.setState({price:x.target.value})}
        />
        {/*--Editorial--*/}
        <TextField
          name="editorial"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          disabled={this.state.tipo==="obtener"}
          value={this.state.editorial}
          label="Editorial"
          onChange={(x)=>this.setState({editorial:x.target.value})}
        />
         {/*--Edition--*/}
         <TextField
          name="edition"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          type="number"
          inputProps={{min:"0"}}
          disabled={this.state.tipo==="obtener"}
          value={this.state.edition}
          label="Edition"
          onChange={(x)=>this.setState({edition:x.target.value})}
        />
        {/*--Language--*/}
        <TextField
          name="lang"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          disabled={this.state.tipo==="obtener"}
          value={this.state.lang}
          label="Language"
          onChange={(x)=>this.setState({lang:x.target.value})}
        />
        {/*--Cover type--*/}
        <TextField
          name="cover_type"
            id="outlined-select-currency"
            select
            fullWidth
            required
            label="Cover type"
            disabled={this.state.tipo==="obtener"}
            value={this.state.cover_type}
            onChange={(x)=>this.setState({cover_type:x.target.value})}
            margin="normal"
            variant="outlined"
          >
            <MenuItem value="G">Gross</MenuItem>
            <MenuItem value="B">Soft</MenuItem> 
        </TextField>
        {/*--Recommended age--*/}
        <TextField
          name="recommended_age" 
          variant="outlined"
          margin="normal"
          required
          fullWidth
          type="number"
          inputProps={{min:"0"}}
          disabled={this.state.tipo==="obtener"}
          value={this.state.recommended_age}
          label="Recommended age"
          onChange={(x)=>this.setState({recommended_age:x.target.value})}
        />
        {/*--Cover image--*/}
        <TextField
          name="EDFile" 
          variant="outlined"
          margin="normal"
          type="file"
          required
          fullWidth
          disabled={this.state.tipo==="obtener"}
          label="Cover image"
          onChange={(x)=>this.setState({file:x.target.files[0]})}
        />
      
      </div>
    )
  }

  isbnField(){
    return (
      <TextField
        id="outlined-select-currency"
        name="isbn"
        select
        fullWidth
        required
        label="ISBN*"
        value={this.state.isbn}
        onChange={(x)=>this.setState(
          this.state.book[
            this.state.book.findIndex((z)=>{
            return z.isbn===x.target.value
          })])}
        margin="normal"
        variant="outlined"
      >
        {this.state.book.map((option,i) => (
          <MenuItem key={i} value={option.isbn}>
            {option.isbn}-{option.title}
          </MenuItem>
        ))}
      </TextField>)
  }

  addInventory(){

    fetch("/Inventory/update",{
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        isbn : this.state.isbn,
        name_dp: this.state.dp,
        quantity:this.state.quantity
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
    })
    
  }

  getBookDp(){
    fetch("/DistributionPoint/consultBook",{
      method: "GET",
    })
    .then(res => res.json())
    .then(res => {
      if(res.bool){
        delete res.bool
        this.setState(res)
      }
      else{
        console.log("Creo que no funciona");
      }
    })

  }

  insertpro(){

      let myForm = document.getElementById('toSend');
      let formData = new FormData(myForm);
      //formData.append('cover_type',this.state.cover_type)
      
      fetch("/Book/insert",{
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*"
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
      })

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
    let myForm = document.getElementById('toSend');
    let formData = new FormData(myForm);
    //formData.append('cover_type',this.state.cover_type)
    
    fetch("/Book/update",{
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*"
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
    })

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

  action(){
    switch (this.state.tipo) {
      case "insertar":
        return(
          <div>
            <hr/>
            <p>Enter the product data you want to add:</p>
            <form id="toSend">
              {/*--ISBN--*/}
              <TextField
              name="isbn"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              value={this.state.isbn}
              label="ISBN"
              onChange={(x)=>this.setState({isbn:x.target.value})}/>  
              {this.getFields()} 
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
              {this.isbnField()}
              {this.getFields()}            
            </form>
          </div>
        );
      case "actualizar":
        return(
          <div>
            <hr/>
            <p>Enter the product data you want to update:</p>
            <form id="toSend">
              {this.isbnField()}
              {this.getFields()}
              <Button  onClick={this.updatepro}>Update product</Button> <br/>
            </form>          
          </div>
        );
      case "eliminar":
        return(
          <div>
            <hr/>
            <p>Select the product data you want to delete:</p>
            {this.isbnField()}
            <Button  onClick={this.deletepro}>Delete product</Button>
          </div>
        );
      case "addInventory":
        return(
          <div>
            <hr/>
            <p>Select the product you want to add :</p>
             {this.isbnField()}

            <TextField
              id="outlined-select-currency"
              select
              fullWidth
              required
              label="Distribution Point*"
              value={this.state.dp}
              onChange={(x)=>this.setState({dp:x.target.value})}
              margin="normal"
              variant="outlined"
            >
              {this.state.dpList.map((option,i) => (
                <MenuItem key={i} value={option.name_dp}>
                  {option.name_dp}
                </MenuItem>
              ))}
            </TextField>
            <p>Select the quantity :</p>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="number"
              label="Quatity"
              inputProps={{ min:"1",max:'1000' }}
              onChange={(x)=>this.setState({quantity:x.target.value})} 
              value={this.state.quantity}
            ></TextField>
           
            <Button  onClick={this.addInventory}>add product</Button>
          </div>
        );
      default:
        break;
    }
  }

    render(){
      console.log(this.state)
      return (
        <div className='botns'>
        <h1>Products</h1>
        <Button onClick={() => this.setState({tipo: "insertar"})}>INSERT PRODUCT</Button>
        <Button onClick={() => this.setState({tipo: "obtener"})}>CONSULT PRODUCTS</Button>
        <Button onClick={() => this.setState({tipo: "actualizar"})}>UPDATE PRODUCTS</Button>
        <Button onClick={() => this.setState({tipo: "eliminar"})}>DELETE PRODUCTS</Button>
        <Button onClick={() => this.setState({tipo: "addInventory"})}>ADD PRODUCTS TO INVENTORY</Button>
        {this.action()}
      </div>
      );
    }
  }