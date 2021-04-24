import React, { useState } from 'react'
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {getToken, getUser, removeUserSession, setConn} from "./Utils/Common";
import {io,socketIOClient} from "socket.io-client";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalHeader, ModalBody, ModalFooter, Input, Label} from "reactstrap";
import TextField from "@material-ui/core/TextField";

const ENDPOINT = "http://localhost:3000/api/partida";

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

function Play(props) {
    const classes = useStyles();
    let conn = undefined;
    const [connPassed, Pass] = useState(null);
    const [modalAbierto ,modalAbiertoState] = useState(false);

    const code = useFormInput('');

    const crearSala = ()=>{
        console.log("comienza crearSala");
        let sala=undefined;
        let conectado=false;
        conn = io(ENDPOINT,{
            extraHeaders:{
                jwt:getToken(),
                operacion: "crearSala",
                priv:"true"
            }
        });


       conn.on("connect",()=>{
           conectado=conn.connected;
           console.log(conn.connected);
           console.log(conectado);
           console.log(conn.disconnected);
           console.log(conn.nsp);
           console.log(conn);
           if(conectado==true){
               console.log("Conectado");
               setConn(conn);
               props.history.push('/Game');
           }else{
               console.log("no conectado");
               alert("Fallo al crear sala");
           }
        })
    }

    const abrirModal = () =>{
        modalAbiertoState(!modalAbierto);
    }

    const unirseSala = ()=>{
        let salaAct = code.value;
        let conectado = undefined;
        console.log(salaAct);

        conn = io(ENDPOINT,{
            extraHeaders:{
                jwt:getToken(),
                operacion: "unirseSala",
                sala: salaAct
            }
        });

        conn.on("connect",()=>{
            conectado=conn.connected;
            if(conectado==true){
                console.log("Conectado");
                setConn(conn);
                props.history.push('/Game');
            }else{
                console.log("no conectado");
                alert("Fallo al unirse a sala");
            }
        })
    }

    return (

        <Div>
            <h3>UniTrivia</h3>
            JUGAR<br/><br/>
            <div>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    href={'/Sala'}
                >
                    Partida aleatoria
                </Button>
            </div>
            <div style={{marginTop: 10}}>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={crearSala}
                >
                    Crear sala
                </Button>
            </div>
            <div style={{marginTop: 10}}>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={abrirModal}
                >
                    Unirse a sala
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

            </div>
            <div style={{marginTop: 100}}>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    href={'/Menu'}
                >
                    Atrás
                </Button>


            </div>






        </Div>
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