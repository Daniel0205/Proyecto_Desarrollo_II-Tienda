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
            <TableCell align="right">Subcategory</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Distribution Point</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Total Price</TableCell> 
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row,i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.isbn}</TableCell>
              <TableCell align="right">{row.name_subcategory}</TableCell>
              <TableCell align="right">{row.bill_book.quantity}</TableCell>
              <TableCell align="right">{row.bill_book.name_dp}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.price*row.bill_book.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

function createTable2(rows){
  return (
    <Paper>
      <Table >
        <TableHead>
          <TableRow>
            <TableCell>Credit Card Number</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Entity</TableCell>
            <TableCell align="right">Due</TableCell>
            <TableCell align="right">Percentage paid</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row,i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row">
                {row.credit_card_number}
              </TableCell>
              <TableCell align="right">{row.type}</TableCell>
              <TableCell align="right">{row.entity}</TableCell>
              <TableCell align="right">{row.bill_card.dues}</TableCell>
              <TableCell align="right">{row.bill_card.porcent}%</TableCell>
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
      <Typography  component="h2" gutterBottom>
        Bill #{x.id_bill}
      </Typography>
      <Typography  component="h2" gutterBottom>
        User : {x.cards[0].username}
      </Typography>
      <Typography  color="textSecondary" gutterBottom>
        Date: {x.date}
      </Typography>
      {createTable(x.books)}
      <Typography  color="textSecondary" gutterBottom>
      Payment methods used:
      </Typography>      
      {createTable2(x.cards)}      
    </CardContent>
  </Card>))
}


function Bill(props) {
  
  
  console.log(props.username)

  const [list,setList]=useState([]);
  
  fetch ("/bill/getBills", {
    method: 'GET',
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

export default connect (mapStateToProps)(Bill);