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
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { mainListItemsAdmin, secondaryListItemsAdmin, sessionItem } from '../../listItems';
import { makeStyles } from '@material-ui/core/styles';
import Activate_Client from '../Activate_Client/Activate_Client';
import Products from '../Products';
import Categories from '../Categories';
import Subcategories from '../Subcategories';
import Message from '../Message';
import Bill from '../Bill';
import Trending from '../Trending';
import Sales from '../Sales'
import Low_stocks from '../Low_stocks';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import EmailIcon from '@material-ui/icons/Email';



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
    //height: '100vh',
    overflow: 'auto',
    padding: '60px 30px 0px 30px',
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



export default function Admin_page(props) {

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);


  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };


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
            Dashboard
            </Typography>
          <IconButton color="inherit"component={Link} to="/Admin_page/message" >
            <Badge badgeContent={4} color="secondary">
              <EmailIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer className={classes.drawer}
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List onSelect={e => console.log(e)} component="nav">{mainListItemsAdmin}</List>
        <Divider />
        <List>{secondaryListItemsAdmin}</List>
        <Divider />
        <List>{sessionItem}</List>
      </Drawer>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Route path="/Admin_page/Activate_Client" component={Activate_Client} />
        <Route path="/Admin_page/categories" component={Categories} />
        <Route path="/Admin_page/subcategories" component={Subcategories} />
        <Route path="/Admin_page/products" component={Products} />
        <Route path="/Admin_page/message" component={Message} />
        <Route path="/Admin_page/bill" component={Bill} />
        <Route path="/Admin_page/trending" component={Trending} />
        <Route path="/Admin_page/low_stocks" component={Low_stocks} />
        <Route path="/Admin_page/sales" component={Sales} />
      </main>
    </div>);

}
