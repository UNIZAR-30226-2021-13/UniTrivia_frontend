import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';


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
        height: '110%',
        width: '200%'
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
    }
}));

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

export default function Register(props) {


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const username = useFormInput('');
    const email = useFormInput('');
    const password = useFormInput('');
    const reppassword = useFormInput('');
    const question = useFormInput('');
    const answer = useFormInput('');
    


    const [noUser, setUser] = useState(false);
    const [noPass, setPass] = useState(false);
    const [noEmail, setEmail] = useState(false);
    const [noQuestion, setQuestion] = useState(false);
    const [noAns, setAns] = useState(false);
    const [dist, setDist] = useState(false);
    const [Rep, setNoRep] = useState(false);
    const [err, setErr] = useState(null);
    const emailRegex = new RegExp('/\S+@\S+\.\S+/');



    const handleRegister = () => {
        const user = {username}
        setError(null);
        setLoading(true);

        username.value === '' ? setUser(true) : setUser(false);
        password.value === '' ? setPass(true) : setPass(false);
        email.value === '' ? setEmail(true) : setEmail(false);
        question.value === '' ? setQuestion(true) : setQuestion(false);
        answer.value === '' ? setAns(true) : setAns(false);
        if(reppassword.value === ''){
            setNoRep(true)
            setErr('introduce la contraseña')
        }else{
            setNoRep(false)
        }
        if(password.value!==reppassword.value){
            setDist(true)
            setErr('las contraseñas no coinciden')
        }else{
            setDist(false)
        }



        if(username.value!=='' && password.value!=='' && email.value!=='' && question.value!==''&& answer.value!=='' && password.value===reppassword.value) {

//https://unitrivia.herokuapp.com/api/register
            axios.post('https://unitrivia.herokuapp.com/api/register', {}, {
                headers: {
                    'username': username.value,
                    'password': password.value,
                    'email': email.value,
                    'preg': question.value,
                    'res': answer.value
                }
            }).then((response) => {
                console.log(response.data)
                console.log(response)
                setLoading(false);
                //setUserSession(response.data.token, response.data.user);
                props.history.push('/login');
            }).catch((error) => {
                setLoading(false);
                console.log(error.response)
                if (error.response.status === 400) {
                    setError(error.response.data.message);
                    alert('usuario existente')
                }else {
                    setError("Something went wrong. Please try again later.");
                }
            });
        }
    }


    const classes = useStyles();
    // eslint-disable-next-line no-undef



    return (
        <Grid container component="main" className={classes.root}>
            <Grid item xs={false} className={classes.image} />
                <div className={classes.fondo}> 
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h2">
                            UniTrivia
                        </Typography>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Regístrate
                        </Typography>

                        <form className={classes.form} noValidate>
                            <Grid container spacing={2}>
                                <Grid item xs={12} >
                                    <TextField
                                        error={noUser === true}
                                        autoComplete="fname"
                                        name="username"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="username"
                                        label="Usuario"
                                        autoFocus
                                        {...username}

                                        helperText={noUser ? 'introduce el usario' : ''}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        error={noEmail === true}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        type="email"
                                        name="email"
                                        autoComplete="email"
                                        {...email}
                                        helperText={noEmail ? 'introduce el email' : ''}


                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        error={noPass === true}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Contraseña"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        {...password}
                                        helperText={noPass ? 'introduce la contraseña' : ''}

                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        error={dist === true || Rep === true}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="reppassword"
                                        label="Repetir contraseña"
                                        type="password"
                                        id="reppassword"
                                        autoComplete="current-password"
                                        {...reppassword}
                                        helperText={dist === true || Rep === true ? err: ''}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        error={noQuestion === true}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="question"
                                        label="Pregunta de seguridad"
                                        name="question"
                                        {...question}
                                        helperText={noQuestion ? 'introduce la pregunta de seguridad' : ''}

                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        error={noAns === true}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="answer"
                                        label="Respuesta a la pregunta"
                                        name="answer"
                                        {...answer}
                                        helperText={noAns ? 'introduce la respuesta a la pregunta de seguridad' : ''}
                                    />
                                </Grid>
                                <Grid item xs={12}>

                                </Grid>
                            </Grid>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={handleRegister}

                            >
                                Registrarse
                            </Button>
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <Link href="/login" variant="body2">
                                        Ya tienes una cuenta? Accede
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </div>
            
            <Box mt={5}>
                <Copyright />
            </Box>
        </Grid>
    );
}

