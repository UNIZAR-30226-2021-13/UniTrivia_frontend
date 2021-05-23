import React, {useEffect} from 'react';
import AppBar from './home/AppBar'
import {getToken, getUser, removeUserSession} from "./Utils/Common";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import {HelpOutline} from "@material-ui/icons";
import Popup from "reactjs-popup";

const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #effaff;
  transform: ${({open}) => open ? 'translateX(0)' : 'translateX(-100%)'};
  height: 90vh;
  text-align: center;
  padding: 1rem;
  position: absolute;
  top: 0;
  left: 0;


  transition: transform 0.3s ease-in-out;

  @media (max-width: 576px) {
    width: 100%;
  }

  a {
    font-size: 2rem;
    text-transform: uppercase;
    padding: 1rem 0;
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
      cursor: pointer;
    }
  }

  button {
    font-size: 2rem;
    text-transform: uppercase;
    padding: 1rem 0;
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
      cursor: pointer;
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

function Home(props) {

    useEffect(() => {

        /*if(getUser()!=null){
            props.history.push('/menu');
        }*/
    }, []);
  return (
      <React.Fragment >
          <Grid container>
          <Grid item xs={4}>
          <StyledMenu open={true}>
              <h1>UNITRIVIA</h1>
              <h2></h2>
              <Button href="/Login">
                  <span role="img" aria-label="about us">🔓</span>
                  LOGIN
              </Button>
              <Button href="/Register" >
                  <span role="img" aria-label="price">✏️</span>
                  SIGN UP
              </Button>
              <br></br>
              <br></br>
              <br></br>
              <Grid container style={{align: 'center'}}>
                  <Grid item xs={6}>

                      <Popup trigger={
                            <Button style={{fontSize: '1rem'}}>
                                  <span role="img" aria-label="price">🎨️</span>
                                  Autores
                            </Button>} position="right bottom" >
                          <div>

                              <li><font size={2}>ALEJANDRO ARTAL</font></li>
                              <li><font size={2}>DANIEL BENEDÍ</font></li>
                              <li><font size={2}>DIEGO BIELSA</font></li>
                              <li><font size={2}>ÓSCAR GÓMEZ</font></li>
                              <li><font size={2}>IBÓN CAÑETE</font></li>
                              <li><font size={2}>VÍCTOR HERNANDEZ</font></li>
                          </div>
                      </Popup>

                  </Grid>

                  <Grid item xs={6}>

                      <Popup contentStyle={{width: '1000px', height: '600px'}} trigger={
                          <Button style={{fontSize: '1rem'}}>
                              <span role="img" aria-label="price">⚔</span>
                              Reglas
                          </Button>} position="right bottom" >
                          <div style={{width: '1000px', height: '600px'}}>

                              <li><font size={2}>El juego permite de 2-6 jugadores.</font></li>
                                  <li><font size={2}>Se jugará de forma individual.</font></li>
                              <li><font size={2}>Las preguntas contarán con un límite de tiempo de 60 segundos.</font></li>
                              <li><font size={2}>El juego se desarrollará sobre un tablero reducido.</font></li>
                              <li><font size={2}>El orden de comienzo de los jugadores será aleatorio.</font></li>
                              <li><font size={2}>Cuando llegue el turno del jugador, realizará una tirada de dados, en función del valor le permitirá moverse hacia cualquier dirección legal.</font></li>
                              <li><font size={2}>Un movimiento legal está definido por:</font></li>
                              <li><font size={2}>Se puede mover en sentido horario o antihorario y en caso de estar en un radio avanzar hacia el anillo o el centro pero no se puede ni ocupar ni atravesar esta casilla.</font></li>
                              <li><font size={2}>Se puede ir de un radio al anillo exterior.</font></li>
                              <li><font size={2}>No se puede invertir el sentido en medio de un movimiento.</font></li>
                              <li><font size={2}>No se puede volver a los radios una vez has salido al anillo exterior.</font></li>
                              <li><font size={2}>Si el jugador cae en una casilla de dado el jugador deberá tirar de nuevo y realizar un movimiento en cualquier dirección legal</font></li>
                              <li><font size={2}>Si el jugador cae en una casilla normal se le plantea una pregunta correspondiente a la categoría del color, en caso de responder correctamente podrá tirar de nuevo.</font></li>
                              <li><font size={2}>Si el jugador cae en una casilla de quesito se le plantea una pregunta correspondiente a la categoría del color, en caso de responder correctamente podrá tirar de nuevo y ganará un quesito del color correspondiente en caso de no tenerlo.</font></li>
                              <li><font size={2}>Si el jugador responde erróneamente a la pregunta dará por finalizado su turno.</font></li>
                              <li><font size={2}>Cuando un jugador consigue los 6 quesitos se proclama vencedor y acaba el juego.</font></li>

                          </div>
                      </Popup>

                  </Grid>
              </Grid>

          </StyledMenu>
          </Grid >
            <Grid item xs={6} style={{ height: '80vh', width: '120vh',   display: 'flex'
                }}>


                <img src={'/images/tablero/tablero.png'} ></img>

            </Grid>

          </Grid>
      </React.Fragment>
  );
}

export default Home;
