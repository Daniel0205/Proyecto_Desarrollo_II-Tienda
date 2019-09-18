import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {Button} from '@material-ui/core';
import {connect} from 'react-redux';
import {getCar} from '../../store/shopping_car/reducer';
import {getUsername} from '../../store/username/reducer';
import {getBirthday} from '../../store/birthday/reducer';
import updateCar from '../../store/shopping_car/action';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import CheckPayment from './CheckPayment';
import TextField from "@material-ui/core/TextField";


class Shopping_car extends React.Component {
  constructor(props){
    super(props)
    var discount=0
    console.log(this.props)

    if(this.props.birthday)discount=30

    this.state={
      activate: false,
      total:0,
      discount:discount
    }

    this.update= this.update.bind(this);
    this.delete= this.delete.bind(this);
    this.buy= this.buy.bind(this);
    this.showCar= this.showCar.bind(this);
    this.payment= this.payment.bind(this);
    this.closePayment= this.closePayment.bind(this);
    this.act = this.act.bind(this)
    this.calculateTotal = this.calculateTotal.bind(this); 
    this.doBuy = this.doBuy.bind(this); 
    this.discount = this.discount.bind(this); 
  }

  componentDidMount(){
    this.calculateTotal()
  }

  doBuy(e){
    console.log(e)
    console.log(this.state)

    fetch ("/Bill/buy", {
      method: 'POST',
      headers: {
        Accept: "application/json, text/plain, * /*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username:this.props.username,
        discount:this.state.discount,
        books:this.props.car.map((z)=>{
          console.log(z)
          return({
              isbn:z.isbn,
              name_dp:z.distribution_point,
              quantity:z.quantity
          })
        }),
        cards:e
      })
    })
    .then(res => res.json())
    .then(res => {
      if(res.bool){
        console.log(res)
        this.props.updateCar([])
        this.forceUpdate();
      }
      else{
        console.log("NO entro")
      }
    });
  }

  calculateTotal(){
    var total = 0
    for (let i = 0; i < this.props.car.length; i++) {
      total+=this.props.car[i].price*this.props.car[i].quantity
    }
    this.setState({total:total})
  }

  buy(){

    this.setState({   
      activate: true            
    })
  }

  payment(){
    return(
      <CheckPayment />
    );
  }


  update(event){
    var aux=this.props.car
    
    aux[event.target.name].quantity=parseInt(event.target.value);
    
    this.props.updateCar(aux)
    this.calculateTotal()
    
  }

  delete(event){
    var aux=this.props.car
    
    aux.splice(event.target.name,1)
    console.log(aux)
    this.props.updateCar(aux)
    this.calculateTotal()
    this.forceUpdate();
  } 

  act(){
    if(this.state.activate){
      return(
        <CheckPayment callback={this.closePayment.bind(this)} 
        total={this.state.total+this.state.total*0.16-this.state.total*(this.state.discount/100)} buy={this.doBuy} />
      )
    }
  }

  closePayment(){
    this.setState({
      activate: false
    })
  }

  discount(){
    if(this.state.discount!==0) return <h2>Happy Birthday! You have a 30% discount on purchases this day! </h2>
  }
  
  showCar(){
   
    if(this.props.car.length!==0){
      
      return(
        <div>
          <h1>Shopping Car</h1>
          {this.discount()}
          {this.props.car.map( (x,i)=>
                    <Card key={i} >
                      <CardContent>
                        <Typography  color="textSecondary" gutterBottom>
                          Isbn:{x.isbn}
                        </Typography>
                        <Typography variant="h5" component="h2">
                          {x.title}
                        </Typography>
                        <Typography  color="textSecondary" gutterBottom>
                          Distribution Point: {x.distribution_point}
                        </Typography>
                        <Typography  color="textSecondary" gutterBottom>
                          Quantity Available: {x.limit}
                        </Typography>
                        <Typography>
                          Quantity:
                        </Typography>
                        <TextField
                          name={i.toString()}  
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          type="number"
                          inputProps={{min:"1",max:x.limit}}  
                          label="Quantity"
                          onChange={this.update} 
                          defaultValue={x.quantity}
                        />
                        
                      </CardContent>
                      <IconButton color="inherit" onClick={this.delete}>
                          <DeleteIcon />
                      </IconButton>
                    </Card>  
                    )}
            <h2>Subtotal: {this.state.total}</h2>
            <h2>IVA: 16%</h2>
            <h2>Discount: {this.state.discount}%</h2>
            <h1>Total: ${this.state.total+this.state.total*0.16-this.state.total*(this.state.discount/100)}</h1>
            <Button key="boton" onClick={this.buy}>To buy</Button>
            {this.act()}
        </div>
      )
    }
    else return (<p>You have no items in your shopping cart</p>)
  }

  render(){ 
    console.log(this.state)     
    return (
    <div>
      {this.showCar()}
    </div>);
  } 
}


const mapStateToProps= state => {
  return {
    car: getCar(state),
    username: getUsername(state),
    birthday:getBirthday(state)
  }
}


export default connect (mapStateToProps,{updateCar})(Shopping_car);


