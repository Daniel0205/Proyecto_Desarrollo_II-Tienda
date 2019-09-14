import React from 'react';
import {Card, CardContent, Typography, CardActions, Button} from '@material-ui/core';
import { Link } from 'react-router-dom'

const styles = 
{
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9,
        marginTop:'30',
        paddingLeft: '10%'
    },
    imag: {
        width: '9.62cm',
        height: '12.48cm',
    },
    ima: {
        width: '11cm',
        height: '13cm',
        float: 'left',
        position: 'relative',
    },
    con: {
        float: 'right',
        position: 'relative',
        width: '14cm',
    }
  };

export default class CheckPayment extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      selectedBook: false,
      itemNumber: null,
    }

    this.bringCards = this.bringCards.bind(this)
  }

  bringCards(){
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