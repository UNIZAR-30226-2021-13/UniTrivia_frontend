import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import {Card, CardContent, TextField} from '@material-ui/core';
//import {io,socketIOClient} from "socket.io-client";
import Cheese from './Cheese';
//import Cheese from './Cheese';
import {getToken} from "../Utils/Common";

import {conn} from "../Play";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
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

function Room(props) {
    const classes = useStyles();
    let [coloresAcertados,setColoresAcertados]=useState(["yellow","pink"])
    let [jugadores,setJugadores] = useState([]);
    let [codigoSala,setCodigoSala] = useState(null);
    let [username,setUsername]=useState("");
    let [admin,setAdmin] = useState('');
    let esprimero=true;

    useEffect(() => {
        axios.get('https://unitrivia.herokuapp.com/api/profile',{headers: {
                jwt: getToken()
            }}).then((response) => {
            setUsername(response.data._id);
            console.log(jugadores);
            console.log(response.data._id);
            if (jugadores.length === 0 &&  esprimero) {
                console.log("Es el primero, lo ponemos como admin");
                const list = jugadores.concat(response.data._id);
                setAdmin(response.data._id);
                setJugadores(list);
            } else {
                console.log("Se intenta meter un usuario que ya estaba");
            }
        }).catch((code,message) => {
            console.log(code.response)
        });
    }, []);
    conn.on('nuevoJugador',(user)=> {
        console.log(user);
        console.log(admin);
        if (!jugadores.includes(user)) {
            console.log("Es nuevo de verdad");
            const list = jugadores.concat(user);
            setJugadores(list);
        } else {
            console.log("Se intenta meter un usuario que ya estaba");
        }
    })
    conn.on('cargarJugadores',(users)=>{
        console.log(users);
        console.log(users.jugadores);
        setAdmin(users.jugadores[0]);
        esprimero=false;
        //console.log(users.jugadores.prototype);
        //setJugadores([...users.jugadores]);
        setJugadores(users.jugadores);
    })
    conn.on('abandonoSala',(user)=>{
        console.log("Entramos en abandono de sala "+jugadores);
        var arrayJugadores=jugadores;
        var indexUser=arrayJugadores.indexOf(user);
        if(indexUser>-1){//no ha dado error
            console.log("Hemos sacado el index del jugador que abandona");
            arrayJugadores.splice(indexUser,1); // quitamos el usuario del array de jugadores
            setJugadores(arrayJugadores);
        }else{
            console.log("ha dado error el indexOf");
            setJugadores(arrayJugadores);
        }
    })
    conn.on('cambioLider',({antiguo,nuevo})=>{
        console.log("Antiguo lider: "+antiguo+ " nuevo: "+nuevo);
        var arrayJugadores=jugadores;
        var indexUser=arrayJugadores.indexOf(antiguo);
        if(indexUser>-1){//no ha dado error
            console.log("Hemos sacado el index del jugador que abandona(en cambio Lider)");
            arrayJugadores.splice(indexUser,1); // quitamos el usuario del array de jugadores
            setJugadores(arrayJugadores);
            setAdmin(nuevo);
        }else{
            console.log("ha dado error el indexOf");

        }
    })
    const quesitos=()=>{
        console.log("EStoy en quesitos");
        conn.on('estadoPartida',(info)=>{
            console.log(info);
        })
    }

    const listarJugadores = () => {
        const listJugadores = jugadores.map((jugador)=>
            <li key="{jugador}">{jugador}</li>
        )
        return(
            <List dense className={classes.root}>
                {jugadores.map((value) => {
                    const labelId = `checkbox-list-secondary-label-${value}`;
                    return (
                        <div>
                            <ListItem key={value} button>
                                <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
                                <ListItemSecondaryAction>
                                    <Cheese color={coloresAcertados}></Cheese>
                                </ListItemSecondaryAction>
                            </ListItem>

                        </div>

                    );
                })}
            </List>
        )
    }
    const devolverCodigoSala = () => {
        conn.emit("obtenerIdSala",(id)=>{
            //console.log("En obtener id ");
            console.assert(id!=='','Error al obtener idSala');
            setCodigoSala(id);
            //console.log(id);
        })
        //console.log("El identificador es :");
        return (
            <h6>El codigo de la sala es {codigoSala}</h6>
        )
    }
    const empezarPartida=()=>{
        conn.on('comienzoPartida',()=>{
            console.log("Comienza la partida");
        })
    }
    const botonEmpezar = () => {
        console.log("Estoy en boton: username: "+username+"  y admin  "+admin);
        if(username===admin){
            return(
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={empezarPartida}
                >
                    Empezar Partida
                </Button>
            )
        }
    }
    return (
        <div>
            <div>
                Hola
            </div>
            <div>
                {listarJugadores()}
            </div>
            <div>
                {devolverCodigoSala()}
            </div>
            <div>
                {botonEmpezar()}
            </div>
        </div>

    );
}


export default Room;