import React from 'react';

import {Card, CardContent, CardHeader, Divider, Grid, TextField} from '@material-ui/core';



function Stats(props) {
  const profile=props




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
                    label="Partidas jugadas"
                    name="firstName"
                    defaultValue={'0'}
                    value={profile.jugadas}
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
                    label="Coins"
                    name="question"
                    value={profile.coins}
                    defaultValue={'0'}
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
                    defaultValue={'0'}
                    value={profile.ganadas}
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
                    label="Partidas Perdidas"
                    name="question"
                    value={profile.jugadas-profile.ganadas}
                    defaultValue={'0'}
                    variant="outlined"
                    disabled={true}
                />
              </Grid>

            </Grid>
          </CardContent>
          <Divider/>


        </Card>


      </form>

  );
}

export default Stats;
