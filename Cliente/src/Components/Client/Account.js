import React from 'react';
import { Button, Input } from '@material-ui/core'

export default class Account extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      first_name: '',
      last_name: '',
      date_birth: '',
      password: '',
      phone_number: '',
      address: '',
      email: '',
      credit_card_number: '',
      State: true,
      tipo: "inicio"
    }

    this.modCliente = this.modCliente.bind(this);
    this.consultClient = this.consultClient.bind(this);
    this.deleteClient = this.deleteClient.bind(this);
    this.cambioPagina = this.cambioPagina.bind(this);
    this.actualizarDatos = this.actualizarDatos.bind(this);
  }



  modCliente() {
    fetch("/Client/update", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        if (res[0].bool) {
          console.log("Creo que funciona");
        }
        else {
          console.log("Creo que no funciona");
        }
      }
      )
  }


  consultClient() {


    fetch("/Client/get", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
      })
    })
      .then(res => res.json())
      .then(res => {
        console.log(res[0])
        this.setState(res[0])
      })
  }

  deleteClient() {
    fetch("/Client/delete", {
      method: "DELETE",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res[0].bool) {
          console.log("funciona");
        }
        else {
          console.log("no funciona");
        }
      }
      )
  }



  actualizarDatos(e) {


    switch (e.target.id) {
      case 'first_name':
        this.setState({
          first_name: e.target.value
        })
        break;
      case 'last_name':
        this.setState({
          last_name: e.target.value
        })
        break;
      case 'date_birth':
        this.setState({
          date_birth: e.target.value
        })
        break;
      case 'type_Id':
        this.setState({
          type_Id: e.target.value
        })
        break;
      case 'id':
        this.setState({
          id: e.target.value
        })
        break;
      case 'password':
        this.setState({
          password: e.target.value
        })
        break;
      case 'phone_number':
        this.setState({
          phone_number: e.target.value
        })
        break;
      case 'address':
        this.setState({
          address: e.target.value
        })
        break;
      case 'email':
        this.setState({
          email: e.target.value
        })
        break;
      case 'credit_card_number':
        this.setState({
          credit_card_number: e.target.value
        })
        break;
      case 'State':
        this.setState({
          State: e.target.value
        })
        break;

      default:
        break;
    }
  }
  //<Input name="isbn" type="text" placeholder='ISBN*' onChange={this.actualizarDatos} value={this.state.isbn}/> <br/>
  cambioPagina(e) {

    switch (this.state.tipo) {

      case "modify":
        return (
          <div>
            <h1>Edit your information</h1>
            <label for="first_name">First name:</label>
            <Input id='first_name' type="text" placeholder='first_name*' onChange={this.actualizarDatos} value={this.state.first_name}></Input><br />

            <label for="last_name">Last name:</label>
            <Input id='last_name' type="text" placeholder='last_name*' onChange={this.actualizarDatos} value={this.state.last_name}></Input><br />

            <label for="date_birth">Date birth:</label>
            <Input id='date_birth' type="text" placeholder='date_birth*' onChange={this.actualizarDatos} value={this.state.date_birth}></Input><br />

            <label for="phone_number">Phone number:</label>
            <Input id='phone_number' type="text" placeholder='phone_number*' onChange={this.actualizarDatos} value={this.state.phone_number}></Input><br />

            <label for="address">Address:</label>
            <Input id='address' type="text" placeholder='address*' onChange={this.actualizarDatos} value={this.state.address}></Input><br />

            <label for="email">Email:</label>
            <Input id='email' type="text" placeholder='email*' onChange={this.actualizarDatos} value={this.state.email}></Input><br />

            <label for="credit_card_number">Credit card number:</label>
            <Input id='credit_card_number' type="text" placeholder='credit_card_number*' onChange={this.actualizarDatos} value={this.state.credit_card_number}></Input><br />

            <label for="password">Password:</label>
            <Input id='password' type="password" placeholder='password*' onChange={this.actualizarDatos} value={this.state.password}></Input><br />

            <Button id='modify' onClick={this.modCliente} >Edit</Button>

          </div>
        );


      case "consult":

        return (
          <div>
            <h1>Put the username of your account</h1>
            <label for="username">Username:</label>
            <Input id='username' type="text" placeholder='username*' onChange={e => this.setState({ username: e.target.value })} value={this.state.username}></Input><br />

            <Button id='consult' onClick={this.consultClient} >Consult</Button><br />

            <label for="first_name">First name:</label>
            <Input id='first_name' type="text" disabled placeholder='first_name*' onChange={this.actualizarDatos} value={this.state.first_name}></Input><br />

            <label for="last_name">Last name:</label>
            <Input id='last_name' type="text" disabled placeholder='last_name*' onChange={this.actualizarDatos} value={this.state.last_name}></Input><br />

            <label for="date_birth">Date birth:</label>
            <Input id='date_birth' type="text" disabled placeholder='date_birth*' onChange={this.actualizarDatos} value={this.state.date_birth}></Input><br />

            <label for="phone_number">Phone number:</label>
            <Input id='phone_number' type="text" disabled placeholder='phone_number*' onChange={this.actualizarDatos} value={this.state.phone_number}></Input><br />

            <label for="address">Address:</label>
            <Input id='address' type="text" disabled placeholder='address*' onChange={this.actualizarDatos} value={this.state.address}></Input><br />

            <label for="email">Email:</label>
            <Input id='email' type="text" disabled placeholder='email*' onChange={this.actualizarDatos} value={this.state.email}></Input><br />

            <label for="credit_card_number">Credit card number:</label>
            <Input id='credit_card_number' type="text" disabled placeholder='credit_card_number*' onChange={this.actualizarDatos} value={this.state.credit_card_number}></Input><br />

            <label for="password">Password:</label>
            <Input id='password' type="password" disabled placeholder='password*' onChange={this.actualizarDatos} value={this.state.password}></Input><br />

          </div>
        );

      case "delete":

        return (
          <div>
            <h1>Put the username of your account</h1>
            <label for="username">Username:</label>
            <Input id='username' type="text" placeholder='username*' onChange={e => this.setState({ username: e.target.value })} value={this.state.username}></Input><br />

            <Button id='delete' onClick={this.deleteClient} >Delete</Button>

          </div>
        );
      default:
        break;
    }
  }

  render() {

    return (
      <div className='botons'>
        <h1>Welcome "inserte nombre aqui"</h1>
        <h2>What do you want to do?...</h2>
        <Button onClick={() => this.setState({ tipo: "modify" })}>Modify my information</Button><br />
        <Button onClick={() => this.setState({ tipo: "consult" })}>Consult my information</Button><br />
        <Button onClick={() => this.setState({ tipo: "delete" })}>I want to delete my profile</Button><br />
        {this.cambioPagina()}
      </div>
    );
  }
}

