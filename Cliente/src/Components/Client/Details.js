import React from 'react';
import {Card, CardContent, Typography, CardHeader, Divider} from '@material-ui/core';
import {IconButton} from '@material-ui/core';
import AddCommentRoundedIcon from '@material-ui/icons/AddCommentRounded';
import AddShoppingCartRoundedIcon from '@material-ui/icons/AddShoppingCartRounded';
import "./Details.css";
import Comments from './Comments';
import AddComment from './AddComment';

const styles = 
{
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9,
        marginTop:'30',
        paddingLeft: '10%'
    },
    imag: {
        width: '9.62cm',
        height: '12.48cm',
    },
    ima: {
        width: '11cm',
        height: '13cm',
        float: 'left',
        position: 'relative',
    },
    con: {
        float: 'right',
        position: 'relative',
        width: '14cm',
    }
  };

export default class Details extends React.Component {

    constructor(props) {
        super(props)
    
        this.state = {
          addcoment:false,
          num:1
        }

        this.checkAddComment = this.checkAddComment.bind(this);
        this.closeAddComment =this.closeAddComment.bind(this)
      }

    closeAddComment(){
       
        this.setState({
            addcoment: false,
            num:2
        })
       
    }

    checkAddComment(){
        if(this.state.addcoment){
        return(<AddComment closing={this.closeAddComment} st="Coment2" isbn={this.props.inf.isbn} activate={this.closeAddComment}/>)
        }
    }

    handleAddComment(){
        this.setState({   
            addcoment: true,                            
        }) 
        
    }

    render(){  
        console.log(this.state)
        let path = "http://localhost:3001/"+ this.props.inf.imagepath;

        return (
        <div className="Details">
            <Card className="card">
                <CardHeader
                    title= {this.props.inf.title}
                    subheader={this.props.inf.price}
                    action={
                        <div>
                            <IconButton aria-label="Add to cart">
                                <AddShoppingCartRoundedIcon />
                            </IconButton>
                            <IconButton aria-label="Add a comment" onClick={() => {this.handleAddComment()}}>
                                <AddCommentRoundedIcon />
                            </IconButton>
                        </div>
                      }
                />

                <CardContent className="father">
                    <div style={styles.ima}>
                        <img src={path} alt="Book's cover" style={styles.imag}/>
                    </div>

                    <div style={styles.con}>
                        <Typography variant="h6" gutterBottom>
                            Sypnosis
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            {this.props.inf.synopsis}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            Details 
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            ISBN: {this.props.inf.isbn}
                        </Typography> <br/>
                        <Typography variant="body2" gutterBottom>
                            Subcategory: {this.props.inf.name_subcategory}
                        </Typography> <br/>
                        <Typography variant="body2" gutterBottom>
                            Year of publication: {this.props.inf.publication_year}
                        </Typography> <br/>
                        <Typography variant="body2" gutterBottom>
                            Author: {this.props.inf.author}
                        </Typography> <br/>
                        <Typography variant="body2" gutterBottom>
                            Number of pages: {this.props.inf.number_of_pages}
                        </Typography> <br/>
                        <Typography variant="body2" gutterBottom>
                            Edition: {this.props.inf.edition}
                        </Typography> <br/>
                        <Typography variant="body2" gutterBottom>
                            Editorial: {this.props.inf.editorial}
                        </Typography> <br/>
                        <Typography variant="body2" gutterBottom>
                            Cover: {this.props.inf.cover_type}
                        </Typography> <br/>
                    </div>   
                </CardContent>

                <Divider variant="middle" />

                <CardContent>
                    <div>
                        <Comments isbn={this.props.inf.isbn} hola={this.state.num}/>
                    </div>
                </CardContent>
            </Card>
            <button className="close" onClick={() => {this.props.callback()}} > X </button>
            {this.checkAddComment()}
        </div>
        );
      }
  
    }