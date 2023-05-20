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
    <AppBar>
      <Toolbar>
        <TemporaryDrawer/>
      <Link to="/home">
        <Typography variant='h2' className="nav-title">My Garage</Typography>
      </Link>
      <div>
      {/* <Button onChange={TemporaryDrawer}><MenuIcon/></Button> */}
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Button component ={Link} color="inherit"  className="navLink" to="/login">
            Login / Register
          </Button>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Button component={Link} to="/user" color="inherit">
              Home
            </Button>

            <Button component={Link} to="/info" color="inherit">
              Info Page
            </Button>

            <LogOutButton className="navLink" />
          </>
        )}

            <Button component={Link} to="/about" color="inherit">
              About
            </Button>
      </div>
      </Toolbar>
    </AppBar>
  );
}

export default Nav;
