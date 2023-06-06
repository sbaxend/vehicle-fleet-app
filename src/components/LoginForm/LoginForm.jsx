import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import Container from '@mui/material/Container';
import {Typography, TextField, Button } from '@mui/material';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <Container style={{ marginTop: '5rem' }}>
    <form className="formPanel" onSubmit={login}>
      <Typography variant='h2'>Login</Typography>
      {errors.loginMessage && (
        <Typography variant="h3" color="error" role="alert">
        {errors.loginMessage}
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
            Log In
          </Button>
        </div>
      </form>
    </Container>
  );
}

export default LoginForm;
