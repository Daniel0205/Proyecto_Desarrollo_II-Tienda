import 'date-fns';
import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Redirect } from 'react-router-dom'
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Background from "../Images/signin.jpeg";
import MenuItem from '@material-ui/core/MenuItem';
import DateFnsUtils from '@date-io/date-fns';
import format from "date-fns/format";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
//import { green } from '@material-ui/core/colors';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarMesssages from '../SnackbarMesssages';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";


const useStyles = makeStyles(theme => ({
  root: {
    height: "70vh",
    flexGrow: 1
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
/** 
const useStyles1 = makeStyles(theme => ({
  success: {
    backgroundColor: green[600],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));
*/
var state = {
  username: '',
  first_name: '',
  last_name: '',
  date_birth: '2015-05-05',
  type_id: 'CC',
  id: '',
  gender: 'N',
  password: '',
  phone_number: '',
  address: '',
  email: '',
  state: true
};

const IDType = [
  {
    value: 'CC',
    label: "Citizen's ID",
  },
  {
    value: 'TI',
    label: 'Identity card',
  },
  {
    value: 'RC',
    label: 'Civil registration',
  },
  {
    value: 'TP',
    label: 'Passport',
  },
];

const Gender = [
  {
    value: 'F',
    label: 'Female',
  },
  {
    value: 'M',
    label: 'Male',
  },
  {
    value: 'N',
    label: 'Undefined',
  },
];


export default function SignInSide() {

  const [selectedDate, setSelectedDate] = React.useState( '2015-05-05');
  const [RedirectToLogin, setRedirectToLogin] = React.useState(false);
  const [msj, setMsj] = React.useState('');
  const [type, setType] = React.useState('');
  const [values, setValues] = React.useState({});


  const classes = useStyles();

  ValidatorForm.addValidationRule(
    "isValidName", (string) => /[a-zA-Z0-9 \u00E0-\u00FC]/g.test(string)
  );
  ValidatorForm.addValidationRule(
    "isValidLengthName", (string) => /\b[a-zA-Z0-9 \u00E0-\u00FC]{5,15}\b/g.test(string)
  );
  
  ValidatorForm.addValidationRule(
    "isValidLengthPassword", (string) => /\b[a-zA-Z0-9 \u00E0-\u00FC]{10,25}\b/g.test(string)
  );
  


  function handleDateChange(date) {
    setSelectedDate(date);
    state['date_birth'] = format(date, "yyyy-MM-dd");
  }


  function handleClick(e) {
    e.preventDefault();
    
    fetch("/Client/insert", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(state)
    })
      .then(res => res.json())
      .then(res => {
        
        if (res.bool) {

          //Mensaje de creacion de cuenta
          setMsj("YOUR ACCOUNT HAS BEEN SUCCESSFULLY CREATED!");
          setType("success");
          //retraso de 1 segundo antes redirigir
          setTimeout(() => setRedirectToLogin(true), 2000);
        }
        else {
          //Mensaje de creacion de cuenta
          setMsj('ERROR CREATING YOUR ACCOUNT');
          setType('error');
          //retraso de 1 segundo antes redirigir
          setTimeout(() => setMsj(''), 2000);
        }
      })
  }


  
  const handleChangeList = name => event => {
    setValues({ ...values, [name]: event.target.value });
    state[name] = event.target.value;
  };



  if (!RedirectToLogin) {
    return (

      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Create an account
             </Typography>
            <ValidatorForm onSubmit={()=>handleClick()} className={classes.form}>

              {/*-----------------------------------------------------------*/}

              {/*--Username--*/}
                <TextValidator
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Username"
                id="username"
                name="username"
                autoFocus
                onChange={(x) => state['username'] = x.target.value}            
                validators={["required", "isValidName", "isValidLengthName"]}
                errorMessages={["Please fill out  this field", "Invalid format!", "Invalid lentgth!"]}
              />
            
              {/*--First name--*/}
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="First name"
                id="firstname"
                name="first_name"
                onChange={(x) => state['first_name'] = x.target.value}
              />

              {/*--Last name--*/}
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Last name"
                id="lastname"
                name='last_name'
                onChange={(x) => state['last_name'] = x.target.value}
              />

              {/*--Password--*/}
              <TextValidator
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Password"
                id="password"
                name="password"
                type="password"
                onChange={(x) => state['password'] = x.target.value}
                validators={["required", "isValidName", "isValidLengthPassword"]}
                errorMessages={["Please fill out  this field", "Invalid format!", "Invalid lentgth!"]}
              />
           
              {/*--Phone number--*/}
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Phone number"
                id="phonenumber"
                name='phone_number'
                onChange={(x) => state['phone_number'] = x.target.value}
              />

              {/*--Address--*/}
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Address"
                id="address"
                name='address'
                onChange={(x) => state['address'] = x.target.value}
              />

              {/*--Type id--*/}
              <TextField
                id="outlined-select-currency"
                select
                fullWidth
                label="ID type"
                className={classes.textField}
                value={state.type_id}
                onChange={handleChangeList('type_id')}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                margin="normal"
                variant="outlined"
              >
                {IDType.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              {/*--Identification number--*/}
              <TextField
                required
                fullWidth
                variant="outlined"
                margin="normal"
                label="Identification"
                id="identification"
                name='id'
                onChange={(x) => state['id'] = x.target.value}
              />

              {/*--E-mail--*/}
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="E-mail"
                id="outlined-email-input"
                type="email"
                name="email"
                onChange={(x) => state['email'] = x.target.value}
              //error
              //id="outlined-error" // para resaltar error
              />

              {/*--Date birth--*/}
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  fullWidth
                  margin="normal"
                  id="date-picker-dialog"
                  label="Date birth"
                  format="yyyy-MM-dd"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>

              {/*--Gender--*/}
              <TextField
                fullWidth
                id="gender"
                select
                label="Gender"
                value={state.gender}
                onChange={handleChangeList('gender')}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                margin="normal"
                variant="outlined"
              >
                {Gender.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              {/*-----------------------------------------------------------*/}

              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                type="submit"
                onClick={handleClick}
              >
                Sign Up
              </Button>
            </ValidatorForm >
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}
                open={msj!==''}
                autoHideDuration={3000} //opcional
            >
                <SnackbarMesssages
                    onClose={()=>setMsj('')}
                    variant={type} 
                    message={msj}/>
            </Snackbar>

           

              <Box mt={0}>
                <Typography variant="body2" color="textSecondary" align="center">
                  {'Copyright © Darko Library '}
                  {new Date().getFullYear()}
                  {' '}
                </Typography>
              </Box>
              
          </div>
        </Grid>
      </Grid>
    );
  }
  else {
    return (
      <Redirect from="/Sign_up/" to="/login" />
    )
  }
}



