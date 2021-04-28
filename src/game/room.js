import React, {useEffect, useState} from 'react'
import {Card, CardContent, TextField} from '@material-ui/core';
//import {io,socketIOClient} from "socket.io-client";
import {getToken} from "../Utils/Common";

import {conn} from "../Play";

const io = require("socket.io-client");
const http = require("http");

const ENDPOINT = "http://localhost:3000/api/partida";


function Room(props) {
    let [jugadores,setJugadores] = useState(null);
    let [codigoSala,setCodigoSala] = useState(null);
    const listarJugadores = () => {
        /*console.log("antes de listar");
        conn.on('cargarJugadores',(users)=>{
            console.log(users);
            setJugadores(users);
        })
        console.log(jugadores);*/
        console.log("Hola estoy en listar");
    }
    const devolverCodigoSala = () => {


        conn.emit("obtenerIdSala",(id)=>{
            //console.log("En obtener id ");
            console.assert(id!=='','Error al obtener idSala');
            setCodigoSala(id);
            console.log(id);
        })


        console.log("El identificador es :");
        return (
            <h1>El codigo de la sala es {codigoSala}</h1>
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