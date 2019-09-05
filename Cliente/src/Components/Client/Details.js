import React from 'react';
import {Card, CardContent, Typography, CardHeader} from '@material-ui/core';
import {IconButton} from '@material-ui/core';
import AddCommentRoundedIcon from '@material-ui/icons/AddCommentRounded';
import AddShoppingCartRoundedIcon from '@material-ui/icons/AddShoppingCartRounded';
import "./Details.css";

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
        
        let path = "http://localhost:3001/"+ this.props.inf.image;

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
                        La Segunda Guerra Mundial fue un conflicto militar global que se desarrolló entre 1939 y 1945. En este se vieron implicadas la mayor parte de las naciones del mundo, de hecho en el momento de la caída del Reich alemán solo ocho Estados del mundo eran oficialmente neutrales (Afganistán, España, Irlanda, Mongolia, Nepal, Portugal, Suecia y Suiza)1​, incluidas todas las grandes potencias, agrupadas en dos alianzas militares enfrentadas: los aliados de la Segunda Guerra Mundial y las potencias del eje. Fue la mayor contienda bélica de la historia, con más de cien millones de militares movilizados y un estado de «guerra total» en que los grandes contendientes destinaron toda su capacidad económica, militar y científica al servicio del esfuerzo bélico, borrando la distinción entre recursos civiles y militares. Marcada por hechos de enorme repercusión que incluyeron la muerte masiva de civiles, el Holocausto, los bombardeos intensivos sobre ciudades y el uso, por única vez, de armas nucleares en un conflicto militar, la Segunda Guerra Mundial fue el más mortífero en la historia con un resultado de entre 50 y 70 millones de víctimas, el 2,5% de la población mundial.2​
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
            </Card>
            <button className="close" onClick={() => {this.props.callback()}} > X </button>
        </div>
        );
      }
  
    }