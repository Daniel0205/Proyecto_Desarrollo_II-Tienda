import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom'
import './index.css';
import App from './App';
import Login from './Components/Login'
import Home from "./Components/Home"
import Sign_up from "./Components/Sign_up"
import Admin_page from './Components/Admin_page/Admin_page';
import User_page from './Components/User_page';
import Products from './Components/Products';
import Categories from './Components/Categories';
import Subcategories from './Components/Subcategories';

import { Provider } from 'react-redux';
import store from './store'


const routing = (
    <Provider store={store}>
      <Router>
        <div>
          <Route exact component={App} />
          <Redirect from="/" to="/home" />

          <Route exact path="/home" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/sign_up" component={Sign_up} />

          <Route exact path="/admin_page" component={Admin_page} />
          <Route exact path="/user_page" component={User_page} />
          <Route exact path="/products" component={Products} />
          <Route exact path="/categories" component={Categories} />
          <Route exact path="/subcategories" component={Subcategories} />
        </div>
      </Router>
    </Provider>
  )

ReactDOM.render(routing, document.getElementById('root'));

