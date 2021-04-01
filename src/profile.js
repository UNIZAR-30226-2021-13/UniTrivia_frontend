import React from 'react'
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import { Helmet } from 'react-helmet';
import {
    Box,
    Container,
    Grid
} from '@material-ui/core';
import AccountProfile from './account/AccountProfile';
import AccountProfileDetails from './account/AccountProfileDetails';
import SettingsPassword from './settings/SettingsPassword';
import Stats from './account/Stats'
import Items from './account/Items'



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

function Profile() {
    const classes = useStyles();


    return (
        <>
            <Helmet>
                <title>Account | Material Kit</title>
            </Helmet>
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
                            <AccountProfile />
                        </Grid>
                        <Grid
                            item
                            lg={8}
                            md={6}
                            xs={12}
                        >
                            <AccountProfileDetails />
                        </Grid>
                        <Grid
                            item
                            lg={8}
                            md={6}
                            xs={12}
                        >
                            <Stats />
                        </Grid>
                        <Grid
                            item
                            lg={8}
                            md={6}
                            xs={12}
                        >
                            <Items />
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