import React, {useEffect} from 'react'
import IconButton from "@material-ui/core/IconButton";
import {ArrowBack, HelpOutline} from "@material-ui/icons";
import {green} from "@material-ui/core/colors";
import {Card, CardContent, Grid} from "@material-ui/core";
//style={{ color: green[500] }}
import Chat from "./game/chat";
import Room from "./game/room";
import Board from "./game/Board";

import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import {conn} from "./Play";

const BackButtonListener = ({children}) => {

    useEffect(() => {
        window.onpopstate = () => {
            alert("Acaba de abandonar la partida");
            window.location.reload(true);

        }
    })

    return null;
};


function Game(props) {
        console.log("Estoy en game");
        console.log(conn);
        //const classes = useStyles();

    /*
        return (

                    <Grid container spacing={2}>
                        <Grid item xs={2} direction="row">
                            <Room></Room>
                        </Grid>
                        <Grid item xs={8} >
                         <Card style={{ color: green[500] }} >
                             <CardContent>

                                <div>
                                    <IconButton color="secondary" variant="contained" aria-label="add an alarm" href={'/Play'}>
                                        <ArrowBack color="primary"/>
                                        Volver
                                    </IconButton>
                                    <IconButton color="secondary" variant="contained" >
                                        <HelpOutline color="primary"/>

                                    </IconButton>

                                </div>
                                <Board></Board>

                             </CardContent>
                         </Card>
                        </Grid>
                        <Chat></Chat>
                        <BackButtonListener/>
                    </Grid>

        );
        */
    return (
        <Grid container spacing={2}>
            <Board></Board>
            <Chat></Chat>
            <BackButtonListener/>
        </Grid>

    );
}


export default Game;