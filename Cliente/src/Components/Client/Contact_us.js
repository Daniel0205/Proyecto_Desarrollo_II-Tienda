import React from 'react';
import { Button } from '@material-ui/core'
import {getUsername} from '../../store/username/reducer'
import {connect} from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarMesssages from '../../SnackbarMesssages';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";


class Contact_us extends React.Component {

constructor(props){
  super(props);
  console.log(this.props)
  this.state={
    username: this.props.username,
    matter: '',
    description: '',
    solved: false,
    msj:'',
    type:''
  }

  this.mensaje = this.mensaje.bind(this);
}

componentDidMount() {
  ValidatorForm.addValidationRule(
    "isValidOpinion", (string) => /[a-zA-Z0-9 \u00E0-\u00FC]/g.test(string)
  );
  ValidatorForm.addValidationRule(
    "isValidLengthMatter", (string) => /\b[a-zA-Z0-9 \u00E0-\u00FC]{4,20}\b/g.test(string)
  );
  ValidatorForm.addValidationRule(
    "isValidLengthMessage", (string) => /\b[a-zA-Z0-9 \u00E0-\u00FC]{4,2000}\b/g.test(string)
  );
}

mensaje(){
  console.log(this.state)
  fetch("/Message/send", {
    method: "POST",
    headers:{
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: this.props.username,
      description: this.state.description,
      matter: this.state.matter,
      solved: false
    })
  })

  .then(res => res.json())
  .then(res => {
    if(res[0]){
      this.setState({
        matter: '',
        description: '',
        solved: false,
        msj:'THE ANSWER WILL BE SENT TO YOUR E-MAIL!',
        type:"success"
      })
    }
    else{
      this.setState({
        matter: '',
        description: '',
        solved: false,
        msj:'DONT SEND SUCCESFULLY!',
        type:"error"
      })
    }
  })
}


  render(){
    return (<div>
      <h1>Contact_us</h1>
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

          <ValidatorForm>
            <TextValidator
                id='reason' 
                variant="outlined"
                margin="normal"
                required
                fullWidth
                onChange={(x)=>this.setState({matter:x.currentTarget.value})}
                value={this.state.matter}
                label="Matter"
                validators={["required", "isValidOpinion", "isValidLengthMatter"]}
                errorMessages={["Please fill out  this field", "Invalid format!", "Invalid lentgth!"]}
              />
            <TextValidator
                id='msm' 
                variant="outlined"
                margin="normal"
                required
                fullWidth
                onChange={(x)=>this.setState({description:x.currentTarget.value})}
                value={this.state.description}
                label="Message"
                validators={["required", "isValidOpinion", "isValidLengthMessage"]}
                errorMessages={["Please fill out  this field", "Invalid format!", "Invalid lentgth!"]}
              />
          </ValidatorForm>

          
          <Button id='send' fullWidth onClick={this.mensaje} color="primary">Send</Button>
      </div>);
  } 
}


const mapStateToProps= state => {
  return {
    username: getUsername(state)
  }
}

export default connect (mapStateToProps)(Contact_us);