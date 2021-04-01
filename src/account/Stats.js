import { useState } from 'react';
import React from 'react'

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@material-ui/core';

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

const Stats = (props) => {
  const [values, setValues] = useState({
    played: '6',
    wins: '3',
    ncoins: '67'
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <form
      autoComplete="off"
      noValidate
      {...props}
    >
      <Card>
        <CardHeader
          subheader="Estadísticas del usuario"
          title="Estadísticas"
        />
        <Divider />
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
                label="Partidas jugadas"
                name="firstName"
                onChange={handleChange}
                value={values.played}
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
                label="Partidas ganadas"
                name="email"
                onChange={handleChange}

                value={values.wins}
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
                label="Monedas obtenidas"
                name="question"
                onChange={handleChange}
                value={values.ncoins}
                variant="outlined"
                disabled={true}
              />
            </Grid>

          </Grid>
        </CardContent>
        <Divider />


      </Card>



    </form>

  );
};

export default Stats;
