import React from 'react';
import BookCard from './BookCard';
import AddComment from './AddComment';
import Details from './Details';
import {Grid} from "@material-ui/core";
import {connect} from 'react-redux';
import {getPoint} from '../../store/point/reducer';
import {getCar} from '../../store/shopping_car/reducer';
import updateCar from '../../store/shopping_car/action';

class Store extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      selectedBook: false,
      itemNumber: null,
      book:[],
      acomment: false,
      isbn: null
    }

    this.handleViewMore=this.handleViewMore.bind(this);
    this.handleAddComment=this.handleAddComment.bind(this);
    this.closeAddComment=this.closeAddComment.bind(this);
    this.viewAddComment=this.viewAddComment.bind(this);
    this.getBook=this.getBook.bind(this);
    this.getBook()

  }

  getBook(){ 
    console.log(this.props.dp)
    fetch ("/Book/getAll", {
      method: 'POST',
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({dp:this.props.dp})
    })
    .then(res=>res.json())
    .then(res => {
      if(res.bool)this.setState({book:res.book})}
    )
  }




  render(){     
    console.log(this.state) 
      return (
      <div>
        <Grid container spacing={4} justify="center">
        {this.state.book.map(prove => (
          <Grid item key={prove.isbn}>
            <BookCard isbn={prove.isbn} title={prove.title} callback={this.handleViewMore.bind(this)} 
            car={this.addCar.bind(this)}  synopsis={prove.synopsis} image={prove.imagepath} price={prove.price} addComent={this.handleAddComment.bind(this)}/>
          </Grid>
        ))}
        </Grid>
        {this.viewDetails()}
        {this.viewAddComment()}
      </div>
      );
  }

  //-----------To manage Cart---------

  addCar(identifier){
    var aux = this.state.book.find(x=>{
      return x.isbn===identifier
    })

    var aux1=this.props.car
    aux1.push({
      isbn:identifier,
      title:aux.title,
      quantity:1,
      distribution_point:aux.inventories[0].name_dp,
      limit:aux.inventories[0].availability,
      price:aux.price
  })
  console.log(this.state)
  console.log(aux)

    this.props.updateCar(aux1)
    
  }

 //-----------To manage the details of a book---------

  handleViewMore (identifier) {
    console.log(identifier)

    for(var i=0 ; i< this.state.book.length ; i++){
    
      if(identifier === this.state.book[i].isbn){    
        this.setState({   
          selectedBook: true,                
          itemNumber: i              
        })            
      }        
    }

  }

  viewDetails () {
    if(this.state.selectedBook){
      return(
        <Details callback={this.closeViewMore.bind(this)} inf={this.state.book[this.state.itemNumber]} />
      )
    }
  }

  closeViewMore(){
    this.setState({
      selectedBook: false
    })
  }

   //-----------To add a comment of a book---------

  handleAddComment(identifier){
    this.setState({   
      acomment: true,
      isbn: identifier                            
    }) 
  }

  viewAddComment(){
    if(this.state.acomment){
      return(<AddComment closing={this.closeAddComment.bind(this)} st="Coment" isbn={this.state.isbn}/>)
    }
  }



  closeAddComment(){
    this.setState({   
      acomment: false,                            
    }) 
  }
}

const mapStateToProps= state => {
  console.log( getPoint(state))
  return {
    dp: getPoint(state),
    car: getCar(state),
  }
}



export default connect (mapStateToProps,{updateCar})(Store);