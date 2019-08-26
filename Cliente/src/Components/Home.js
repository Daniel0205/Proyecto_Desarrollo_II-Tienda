import React from 'react';
import updateType from '../store/type/action'
import updateUsername from '../store/username/action'
import {connect} from 'react-redux'

 class Greeting extends React.Component {
  constructor(props){
    super(props)

    this.props.updateType("init")
    this.props.updateUsername("")

  }

  render(){
    return (<div>
      <h1>Home</h1>
      </div>);
  }
}

export default connect (null,{updateType,updateUsername})(Greeting); 