import React, {useEffect, useState} from 'react'
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {getToken} from "./Utils/Common";
import {io} from "socket.io-client";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import {Card, CardContent} from "@material-ui/core";

const ENDPOINT = "https://unitrivia.herokuapp.com/api/partida";
//const ENDPOINT = "http://localhost:3000/api/partida";

const debug = true;

export let conn = undefined;

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
  padding: 1rem;


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

function Play(props) {
    const classes = useStyles();
    const [connPassed, Pass] = useState(null);
    const [modalAbierto ,modalAbiertoState] = useState(false);
    let [esReconexion, setReconexion] = useState(false);
    const code = useFormInput('');

    useEffect( () => {


    }, []);

    const crearSala = ()=>{
        console.assert(!debug,"comienza crearSala");
        conn = io(ENDPOINT,{
            extraHeaders:{
                jwt: getToken(),
                operacion: "crearSala",
                priv:"true"
            }
        });
        conn.on("connect",()=>{
            console.assert(!debug,conn.connected);
            console.assert(!debug,conn.disconnected);
            console.assert(!debug,conn.nsp);
            console.assert(!debug,conn);
            if(conn.connected === true){
                console.assert(!debug,"Conectado");
                props.history.push('/Game');
            }else{
                console.assert(!debug,"No conectado");
                alert("Fallo al conectar con el servidor");
            }
        })

    }


    const abrirModal = () =>{
        modalAbiertoState(!modalAbierto);
    }

    const unirseSala = ()=>{
        let salaAct = code.value;
        console.assert(!debug,salaAct);

        conn = io(ENDPOINT,{
            extraHeaders:{
                jwt:getToken(),
                operacion: "unirseSala",
                sala: salaAct
            }
        });
        conn.on("connect",()=>{
            console.assert(!debug,conn.connected);
            console.assert(!debug,conn.disconnected);
            console.assert(!debug,conn.nsp);
            console.assert(!debug,conn);
            let sala="";
            conn.emit("obtenerIdSala",(id)=>{
                //this.state.codigoSala = id;
                sala = id;
            })
            console.assert(!debug,sala)
            if(conn.connected === true && sala !== ""){
                console.assert(!debug,"Conectado");
                props.history.push('/Game');
            }else{
                console.assert(!debug,"No conectado");
                alert("Fallo al conectar con el servidor");
            }
        })
    }

    const partidaAleatoria = () =>{
        conn = io(ENDPOINT,{
            extraHeaders:{
                jwt:getToken(),
                operacion: "buscarPartida"
            }
        });
        conn.on("connect",()=>{
            console.assert(!debug,conn.connected);
            console.assert(!debug,conn.disconnected);
            console.assert(!debug,conn.nsp);
            console.assert(!debug,conn);
            if(conn.connected === true){
                console.assert(!debug,"Conectado");
                props.history.push('/Game');
            }else{
                console.assert(!debug,"No conectado");
                alert("Fallo al conectar con el servidor");
            }
        })
    }

    const reconexion = () =>{
        console.assert(!debug,conn);
        conn = undefined;
        console.assert(!debug,conn);
        let conectado = undefined;

        conn = io(ENDPOINT,{
            extraHeaders:{
                jwt:getToken(),
                operacion: "reconexion"
            }
        });

        console.assert(!debug,conn);
        conn.on("connect",()=>{
            conectado=conn.connected;
            if(conectado==true){
                console.assert(!debug,"Conectado");
                props.history.push('/Game');
            }else{
                console.assert(!debug,"no conectado");
                alert("Fallo al reconectar a partida");
            }
        })
    }

    axios.get(ENDPOINT + "/reconexion",{headers: {
            jwt: getToken()
        }}).then((response) => {
        setReconexion(response.data !== "");

    }).catch((code, message) => {
        console.assert(!debug,code.response)
    });

    return (
            <Card>
                <CardContent>

                    <StyledMenu open={true}>
                        <h1>UNITRIVIA</h1>
                        <h2>JUGAR</h2>
                        <Button onClick={partidaAleatoria}
                           disabled={esReconexion}>
                            <span role="img" aria-label="about us">🔎</span>
                            PARTIDA ALEATORIA
                        </Button>
                        <Button  onClick={crearSala}
                           disabled={esReconexion}>
                            <span role="img" aria-label="price">🛠</span>
                            CREAR SALA
                        </Button>
                        <Button onClick={abrirModal}
                           disabled={esReconexion}>
                            <span role="img" aria-label="contact">🤝</span>
                            UNIRSE A SALA
                        </Button>
                        <Modal isOpen={modalAbierto == true}>
                            <ModalHeader>
                                Escriba el código de sala
                            </ModalHeader>
                            <ModalBody>

                                <form className={classes.form} noValidate>
                                    <TextField

                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="code"
                                        label="Código"
                                        name="code"
                                        autoComplete="Codigo"
                                        autoFocus
                                        {...code}

                                    />
                                </form>

                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    onClick={unirseSala}

                                >
                                    Confirmar Código
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    onClick={abrirModal}

                                >
                                    Cerrar
                                </Button>

                            </ModalFooter>
                        </Modal>
                        <Button onClick={reconexion}
                           disabled={!esReconexion}>
                            <span role="img" aria-label="contact">🔄</span>
                            RECONECTAR
                        </Button>
                        <a href={'/Menu'}>
                            <span role="img" aria-label="contact">⬅</span>
                            ATRÁS
                        </a>
                    </StyledMenu>

                </CardContent>
            </Card>

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



export default Play;