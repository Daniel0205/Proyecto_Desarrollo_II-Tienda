import React from 'react';
import {connect} from 'react-redux';
import {getUsername} from '../../store/username/reducer';


class Buy_list extends React.Component {
  constructor(props){
    super(props)

    this.getBuys = this.getBuys.bind(this);
    this.getBuys()
  }

  getBuys(){
    fetch ("/bill/getBill", {
      method: 'POST',
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({username:this.props.username})
    })
    .then(res=>res.json())
    .then(res => {
      console.log(res)
    })
    
  }

  render(){      
    return (
    <div className='buy_list'>       
      <h1>buy list</h1>
    </div>);
  }
}


const mapStateToProps= state => {
  return {
    username: getUsername(state)
  }
}

export default connect (mapStateToProps)(Buy_list);