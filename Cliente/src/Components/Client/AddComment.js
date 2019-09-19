import React from 'react';
import {Card, CardContent, CardHeader, CardActions, TextField, Button,Typography} from '@material-ui/core';
import "./AddComment.css";
import Rating from '@material-ui/lab/Rating';
import {getUsername} from '../../store/username/reducer'
import {connect} from 'react-redux'
import updateUsername from '../../store/username/action'

class AddComment extends React.Component {

    
    constructor(props) {
        super(props)
    
        this.state = {
          score:1,
          comment: "",
          isbn: this.props.isbn,
          username:this.props.username
        }

        this.actualizarDatos = this.actualizarDatos.bind(this);
        this.guardarComentarios = this.guardarComentarios.bind(this);
    }

    actualizarDatos(e){
        switch (e.target.id) {
            case 'opinion':
              this.setState({
                comment: e.target.value
              })
              break;
            default:
              break;
        }
    }

    guardarComentarios(){
        fetch("/Critics/insert",{
            method: "POST",
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state)
          })
          .then(res => res.json())
          .then(res => {
            if(res[0].bool){
              this.props.closing()
            }
           
          })
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
                        id="opinion"
                        label="Comment"
                        style={{ margin: 8 }}
                        placeholder="Please! Add here your comment"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{
                        shrink: true,
                        }}
                        onChange={this.actualizarDatos}
                        value = {this.state.comment}
                    />
                </CardContent>

                <CardActions>
                    <Button size="small" color="primary" onClick={this.guardarComentarios}>
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

    const mapStateToProps= state => {
        return {
          username: getUsername(state)
        }
      }
      
export default connect (mapStateToProps,{updateUsername})(AddComment);