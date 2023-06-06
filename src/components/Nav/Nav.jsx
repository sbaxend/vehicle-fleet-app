import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import Avatar from '@mui/material/Avatar'
import TemporaryDrawer from '../MenuDrawer/MenuDrawer';
import { cyan } from '@mui/material/colors'
function Nav() {
  const primary = cyan[500]
  const user = useSelector((store) => store.user);

  return (
    <AppBar position='fixed' sx={{ backgroundColor: primary }}>
      <Toolbar>
         <TemporaryDrawer/>
         <Box flexGrow={1} display="flex" justifyContent="flex-end" alignItems="center">
          <Avatar sx={{ marginRight: '1rem' }} /><Typography variant='h4'>{user.username}</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Nav;
