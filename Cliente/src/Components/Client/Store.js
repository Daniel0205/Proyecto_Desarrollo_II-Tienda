import React from 'react';
import BookCard from './BookCard';
import Details from './Details';
import {Grid} from "@material-ui/core";


let proves  = [{
  isbn: 12345,
  title: 'Harry Potter',
  price: 25000,
  sypnosis: 'Un niño mago',
  image: 'images/lenna.jpg'
},{
  isbn: 13345,
  title: 'The hunger Games',
  price: 35000,
  sypnosis: 'Una chica que va a unos juegos',
  image: 'images/lenna.jpg'
},{
  isbn: 12445,
  title: 'The hunger Games',
  price: 35000,
  sypnosis: 'Una chica que va a unos juegos',
  image: 'images/9789588843056.jpg'
},{
  isbn: 12335,
  title: 'The hunger Games',
  price: 35000,
  sypnosis: 'Una chica que va a unos juegos',
  image: 'images/lenna.jpg'
},{
  isbn: 12356,
  title: 'The Maze Runner',
  price: 45000,
  sypnosis: 'Un chico que debe escapar de un laberinto',
  image: 'images/lenna.jpg'
}]



export default class Store extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      selectedBook: false,
      itemNumber: null,
    }

    this.handleViewMore=this.handleViewMore.bind(this);
  }


  render(){      
      return (
      <div>
        <Grid container spacing={4} justify="center">
        {proves.map(prove => (
          <Grid item key={prove.isbn}>
            <BookCard isbn={prove.isbn} title={prove.title} callback={this.handleViewMore.bind(this)} sypnosis={prove.sypnosis} image={prove.image} price={prove.price}/>
          </Grid>
        ))}
        </Grid>
        {this.viewDetails()}
      </div>
      );
    }

    handleViewMore (identifier) {

      for(var i=0 ; i< proves.length ; i++){
      
        if(identifier === proves[i].isbn){    
          this.setState({   
            selectedBook: true,                
            itemNumber: i              
          })            
        }        
      }

    }

    closeViewMore(){
      this.setState({
        selectedBook: false
      })
    }

    viewDetails () {
      console.log(this.state.itemNumber)
      if(this.state.selectedBook){
        return(
          <Details callback={this.closeViewMore.bind(this)} inf={proves[this.state.itemNumber]} />
        )
      }
  
    }
  }