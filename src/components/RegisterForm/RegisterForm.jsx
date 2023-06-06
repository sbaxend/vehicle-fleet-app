import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import {Typography, TextField, Button } from '@mui/material';
function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <Container style={{ marginTop: '5rem' }}>
    <form className="formPanel" onSubmit={registerUser}>
    <Typography variant="h6">Register User</Typography>
        {errors.registrationMessage && (
          <Typography variant="h6" color="error" role="alert">
            {errors.registrationMessage}
          </Typography>
        )}
        <div>
          <TextField
            label="Username"
            type="text"
            name="username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <TextField
            label="Password"
            type="password"
            name="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div>
          <Button variant="contained" type="submit">
            Register
          </Button>
        </div>
      </form>
    </Container>
  );
}

export default RegisterForm;
