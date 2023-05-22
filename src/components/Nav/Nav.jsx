import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

import TemporaryDrawer from '../MenuDrawer/MenuDrawer';
function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <AppBar position='fixed'>
      <Toolbar>
         <TemporaryDrawer/>
      <Typography variant='h4'>Welcome {user.username}!</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Nav;
