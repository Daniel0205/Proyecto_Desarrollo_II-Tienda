import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Card, CardActions, CardMedia, CardContent, Typography, Button, CardActionArea} from '@material-ui/core';
import {IconButton} from '@material-ui/core';
import AddCommentRoundedIcon from '@material-ui/icons/AddCommentRounded';
import AddShoppingCartRoundedIcon from '@material-ui/icons/AddShoppingCartRounded';
import { Redirect } from 'react-router-dom'
import {getType} from '../../store/type/reducer'
import {connect} from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarMesssages from '../../SnackbarMesssages';


const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 300,
    marginTop: 20,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  button: {
    marginLeft: 100,
  },
  price: {
    color: 'red',
  },
}));

 function BookCard(props) {
  const [open, setOpen] = React.useState(false);
  const [msj, setMsj] = React.useState(false);


  const classes = useStyles();
  let path = "http://localhost:3001/"+ props.image;


  console.log(props)

  function setRedirect() {
    if(props.type==="init"){
      setMsj(true)
      setTimeout(() => setOpen(true), 2000);
    }
    else  props.car(props.isbn)
  }

  function setRedirect2() {
    if(props.type==="init"){
      setMsj(true)
      setTimeout(() => setOpen(true), 2000);
    }
    else  props.addComent(props.isbn)
  }


  function renderRedirect() {
    if (open) {
      return <Redirect to='/login' />
    }
  }

  return (
    <div> 
      <Snackbar
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}
              open={msj}
              autoHideDuration={3000} //opcional
          >
              <SnackbarMesssages
                  variant="info"
                  message="DEBES INGRESAR A TU CUENTA ANTES!" />
          </Snackbar>

      {renderRedirect()}
    <Card className={classes.card}>
      <CardActionArea onClick={() => {props.callback(props.isbn)}}>
        <CardMedia
          className={classes.media}
          image={path}
          title="Book's cover"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h4">
            {props.title}
          </Typography>
          <Typography className={classes.price} gutterBottom variant="h6" color="primary" component="h6">
            $ {props.price}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.synopsis}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <IconButton aria-label="Add to cart" onClick={setRedirect}>
          <AddShoppingCartRoundedIcon />
        </IconButton>
        <IconButton aria-label="Add a comment"  onClick={setRedirect2}>
          <AddCommentRoundedIcon />
        </IconButton>
        <Button size="small" onClick={()=>props.callback(props.isbn)} color="primary" className={classes.button}>
          Details
        </Button>
      </CardActions>
    </Card>
    </div>

  );
}

const mapStateToProps= state => {
  return {
    type: getType(state)
  }
}

export default connect (mapStateToProps)(BookCard);