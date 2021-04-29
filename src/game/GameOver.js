
import styled from 'styled-components'
import React from 'react'
import Button from '@material-ui/core/Button';


const Title = styled.h1`
    margin-top: 4em;
    font-size: 48px;
`;

const Points = styled.p`
    font-size: 24px;
    margin-bottom: 3em;
`;

function GameOver(props){
    let pts = props.pts;
    let estado;
    if(pts === 1){
        estado = "CORRECTA";
    }else{
        estado = "INCORRECTA";
    }



    return (
        <>
            <Title>Resultado</Title>
            <Points>Respuesta {estado}</Points>


        </>

    )
}

export default GameOver
