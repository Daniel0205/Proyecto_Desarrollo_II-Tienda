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
          comments:[{
            username: 'dan',
            isbn: 9788422626114,
            comment: 'No me gusto',
            score: 2
          },{
            username: 'jonpe',
            isbn: 9788431326968,
            comment:'Me gusto',
            score:5
          },{
            username: 'helat',
            isbn: 9789707290624,
            comment: 'Me gusto',
            score: 4
          }]
        }

        alert(props.isbn);
    
      }

    render(){

        return(
            <div>
                <Grid container justify="left" alignItems="center">
                    <CommentIcon color="action" fontSize="large"/>
                    <Typography variant="h6" gutterBottom>
                           Comments 
                    </Typography>
                </Grid> <br/>

                {this.state.comments.map( (comt,i ) => (
                    <div style={styles.boxes} key={i}>
                        <Grid container justify="left" alignItems="center">
                            <AccountCircleIcon color="action" fontSize="medium"/>
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