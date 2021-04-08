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
import {setUserSession} from "../Utils/Common";

const SettingsPassword = (props) => {
  const [values, setValues] = useState({
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
    alert(values.confirm)
    sessionStorage.setItem('user', 'oscargo');
    var jwt=sessionStorage.getItem('token')
    alert(sessionStorage.getItem('user'))
    alert(jwt)
    axios.post('https://unitrivia.herokuapp.com/api/profile/modify/password', { headers:{
        'jwt': getToken,
        newpassword: values.password.value,
        oldpassword: '1234'
      }}).then(response => {
      console.log(response)
      //setUserSession(response.data);
      //props.history.push('/menu');
    }).catch(error => {
      alert(error.message)
      /*if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");*/
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
            label="Password"
            margin="normal"
            name="password"
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Confirm password"
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
