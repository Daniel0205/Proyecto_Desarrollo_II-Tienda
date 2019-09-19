import React from 'react';
import { Button } from '@material-ui/core'
import {getUsername} from '../../store/username/reducer'
import {connect} from 'react-redux'
import TextField from "@material-ui/core/TextField";
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarMesssages from '../../SnackbarMesssages';


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
        msj:'SEND SUCCESFULLY!',
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

          <TextField
              id='reason' 
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={(x)=>this.setState({matter:x.currentTarget.value})}
              value={this.state.matter}
              label="Matter"
            />
          <TextField
              id='msm' 
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={(x)=>this.setState({description:x.currentTarget.value})}
              value={this.state.description}
              label="Message"
            />
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