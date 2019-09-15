import React from 'react';
import {Card, CardContent, Typography, CardActions, Button, CardHeader,List, ListItem,Checkbox,ListItemText,ListItemIcon,TextField,InputAdornment} from '@material-ui/core';
import { Link } from 'react-router-dom'

const styles = 
{
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9,
        marginTop:'30',
        paddingLeft: '10%'
    }
  };

export default class CheckPayment extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      selectedBook: false,
      itemNumber: null,
      cards: [{
        username: 'dan',
        credit_card_number: '333',
        entity: 'VISA',
        type: 'D'
      },{
        username: 'dan',
        credit_card_number: '444',
        entity: 'VISA',
        type: 'C'
      }]
    }

    this.bringCards = this.bringCards.bind(this)
    this.withoutCards = this.withoutCards.bind(this)
    this.itsCredit = this.itsCredit.bind(this)
    
    this.getCards()
  }

  getCards(){
    console.log('Cualquiera')
  }

  itsCredit(typ){
    if(typ==='C'){
      return(
        <TextField
          id="standard-number"
          label="Dues"
          type="number"
          margin="normal"
          inputProps={{
            min: "0", max: "100", step: "1" 
          }}
        />
      )
      
    }else{
      return(
        <TextField
          id="standard-number"
          label="Dues"
          type="number"
          margin="normal"
          inputProps={{
            min: "0", max: "100", step: "1" 
          }}
          value= {1}
          disabled = {true}
        />
      )
    }
  }

  bringCards(){
    return(
      <div className="Details">
        <Card className="card">
          <CardHeader 
            title="Payment configuration"
          />
          <CardContent>
            <List dense>

              {this.state.cards.map(( card,i) => (
                <ListItem key={i}>
                  <ListItemText primary={card.entity} />
                  <ListItemText primary={card.credit_card_number} />
                  {this.itsCredit(card.type)}
                  <TextField
                    id="standard-number"
                    label="Percent"
                    type="number"
                    margin="normal"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">%</InputAdornment>,
                    }}
                    inputProps={{
                      min: "0", max: "100", step: "1" 
                    }}
                  />
                  <ListItemIcon>
                    <Checkbox
                      edge="end"
                      color="primary"
                    />
                  </ListItemIcon>
                </ListItem>
              ))}

            </List>
          </CardContent>
          <CardActions>
              <Button size="small" color="primary" component={Link} to="/User_page/account">
                  Buy
              </Button>
              <Button size="small" color="primary" onClick={() => {this.props.callback()}}>
                  Cancel
              </Button>
          </CardActions>
        </Card>
        <button className="close" onClick={() => {this.props.callback()}}> X </button>
      </div>
    )
  }

  withoutCards(){
    return(
      <div className="Details">
        <Card className="card">
          <CardContent>
            <Typography gutterBottom variant="h5" component="h4">
              Ooops! It looks like you haven't added a card yet 
            </Typography>
            <Typography gutterBottom variant="h6" component="h6">
              Click on "Add card" to configure a payment method 
            </Typography>
          </CardContent>
          <CardActions>
              <Button size="small" color="primary" component={Link} to="/User_page/account">
                  Add card
              </Button>
              <Button size="small" color="primary" onClick={() => {this.props.callback()}}>
                  Cancel
              </Button>
          </CardActions>
        </Card>
        <button className="close" onClick={() => {this.props.callback()}}> X </button>
      </div>
    )
  }


  render(){      
      return (
        <div>
          {this.bringCards()}
        </div>
      );
    }

  }