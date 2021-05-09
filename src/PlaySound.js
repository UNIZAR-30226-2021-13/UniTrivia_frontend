import React, {useState} from 'react';
import Sound from 'react-sound';
import musica from './music/ascensor.mp3'




const PlaySound = (
    handleSongLoading,
    handleSongPlaying
) => {
    const [isPlaying,setIsPlaying]=useState(true)

    return(

        <Sound
            url={musica}
            playStatus={
                isPlaying ?Sound.status.PLAYING:Sound.status.STOPPED
            }
            playFromPosition={300}
            onLoading={handleSongLoading}
            onPlaying={handleSongPlaying}
            loop={true}
        />

    )

}



export default PlaySound;