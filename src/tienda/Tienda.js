import React, { useState, useEffect } from 'react';
import {Card, CardHeader, Collapse, Grid} from '@material-ui/core';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {ArrowBack, ExpandLess, ExpandMore} from "@material-ui/icons";
import {FixedSizeList} from "react-window";
import {makeStyles} from "@material-ui/core/styles";
import {getToken} from "../Utils/Common";
import axios from "axios";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import PropTypes from "prop-types";
import async from "async";
import IconButton from "@material-ui/core/IconButton";

let comprados_tipo = [];
let catalogo_tipo_no_reps = [];
let tipo = undefined;

const useStyles = makeStyles((theme) => ({

    root: {
        width: '100%',
        height: 400,
        maxWidth: 300,
        backgroundColor: theme.palette.background.paper,
    },
}));







function Tienda (props){
    let comprados_tipo = [];
    let catalogo_tipo_no_reps = [];
    const [numObj, setnum] = useState(null);
    const [cat, setCat] = useState(null);
    let catalogo_tipo = undefined;
    const classes = useStyles();
    let coins = props.location.state.actual_coins;
    console.log(coins);
    let comprados = props.location.state.comprados;
    console.log(comprados);
    let tipo = props.location.state.tipo;
    console.log(tipo);
    let header = null;

    if(tipo == "Avatar"){
        header = "Bienvenido a la Tienda de Avatares"
        for (let i = 0; i < comprados.length; i++) {
            let word = comprados[i];
            if (word[0] == 'a') {
                comprados_tipo.push(word);
            }
        }
    }else if(tipo == "Banner"){
        header = "Bienvenido a la Tienda de Banners"
        for (let i = 0; i < comprados.length; i++) {
            let word = comprados[i];
            if (word[0] == 'b') {
                comprados_tipo.push(word);
            }
        }
    }else if(tipo == "Ficha"){
        header = "Bienvenido a la Tienda de Formas de Ficha"
        for (let i = 0; i < comprados.length; i++) {
            let word = comprados[i];
            if (word[0] == 'f') {
                comprados_tipo.push(word);
            }
        }
    }

    console.log(comprados_tipo);



    useEffect(() => {
       axios.get('https://unitrivia.herokuapp.com/api/tienda/catalogo',{headers: {
                tipo: tipo
            }}).then((response) => {

            catalogo_tipo = response.data;
            console.log(catalogo_tipo);
            console.log(response.data);
            console.log(response);
            //quitamos de la tienda lo que ya tenemos
            let index = 0;
            for(let i = 0; i < catalogo_tipo.length; i++){
                let lo_tengo = false;
                for(let j = 0; j < comprados_tipo.length; j++){
                    console.log(catalogo_tipo[i].nombre);
                    if(catalogo_tipo[i].nombre == comprados_tipo[j]){
                        lo_tengo = true;
                    }

                }
                if(!lo_tengo){
                    catalogo_tipo_no_reps[index] = catalogo_tipo[i];
                    index++;
                }
            }
            if(catalogo_tipo_no_reps.length == 0){
                alert("Ya tienes todos los objetos")
            }
            console.log(catalogo_tipo_no_reps.length);
            setCat(catalogo_tipo_no_reps);
            setnum(catalogo_tipo_no_reps.length);
        }).catch((code,message) => {
            console.log(code.response)
            console.log(message)

        });
    }, []);


    function renderRow(props){
        const { index, style } = props;
        console.log(cat);
        let precio = cat[index].precio + " coins";
        const clickBuy = () => {


            console.log("clickado " + cat[index].nombre);
            if(cat[index].precio > coins){
                alert("No dispone de suficientes coins para comprar este objeto");
            }else{
                let aceptar = window.confirm("Presione en OK para comprar " + cat[index].nombre + " por " + cat[index].precio + " coins");
                if(aceptar === true) {
                    axios.post('https://unitrivia.herokuapp.com/api/tienda/comprar', {}, {
                        headers: {
                            nombre: cat[index].nombre,
                            jwt: getToken()
                        }
                    }).then(response => {

                        //setUserSession(response.data.token, response.data.user);
                        alert("Adquirido");
                        setTimeout(function(){console.log("esperamos server reaccione")}, 1000);
                        window.history.go(-1);
                    }).catch(error => {

                        alert('Error al cambiar forma de ficha');
                    });
                }
            }
        }

        let current = undefined;
        if(tipo == "Avatar"){
            current = '/images/avatars/' + cat[index].nombre + '.jpg';
            return(

                <ListItem button style={style} key={index} onClick={clickBuy}>
                    <ListItemAvatar>
                        <Avatar
                            src={current}
                        >

                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={cat[index].nombre}
                        secondary={precio}
                    />
                </ListItem>

            )
        }else if(tipo == "Banner"){
            current = '/images/banners/' + cat[index].nombre + '.jpg';
            return(
                <div>
                <ListItem button style={style} key={index} onClick={clickBuy}>
                    <ListItemAvatar>
                        <img
                            src={current}
                            width="600"
                            height="75"
                        >

                        </img>
                    </ListItemAvatar>
                    <ListItemText
                        primary={cat[index].nombre}
                        secondary={precio}
                    />
                </ListItem>
                </div>

            )
        }else if(tipo == "Ficha"){
            current = '/images/fichas/' + cat[index].nombre + '.png';
            return(

                <ListItem button style={style} key={index} onClick={clickBuy}>
                    <ListItemAvatar>
                        <Avatar
                            src={current}
                        >

                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={cat[index].nombre}
                        secondary={precio}
                    />
                </ListItem>

            )
        }else{
            return(null);
        }

    }

    renderRow.propTypes = {
        index: PropTypes.number.isRequired,
        style: PropTypes.object.isRequired,
    };
    return(
        <Card>
            <IconButton color="secondary" variant="contained" aria-label="add an alarm" href={'/profile'}>
                <ArrowBack color="primary"/>
                Volver
            </IconButton>
            <Grid
                container
                spacing={2}
            >
                <Grid
                    xs={6}
                >
                    <CardHeader
                        subheader="Objetos que hay actualmente en la tienda"
                        title={header}
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
            <List>
                <div className={classes.demo}>
                    <FixedSizeList height={300} width={1500} itemSize={80} itemCount={numObj}>
                        {renderRow}
                    </FixedSizeList>
                </div>
            </List>
        </Card>

    );
}


export default Tienda;