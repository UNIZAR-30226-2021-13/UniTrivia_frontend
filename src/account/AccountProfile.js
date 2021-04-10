import moment from 'moment';
import React, {useEffect} from 'react'
//{`${profiles.mail} ${user.country}`}
import {Avatar, Box, Button, Card, CardActions, CardContent, Divider, Typography} from '@material-ui/core';

const user = {
  avatar: '/images/avatars/avatar_6.png',
  city: 'Los Angeles',
  country: 'USA',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith',
  timezone: 'GTM-8'
};


function AccountProfile(props) {
    const profiles=props;


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
                        src={user.avatar}
                        sx={{
                            height: 100,
                            width: 100
                        }}
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
                    <Typography
                        color="textSecondary"
                        variant="body1"
                    >
                        {`${moment().format('hh:mm A')} ${user.timezone}`}
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
            </CardActions>
        </Card>
    );
}

export default AccountProfile;
