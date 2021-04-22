import React, {useEffect} from 'react'
import {Card, CardContent, TextField} from '@material-ui/core';
import {io,socketIOClient} from "socket.io-client";
import {getToken} from "../Utils/Common";

const http = require("http");

const ENDPOINT = "http://localhost:3000/api/partida";


function Room() {

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