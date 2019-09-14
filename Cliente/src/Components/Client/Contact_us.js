import React from 'react';
import { Button, Input } from '@material-ui/core'
import {getUsername} from '../../store/username/reducer'
import {connect} from 'react-redux'


class Contact_us extends React.Component {

constructor(props){
  super(props);
  console.log(this.props)
  this.state={
    username: this.props.username,
    matter: this.props.matter,
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
    console.log(res)
    this.setState(res[0])
  })

  alert("send succesfully!")
}


  render(){
    return (<div>
      <h1>Contact_us</h1>
      <Input id='reason' onChange={(x)=>this.setState({matter:x.currentTarget.value})}type="text" placeholder='matter*' fullWidth></Input><br />
            <Input id='msm' onChange={(x)=>this.setState({description:x.currentTarget.value})}type="text" placeholder='message*' fullWidth></Input><br />
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