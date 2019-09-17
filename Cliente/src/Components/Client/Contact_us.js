import React from 'react';
import { Button } from '@material-ui/core'
import {getUsername} from '../../store/username/reducer'
import {connect} from 'react-redux'
import TextField from "@material-ui/core/TextField";


class Contact_us extends React.Component {

constructor(props){
  super(props);
  console.log(this.props)
  this.state={
    username: this.props.username,
    matter: '',
    description: '',
    solved: false
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
        solved: false
      },alert("send succesfully!"))
    }
    else{
      alert("Dont send succesfully!")
    }
  })
}


  render(){
    return (<div>
      <h1>Contact_us</h1>
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