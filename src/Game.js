import React, {useEffect} from 'react'
import IconButton from "@material-ui/core/IconButton";
import {ArrowBack} from "@material-ui/icons";
import {green} from "@material-ui/core/colors";
import {Card, CardContent, Grid} from "@material-ui/core";
//style={{ color: green[500] }}
import Chat from "./game/chat";
import Room from "./game/room";
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

            </Box>


        );

}


export default Game;