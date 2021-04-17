import React,{useState} from 'react'
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Dropdown,DropdownItem,DropdownMenu,DropdownToggle} from 'reactstrap';

const But=styled.button`
  background-color: #fce2e2;
  font-size: 32px;
  color: #6c6ce3;
`;

const Div=styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  margin: 2em auto;

  @media screen and (min-width: 1180px) {
    width: 50%;
  }
`;

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://img.freepik.com/vector-gratis/modelo-inconsutil-pregunta-papel-aislada-realista-decoracion-invitacion-concepto-concurso-trivia_269299-1004.jpg?size=626&ext=jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function CrearSala() {
    const classes = useStyles();
    const [dropdown,setDropdown]=useState(false);
    const abrirCerrarDropDown=()=>{
        setDropdown(!dropdown);
    }
    const imprimirCodigoSala=()=>{
        return (<h6>XWDWED</h6>)
    }
    const imprimirJugadoresSala=(num)=>{
        return (<h7>Jugador {num}</h7>)
    }
    return (

        <Div>
            <h3>Crear Sala</h3>
            Codigo de la Sala<br/><br/>
            {imprimirCodigoSala()}
            <Dropdown justifyContent='center' isOpen={dropdown} toggle={abrirCerrarDropDown}>
                <DropdownToggle caret>
                    DropdownEjemplo
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem header>Encabezado</DropdownItem>
                    <DropdownItem>Accion 1</DropdownItem>
                    <DropdownItem>Accion 2</DropdownItem>
                    <DropdownItem>Accion 3</DropdownItem>
                    <DropdownItem>Accion 4</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            {imprimirJugadoresSala(1)}
            {imprimirJugadoresSala(2)}
            {imprimirJugadoresSala(3)}
            {imprimirJugadoresSala(4)}

            <div style={{marginTop: 100}}>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    href={'/Play'}
                >
                    Atrás
                </Button>
            </div>
        </Div>
    );
}


export default CrearSala;