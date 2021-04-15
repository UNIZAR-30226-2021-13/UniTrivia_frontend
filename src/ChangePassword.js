import React, {useState} from 'react'
import axios from "axios";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

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
    paper: {
        marginTop: theme.spacing(8),
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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function ChangePassword(props) {
    const [loading, setLoading] = useState(false);
    const username = useFormInput('');
    const answer = useFormInput('');
    const newPassword = useFormInput('');
    const [error, setErrorMsg] = useState(null);
    const [Error,setError]=useState(false);
    const classes = useStyles();
    let [preg, setPreg] = useState(null);


    // handle button click of recover question
    const handleRecoverQuestion = () => {
        try{
            axios.get('https://unitrivia.herokuapp.com/api/login/recover/question',{ headers:{
                    username: username.value,
                }}).then(response => {
                    setError(null);
                console.log(response)
                setPreg(response.data)


            }).catch(error => {
                setError(true);
                setPreg('---');
                if(error.response.data.code == 2){

                    setErrorMsg("El usuario no existe");
                }else{

                    setErrorMsg("Error desconocido");
                    alert(error.message);
                }


            });
        }catch (e) {
            setError(e);
        }
    }

    // handle button click of login form
    const handleModify = () => {
        try {




            axios.post('https://unitrivia.herokuapp.com/api/login/recover/password',{}, { headers: {
                    username: username.value,
                    res: answer.value,
                    newpassword: newPassword.value
                }}).then(response => {
                setError(null);
                //setUserSession(response.data.token, response.data.user);
                props.history.push('/login');
            }).catch(error => {
                setError(true);
                alert(error.message);
            });
        }catch (e) {
            setError(e);
        }
    }

    const showError= () =>{
        //console.log(loginError);
        //console.log(error);
        if(!Error) return null;
        return(
            <div className={classes.error}>
                {error}
            </div>
        );

    }

    return (
        <Container component="main" maxWidth="xs" className={classes.root}>
            <CssBaseline />
            {showError()}
            <Grid item xs={false} className={classes.image} />
            <div className={classes.paper}>
                <Typography component="h1" variant="h2">
                    UniTrivia
                </Typography>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    He olvidado mi contraseña
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} spacing={2}>
                            <TextField
                                autoComplete="fname"
                                name="username"
                                variant="outlined"
                                required
                                fullWidth
                                id="username"
                                label="Usuario"
                                autoFocus
                                {...username}
                            />

                        </Grid>
                        <Grid item xs={12}  spacing={2}>
                        <Button

                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleRecoverQuestion}
                        >
                            Recuperar pregunta
                        </Button>
                    </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                disabled
                                fullWidth
                                value={preg}
                                id="question"
                                name="question"
                                defaultValue="---"
                                label="Pregunta de seguridad"

                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="answer"
                                label="Respuesta a la pregunta"
                                name="answer"

                                {...answer}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Nueva contraseña"
                                type="password"
                                id="password"

                                {...newPassword}

                            />
                        </Grid>

                        <Grid item xs={12}>

                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleModify}
                    >
                        Confirmar
                    </Button>

                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
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



export default ChangePassword;