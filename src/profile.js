import React, {useEffect, useState} from 'react'
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import { Helmet } from 'react-helmet';
import {
    Box,
    Container,
    Grid, Link
} from '@material-ui/core';
import AccountProfile from './account/AccountProfile';
import AccountProfileDetails from './account/AccountProfileDetails';
import SettingsPassword from './settings/SettingsPassword';
import Stats from './account/Stats'
import Items from './account/Items'
import axios from "axios";
import {setUserSession,getToken,removeUserSession} from "./Utils/Common";
import Tienda from './tienda/Tienda';
import {ArrowBack} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";



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

function Profile(props) {

    const classes = useStyles();
    let [preg, setPreg] = useState(null);
    let [res, setRes] = useState();
    let [coins, setCoins] = useState(null);
    let [wins, setWins] = useState(null);
    let [ficha, setFicha] = useState(null);
    let [banner, setBanner] = useState(null);
    let [comprados, setComprados] = useState(null);
    let [avatar, setAvatar] = useState(null);
    let [njugadas, setNjugadas] = useState(null);
    let [email, setEmail] = useState(null);
    let [username, setUsername] = useState(null);


    useEffect(() => {
        console.log(getToken())

        axios.get('https://unitrivia.herokuapp.com/api/profile',{headers: {
                jwt: getToken()
            }}).then((response) => {
            setPreg(response.data.preg);
            setRes(response.data.res);
            setCoins(response.data.cns);
            setWins(response.data.ng);
            setFicha(response.data.fich);
            setBanner(response.data.bnr);
            setComprados(response.data.rfs);
            setAvatar(response.data.avtr);
            setNjugadas(response.data.nj);

            setEmail(response.data.mail);
            //username=response.data._id;
            setUsername(response.data._id);

            console.log(response.data)
            console.log(response)
            //setUserSession(response.data.token, response.data.user);
        }).catch((code,message) => {
            console.log(code.response)
            /*if (error.response.status === 200) {
                setError(error.response.data.message);
                alert('usuario existente')
            }else {
                setError("Something went wrong. Please try again later.");
            }*/
        });
    }, []);

    const handleDeleteUser = () => {
        try {
            var aceptar = window.confirm("Presione en OK para borrar cuenta para siempre");
            if(aceptar === true) {


                axios.delete('https://unitrivia.herokuapp.com/api/profile', {
                    headers: {
                        'jwt': getToken()
                    }
                }).then(response => {
                    console.log(response)
                    removeUserSession();
                    props.history.push('/login');
                }).catch(error => {
                    alert(error.message)
                    console.log(error)
                });
            }
        }catch (e) {
            alert(e.message);
        }

    }

    const irATiendaAvatares = () =>{
        props.history.push({
            pathname: '/Tienda',
            state:{
                actual_coins: coins,
                comprados: comprados,
                tipo: 'Avatar'
            }
        })
    }

    const irATiendaBanners = () =>{
        props.history.push({
            pathname: '/Tienda',
            state:{
                actual_coins: coins,
                comprados: comprados,
                tipo: 'Banner'
            }
        })
    }

    const irATiendaFichas = () =>{
        props.history.push({
            pathname: '/Tienda',
            state:{
                actual_coins: coins,
                comprados: comprados,
                tipo: 'Ficha'
            }
        })
    }

    function handleResponseFromItem(response){

        console.log(response);
        if(response == "Avatar"){
            irATiendaAvatares();
        }else if(response == "Banner"){
            irATiendaBanners();
        }else if(response == "Ficha"){
            irATiendaFichas();
        }
    }


    return (
        <>
            <Helmet>
                <title>Account | Material Kit</title>
            </Helmet>
            <IconButton color="secondary" variant="contained" aria-label="add an alarm" href={'/menu'}>
                <ArrowBack color="primary"/>
                Volver
            </IconButton>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 3
                }}
            >
                <Container maxWidth="lg">
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            lg={8}
                            md={6}
                            xs={12}
                        >
                            <AccountProfile user={username} mail={email} avatar={avatar} banner={banner} ficha={ficha}/>
                        </Grid>
                        <Grid
                            item
                            lg={8}
                            md={6}
                            xs={12}
                        >
                            <AccountProfileDetails user={username} mail={email} pregu={preg} resu={res} />
                        </Grid>
                        <Grid
                            item
                            lg={8}
                            md={6}
                            xs={12}
                        >
                            <Stats jugadas={njugadas} ganadas={wins} coins={coins}/>
                        </Grid>
                        <Grid
                            item
                            lg={8}
                            md={6}
                            xs={12}
                        >
                            <Items comprados={comprados} coins={coins} onResponse={handleResponseFromItem.bind()}/>
                        </Grid>

                        <Grid
                            item
                            lg={8}
                            md={6}
                            xs={12}
                        >
                            <Box sx={{ pt: 3 }}>
                                <SettingsPassword />
                            </Box>
                        </Grid>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={handleDeleteUser}
                        >
                            Borrar usuario
                        </Button>
                    </Grid>

                </Container>

            </Box>
        </>
    );
}


export default Profile;