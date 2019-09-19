import React from 'react';
import { Button } from '@material-ui/core'
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
import DateFnsUtils from '@date-io/date-fns';
import format from "date-fns/format";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarMesssages from '../../SnackbarMesssages';
import { Redirect } from 'react-router-dom'
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

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

const IDType = [
  {
    value: 'CC',
    label: "Citizen's ID",
  },
  {
    value: 'TI',
    label: 'Identity card',
  },
  {
    value: 'RC',
    label: 'Civil registration',
  },
  {
    value: 'TP',
    label: 'Passport',
  },
];

const Gender = [
  {
    value: 'F',
    label: 'Female',
  },
  {
    value: 'M',
    label: 'Male',
  },
  {
    value: 'N',
    label: 'Undefined',
  },
];

const classes = 
{
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: "5px"
  },
};

class Account extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      username:this.props.username,
      first_name: '',
      last_name: '',
      date_birth: '2015-05-05',
      type_id: 'CC',
      id: '',
      gender: 'N',
      password: '',
      phone_number: '',
      address: '',
      email: '',
      State: true,
      cards:[],
      tipo: "inicio",
      newCard:{credit_card_number:'',type:'C',entity:''},
      msj:'',
      type:'',
      redirect:[]
    }

    this.modCliente = this.modCliente.bind(this);
    this.consultClient = this.consultClient.bind(this);
    this.deleteClient = this.deleteClient.bind(this);
    this.cambioPagina = this.cambioPagina.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
    this.addCard = this.addCard.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this)

    this.consultClient()
  }

  componentDidMount() {
    ValidatorForm.addValidationRule(
      "isValidName", (string) => /[a-zA-Z0-9 \u00E0-\u00FC]/g.test(string)
    );
    ValidatorForm.addValidationRule(
      "isValidLengthName", (string) => /\b[a-zA-Z0-9 \u00E0-\u00FC]{5,15}\b/g.test(string)
    );
    
    ValidatorForm.addValidationRule(
      "isValidLengthPassword", (string) => /\b[a-zA-Z0-9 \u00E0-\u00FC]{10,25}\b/g.test(string)
    );
    ValidatorForm.addValidationRule(
      "isValidLengthPhone", (string) => /\b[a-zA-Z0-9 \u00E0-\u00FC]{10}\b/g.test(string)
    );
    ValidatorForm.addValidationRule(
      "isValidPhone", (string) => /\b^([0-9]){5,15}\b/g.test(string)
    );
    ValidatorForm.addValidationRule(
      "isValidId", (string) => /^([0-9])*$/g.test(string)
    );
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
          this.setState({msj:'DATA UPDATED SUCCESSFULLY',type:'success'})
        }
        else {
          this.setState({msj:'ERROR UPDATING THE DATA',type:'error'})
        }
      }
      )
  }



  handleDateChange(date) {
    this.setState({date_birth:format(date, "yyyy-MM-dd")})

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
        if(res.bool){
          this.setState(res.datos[0])
        }
        else{
          this.setState({msj:'ERROR GETTING THE DATA',type:'error'})
        }
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
          this.setState({msj:'ACCOUNT DELETED SUCCESSFULLY!',type:'success'})
          
          setTimeout(() => {
            this.props.updateUsername("");
            this.props.updateType("init");
            this.setState({redirect:[<Redirect to="/Home" />]})
          }, 2000);

          

        }
        else {
          this.setState({msj:'ERROR WHEN DELETING ACCOUNT',type:'error'})
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
  
  getFields(){
    return (
      <div>
        <ValidatorForm className={classes.form}>
              {/*--First name--*/}
              <TextValidator
                variant="outlined"
                margin="normal"
                required
                fullWidth
                disabled={this.state.tipo==="consult"}
                label="First name"
                value={this.state.first_name}
                id="firstname"
                name="first_name"
                onChange={(x) =>  this.setState({first_name: x.target.value})}
                validators={["required", "isValidName", "isValidLengthName"]}
                errorMessages={["Please fill out  this field", "Invalid format!", "Invalid lentgth!"]}
              />

              {/*--Last name--*/}
              <TextValidator
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Last name"
                disabled={this.state.tipo==="consult"}
                value={this.state.last_name}
                id="lastname"
                name='last_name'
                onChange={(x) =>  this.setState({last_name: x.target.value})}
                validators={["required", "isValidName", "isValidLengthName"]}
                errorMessages={["Please fill out  this field", "Invalid format!", "Invalid lentgth!"]}
              />

              {/*--Password--*/}
              <TextValidator
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Password"
                disabled={this.state.tipo==="consult"}
                value={this.state.password}
                id="password"
                name="password"
                type="password"
                onChange={(x) =>  this.setState({password: x.target.value})}
                validators={["required", "isValidName", "isValidLengthPassword"]}
                errorMessages={["Please fill out  this field", "Invalid format!", "Invalid lentgth!"]}
              />

              {/*--Phone number--*/}
              <TextValidator
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Phone number"
                disabled={this.state.tipo==="consult"}
                value={this.state.phone_number}
                id="phonenumber"
                name='phone_number'
                onChange={(x) =>  this.setState({phone_number: x.target.value})}
                validators={["required", "isValidPhone", "isValidLengthPhone"]}
                errorMessages={["Please fill out  this field", "Invalid format!", "Invalid lentgth!"]}
              />

              {/*--Address--*/}
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Address"
                disabled={this.state.tipo==="consult"}
                value={this.state.address}
                id="address"
                name='address'
                onChange={(x) =>  this.setState({address: x.target.value})}
              />

              {/*--Type id--*/}
              <TextField
                id="outlined-select-currency"
                select
                fullWidth
                label="ID type"
                disabled={this.state.tipo==="consult"}
                value={this.state.type_id}
                onChange={(x) =>  this.setState({type_id: x.target.value})}
                margin="normal"
                variant="outlined"
              >
                {IDType.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              {/*--Identification number--*/}
              <TextValidator
                required
                fullWidth
                variant="outlined"
                margin="normal"
                disabled={this.state.tipo==="consult"}
                label="Identification"
                value={this.state.id}
                id="identification"
                name='id'
                onChange={(x) =>  this.setState({id: x.target.value})}
                validators={["required", "isValidId"]}
                errorMessages={["Please fill out  this field", "Invalid format!"]}
              />

              {/*--E-mail--*/}
              <TextValidator
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="E-mail"
                value={this.state.email}
                disabled={this.state.tipo==="consult"}
                id="outlined-email-input"
                type="email"
                name="email"
                onChange={(x) =>  this.setState({email: x.target.value})}
                validators={['required', 'isEmail']}
                errorMessages={['this field is required', 'email is not valid']}
              //error
              //id="outlined-error" // para resaltar error
              />

              {/*--Date birth--*/}
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  fullWidth
                  margin="normal"
                  id="date-picker-dialog"
                  label="Date birth"
                  format="yyyy-MM-dd"
                  disabled={this.state.tipo==="consult"}
                  value={this.state.date_birth}
                  onChange={this.handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>

              {/*--Gender--*/}
              <TextField
                fullWidth
                id="gender"
                select
                label="Gender"
                value={this.state.gender}
                disabled={this.state.tipo==="consult"}
                onChange={(x) =>  this.setState({gender: x.target.value})}
                margin="normal"
                variant="outlined"
              >
                {Gender.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
        </ValidatorForm>
      </div>


    )
  }


  cambioPagina(e) {

    switch (this.state.tipo) {

      case "modify":
        return (
          <div>
            <hr/>
            <h1>Edit your information:</h1>
              {this.getFields()}
              <Button id='modify' onClick={this.modCliente} >Edit</Button>
          </div>
        );


      case "consult":

        return (
          <div>
            <hr/>
            {this.getFields()}
          </div>
        );

      case "delete":

        return (
          <div>
            <hr/>
            <Button id='delete' onClick={this.deleteClient} >Confirm</Button>
          </div>
        );

      case "card":

          return (
            <div>
              <hr/>

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
      <div className='botns'>
        {this.state.redirect}
          <Snackbar
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}
              open={this.state.msj!==''}
              autoHideDuration={3000} //opcional
          >
              <SnackbarMesssages
                  variant={this.state.type}
                  onClose={()=>this.setState({msj:''})}
                  message={this.state.msj} />
          </Snackbar>

        <h1>Account</h1>
        <Button onClick={() => this.setState({ tipo: "modify" })}>MODIFY INFORMATION</Button><br />
        <Button onClick={() => this.setState({ tipo: "consult" })}>CONSULT INFORMATION</Button><br />
        <Button onClick={() => this.setState({ tipo: "delete" })}>DELETE PROFILE</Button><br />
        <Button onClick={() => this.setState({ tipo: "card" })}>ADD PAYMENT</Button><br />
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
 