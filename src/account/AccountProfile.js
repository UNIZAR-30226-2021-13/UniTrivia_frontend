import moment from 'moment';
import React, {useEffect} from 'react'
//{`${profiles.mail} ${user.country}`}
//<Typography
//                         color="textSecondary"
//                         variant="body1"
//                     >
//                         {`${moment().format('hh:mm A')} ${user.timezone}`}
//                     </Typography>
import {Avatar, Box, Button, Card, CardActions, CardContent, Divider, Typography} from '@material-ui/core';
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

                    <Avatar
                        title='Avatar'
                        src={avatar}
                        height={1000}
                        width={1000}


                    />
                    <Avatar
                        title='Forma ficha'
                        src={ficha}
                        height={1000}
                        width={1000}


                    />
                    <Avatar
                        title='Banner'
                        src={banner}
                        height={1000}
                        width={1000}


                    />
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
            <Divider/>
            <CardActions>
                <Button
                    color="primary"
                    fullWidth
                    variant="text"
                >
                    Modificar avatar
                </Button>

                <Button
                    color="primary"
                    fullWidth
                    variant="text"
                >
                    Modificar banner
                </Button>

                <Button
                    color="primary"
                    fullWidth
                    variant="text"
                >
                    Modificar forma de ficha
                </Button>
            </CardActions>
        </Card>
    );
}

export default AccountProfile;
