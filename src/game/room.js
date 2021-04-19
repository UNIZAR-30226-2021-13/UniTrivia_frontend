import React, {useEffect} from 'react'
import {Card, CardContent, TextField} from '@material-ui/core';
import {io,socketIOClient} from "socket.io-client";
import {getToken} from "../Utils/Common";

const http = require("http");

const ENDPOINT = "http://localhost:3000/";


function Room() {

    useEffect(() => {
        /*const socket = io('http://localhost:3000',{path: '/api/partida'});
        socket.on('connect',()=>{

        })*/
       // const socket = socketIOClient(ENDPOINT);

        const conn = io("http://localhost:3000/api/partida", {
            withCredentials: true,
            extraHeaders: {
                jwt: getToken(),
                operacion: "crearSala",
                priv: "true"
            }
        });
        conn.on("connect", () => {
            conn.emit("mensaje", "Hola Mundo");
        })
        console.log(conn.id)
        console.log('hola')

        //const socket = socketIOClient(ENDPOINT);
        //const socket = socketIOClient(ENDPOINT);

        /*socket.on('connect',()=>{
            console.log(socket.id)

            console.log('hola')
        });*/

    }, []);

    return (
        <Card>
            <CardContent>

                <TextField>

                </TextField>

            </CardContent>
        </Card>

    );
}


export default Room;