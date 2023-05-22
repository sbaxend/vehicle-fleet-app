import React from 'react';

import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Container from '@mui/material/Container';
import { List, ListItem} from '@mui/material';
import Card from '@mui/material/Card';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const vehicles = useSelector((store) => store.vehicleList)
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch({ type: 'FETCH_VEHICLES' });
  }, []);

  console.log(vehicles)

  const navToAdd = (event) => {
    event.preventDefault();
    history.push('/add-vehicle')


  }

  const navToDetails =(event) => {
    event.preventDefault();
    history.push('/details')
  }


  return (
    
    <Container className="container" style={{ marginTop: '4rem' }}>
    {/* <ul>
    {vehicles.map(vehicle => (
      <li key={vehicle.id}>
       {vehicle.vehicle_year} {vehicle.vehicle_make} {vehicle.vehicle_model}
      </li>
    ))}
  </ul> */}
  <List>
        {vehicles.map((vehicle) => (
          <Card onClick={navToDetails}>
          <ListItem key={vehicle.id}>
            {vehicle.vehicle_year} {vehicle.vehicle_make} {vehicle.vehicle_model}
          </ListItem>
          </Card>
        ))}
      </List>
 
      <button onClick={navToAdd}>Add</button>
    
   
  
  </Container>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
