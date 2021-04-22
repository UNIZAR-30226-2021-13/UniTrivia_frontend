import React, { useEffect } from 'react';
import { Widget, addResponseMessage  } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import {setUserSession,getToken,removeUserSession} from "../Utils/Common";

const io = require("socket.io-client");
const http = require("http");




const ENDPOINT = "http://localhost:3000/api/partida";



function Chat(props){
    let conn = props.socket;

    /*let connTest1 = io(ENDPOINT,{
        extraHeaders:{
            jwt: getToken(),
            operacion: "crearSala",
            priv: "true"
        }
    });*/

    conn.on('chat', ({user, msg})=>{
        let msgFull = '(' + user + ')' + msg;
        addResponseMessage(msgFull);
    })


    const handleNewUserMessage = (newMessage) => {
        console.log(`New message incomig! ${newMessage}`);
        // Now send the message throught the backend API
        conn.emit("mensaje", {newMessage});
        //end backend
        //addResponseMessage("que tal");
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