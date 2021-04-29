import React, {useEffect, useState} from 'react'
import {Card, CardContent, TextField} from '@material-ui/core';
//import {io,socketIOClient} from "socket.io-client";
import {getToken} from "../Utils/Common";

import {conn} from "../Play";
import Button from "@material-ui/core/Button";

const io = require("socket.io-client");
const http = require("http");

const ENDPOINT = "http://localhost:3000/api/partida";


function Room(props) {
    let [jugadores,setJugadores] = useState(null);
    let [codigoSala,setCodigoSala] = useState(null);
    let [user1,setUser1] = useState(null);
    conn.on('nuevoJugador',(user)=>{
        console.log(user);
        //setJugadores(user.jugadores)
    })
    //console.log(conn);
    /*const listarJugadores = () => {
        conn.on('nuevoJugador',(user)=>{
            console.log(user);
        })
    }*/
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

            </div>
            <div>
                {devolverCodigoSala()}
            </div>
        </div>

    );
}


export default Room;