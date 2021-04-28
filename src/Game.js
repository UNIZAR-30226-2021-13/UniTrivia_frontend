import React, {useEffect} from 'react'
import IconButton from "@material-ui/core/IconButton";
import {ArrowBack} from "@material-ui/icons";
import {green} from "@material-ui/core/colors";
import {Card, CardContent, Grid} from "@material-ui/core";
//style={{ color: green[500] }}
import Chat from "./game/chat";
import Room from "./game/room";
import Container from "@material-ui/core/Container";
import {Box, Popover, Typography } from "@material-ui/core";
import {conn} from "./Play";
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Button from '@material-ui/core/Button';
import Quiz from './game/Quiz';


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


        return (

            <Box>

                <Container>
                    <Grid item xs={12}>
                        <Grid container direction="row">
                            <Room></Room>
                        </Grid>
                         <Card style={{ color: green[500] }} >
                             <CardContent>
                            <Grid  item
                                   lg={8}
                                   md={12}
                                   xl={9}
                                   xs={12}>
                                <div>
                                    <IconButton color="secondary" variant="contained" aria-label="add an alarm" href={'/Play'}>
                                        <ArrowBack color="primary"/>
                                        Volver
                                    </IconButton>
                                    <h1>Pedazo de juego</h1>
                                    <img src={'/images/tablero/tablero.png'} height={500} align={'center'}/>
                                </div>

                            </Grid>
                             </CardContent>
                         </Card>
                        <Chat></Chat>
                    </Grid>
                </Container>
                <BackButtonListener/>
                <div>
                    <PopupState variant="popover" popupId="demo-popup-popover">
                        {(popupState) => (
                            <div>
                                <Button variant="contained" color="primary" {...bindTrigger(popupState)} disabled={false} >
                                    Responder Pregunta
                                </Button>
                                <Popover
                                    {...bindPopover(popupState)}
                                    anchorReference="anchorPosition"
                                    anchorPosition={{ top: 100, left: 400 }}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'center',
                                    }}
                                    transformOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center',
                                    }}
                                >
                                    <Box p={2}>
                                        <Typography>Responda a la pregunta.</Typography>
                                        <Quiz></Quiz>
                                    </Box>
                                </Popover>
                            </div>
                        )}
                    </PopupState>

                </div>

            </Box>


        );

}


export default Game;