import React, { useState,useEffect } from 'react';
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import {MusicNote, MusicOff, Speaker, VolumeMute, VolumeMuteOutlined, VolumeOff, VolumeUp} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import Sound from 'react-sound';
import musica from './music/ascensor.mp3'

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
    const [sounds, setSounds] = useState(false);
    const [music, setMusic] = useState(false);

    const cambiarSonido = () =>{
        setSounds(!sounds);
    }
    const cambiarMusica = () =>{
        setMusic(!music);
    }

    return(
        <div>
            <div>
                <IconButton onClick={cambiarSonido}>
                    {sounds ? <VolumeUp/>:<VolumeOff/>}
                </IconButton>
            </div>
            <div>
                <IconButton onClick={cambiarMusica}>
                    {music ? <MusicNote/>:<MusicOff/>}
                </IconButton>
            </div>
            <Sound
                url={musica}
                playStatus={
                    music ?Sound.status.PLAYING:Sound.status.PAUSED
                }
                playFromPosition={300}
                loop={true}
                volume={20}
            />
        </div>
        );

}
export default Settings;