import React from 'react';
import './App.css';
import { Link } from 'react-router-dom'
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import TypoGraphy from "@material-ui/core/Typography";
import {connect} from 'react-redux'
import {getType} from './store/type/reducer'
import {Component } from 'react';
import { Redirect } from 'react-router-dom'
import updateType from './store/type/action'
import updateUsername from './store/username/action'
import { Home, AddBox, AccountBox  } from '@material-ui/icons'


class  App extends Component {


  render(){   
    switch (this.props.type) {
      case "init":
          return (
            <div>
              <AppBar position="static">
                <Toolbar>
                
        
                  {/* --- Enlace a la ruta de la pagina de bienvenida --- */}
                  <TypoGraphy variant="h6" >
                    <Link to={`/home/`}
                      style={{ textDecoration: 'none', color: 'white' }}>
                      Home <Home />
                    </Link>
                  </TypoGraphy>

                  
                  {/* --- Enlace a la ruta para el login --- */}
                  <TypoGraphy variant="h6" >
                    <Link
                      to={`/login/`}
                      style={{ textDecoration: 'none', color: 'white' }}>
                      &nbsp; &nbsp; &nbsp; Login <AccountBox/>
                      </Link>
                  

                  {/* --- Enlace a la ruta para el registro de los usuarios --- */}
                  </TypoGraphy>
                  <TypoGraphy variant="h6" >
                    <Link
                      to={`/Sign_up/`}
                      style={{ textDecoration: 'none', color: 'white' }}>
                      &nbsp; &nbsp; &nbsp; Sign up <AddBox/>
                      </Link>
                  </TypoGraphy>           
                
                </Toolbar>
              </AppBar>
            </div>
          ); 
      case "admin":
       
        return(
          <div>
          <Redirect from="/login/" to="/admin_page" />
          <AppBar position="static">
            <Toolbar>
    
              {/* --- Enlace a la ruta de la pagina de bienvenida --- */}
              <TypoGraphy variant="h6" >
                Darko Library
              </TypoGraphy>         
            
            </Toolbar>
          </AppBar>
        </div>
        )    
      case "client":
       
            return(
              <div>
              <Redirect from="/login/" to="/user_page/home" />
              <AppBar position="static">
                <Toolbar>
        
                {/* --- Enlace a la ruta de la pagina de bienvenida --- */}
                <TypoGraphy variant="h6" >
                  Darko Library
                </TypoGraphy>      
                
                </Toolbar>
              </AppBar>
            </div>
            )    
    
      default:
        break;
    }
  }
  
};


const mapStateToProps= state => {
  return {
    type: getType(state)
  }
}

export default connect (mapStateToProps,{updateType,updateUsername})(App);
 