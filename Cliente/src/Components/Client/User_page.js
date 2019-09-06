import React from "react";
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { mainListItemsClient, secondaryListItemsClient } from '../listItems';
import { makeStyles } from '@material-ui/core/styles';
import Account from './Account';
import Store from './Store';
import Shopping_car from './Shopping_car'
import Buy_list from './Buy_list'
import Contact_us from './Contact_us'
import { Route } from 'react-router-dom'
import { Select } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import {getPoint} from '../../store/point/reducer';
import updatePoint from '../../store/point/action';
import {connect} from 'react-redux';
import { getUsername } from "../../store/username/reducer";

const drawerWidth = 240;


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: { 
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    padding: '60px 15px 25px 15px',
  },
  container: { 
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: { 
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));




const User_page = (props) => {

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [dp, setDp] = React.useState([]);


  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    updatePoint( event.target.value)
  }


  if(dp.length===0){
 
    fetch("/DistributionPoint/consult", {
      method: "GET",
    })
      .then(res => res.json())
      .then(res => {
        
        if(res.bool){
          props.updatePoint(res.data[0].name_dp)
          console.log(props.dp)
          setDp(res.data); 
        }
      })
  }

  console.log(dp)


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar className={clsx(classes.appBar, open && classes.appBarShift)} id="menuD">
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Welcome {props.username}
            </Typography>
            <Typography component="h6" variant="h6" color="inherit"  >
            Distribution Point:     
            </Typography>
            <Select
              value={props.dp}
              onChange={handleChange}
              >
              {dp.map((x,i) =>   <MenuItem key={i} value={x.name_dp}>{x.name_dp}</MenuItem>)}
            </Select>
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        anchor="left"
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>

        <Divider />
        <List onSelect={e => console.log(e)} component="nav">{mainListItemsClient}</List>
        <Divider />
        <List>{secondaryListItemsClient}</List>
      </Drawer>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Route path="/User_page/buy_list" component={Buy_list} />
        <Route path="/User_page/account" component={Account} />
        <Route path="/User_page/shopping_car" component={Shopping_car} />
        <Route path="/User_page/store" component={Store} />
        <Route path="/User_page/contact_us" component={Contact_us} />
      </main>
    </div>);

}

const mapStateToProps= state => {
  return {
    dp: getPoint(state),
    username: getUsername(state)
  }
}


export default  connect (mapStateToProps,{updatePoint})(User_page);
