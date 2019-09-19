import React, { useState } from 'react';
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from 'react-router-dom'
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Background from "../Images/books.jpg";
import updateUsername from '../store/username/action'
import updateType from '../store/type/action'
import updateBirthday from '../store/birthday/action'
import { connect } from "react-redux"
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarMesssages from '../SnackbarMesssages';


var logged = false;

const useStyles = makeStyles(theme => ({
  root: {
    height: "70vh"
  },
  image: {
    backgroundImage: `url(${Background})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const SignInSide = ({ updateUsername, updateType,updateBirthday }) => {

  const [msj, setMsj] = React.useState('');

  const classes = useStyles();


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  ValidatorForm.addValidationRule(
    "isValidName", (string) => /[a-zA-Z0-9 \u00E0-\u00FC]/g.test(string)
  );
  ValidatorForm.addValidationRule(
    "isValidLengthName", (string) => /\b[a-zA-Z0-9 \u00E0-\u00FC]{5,15}\b/g.test(string)
  );
  
  ValidatorForm.addValidationRule(
    "isValidLengthPassword", (string) => /\b[a-zA-Z0-9 \u00E0-\u00FC]{10,25}\b/g.test(string)
  );
  
 
  console.log(ValidatorForm)

  function compareDate(date,tipo){

    if(tipo==="client"){
      var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    var mmBirth = date.slice(5,7)
    var ddBirth = date.slice(-2)

    return (ddBirth===dd && mmBirth===mm)

    }
    
  }

  function handleClick(e) {
    if (!logged)
      e.preventDefault();
    fetch("/Client", {
      method: 'POST',
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    })
      .then(res => res.json())
      .then(res => {
        if (res.bool) {
          console.log(res)
          updateUsername(res.username);
          updateType(res.type)
          updateBirthday(compareDate(res.date,res.type))
        }
        else {
          setMsj('INCORRECT USER OR PASSWORD!');
 
        }
      });

  }

  function handleChange(e) {
    if (e.target.name === 'username')
      setUsername(e.target.value)
    if (e.target.name === 'password')
      setPassword(e.target.value)
  }

  function handleSubmit(e) {
    handleClick(e);
  }

  return (
    <Grid container component="main" className={classes.root}>
       <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}
                open={msj!==''}
                autoHideDuration={3000} //opcional
            >
                <SnackbarMesssages
                    onClose={()=>setMsj('')}
                    variant="error" 
                    message={msj}/>
            </Snackbar>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <ValidatorForm onSubmit={handleSubmit} className={classes.form}>
            <TextValidator
              variant="outlined"
              margin="normal"
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={e => handleChange(e)}              
              validators={["required", "isValidName", "isValidLengthName"]}
              errorMessages={["Please fill out  this field", "Invalid format!", "Invalid lentgth!"]}
            />
            <TextValidator
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              autoComplete="current-password"
              onChange={e => handleChange(e)}
              validators={["required", "isValidName", "isValidLengthPassword"]}
              errorMessages={["Please fill out  this field", "Invalid format!", "Invalid lentgth!"]}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              type="submit"
              onClick={handleClick}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/Sign_up/">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Typography variant="body2" color="textSecondary" align="center">
                {"Darko Library ®"}
              </Typography>
            </Box>
          </ValidatorForm >
        </div>
      </Grid>
    </Grid>
  );
}


export default connect(null, { updateUsername,updateBirthday, updateType })(SignInSide);
