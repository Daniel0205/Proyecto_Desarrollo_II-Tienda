import React from 'react';
import {connect} from 'react-redux';
import {getUsername} from '../../store/username/reducer';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});




export function createCard(list){
  
  console.log(list)

  return(<Card >
    <CardContent>
      <Typography  color="textSecondary" gutterBottom>
        Word of the Day
      </Typography>
      
    </CardContent>
  </Card>)
}



function Buy_list(props) {
  const classes = useStyles(); 

  fetch ("/bill/getBill", {
    method: 'POST',
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({username:props.username})
  })
  .then(res=>res.json())
  .then(res => {
    

    return (
      <div className='buy_list'>       
        <h1>buy list</h1>
        {createCard(res)}
      </div>);
  })
  

  
}


const mapStateToProps= state => {
  return {
    username: getUsername(state)
  }
}

export default connect (mapStateToProps)(Buy_list);