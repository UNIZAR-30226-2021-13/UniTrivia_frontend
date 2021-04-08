import React from 'react'
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {removeUserSession} from "./Utils/Common";

const But=styled.button`
  background-color: #fce2e2;
  font-size: 32px;
  color: #6c6ce3;
`;

const Div=styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  margin: 2em auto;

  @media screen and (min-width: 1180px) {
    width: 50%;
  }
`;

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://img.freepik.com/vector-gratis/modelo-inconsutil-pregunta-papel-aislada-realista-decoracion-invitacion-concepto-concurso-trivia_269299-1004.jpg?size=626&ext=jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
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
}));

function Menu() {
    const classes = useStyles();


    return (

        <Div>
            <h3>UniTrivia</h3>
            MENÚ<br/><br/>
            <div>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Jugar
                </Button>
            </div>
            <div style={{marginTop: 10}}>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    href={'/profile'}
                >
                    Perfil
                </Button>
            </div>
            <div style={{marginTop: 10}}>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    href={'/Settings'}
                >
                    Ajustes
                </Button>


            </div>
            <div style={{marginTop: 100}}>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    href={'/Login'}
                    onClick={removeUserSession}
                >
                    Cerrar sesión
                </Button>


            </div>

            {/*<But>hole</But>
                <Popup trigger={<button> Trigger</button>} position="top center">
                    <div>Popup content here !!</div>
                </Popup>

                */}


        </Div>
    );
}


export default Menu;