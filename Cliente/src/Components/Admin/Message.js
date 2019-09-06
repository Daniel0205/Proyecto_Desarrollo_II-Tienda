import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

 class Message extends React.Component {

    constructor(props) {
    super(props);
    console.log(this.props)
    this.state = {
      id_message:this.props.id_message,
      username:'',
      description: '',
      solved: false,
  
    }

    this.obtenerMensaje = this.obtenerMensaje.bind(this);
    this.obtenerMensaje()
  }

  obtenerMensaje() {


    fetch("/Message/get", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id_message: this.state.id_message,
      })
    })
      .then(res => res.json())
      .then(res => {
        console.log(res[0])
        this.setState(res[0])
      })
  }

  render(){
    return (<div>
      <h1>Messages</h1>

      <Card>
        <CardContent>
        <Typography  color="textSecondary" gutterBottom>
          Mensaje enviado por ...
        </Typography>
        <Typography variant="h5" component="h2">
          Asunto del mensaje       
        </Typography>
        
        <Typography color="textSecondary">
          mensaje
        </Typography>

        <CardActions>
          <Button size="small" onClick={this.obtenerMensaje}>Read more</Button>
        </CardActions>
        </CardContent>
      </Card>

      </div>);
  }
}

export default (Message); 