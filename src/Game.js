import React from 'react'
import IconButton from "@material-ui/core/IconButton";
import {ArrowBack} from "@material-ui/icons";
import {green} from "@material-ui/core/colors";
//style={{ color: green[500] }}


class Game extends React.Component {
    render() {
        //const classes = useStyles();


        return (
            <div>
                <IconButton color="primary" aria-label="add an alarm" href={'/Play'}>
                    <ArrowBack color="primary"/>
                    Volver
                </IconButton>
            <h1>Pedazo de juego</h1>
            <img src={'/images/tablero/tablero.png'} height={700} align={'center'}/>
            </div>
        );
    }
}


export default Game;