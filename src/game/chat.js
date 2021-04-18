import React, {useEffect, useState} from 'react';
import {Card, CardContent, TextField} from '@material-ui/core';
import {io} from "socket.io-client";
import { Form, InputGroup } from 'react-bootstrap';
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";

const ENDPOINT = "http://localhost:3000/api/partida";

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

function ChatWindow(){
    const [text, setText] = useState('');
    const classes = useStyles();


    function handleSubmit(e){
        //aqui iria el socket.io
    }

    return(
        <div >
            <div >

            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <InputGroup>
                        <Form.Control

                                as="textarea"
                                required
                                value={text}
                                onChange={e => setText(e.target.value)}
                                style={{ height: '75px', resize: 'none'}}
                        />
                        <InputGroup.Append>
                                <Button
                                    type="submit"
                                    className={classes.submit}
                                    variant="contained"
                                    color="primary"
                                >
                                    Send
                                </Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
            </Form>
        </div>
    )
}

export default ChatWindow;