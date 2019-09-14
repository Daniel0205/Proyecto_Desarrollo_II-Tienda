import React from 'react';
import { Button, Input } from '@material-ui/core'
import {getUsername} from '../../store/username/reducer'
import {connect} from 'react-redux'
import updateUsername from '../../store/username/action'
import updateType from '../../store/type/action'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';
import AddBoxIcon from '@material-ui/icons/AddBox';

const type = [
  {
    value: 'C',
    label: 'Credit',
  },
  {
    value: 'D',
    label: 'Debit',
  }
];

class Account extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      username:this.props.username,
      first_name: '',
      last_name: '',
      date_birth: '',
      password: '',
      phone_number: '',
      address: '',
      email: '',
      State: true,
      cards:[],
      tipo: "inicio",
      newCard:{credit_card_number:'',type:'C',entity:''}
    }

    this.modCliente = this.modCliente.bind(this);
    this.consultClient = this.consultClient.bind(this);
    this.deleteClient = this.deleteClient.bind(this);
    this.cambioPagina = this.cambioPagina.bind(this);
    this.actualizarDatos = this.actualizarDatos.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
    this.addCard = this.addCard.bind(this);
    this.consultClient()
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
        console.log(res)
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
        console.log(res)

        if (res[0].bool) {
          this.props.updateUsername("");
          this.props.updateType("init")

        }
        else {
          console.log("no funciona");
        }
      }
      )
  }

  deleteCard = i => event => {

    fetch("/Card/delete", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({credit_card_number:this.state.cards[i].credit_card_number})
    })
      .then(res => res.json())
      .then(res => {
        if(res[0].bool){
          var aux=this.state.cards
          aux.splice(i,1) 
          this.setState({cards:aux})
        }
      })
  } 

  addCard(){

    fetch("/Card/add", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        credit_card_number: this.state.newCard.credit_card_number,
        type: this.state.newCard.type,
        entity:this.state.newCard.entity,
        active:true,
        username:this.props.username
      })
    })
      .then(res => res.json())
      .then(res => {
        if(res.bool){ 
          var aux= this.state.cards;
          aux.push(res.card)

          this.setState({cards:aux,newCard:{credit_card_number:'',type:'C',entity:''}})
        }
      })
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
      case 'State':
        this.setState({
          State: e.target.value
        })
        break;

      default:
        break;
    }
  }
  cambioPagina(e) {

    switch (this.state.tipo) {

      case "modify":
        return (
          <div>
            <h1>Edit your information:</h1>
            <label >First name:</label>
            <Input id='first_name' type="text" placeholder='first_name*' onChange={this.actualizarDatos} value={this.state.first_name}></Input><br />

            <label >Last name:</label>
            <Input id='last_name' type="text" placeholder='last_name*' onChange={this.actualizarDatos} value={this.state.last_name}></Input><br />

            <label >Birthdate:</label>
            <Input id='date_birth' type="text" placeholder='date_birth*' onChange={this.actualizarDatos} value={this.state.date_birth}></Input><br />

            <label>Phone number:</label>
            <Input id='phone_number' type="text" placeholder='phone_number*' onChange={this.actualizarDatos} value={this.state.phone_number}></Input><br />

            <label >Address:</label>
            <Input id='address' type="text" placeholder='address*' onChange={this.actualizarDatos} value={this.state.address}></Input><br />

            <label>E-mail:</label>
            <Input id='email' type="text" placeholder='email*' onChange={this.actualizarDatos} value={this.state.email}></Input><br />

            <label >Password:</label>
            <Input id='password' type="password" placeholder='password*' onChange={this.actualizarDatos} value={this.state.password}></Input><br />

            <Button id='modify' onClick={this.modCliente} >Edit</Button>

          </div>
        );


      case "consult":

        return (
          <div>
            <label>Username:</label>
            <Input id='username' type="text" disabled placeholder='username*' onChange={e => this.setState({ username: e.target.value })} value={this.state.username}></Input><br />

            <label >First name:</label>
            <Input id='first_name' type="text" disabled placeholder='first_name*' onChange={this.actualizarDatos} value={this.state.first_name}></Input><br />

            <label >Last name:</label>
            <Input id='last_name' type="text" disabled placeholder='last_name*' onChange={this.actualizarDatos} value={this.state.last_name}></Input><br />

            <label >Birthdate:</label>
            <Input id='date_birth' type="text" disabled placeholder='date_birth*' onChange={this.actualizarDatos} value={this.state.date_birth}></Input><br />

            <label >Phone number:</label>
            <Input id='phone_number' type="text" disabled placeholder='phone_number*' onChange={this.actualizarDatos} value={this.state.phone_number}></Input><br />

            <label >Address:</label>
            <Input id='address' type="text" disabled placeholder='address*' onChange={this.actualizarDatos} value={this.state.address}></Input><br />

            <label >E-mail:</label>
            <Input id='email' type="text" disabled placeholder='email*' onChange={this.actualizarDatos} value={this.state.email}></Input><br />

            <label >Password:</label>
            <Input id='password' type="password" disabled placeholder='password*' onChange={this.actualizarDatos} value={this.state.password}></Input><br />

          </div>
        );

      case "delete":

        return (
          <div>
            <Button id='delete' onClick={this.deleteClient} >Confirm</Button>
          </div>
        );

      case "card":

          return (
            <div>
              {this.state.cards.map((x,i) => 
                <Card key={i}>
                <CardContent>
                  <Typography name={i}  gutterBottom>
                    credit card number: #{x.credit_card_number}
                  </Typography>
                  <Typography name={i}  gutterBottom>
                    Type: {x.type}
                  </Typography>
                  <Typography name={i.toString()}  gutterBottom>
                    Entity: {x.entity}
                  </Typography>      
                </CardContent>
                <IconButton color="inherit"  onClick={this.deleteCard(i)}>
                          <DeleteIcon />
                  </IconButton>
              </Card>)}
              <Card >
                <CardContent>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Credit card number"
                id={this.state.length}
                onChange={(x) => this.setState({newCard:{...this.state.newCard,credit_card_number:x.target.value}})}
              />
              <TextField
                fullWidth
                id="gender"
                select
                label="Type"
                value={this.state.newCard.type}
                onChange={(x) => this.setState({newCard:{...this.state.newCard,type:x.target.value}})}
                margin="normal"
                variant="outlined"
              >
                {type.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Entity"
                id={this.state.length}
                onChange={(x) => this.setState({newCard:{...this.state.newCard,entity:x.target.value}})}
              />
              <Button color="inherit"  onClick={this.addCard}>
                  <AddBoxIcon />
              </Button>
              </CardContent>
              </Card>
            </div>

          );
      default:
        break;
    }
  }

  render() {
    console.log(this.state)
    return (
      <div className='botons'>

        <Button onClick={() => this.setState({ tipo: "modify" })}>Modify information</Button><br />
        <Button onClick={() => this.setState({ tipo: "consult" })}>Consult information</Button><br />
        <Button onClick={() => this.setState({ tipo: "delete" })}>Delete profile</Button><br />
        <Button onClick={() => this.setState({ tipo: "card" })}>Add payment </Button><br />
        {this.cambioPagina()}
      </div>
    );
  }
}


const mapStateToProps= state => {
  return {
    username: getUsername(state)
  }
}

export default connect (mapStateToProps, {updateUsername,updateType})(Account);
 