import React from 'react';
import updateType from '../store/type/action'
import updateUsername from '../store/username/action'
import { connect } from 'react-redux'
import Store from './Client/Store';
import Logo from "../Images/logo.png";

class Greeting extends React.Component {
  constructor(props) {
    super(props)

    this.props.updateType("init")
    this.props.updateUsername("")

  }

  render() {

    return (
      <div id="home"><br/>
        <img src={Logo} align='center' alt=''  classes={{
    justifyContent: 'center',
    alignItems: 'center',
  }}/>
        <Store />
      </div>);
  }
}

export default connect(null, { updateType, updateUsername })(Greeting); 