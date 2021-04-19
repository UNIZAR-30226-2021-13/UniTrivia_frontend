import React, {useState} from 'react';

import {Box, Button, Card, CardContent, CardHeader, Divider, Grid, TextField} from '@material-ui/core';

const states = [
  {
    value: 'alabama',
    label: 'Alabama'
  },
  {
    value: 'new-york',
    label: 'New York'
  },
  {
    value: 'san-francisco',
    label: 'San Francisco'
  }
];

function AccountProfileDetails(props) {
  const profile=props;




  const handleChange = (event) => {

  };

  return (
      <form
          autoComplete="off"
          noValidate
          {...props}
      >
        <Card>
          <CardHeader
              subheader="Información del usuario"
              title="Perfil"
          />
          <Divider/>
          <CardContent>
            <Grid
                container
                spacing={3}
            >
              <Grid
                  item
                  md={6}
                  xs={12}
              >
                <TextField
                    fullWidth
                    value={profile.user}
                    disabled
                    id="outlined-disabled"
                    label="Usuario"
                    defaultValue="Hello World"
                    variant="outlined"
                />
              </Grid>

              <Grid
                  item
                  md={6}
                  xs={12}
              >
                <TextField
                    fullWidth
                    value={profile.mail}
                    disabled
                    id="outlined-disabled"
                    label="Email"
                    defaultValue="Hello World"
                    variant="outlined"
                />
              </Grid>
              <Grid
                  item
                  md={6}
                  xs={12}
              >
                <TextField
                    fullWidth
                    value={profile.pregu}
                    disabled
                    id="outlined-disabled"
                    label="Pregunta de seguridad"
                    defaultValue="Hello World"
                    variant="outlined"
                />
              </Grid>
              <Grid
                  item
                  md={6}
                  xs={12}
              >
                <TextField
                    fullWidth
                    value={profile.resu}
                    disabled
                    id="outlined-disabled"
                    label="Respuesta"
                    defaultValue="Hello World"
                    variant="outlined"
                />
              </Grid>

            </Grid>
          </CardContent>
          <Divider/>
        </Card>


      </form>

  );
}

export default AccountProfileDetails;
