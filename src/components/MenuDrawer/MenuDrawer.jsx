import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useDispatch, useSelector} from 'react-redux';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import InfoIcon from '@mui/icons-material/Info';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { AppBar, Toolbar, Typography} from '@mui/material';
import { Link } from 'react-router-dom';

function TemporaryDrawer() {
    const [state, setState] = useState({ left: false });
    const user = useSelector((store) => store.user);
    const toggleDrawer = (open) => (event) => {
      if (
        event.type === 'keydown' &&
        ((event.key === 'Tab') || (event.key === 'Shift'))
      ) {
        return;
      }
  
      setState({ left: open });
    };
  
    const list = (
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
         <Typography color="black" variant='h2' >My Garage</Typography>
       
      <List>
        {user.id ? (
          <>
            <Divider />
            <ListItem key="home" disablePadding>
              <ListItemButton component={Link} to="/user">
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
              <Divider />
            <ListItem key="add-vehicle" disablePadding>
              <ListItemButton component={Link} to="/add-vehicle">
                <ListItemIcon>
                  <AddCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Add Vehicle" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem key="info-page" disablePadding>
              <ListItemButton component={Link} to="/info">
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText primary="Info Page" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem key="logout" disablePadding>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <LogOutButton />
            </ListItem>
           <Divider />
          </>
        ) : (
          <ListItem key="login-register" disablePadding>
            <ListItemButton component={Link} to="/login">
              <ListItemText primary="Login / Register" />
            </ListItemButton>
          </ListItem>
        
        )}
      </List>
      </Box>
  );

  return (
    <div>
      <Button color="inherit"onClick={toggleDrawer(true)}><MenuIcon/></Button>
      <Drawer
        anchor="left"
        open={state.left}
        onClose={toggleDrawer(false)}
      >
        {list}
      </Drawer>
    </div>
  );
}

export default TemporaryDrawer
