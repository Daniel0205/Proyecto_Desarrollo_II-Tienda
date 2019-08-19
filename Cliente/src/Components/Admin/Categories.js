import React from 'react';
import { Button, Input, Select} from '@material-ui/core';

export default class Categories extends React.Component {
  constructor(props){
    super(props)
    this.state={
      type:"Search",
      selected:'Select',
      name:"",
      description:"",
      categoryNames:[]
    };
    this.getNames=this.getNames.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.getFormular = this.getFormular.bind(this);
    this.eliminar = this.eliminar.bind(this);
    this.crear = this.crear.bind(this);
    this.actualizar = this.actualizar.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleDescription = this.handleDescription.bind(this)
    this.getNames();

  }


  actualizar(){

    fetch("/Category/update", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
      name:this.state.name,
      description:this.state.description})
    })
    .then(res => res.json())
    .then(res =>{
      if(res.bool){
        console.log("SI ACTUALIZO")
      }
      else console.log("NO ACTUALIZO")
      this.getNames()
      this.setState({
        type:"Search",
        selected:'Select'
      })
    })

  }



  getNames(){
    fetch("/Category/consult", {
      method: "GET",
    })
    .then(res => res.json())
    .then(res => this.setState({categoryNames:res}))
  }

  eliminar(){

    fetch("/Category/delete", {
      method: "DELETE",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ category:this.state.name})
    })
    .then(res => res.json())
    .then(res =>{
      if(res.bool){
        console.log("SI ELIMINO")
      }
      else console.log("NO ELIMINO")
      this.getNames()
      this.setState({
        type:"Search",
        selected:"Select"
      })
    })

  }

  crear(){

    fetch("/Category/create", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name_category:this.state.name,
                             description:this.state.description})
    })
    .then(res => res.json())
    .then(res =>{
      if(res.bool){
        console.log("SI CREO")
      }
      else console.log("NO CREO")
      this.getNames()
      this.setState({
        type:"Search",
        selected:'Select'
      })
    })
  }

  handleSelect(event){
    if(event.target.value!=="Select"){
      let object = this.state.categoryNames.find(x => x.name_category===event.target.value)
      this.setState({
        selected:event.target.value,
        name:object.name_category,
        description:object.description
      });
    } 
    else{
      this.setState({
        selected:"Select"
      });
    }
  }


  handleName(event){
    this.setState({
      name:event.target.value
    })
  }

  handleDescription(event){
    this.setState({
      description:event.target.value
    })
  }

  getFormular(){

    if(this.state.selected!=="Select"){

      switch(this.state.type){
        case "Search":
            return (<div key="0">
              <h2 >Nombre:</h2>
              <h3 >{this.state.name}</h3>

              <h2 >Description:</h2>
              <h3 >{this.state.description}</h3>

              <Button onClick={()=>this.setState({type:"Actualizar"})}>Actualizar</Button>
              <Button onClick={this.eliminar}>Eliminar</Button>
          
            </div>);
        case "Actualizar":
          return ( <div>
            <form>
              <h3>Nombre de la categoria:</h3>
              <Input value={this.state.name} onChange={this.handleName} disabled/><br/>
              <h3>Descripcion de la categoria:</h3>
              <Input value={this.state.description} onChange={this.handleDescription} placeholder='Descripcion de la categoria'/><br/>
              <Button onClick={this.actualizar}>Actualizar</Button>
              <Button onClick={()=>this.setState({type:"Search"})}>Cancelar</Button>
            </form>
          </div>);
        default:
          return
      }
    }
  }

  render(){


    if(this.state.type!=='Create'){
      return (<div>
        <h1>Categorias</h1>
        
        <Select
              name="categoryName"
              value={this.state.selected}
              onChange={this.handleSelect}
            >
              <option value="Select" > 
                Selecciona una categoria:
              </option>
              {this.state.categoryNames.map(x =>
                        <option value={x.name_category} key={x.name_category}>
                              {x.name_category}
                        </option>)}
        </Select>
        {this.getFormular()}
        <Button onClick={()=>this.setState({
                          type:"Create",
                          name:"",
                          description:"",
                        })}>Crear Categoria</Button>
      </div>);
    }
    else{
      return(
        <div>
          <h1>Categorias</h1>
          <form>
            <h3>Nombre de la categoria:</h3>
            <Input value={this.state.name} onChange={this.handleName} placeholder='Nombre de la categoria'/><br/>
            <h3>Descripcion de la categoria:</h3>
            <Input value={this.state.description} onChange={this.handleDescription} placeholder='Descripcion de la categoria'/><br/>
            <Button onClick={this.crear}>Crear</Button>
            <Button onClick={()=>this.setState({type:"Search",selected:"Select"})}>Cancelar</Button>
          </form>
        </div>
      )
    }
  }
}