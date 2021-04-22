import React from 'react'
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {getToken, getUser, removeUserSession} from "./Utils/Common";
import {io,socketIOClient} from "socket.io-client";
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
               props.history.push('/Game');
           }else{
               console.log("no conectado");
               alert("Fallo al crear sala");
           }
        })
    }

    const unirseSala = ()=>{
        
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
                    onClick={unirseSala}
                >
                    Unirse a sala
                </Button>


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

            {/*<But>hole</But>
                <Popup trigger={<button> Trigger</button>} position="top center">
                    <div>Popup content here !!</div>
                </Popup>

                */}


        </Div>
    );
}


export default Play;