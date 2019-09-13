import React from 'react';

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
    console.log('Entra al componente')
  }


  render(){      
    console.log('Entra al componente')
      return (
        <div>
          <h2> Holiiii </h2>
          {this.bringCards()}
        </div>
      );
    }

  }