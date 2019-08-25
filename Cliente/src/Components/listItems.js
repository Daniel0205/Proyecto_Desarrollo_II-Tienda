import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import CategoryIcon from '@material-ui/icons/Category';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import StoreIcon from '@material-ui/icons/Store';
import ViewListIcon from '@material-ui/icons/ViewList';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
//import LocationCityIcon from '@material-ui/icons/LocationCity';
import { Link } from 'react-router-dom'


export const mainListItemsAdmin = (
  <div>
    <ListItem button >
        <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>

    <ListItem button component={Link} to="/Admin_page/products">
      <ListItemIcon>
        <LocalLibraryIcon />
      </ListItemIcon>
      <ListItemText primary="Products" />
    </ListItem>

    <ListItem button component={Link} to="/Admin_page/Activate_Client">
      <ListItemIcon>
        <PersonAddDisabledIcon />
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItem>

    <ListItem button component={Link} to="/Admin_page/categories">
      <ListItemIcon>
        <CategoryIcon />
      </ListItemIcon>
      <ListItemText primary="Categories" />
    </ListItem>
    
    <ListItem button component={Link} to="/Admin_page/subcategories">
      <ListItemIcon>
        <CategoryIcon />
      </ListItemIcon>
      <ListItemText primary="Subcategories" />
    </ListItem>
  </div>);



export const secondaryListItemsAdmin = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
    <ListSubheader inset></ListSubheader>
    <ListItem onClick={()=>{
                  this.props.updateType("init")
                  this.props.updateUsername("")
                }}  component={Link}to={`/home/`} button>
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="Sign off" />
    </ListItem>
  </div>
);

export const mainListItemsClient = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>

    <ListItem button component={Link} to="/User_page/store">
      <ListItemIcon>
        <StoreIcon />
      </ListItemIcon>
      <ListItemText primary="Store" />
    </ListItem>

    <ListItem button component={Link} to="/User_page/shopping_car">
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Shopping cart" />
    </ListItem>

    <ListItem button component={Link} to="/User_page/buy_list">
      <ListItemIcon>
        <ViewListIcon />
      </ListItemIcon>
      <ListItemText primary="Shopping history" />
    </ListItem>

    <ListItem button component={Link} to="/User_page/account">
      <ListItemIcon>
        <AccountCircleIcon />
      </ListItemIcon>
      <ListItemText primary="Account options" />
    </ListItem>
  </div>);

export const secondaryListItemsClient = (
  <div>
    <ListSubheader inset></ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>

  </div>
);