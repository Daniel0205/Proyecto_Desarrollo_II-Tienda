import React from 'react';
import { Button, Input, Select } from '@material-ui/core';
import { ValidatorForm, SelectValidator } from "react-material-ui-form-validator";
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarMesssages from '../../SnackbarMesssages';

export default class Subcategories extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      type: "Search",
      selected: 'DEFAULT',
      name: "",
      catName: 'DEFAULT',
      description: "",
      subcategoryNames: [],
      categoryNames: [],
      msj:'',
      types:''
      
    };
    this.getNames = this.getNames.bind(this);
    this.getNamesCat = this.getNamesCat.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.getFormular = this.getFormular.bind(this);
    this.eliminar = this.eliminar.bind(this);
    this.crear = this.crear.bind(this);
    this.actualizar = this.actualizar.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getNames();
    this.getNamesCat();

  }


  actualizar() {

    fetch("/Subcategory/update", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.state.name,
        description: this.state.description,
        categoryName: this.state.catName
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.bool) {
          this.setState({msj:'SUBCATEGORY UPDATED SUCCESSFULLY!',types:'success'})
        }
        else this.setState({msj:'ERROR UPDATING CATEGORY',types:'error'})
        this.getNames()
        this.setState({
          type: "Search",
          selected: 'DEFAULT'
        })
      })

  }



  getNames() {
    fetch("/Subcategory/consult", {
      method: "GET",
    })
      .then(res => res.json())
      .then(res => this.setState({ subcategoryNames: res }))
  }

  getNamesCat() {
    fetch("/Category/consult", {
      method: "GET",
    })
      .then(res => res.json())
      .then(res => this.setState({ categoryNames: res }))
  }

  eliminar() {

    fetch("/Subcategory/delete", {
      method: "DELETE",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ subcategory: this.state.name })
    })
      .then(res => res.json())
      .then(res => {
        if (res.bool) {
          this.setState({msj:'SUBCATEGORY DELETED SUCCESSFULLY!',types:'success'})
        }
        else this.setState({msj:'ERROR DELETING SUBCATEGORY',types:'error'})
        this.getNames()
        this.setState({
          type: "Search",
          selected: 'DEFAULT'
        })
      })

  }

  crear() {

    fetch("/Subcategory/create", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name_subcategory: this.state.name,
        description: this.state.description,
        name_category: this.state.catName,
        active:true
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.bool) {
          this.setState({msj:'SUBCATEGORY CREATED SUCCESSFULLY!',types:'success'})
        }
        else this.setState({msj:'ERROR CREATING CATEGORY',types:'error'})
        this.getNames()
        this.setState({
          type: "Search",
          selected:'DEFAULT'
        })
      })
  }

  handleSelect(event) {
    if (event.target.value !=='DEFAULT') {
      let object = this.state.subcategoryNames.find(x => x.name_subcategory === event.target.value)
      this.setState({
        selected: event.target.value,
        name: object.name_subcategory,
        description: object.description,
        catName: object.name_category
      });
    }
    else {
      this.setState({
        selected: 'DEFAULT'
      });
    }
  }


  handleName(event) {
    this.setState({
      name: event.target.value
    })
  }

  handleDescription(event) {
    this.setState({
      description: event.target.value
    })
  }

  getFormular() {

    if (this.state.selected !== 'DEFAULT') {

      switch (this.state.type) {
        case "Search":
          return (<div key="0" className="div-select">
            <h2 >Name:</h2>
            <h3 >{this.state.name}</h3>
            <h2 >Category to which it belongs:</h2>
            <h3 >{this.state.catName}</h3>
            <h2 >Description:</h2>
            <h3 >{this.state.description}</h3>

            <Button onClick={() => this.setState({ type: "Actualizar" })}>Update</Button>
            <Button onClick={this.eliminar}>Delete</Button>

          </div>);
        case "Actualizar":
          return (
            <div className="actualizar-subcategoria">
              <ValidatorForm onSubmit={this.handleSubmit}>
                <h3>Subcategory Name:</h3>
                <Input value={this.state.name} onChange={this.handleName} disabled /><br />
                <h3>Category to which it belongs:</h3>

                <SelectValidator
                  id="1"
                  validators={["isEmpty"]}
                  errorMessages={["Please select a subcategory"]}
                  name="categoryName"
                  defaultValue={'DEFAULT'}
                  value={this.state.catName}
                  onChange={(x) => this.setState({ catName: x.target.value })}
                  placeholder="Select a subcategory:"
                >
                  <option value={'DEFAULT'} disabled>
                    Select a category:
                    </option>
                  {this.state.categoryNames.map(x =>
                    <option value={x.name_category} key={x.name_category}>
                      {x.name_category}
                    </option>)}
                </SelectValidator>

                <h3>Subcategory Description:</h3>
                <Input value={this.state.description} onChange={this.handleDescription} placeholder='Descripcion de la categoria' /><br />
                <Button type="submit">Update</Button>
                <Button onClick={() => this.setState({ type: "Search" })}>Cancel</Button>
              </ValidatorForm >
            </div>);
        default:
          return
      }
    }
  }


  handleSubmit = () => {
    this.actualizar();
  }

  //Validaciones con expresiones regulares
  componentDidMount() {
    ValidatorForm.addValidationRule('isEmpty', () => {
      if (this.state.catName === 'DEFAULT') {
        return false;
      }
      return true;
    });
  }


  render() {
    var msj =
    (<Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}
          open={this.state.msj!==''}
          autoHideDuration={3000} //opcional
      >
          <SnackbarMesssages
              variant={this.state.types}
              onClose={()=>this.setState({msj:''})}
              message={this.state.msj} />
      </Snackbar>)

    if (this.state.type !== 'Create') {
      return (
      <div className="create-subcategory"> 
        <h1>Subcategories</h1>
        {msj}

        <Select
          name="subcategoryName"
          value={this.state.selected}
          onChange={this.handleSelect}
        >
          <option value='DEFAULT' disabled>
            Select a subcategory
              </option>
          {this.state.subcategoryNames.map(x =>
            <option value={x.name_subcategory} key={x.name_subcategory}>
              {x.name_subcategory}
            </option>)}
        </Select>
        {this.getFormular()}
        <Button name="create-btn"
          onClick={() => this.setState({
          type: "Create",
          name: "",
          description: "",
          catName:'DEFAULT'
        })}>Create Subcategory</Button>
      </div>);
    }
    else {
      return (
        <div className="subcategories">
          <h1>Subcategories</h1>
          {msj}
           
            <h3>Subcategory Name:</h3>
            <Input id="name" value={this.state.name} onChange={this.handleName} placeholder='Subcategory Name:'/><br/>
            <h3>Category to which it belongs:</h3>
            <Select
                name="categoryName"
                value={this.state.catName}
                onChange={(x)=>this.setState({catName:x.target.value})}
                placeholder="Select a subcategory:"
              >
                <option value='DEFAULT' disabled > 
                  Select a category:
                </option>
            {this.state.categoryNames.map(x =>
              <option value={x.name_category} key={x.name_category}>
                {x.name_category}
              </option>)}
          </Select>
          <h3>Subcategory Description:</h3>
          <Input value={this.state.description} onChange={this.handleDescription} placeholder='Subcategory Description' /><br />

          <Button onClick={this.crear}>Create</Button>
          <Button onClick={() => this.setState({ type: "Search", selected: 'DEFAULT' })}>Cancel</Button>
        </div>
      )
    }
  }
}