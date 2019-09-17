import React from 'react';
import {Card, CardContent, CardHeader, CardActions, TextField, Button,Typography} from '@material-ui/core';
import "./AddComment.css";
import Rating from '@material-ui/lab/Rating';

export default class AddComment extends React.Component {

    
    constructor(props) {
        super(props)
    
        this.state = {
          score:1,
          comment: ""
        }

        this.adjustStyle = this.adjustStyle.bind(this);

    }

    adjustStyle(){

        var tostyle = document.getElementById('mainBox');

        if(this.props.dad === "fromBc"){
            tostyle.body.className="Coment"
        } else if(this.props.dad === "fromD"){
            tostyle.body.className="Coment2"
        }
    }

    render(){  

        var st = this.props.st    
        return (
        <div className={st}>
            
            <Card className="card2">
                <CardHeader
                    title= "Add a comment"
                />
                <CardContent>
                    <Rating 
                        name="simple-controlled"
                        value={this.state.score}
                        onChange={(event, newValue) => {
                            this.setState({
                                score: newValue
                            })
                          }}
                    /> 
                    <Typography variant="caption" display="block" gutterBottom>
                        Ranking the book
                    </Typography>
                    <br/>
                    <TextField
                        id="filled-full-width"
                        label="Comment"
                        style={{ margin: 8 }}
                        placeholder="Please! Add here your comment"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{
                        shrink: true,
                        }}
                        value = {this.state.comment}
                        onChange={(event, newValue) => {
                            this.setState({
                                comment: newValue
                            })
                          }}
                    />
                </CardContent>

                <CardActions>
                    <Button size="small" color="primary" onClick={() => {console.log(this.state)}}>
                        Aceptar
                    </Button>
                    <Button size="small" color="primary" onClick={() => {this.props.closing()}}>
                        Cancelar
                    </Button>
                </CardActions>
            </Card>
            <button className="close2" onClick={() => {this.props.closing()}} > X </button>
        </div>
        );
      }
  
    }