import React from 'react';
import { Button } from '@material-ui/core'
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarMesssages from '../../SnackbarMesssages';


export default class Borrar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { open: false }
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }


    handleClick() {
        this.setState({ open: true });
    }

    handleClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ open: false });
    }


    render() {
        return (
            <div>
                <h2>Mensajes de notificacion</h2>

                <Button variant="outlined" onClick={this.handleClick}>
                    Click
                    </Button>


                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}
                    open={this.state.open}
                    onClose={this.handleClose}
                    autoHideDuration={3000} //opcional
                >
                    <SnackbarMesssages
                        onClose={this.handleClose}
                        variant="success"
                        //variant="info"
                        //variant="error" 
                        //variant="warning" 
                        message="MENSAJE DE PRUEBA!" />
                </Snackbar>


            </div>
        );
    }
}


