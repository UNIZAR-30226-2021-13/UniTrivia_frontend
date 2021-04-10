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
                    label="First name"
                    name="firstName"
                    onChange={handleChange}
                    value={profile.user}
                    variant="outlined"
                    required
                />
              </Grid>

              <Grid
                  item
                  md={6}
                  xs={12}
              >
                <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    onChange={handleChange}

                    value={profile.mail}
                    variant="outlined"
                    disabled={true}
                />
              </Grid>
              <Grid
                  item
                  md={6}
                  xs={12}
              >
                <TextField
                    fullWidth
                    label="Pregunta de seguridad"
                    name="question"
                    onChange={handleChange}
                    value={profile.preg}
                    variant="outlined"
                    disabled={true}
                />
              </Grid>
              <Grid
                  item
                  md={6}
                  xs={12}
              >
                <TextField
                    fullWidth
                    label="Respuesta"
                    name="answer"
                    onChange={handleChange}
                    value={profile.res}
                    variant="outlined"
                    disabled={true}
                />
              </Grid>
              <Grid
                  item
                  md={6}
                  xs={12}
              >
                <TextField
                    fullWidth
                    label="Select State"
                    name="state"
                    onChange={handleChange}
                    required
                    select
                    SelectProps={{native: true}}
                    variant="outlined"
                >
                  {states.map((option) => (
                      <option
                          key={option.value}
                          value={option.value}
                      >
                        {option.label}
                      </option>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </CardContent>
          <Divider/>
          <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                p: 2
              }}
          >
            <Button
                color="primary"
                variant="contained"
            >
              Save details
            </Button>
          </Box>

        </Card>


      </form>

  );
}

export default AccountProfileDetails;
