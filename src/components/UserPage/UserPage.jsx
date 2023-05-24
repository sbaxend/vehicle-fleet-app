import React from 'react';
import './UserPage.css';
import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Container from '@mui/material/Container';
import { ListItem, Grid, Button} from '@mui/material';
import Card from '@mui/material/Card';
import Grow from '@mui/material/Grow';
import AddIcon from '@mui/icons-material/Add';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
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
  
  <Grid container spacing={2}>
        {vehicles.map((vehicle, index) => (
          <Grid item xs={12} sm={6} md={4} key={vehicle.id}>
            <Grow in={true} timeout={1000} {...{ appear: true }} {...{ timeout: 1000 * index }}>
          <Card className='vehicle-card' elevation={3} onClick={navToDetails}>
          <ListItem key={vehicle.id}>
            <DirectionsCarIcon/>{vehicle.vehicle_year} {vehicle.vehicle_make} {vehicle.vehicle_model} 
          </ListItem>
          </Card>
          </Grow>
          </Grid>
        ))}
      </Grid>
 
      
      <Button onClick={navToAdd}><AddIcon/>ADD YOUR NEW VEHICLE</Button>
    
   
  
  </Container>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
