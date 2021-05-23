import React, { useState } from 'react';
import axios from 'axios';
import {setToken, setUserSession} from './Utils/Common';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                UniGames
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: '80vh'
    },
    image: {
        backgroundImage: 'url(https://img.freepik.com/vector-gratis/modelo-inconsutil-pregunta-papel-aislada-realista-decoracion-invitacion-concepto-concurso-trivia_269299-1004.jpg?size=626&ext=jpg)',
        backgroundRepeat: 'repeat-x',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%'
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    fondo:{
        margin: theme.spacing(2,2,5),
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        marginTop: theme.spacing(1),
        boxShadow: "0px 0px 5px 2px #9E9E9E",
    },
    error: {
        width: '100%', 
        position: 'absolute', textAlign:'center',
        color: 'white',
		backgroundColor: 'red',
    }
}));

function Login(props) {
  const [loading, setLoading] = useState(false);
  const username = useFormInput('');
  const password = useFormInput('');
  const [loginError,setLoginError]=useState(false);
  const [error, setError] = useState(null);
    const [noUser, setUser] = useState(false);
    const [noPass, setPass] = useState(false);


    const classes = useStyles();


    // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);

      if(username.value===''){
          setUser(true);
      }else{
          setUser(false);
      }
      if(password.value === ''){
          setPass(true);
      }else{
          setPass(false);
      }


    if(username.value!=='' && password.value !== ''){
        axios.get('https://unitrivia.herokuapp.com/api/login', { headers:{
                username: username.value,
                password: password.value
            }}).then(response => {
            setLoading(false);
            console.log(response)
            setUserSession(response.data, username.value);
            props.history.push('/menu');
        }).catch(error => {
            setLoading(false);
            //alert(error.message)
            if (error.response.status === 401){setLoginError(true); setError("El Ususario o la contraseña se han introducido incorrectamente");} //setError(error.response.data.message);
            else{setLoginError(true); setError("El Ususario o la contraseña se han introducido incorrectamente");}
        });
    }

  }

    const handleLogAsGuest = () => {
        setError(null);
        setLoading(true);

        axios.get('https://unitrivia.herokuapp.com/api/logAsGuest'
            ).then(response => {
            setLoading(false);

            setToken(response.data);
            props.history.push('/menu');
        }).catch(error => {
            setLoading(false);
            alert(error.message);
            if (error.response.status === 401) { setError(error.response.data.message); console.log(error)}
            else {setLoginError(true); setError("Something went wrong. Please try again later.");console.log(error)}
        });


    }
    const showError= () =>{
        //console.log(loginError);
        //console.log(error);
        if(!loginError) return null;
        return(
            <div className={classes.error}>
                {error}
            </div>
        );
        
    }
  return (
      <Grid container component="main" className={classes.root}>
          <CssBaseline />
            {showError()}
          <Grid item xs={false} className={classes.image} />
          <div className={classes.fondo} >
              <div className={classes.paper}>
                  <Avatar className={classes.avatar}>
                      <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                      Acceder
                  </Typography>
                  <form className={classes.form} noValidate>
                      <TextField
                          error={noUser === true}
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="username"
                          label="Usuario"
                          name="username"
                          autoComplete="username"
                          autoFocus
                          {...username}
                          helperText={noUser ? 'introduce el usario' : ''}
                      />
                      <TextField
                          error={noPass === true}
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          name="password"
                          label="Contraseña"
                          type="password"
                          id="password"
                          helperText={noPass ? 'introduce la contraseña' : ''}
                          {...password}
                      />
                      <FormControlLabel
                          control={<Checkbox value="remember" color="primary" />}
                          label="Remember me"
                      />
                      <Button
                          fullWidth
                          variant="contained"
                          color="primary"
                          onClick={handleLogin}
                      >
                          Acceder
                      </Button>
                      <Grid container>
                          <Grid item xs>
                              <Link href="/changepassword" variant="body2">
                                  Olvidaste la contraseña?
                              </Link>
                          </Grid>
                          <Grid item>
                              <Link href="/register" variant="body2">
                                  {"No tienes cuenta? Regístrate"}
                              </Link>
                          </Grid>
                      </Grid>
                      <Button
                          fullWidth
                          variant="contained"
                          color="primary"
                          onClick={handleLogAsGuest}
                      >
                          Acceder como invitado
                      </Button>
                      <Box mt={5}>
                          <Copyright />
                      </Box>
                  </form>
              </div>
              </div>
          </Grid>
      
  );
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

export default Login;