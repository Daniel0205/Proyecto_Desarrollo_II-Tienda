import React from 'react';
import {Typography, Divider, Grid} from '@material-ui/core';
import CommentIcon from '@material-ui/icons/Comment';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Rating from '@material-ui/lab/Rating';

const styles = 
{
    boxes: {
        marginLeft:'5%'
    }
  };
export default class Comments extends React.Component {

    constructor(props) {
        super(props)
    
        this.state = {
          comments:[]
        }

        this.getComments();
      }

    getComments(){

      console.log(this.props.isbn);

      fetch ("/Critics/get", {
        method: 'POST',
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({isbn:this.props.isbn})
      })
      .then(res=>res.json())
      .then(res => {
        this.setState({comments:res})}
      )

    }

    render(){
      console.log(this.state);
        return(
            <div>
                <Grid container justify="flex-start" alignItems="center">
                    <CommentIcon color="action" fontSize="large"/>
                    <Typography variant="h6" gutterBottom>
                           Comments 
                    </Typography>
                </Grid> <br/>

                {this.state.comments.map( (comt,i ) => (
                    <div style={styles.boxes} key={i}>
                        <Grid container justify='flex-start' alignItems="center">
                            <AccountCircleIcon color="action" fontSize="large"/>
                            <Typography variant="body1" gutterBottom>
                                {comt.username} 
                            </Typography>
                        </Grid>
                        <Typography variant="body2" gutterBottom>
                            {comt.comment} 
                        </Typography>
                        <Rating value={comt.score} readOnly/>
                        <Divider variant="middle" />
                    </div>
                ))}
 
            </div>
        );
    }
  
}