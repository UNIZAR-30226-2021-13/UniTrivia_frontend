import React, {useEffect} from 'react'
import {Card, CardContent, Grid, TextField} from '@material-ui/core';
import {io,socketIOClient} from "socket.io-client";
import {getToken} from "../Utils/Common";
import { CELL_SIZE, CELL_MARGIN, CODES } from './constants';
import styled from 'styled-components';
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
const tamano=90;

const useStyles = makeStyles((theme) => ({
    '@global': {
        '.cssjss-advanced-global-root': {
            height: 100,
            width: 100,
            backgroundColor: 'blue',
            borderLeft:  65,
            borderRight:  10,
            borderBottom: 100,
            borderTop: 0,
        },
        '.cssjss-advanced-global-child': {
            height: 8,
            backgroundColor: 'red',
        },
    },
    trapecio: {
        marginTop: 80,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0,
        width: 100 * .8,
        height: 100 * .8,
        borderLeft:  '65px transparent solid',
        borderRight: '65px transparent solid',
        borderBottom: '100px solid',
        borderTop: '0px solid',
        padding: '0 30px',
        backgroundImage: "https://mdn.mozillademos.org/files/11991/startransparent.gif",
    }
}));
//<img src={'/images/avatars/sol.png'} alt={'asfd'}/>
function Tile(props) {
    const classes = useStyles();

    return (
        
            <Button onClick={() => { alert('pulsado') }}>
                Casilla {props.numero} x={props.x}, y={props.y}
            </Button>


    );
}


export default Tile;