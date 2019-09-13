import React from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

 class Message extends React.Component {

    constructor(props) {
    super(props);
    console.log(this.props)
    this.state = {
      id_message:this.props.id_message,
      username:'',
      description: '',
      matter: '',
      solved: false,
      mms: []
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
       
        this.setState({mms: res[0].Message})
      })

      console.log('Prueba: ..... ',this.state.mms)
  }

  handleClick(e){

    
  }

  render(){
    console.log(this.state)
    return (

      <div>

      {this.state.mms.map((msm,i) => (
          
        
        <Card key={i}>
        <CardContent>
          <Avatar aria-label="mes" background = "red">
          {msm.id_message}
          </Avatar>
        <Typography  color="textSecondary" gutterBottom>
          Send by ...
          {msm.username}
        </Typography>
        <Typography variant="h5" component="h2">
          
         {msm.matter}
        </Typography>
        
        <Typography color="textSecondary">
        {msm.description}
        </Typography>

        <Button basic color="primary">
            Solved
          </Button>
          <Button basic color="secondary">
            Decline
          </Button>

        </CardContent>
      </Card>

        ))}
        
      </div>);
  }
}

export default (Message); 