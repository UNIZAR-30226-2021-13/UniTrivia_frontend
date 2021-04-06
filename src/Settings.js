import React, { useState,useEffect } from 'react';
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        
    },
    but:{
        display: 'flex',
        backgroundRepeat: 'repeat-x',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '10%',

    }
}));


function Settings(){
    const classes = useStyles();
    const [play, setPlay] = useState("On");
    const [music, setMusic] = useState("On");
    function changePlay(){
        if(play=="On"){
            setPlay("Off")
        }else {
            setPlay("On")
        }
    } 
    function changeMusic(){
        if(music=="On"){
            setMusic("Off")
        }else if (music=="Off"){
            setMusic("On")
        }
    }
    return(
        <div className={classes.paper}>
            <Button className={classes.but} onClick={() => changePlay()}>Sonido {play}</Button>
            <Button className={classes.but} onClick={() => changeMusic()}>Musica {music}</Button>
        </div>
    );
}
export default Settings;