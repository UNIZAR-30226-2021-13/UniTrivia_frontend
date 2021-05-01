import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import {Card, CardContent, TextField} from '@material-ui/core';
//import {io,socketIOClient} from "socket.io-client";
import {getToken} from "../Utils/Common";

import {conn} from "../Play";
import Button from "@material-ui/core/Button";
import axios from "axios";

const io = require("socket.io-client");
const http = require("http");

const ENDPOINT = "http://localhost:3000/api/partida";


function Room(props) {
    let [jugadores,setJugadores] = useState([]);
    let [codigoSala,setCodigoSala] = useState(null);
    let [username,setUsername]=useState("");
    let [admin,setAdmin] = useState('');
    let esprimero=true;
    let [nuevoJugador,setNuevoJugador]=useState(false);

    useEffect(() => {
        axios.get('https://unitrivia.herokuapp.com/api/profile',{headers: {
                jwt: getToken()
            }}).then((response) => {
            setUsername(response.data._id);
            console.log(jugadores);
            console.log(response.data._id);
            if (jugadores.length==0 &&  esprimero) {
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

    const listarJugadores = () => {
        const listJugadores = jugadores.map((jugador)=>
            <li key="{jugador}">{jugador}</li>
        )
        return(
            <div>
                <h6>Ey voy a listar los jugadores</h6>
                <h6>{listJugadores}</h6>
            </div>
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
    const botonEmpezar = (newMessage) => {

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
        </div>

    );
}


export default Room;