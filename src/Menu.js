import React from 'react'
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {getUser, removeUserSession} from "./Utils/Common";
import {Card, CardContent} from "@material-ui/core";

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

const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #effaff;
  transform: ${({open}) => open ? 'translateX(0)' : 'translateX(-100%)'};
  height: 90vh;
  text-align: center;
  padding: 2rem;


  transition: transform 0.3s ease-in-out;

  @media (max-width: 576px) {
    width: 100%;
  }

  a {
    font-size: 2rem;
    text-transform: uppercase;
    padding: 2rem 0;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: #0D0C1D;
    text-decoration: none;
    transition: color 0.3s linear;

    @media (max-width: 576px) {
      font-size: 1.5rem;
      text-align: center;
    }

    &:hover {
      color: #343078;
    }
  }

  H1 {
    font-size: 4rem;
    text-transform: uppercase;
    padding: 2rem 0;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: #0D0C1D;
    text-decoration: none;
    transition: color 0.3s linear;

    @media (max-width: 576px) {
      font-size: 1.5rem;
      text-align: center;
    }


  }

  H2 {
    font-size: 2rem;
    text-transform: uppercase;
    padding: 2rem 0;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: #0D0C1D;
    text-decoration: none;
    transition: color 0.3s linear;

    @media (max-width: 576px) {
      font-size: 1.5rem;
      text-align: center;
    }


  }

`

const A = styled.a`
  font-size: 2rem;
  text-transform: uppercase;
  padding: 2rem 0;
  font-weight: bold;
  letter-spacing: 0.5rem;
  color: #0D0C1D;
  text-decoration: none;
  transition: color 0.3s linear;
  

  @media (max-width: 576px) {
    font-size: 1.5rem;
    text-align: center;
  }

  &:hover {
    color: #343078;
    
  }
`


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

        <Card>
            <CardContent>

            <StyledMenu open={true}>
                <h1>UNITRIVIA</h1>
                <h2>MENÚ</h2>
                <Button href="/Play">
                    <span role="img" aria-label="about us">🎮️</span>
                    JUGAR
                </Button>
                <Button href="/profile" disabled={getUser() == null}>
                    <span role="img" aria-label="price">💇‍♀️</span>
                    PERFIL
                </Button>
                <Button href="/Login" onClick={removeUserSession}>
                    <span role="img" aria-label="contact">❌</span>
                    CERRAR SESIÓN
                </Button>
            </StyledMenu>

                </CardContent>

            {/*<But>hole</But>
                <Popup trigger={<button> Trigger</button>} position="top center">
                    <div>Popup content here !!</div>
                </Popup>

                */}


        </Card>
    );
}


export default Menu;