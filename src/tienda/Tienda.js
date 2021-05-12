import React, { useState, useEffect } from 'react';
import {Card, CardHeader, Collapse, Grid} from '@material-ui/core';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import {FixedSizeList} from "react-window";
import {makeStyles} from "@material-ui/core/styles";
import {getToken} from "../Utils/Common";
import axios from "axios";

let comprados_tipo = [];
let catalogo_tipo = [];

const useStyles = makeStyles((theme) => ({

    root: {
        width: '100%',
        height: 400,
        maxWidth: 300,
        backgroundColor: theme.palette.background.paper,
    },
}));


function Tienda (props){
    comprados_tipo = [];
    catalogo_tipo = [];
    const classes = useStyles();
    let coins = props.location.state.actual_coins;
    console.log(coins);
    let comprados = props.location.state.comprados;
    console.log(comprados);
    let tipo = props.location.state.tipo;
    console.log(tipo);

    if(tipo == "avatar"){
        for (let i = 0; i < comprados.length; i++) {
            let word = comprados[i];
            if (word[0] == 'a') {
                comprados_tipo.push(word);
            }
        }
    }else if(tipo == "banner"){
        for (let i = 0; i < comprados.length; i++) {
            let word = comprados[i];
            if (word[0] == 'b') {
                comprados_tipo.push(word);
            }
        }
    }else if(tipo == "ficha"){
        for (let i = 0; i < comprados.length; i++) {
            let word = comprados[i];
            if (word[0] == 'f') {
                comprados_tipo.push(word);
            }
        }
    }

    console.log(comprados_tipo);




    return(
        <Card>
            <Grid
                container
                spacing={2}
            >
                <Grid
                    xs={6}
                >
                    <CardHeader
                        subheader="Objetos que hay actualmente en la tienda"
                        title="Bienvenido a la Tienda"
                    />
                </Grid>
                <Grid
                    xs={6}
                >
                    <CardHeader
                        subheader={coins}
                        title="Coins"
                    />
                </Grid>
            </Grid>

        </Card>

    );
}


export default Tienda;