import React from 'react';
import { Button, Select } from '@material-ui/core';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import TextField from "@material-ui/core/TextField";


export default class Categories extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      type: "Search",
      selected: 'Select',
      name: "",
      description: "",
      categoryNames: []
    };
    this.getNames = this.getNames.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.getFormular = this.getFormular.bind(this);
    this.eliminar = this.eliminar.bind(this);
    this.crear = this.crear.bind(this);
    this.actualizar = this.actualizar.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getNames();
  }


  actualizar() {

    fetch("/Category/update", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.state.name,
        description: this.state.description
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

    fetch("/Category/consult", {
      method: "GET",
    })
      .then(res => res.json())
      .then(res => this.setState({ categoryNames: res }))
  }


  eliminar() {

    fetch("/Category/delete", {
      method: "DELETE",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ category: this.state.name })
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

    fetch("/Category/create", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name_category: this.state.name,
        description: this.state.description
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
      let object = this.state.categoryNames.find(x => x.name_category === event.target.value)
      this.setState({
        selected: event.target.value,
        name: object.name_category,
        description: object.description
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
          return (<div key="0" className="buscar-categoria">
            <h2 >Name:</h2>
            <h3 >{this.state.name}</h3>

            <h2 >Description:</h2>
            <h3 >{this.state.description}</h3>

            <Button onClick={() => this.setState({ type: "Actualizar" })}>Update</Button>
            <Button onClick={this.eliminar}>Delete</Button>

          </div>);
        case "Actualizar":
          return (
            <div className="actualizar-categoria">
              <form>
                <TextField
                required
                fullWidth
                variant="outlined"
                margin="normal"
                label="Category name"
                disabled
                value={this.state.name}
                onChange={this.handleName} 
                />
                <TextField
                  required
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  label="Description of the category"
                  
                  value={this.state.description}
                  onChange={this.handleDescription}
                />
                <Button onClick={this.actualizar}>Update</Button>
                <Button onClick={() => this.setState({ type: "Search" })}>Cancel</Button>
              </form>
            </div>);
        default:
          return
      }
    }
  }


  handleSubmit = () => {
    this.crear();
  }

  //Validaciones con expresiones regulares
  componentDidMount() {
    ValidatorForm.addValidationRule(
      "isValidName", (string) => /[a-zA-Z \u00E0-\u00FC]/g.test(string)
    );
    ValidatorForm.addValidationRule(
      "isValidLengthName", (string) => /\b[a-zA-Z \u00E0-\u00FC]{1,20}\b/g.test(string)
    );
    ValidatorForm.addValidationRule(
      "isValidLengthDescription", (string) => /\b[a-zA-Z \u00E0-\u00FC]{1,50}\b/g.test(string)
    );
  }


  render() {

    if (this.state.type !== 'Create') {
      return (<div>
        <h1>Category</h1>

        <Select
          name="categoryName"
          value={this.state.selected}
          onChange={this.handleSelect}
        >
          <option value="Select" >
            Select a category:
              </option>
          {this.state.categoryNames.map(x =>
            <option value={x.name_category} key={x.name_category}>
              {x.name_category}
            </option>)}

        </Select>
        {this.getFormular()}
        <Button onClick={() => this.setState({
          type: "Create",
          name: "",
          description: "",
        })}>Create Category</Button>
      </div>);
    }
    else {
      return (
        <div>
          <h1>Category</h1>

          <ValidatorForm onSubmit={this.handleSubmit}>

            <h3>Category name:</h3>
            <TextValidator
              value={this.state.name}
              onChange={this.handleName}
              id="category_name"
              validators={["required", "isValidName", "isValidLengthName"]}
              errorMessages={["Requered field name!", "invalid format!", "Too long name!"]}
              placeholder='Category name' /><br />

            <h3>Description of the category</h3>
            <TextValidator
              value={this.state.description}
              onChange={this.handleDescription}
              id="description_category"
              validators={["required", "isValidName", "isValidLengthDescription"]}
              errorMessages={["Requered field category!", "invalid format!", "Too long description!"]}
              placeholder='Description of the category' /><br />

            <Button type="submit" >Create</Button>
            <Button onClick={() => this.setState({ type: "Search", selected: "Select" })}>Cancel</Button>

          </ValidatorForm >
        </div>
      )
    }
  }
}