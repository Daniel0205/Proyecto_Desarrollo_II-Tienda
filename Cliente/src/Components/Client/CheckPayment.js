import React from 'react';
import {Card, CardContent, Typography, CardActions, Button, CardHeader,List, ListItem,Checkbox,ListItemText,ListItemIcon,TextField,InputAdornment} from '@material-ui/core';
import { Link } from 'react-router-dom'
/*
const styles = 
{
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9,
        marginTop:'30',
        paddingLeft: '10%'
    }
  };
*/
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
        type: 'C'
      },{
        username: 'dan',
        credit_card_number: '444',
        entity: 'VISA',
        type: 'D'
      }],
      used:[]
    }

    this.bringCards = this.bringCards.bind(this)
    this.withoutCards = this.withoutCards.bind(this)
    this.itsCredit = this.itsCredit.bind(this)
    this.add = this.add.bind(this)
    this.changePorcent =this.changePorcent.bind(this)
    this.getCards()
  }

  add = number => event =>{
    
    var aux= this.state.used ;
    
    if(event.target.checked){
      aux.push({
        credit_card_number:number,
        dues:1,
        porcent:0
      })
    }
    else{
      var aux1= this.state.used.findIndex((z)=>{
        return z.credit_card_number===number})
      aux.splice(aux1,1)
    }
    this.setState({used:aux})
  }

  getCards(){
    console.log('Cualquiera')
  }

  itsCredit(typ, number ){
    
    var aux= this.state.used.findIndex((z)=>{
    return z.credit_card_number===number})
    console.log(aux)
  
    if(typ==='C'){
      return(
        <TextField
          id="standard-number"
          label="Dues"
          type="number"
          margin="normal"
          defaultValue={1}
          disabled = {aux===-1}
          inputProps={{
            min: "0", max: "36", step: "1" 
          }}
          onChange={(e)=>{
            var aux1=this.state.used;
            aux1[aux].dues=e.target.value
            if(aux!==-1)this.setState({used:aux1})}}
        />
      )
      
    }else{
      return(
        <TextField
          id="standard-number"
          label="Dues"
          type="number"
          margin="normal"
          value= {1}
          disabled = {true}
        />
      )
    }
  }

  changePorcent = number => event=>{
    console.log(number)

    console.log(event)
    var aux= this.state.used.findIndex((z)=>{
      return z.credit_card_number===number})

    var aux1=this.state.used;
    aux1[aux].porcent=event.target.value

    if(aux!==-1)this.setState({used:aux1})
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
                  <ListItemText primary={card.credit_card_number} />
                  <ListItemText primary={card.entity} />
                  {this.itsCredit(card.type,card.credit_card_number)}
                  <TextField
                    id="standard-number"
                    label="Percent"
                    type="number"
                    margin="normal"
                    defaultValue={0}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">%</InputAdornment>,
                      min: "0", max: "100", step: "1" 
                    }}
                    onChange={this.changePorcent(card.credit_card_number)}
                  />
                  <ListItemIcon>
                    <Checkbox
                      edge="end"
                      color="primary"
                      onChange={this.add(card.credit_card_number)}
                    />
                  </ListItemIcon>
                </ListItem>
              ))}

            </List>
          </CardContent>
          <CardActions>
              <Button size="small" color="primary" onClick={() => {this.props.buy(this.state.used)}}>
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
        <h2>Total: {this.props.total}</h2>
        <button className="close" onClick={() => {this.props.callback()}}> X </button>
      </div>
    )
  }


  render(){      
    console.log(this.state)
      return (
        <div>
          {this.bringCards()}
        </div>
      );
    }

  }