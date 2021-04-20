import React, { useEffect } from 'react';
import { Widget, addResponseMessage  } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';

const io = require("socket.io-client");
const http = require("http");




const ENDPOINT = "http://unitrivia.herokuapp.com/api/partida";



function Chat(props){

    let conn = undefined;
    let conexion = undefined;

    useEffect(() => {
        conn = io(ENDPOINT);
        conn.on("connect");
    }, []);

    const handleNewUserMessage = (newMessage) => {
        console.log(`New message incomig! ${newMessage}`);
        // Now send the message throught the backend API
        conn.emit("mensaje", "Hola a todos")
        //end backend
        addResponseMessage("que tal");
    }

    return (
        <div className="Chat">
            <Widget
                handleNewUserMessage={handleNewUserMessage}
                title="CHAT"
                subtitle="Chat de la sala actual"
            />

        </div>
    );

}

export default Chat;