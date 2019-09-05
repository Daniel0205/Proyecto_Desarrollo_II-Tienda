import React from 'react';
import BookCard from './BookCard';
import {Grid} from "@material-ui/core";


let proves  = [{
  title: 'Harry Potter',
  price: 25000,
  sypnosis: 'Un niño mago',
  image: 'images/lenna.jpg'
},{
  title: 'The hunger Games',
  price: 35000,
  sypnosis: 'Una chica que va a unos juegos',
  image: 'images/lenna.jpg'
},{
  title: 'The hunger Games',
  price: 35000,
  sypnosis: 'Una chica que va a unos juegos',
  image: 'images/lenna.jpg'
},{
  title: 'The hunger Games',
  price: 35000,
  sypnosis: 'Una chica que va a unos juegos',
  image: 'images/lenna.jpg'
},{
  title: 'The Maze Runner',
  price: 45000,
  sypnosis: 'Un chico que debe escapar de un laberinto',
  image: 'images/lenna.jpg'
}]



export default class Store extends React.Component {


  render(){      
      return (
      <div>
        <Grid container spacing={4} justify="center">
        {proves.map(prove => (
          <Grid item key={prove.title}>
            <BookCard title={prove.title} sypnosis={prove.sypnosis} image={prove.image} price={prove.price}/>
          </Grid>
        ))}
        </Grid>
      </div>
      );
    }
  }