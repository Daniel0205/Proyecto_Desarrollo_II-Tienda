import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Card, CardActions, CardMedia, CardContent, Typography, Button, CardActionArea} from '@material-ui/core';
import {IconButton} from '@material-ui/core';
import AddCommentRoundedIcon from '@material-ui/icons/AddCommentRounded';
import AddShoppingCartRoundedIcon from '@material-ui/icons/AddShoppingCartRounded';

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
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
}));

export default function BookCard(props) {
  const classes = useStyles();
  let path = "http://localhost:3001/"+ props.image;

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={path}
          title="Book's cover"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h4">
            {props.title}
          </Typography>
          <Typography classname={classes.price} gutterBottom variant="h6" color="primary" component="h6">
            $ {props.price}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.sypnosis}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <IconButton aria-label="Add to cart">
          <AddShoppingCartRoundedIcon />
        </IconButton>
        <IconButton aria-label="Add a comment">
          <AddCommentRoundedIcon />
        </IconButton>
        <Button size="small" color="primary" className={classes.button}>
          Details
        </Button>
      </CardActions>
    </Card>
  );
}