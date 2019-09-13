import React from 'react';
import BookCard from './BookCard';
import Details from './Details';
import {Grid} from "@material-ui/core";
import {connect} from 'react-redux';
import {getPoint} from '../../store/point/reducer';

class Store extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      selectedBook: false,
      itemNumber: null,
      book:[]
    }

    this.handleViewMore=this.handleViewMore.bind(this);
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
            <BookCard isbn={prove.isbn} title={prove.title} callback={this.handleViewMore.bind(this)} sypnosis={prove.sypnosis} image={prove.imagepath} price={prove.price}/>
          </Grid>
        ))}
        </Grid>
        {this.viewDetails()}
      </div>
      );
    }

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

    closeViewMore(){
      this.setState({
        selectedBook: false
      })
    }

    viewDetails () {
      console.log(this.state.itemNumber)
      if(this.state.selectedBook){
        return(
          <Details callback={this.closeViewMore.bind(this)} inf={this.state.book[this.state.itemNumber]} />
        )
      }
  
    }
  }

const mapStateToProps= state => {
  console.log( getPoint(state))
  return {
    dp: getPoint(state)
  }
}

export default connect (mapStateToProps)(Store);