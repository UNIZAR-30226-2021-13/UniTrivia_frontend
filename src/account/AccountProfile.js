import moment from 'moment';
import React, {useEffect} from 'react'
//{`${profiles.mail} ${user.country}`}
//<Typography
//                         color="textSecondary"
//                         variant="body1"
//                     >
//                         {`${moment().format('hh:mm A')} ${user.timezone}`}
//                     </Typography>
import {Avatar, Box, Button, Card, CardActions, CardContent, Divider, Grid, Typography} from '@material-ui/core';
import Banner from 'react-js-banner';




function AccountProfile(props) {
    const profiles=props;
    let avatar = '/images/avatars/' + props.avatar + '.jpg';
    let banner = '/images/banners/' + props.banner + '.jpg';
    let ficha = '/images/fichas/' + props.ficha + '.png';

    console.log(avatar);
    console.log(banner);
    console.log(ficha);

    return (

        <Card {...props}>
            <CardContent>
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                <Grid
                    container
                    spacing={3}
                >

                    <Grid
                        item
                        md={6}
                        xs={12}
                    >

                        <img
                            title='Avatar'
                            src={avatar}
                            sx={{
                                alignItems: 'center',
                                display: 'flex',
                                flexDirection: 'row'
                            }}


                        />
                    </Grid>

                    <Grid
                        item
                        md={6}
                        xs={12}
                    >

                        <img
                            title='Forma Ficha'
                            src={ficha}
                            sx={{
                                alignItems: 'center',
                                display: 'flex',
                                flexDirection: 'row'
                            }}


                        />
                    </Grid>

                    <Grid
                        item
                        md={6}
                        xs={12}
                    >

                        <img

                            title='Banner'
                            src={banner}
                            sx={{
                                alignItems: 'center',
                                display: 'flex',
                                flexDirection: 'row'
                            }}
                            width="800"
                            height="300"

                        />
                    </Grid>
                </Grid>
                    <Typography
                        color="textPrimary"
                        gutterBottom
                        variant="h3"
                    >
                        {profiles.user}
                    </Typography>
                    <Typography
                        color="textSecondary"
                        variant="body1"
                    >
                        {`${profiles.mail} `}
                    </Typography>

                </Box>
            </CardContent>
        </Card>
    );
}

export default AccountProfile;
