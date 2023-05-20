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

import {useDispatch, useSelector} from 'react-redux';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import InfoIcon from '@mui/icons-material/Info';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleIcon from '@mui/icons-material/AddCircle';
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
        <h2>{user.username}</h2>
        <List>
          {['Home', 'Add Vehicle'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <HomeIcon /> : <AddCircleIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {[ 'About', 'Log Out'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InfoIcon /> : <LogoutIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
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
