import React from 'react';
import updateType from '../store/type/action'
import updateUsername from '../store/username/action'
import {connect} from 'react-redux'
import { Player } from 'video-react';



 class Greeting extends React.Component {
  constructor(props){
    super(props)

    this.props.updateType("init")
    this.props.updateUsername("")

  }

  render(){
    return (<div>
      <link
  rel="stylesheet"
  href="https://video-react.github.io/assets/video-react.css"
/>
        <Player
        playsInline
        autoPlay 
        loop
        src="http://localhost:3000/videos/Home.mp4" 
      />
      </div>);
  }
}

export default connect (null,{updateType,updateUsername})(Greeting); 