import React from 'react';
import { Button, Input, Select } from '@material-ui/core';
import { ValidatorForm, SelectValidator } from "react-material-ui-form-validator";


export default class Subcategories extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      type: "Search",
      selected: 'Select',
      name: "",
      catName: 'Select',
      description: "",
      subcategoryNames: [],
      categoryNames: [],
      
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
          console.log("SI ACTUALIZO")
        }
        else console.log("NO ACTUALIZO")
        this.getNames()
        this.setState({
          type: "Search",
          selected: 'Select'
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
          console.log("SI ELIMINO")
        }
        else console.log("NO ELIMINO")
        this.getNames()
        this.setState({
          type: "Search",
          selected: "Select"
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
        name_category: this.state.catName
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.bool) {
          console.log("SI CREO")
        }
        else console.log("NO CREO")
        this.getNames()
        this.setState({
          type: "Search",
          selected: 'Select'
        })
      })
  }

  handleSelect(event) {
    if (event.target.value !== "Select") {
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
        selected: "Select"
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

    if (this.state.selected !== "Select") {

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
                  value={this.state.catName}
                  onChange={(x) => this.setState({ catName: x.target.value })}
                  placeholder="Select a subcategory:"
                >
                  <option value="Select" key="Select">
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
      if (this.state.catName === 'Select') {
        return false;
      }
      return true;
    });
  }


  render() {

    if (this.state.type !== 'Create') {
      return (
      <div className="create-subcategory"> 
        <h1>Subcategories</h1>

        <Select
          name="subcategoryName"
          value={this.state.selected}
          onChange={this.handleSelect}
        >
          <option value="Select" >
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
          catName: "Select"
        })}>Create Subcategory</Button>
      </div>);
    }
    else {
      return (
        <div className="subcategories">
          <h1>Subcategories</h1>
           
            <h3>Subcategory Name:</h3>
            <Input id="name" value={this.state.name} onChange={this.handleName} placeholder='Subcategory Name:'/><br/>
            <h3>Category to which it belongs:</h3>
            <Select
                name="categoryName"
                value={this.state.catName}
                onChange={(x)=>this.setState({catName:x.target.value})}
                placeholder="Select a subcategory:"
              >
                <option value="Select" > 
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
          <Button onClick={() => this.setState({ type: "Search", selected: "Select" })}>Cancel</Button>
        </div>
      )
    }
  }
}