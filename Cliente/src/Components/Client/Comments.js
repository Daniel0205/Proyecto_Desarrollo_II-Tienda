import React from 'react';
import {Typography, Divider, Grid,IconButton,Dialog,DialogContent,DialogContentText,DialogActions,Button} from '@material-ui/core';
import CommentIcon from '@material-ui/icons/Comment';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Rating from '@material-ui/lab/Rating';
import {getUsername} from '../../store/username/reducer'
import {connect} from 'react-redux'
import updateUsername from '../../store/username/action'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';

const styles = 
{
    boxes: {
        marginLeft:'5%'
    }
  };
class Comments extends React.Component {

    constructor(props) {
        super(props)
    
        this.state = {
          comments:[],
          myComments:[],
          dialogOpen: false
        }

        this.getComments();
        this.divideComments = this.divideComments.bind(this);
        this.myBoxes = this.myBoxes.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.deleteComment = this.deleteComment.bind(this)
        this.updateComment = this.updateComment.bind(this)
      }

    getComments(){

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
        this.divideComments(res)
      }
      )
 
    }

    divideComments(arr){
      let otherscomments = arr
      let mycom = [];

      for(let i = 0;i < otherscomments.length; i++){
        if(otherscomments[i].username === this.props.username){

          let deleted = otherscomments.splice(i,1);

          mycom = deleted;

          break;
        }
      }

      this.setState({
        comments: otherscomments,
        myComments: mycom
      })
    }

    handleClose(){
      this.setState({
        dialogOpen: false
      })
    }

    updateComment(){
      fetch ("/Critics/update", {
        method: 'PUT',
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({isbn:this.props.isbn,username:this.props.username})
      })
      .then(res=>res.json())
      .then(() => {
        this.getComments()
        this.setState({
          dialogOpen: false
        });
        this.props.activate();
      }
      )
    }

    deleteComment(){
      fetch ("/Critics/delete", {
        method: 'DELETE',
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({isbn:this.props.isbn,username:this.props.username})
      })
      .then(res=>res.json())
      .then(() => {
        this.getComments()
        this.setState({
          dialogOpen: false
        });
        this.forceUpdate();
      }
      )
    }

    myBoxes(){
      if(this.state.myComments.length > 0){

        return(
          
              <div style={styles.boxes}>
                  <Grid container justify='flex-start' alignItems="center">
                      <AccountCircleIcon color="action" fontSize="large"/>
                      <Typography variant="body1" gutterBottom>
                          {this.state.myComments[0].username} 
                      </Typography>
                  </Grid>
                  <Typography variant="body2" gutterBottom>
                      {this.state.myComments[0].comment} 
                  </Typography>
                  <Rating value={this.state.myComments[0].score} readOnly/>
                  <IconButton aria-label="Add a comment" >
                    <EditOutlinedIcon />
                  </IconButton>
                  <IconButton aria-label="Add a comment" onClick={()=>this.setState({dialogOpen:true})}>
                    <DeleteOutlineOutlinedIcon />
                  </IconButton>
                  <Divider variant="middle" />
              </div>
         
        );

        
      }
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


                {this.myBoxes()}


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

                <Dialog
                  open = {this.state.dialogOpen}
                  onClose={this.handleClose}
                  aria-labelledby="draggable-dialog-title"
                >
                <DialogContent>
                <DialogContentText>
                  Are you sure you want to delete this comment? 
                </DialogContentText>
                </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={this.deleteComment} color="primary">
                      Delete
                    </Button>
                  </DialogActions>
                </Dialog>
            </div>
        );
    }
  
}

const mapStateToProps= state => {
  return {
    username: getUsername(state)
  }
}

export default connect (mapStateToProps,{updateUsername})(Comments);