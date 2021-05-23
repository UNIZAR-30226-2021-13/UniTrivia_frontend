import { useState } from 'react';
import React from 'react'
import { getToken } from '../Utils/Common';


import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField
} from '@material-ui/core';
import axios from "axios";

const SettingsPassword = (props) => {
  const [values, setValues] = useState({
    oldpassword: '',
    password: '',
    confirm: ''
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleModifyPassword= () => {
    axios.post('https://unitrivia.herokuapp.com/api/profile/modify/password',{} ,{ headers:{
        'jwt': getToken(),
        newpassword: values.password,
        oldpassword: values.oldpassword
      }}).then(response => {
      console.log(response)
      alert('Contraseña cambiada exitosamente');
      window.location.reload(true);
    }).catch(error => {
      alert(error.message)
    });


  }

  return (
    <form {...props} onSubmit={handleModifyPassword}>
      <Card>
        <CardHeader
          subheader="Update password"
          title="Password"
        />
        <Divider />
        <CardContent>
          <TextField
              fullWidth
              label="Old password"
              margin="normal"
              name="oldpassword"
              onChange={handleChange}
              type="password"
              value={values.oldpassword}
              variant="outlined"
          />
          <TextField
            fullWidth
            label="New Password"
            margin="normal"
            name="password"
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Confirm new password"
            margin="normal"
            name="confirm"
            onChange={handleChange}
            type="password"
            value={values.confirm}
            variant="outlined"
          />
        </CardContent>
        <Divider />
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
            onClick={handleModifyPassword}
          >
            Update
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default SettingsPassword;
