import React, {useEffect, useState} from 'react'
import {Card, CardContent, TextField} from '@material-ui/core';
//import {io} from "socket.io-client";

const ENDPOINT = "http://unitrivia.herokuapp.com";


function Room() {
    const [response, setResponse] = useState("");

    /*useEffect(() => {
        const socket = io(ENDPOINT);
        //const socket = socketIOClient(ENDPOINT);
        socket.on("crearSala", data => {
            setResponse(data);
            //console.log(data)
        });
    }, []);*/

    return (
        <Card>
            <CardContent>

                <TextField value={'Esto es la sala'}>

                </TextField>

            </CardContent>
        </Card>

    );
}


export default Room;