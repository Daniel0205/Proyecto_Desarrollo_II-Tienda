import React from 'react';
import updateType from '../store/type/action'
import updateUsername from '../store/username/action'
import {connect} from 'react-redux'
import Store from './Client/Store';



 class Greeting extends React.Component {
  constructor(props){
    super(props)

    this.props.updateType("init")
    this.props.updateUsername("")

  }

  render(){

    return (
    <div>
      <h1 >Darko Store</h1>
      <Store/>
    </div>);
  }
}

export default connect (null,{updateType,updateUsername})(Greeting); 