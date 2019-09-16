import React from 'react';
import {Card, CardContent, Typography, CardHeader, Divider} from '@material-ui/core';
import {IconButton} from '@material-ui/core';
import AddCommentRoundedIcon from '@material-ui/icons/AddCommentRounded';
import AddShoppingCartRoundedIcon from '@material-ui/icons/AddShoppingCartRounded';
import "./Details.css";
import Comments from './Comments';

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

    render(){  
        
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
                            <IconButton aria-label="Add a comment">
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
                        <Typography variant="p" gutterBottom>
                            {this.props.inf.synopsis}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            Details 
                        </Typography>
                        <Typography variant="p" gutterBottom>
                            ISBN: {this.props.inf.isbn}
                        </Typography> <br/>
                        <Typography variant="p" gutterBottom>
                            Subcategory: {this.props.inf.name_subcategory}
                        </Typography> <br/>
                        <Typography variant="p" gutterBottom>
                            Year of publication: {this.props.inf.publication_year}
                        </Typography> <br/>
                        <Typography variant="p" gutterBottom>
                            Author: {this.props.inf.author}
                        </Typography> <br/>
                        <Typography variant="p" gutterBottom>
                            Number of pages: {this.props.inf.number_of_pages}
                        </Typography> <br/>
                        <Typography variant="p" gutterBottom>
                            Edition: {this.props.inf.edition}
                        </Typography> <br/>
                        <Typography variant="p" gutterBottom>
                            Editorial: {this.props.inf.editorial}
                        </Typography> <br/>
                        <Typography variant="p" gutterBottom>
                            Cover: {this.props.inf.cover_type}
                        </Typography> <br/>
                    </div>   
                </CardContent>

                <Divider variant="middle" />

                <CardContent>
                    <div>
                        <Comments isbn={this.props.inf.isbn}/>
                    </div>
                </CardContent>

                

            </Card>
            <button className="close" onClick={() => {this.props.callback()}} > X </button>
        </div>
        );
      }
  
    }