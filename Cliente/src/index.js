import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom'
import './index.css';
import App from './App';
import Login from './Components/Login'
import Home from "./Components/Home"
import Sign_up from "./Components/Sign_up"

import Admin_page from './Components/Admin/Admin_page/Admin_page'


import User_page from './Components/User_page';


import { Provider } from 'react-redux';
import store from './store'


const routing = (
    <Provider store={store}>
      <div>
        <Router>
          
            <Route exact component={App} />
            <Redirect from="/" to="/home" />

            <Route exact path="/home" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/sign_up" component={Sign_up} />

            <Route path="/Admin_page" component={Admin_page} />       


            <Route path="/user_page" component={User_page} />

        </Router>
      </div>
    </Provider>
  )

ReactDOM.render(routing, document.getElementById('root'));

