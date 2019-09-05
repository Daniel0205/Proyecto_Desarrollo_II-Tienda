import React, { useState } from 'react';
import {connect} from 'react-redux';
import {getUsername} from '../../store/username/reducer';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';



function createTable(rows){
  return (
    <Paper>
      <Table >
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">ISBN</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Distribution Point</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row,i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.isbn}</TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">{row.name_dp}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

function createCard(list){
  
  console.log(list)

  return(list.map((x,i)=>
  <Card key={i}>
    <CardContent>
      <Typography  color="textSecondary" gutterBottom>
        Bill #{x.id_bill}
      </Typography>
      <Typography  color="textSecondary" gutterBottom>
        Date: {x.date}
      </Typography>
      {createTable(x.products)}      
    </CardContent>
  </Card>))
}


function Buy_list(props) {
  
  
  console.log(props.username)

  const [list,setList]=useState([]);
  
  fetch ("/bill/getBill", {
    method: 'POST',
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({username:props.username})
  })
  .then(res=>res.json())
  .then(res => { if(list.length===0)setList(res) })

  return (
    <div className='buy_list'>       
      <h1>buy list</h1>
      {createCard(list)}
    </div>);
  

  
}


const mapStateToProps= state => {
  return {
    username: getUsername(state)
  }
}

export default connect (mapStateToProps)(Buy_list);