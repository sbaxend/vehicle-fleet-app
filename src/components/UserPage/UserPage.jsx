import React from 'react';
import './UserPage.css';
import {useDispatch, useSelector} from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import Container from '@mui/material/Container';
import { ListItem, Grid, Button} from '@mui/material';
import Card from '@mui/material/Card';
import Grow from '@mui/material/Grow';
import AddIcon from '@mui/icons-material/Add';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const vehicles = useSelector((store) => store.vehicles.vehicleList)
  const dispatch = useDispatch();
  const history = useHistory();
  const [selectedBodyStyle, setSelectedBodyStyle] = useState('');

  useEffect(() => {
    dispatch({ type: 'FETCH_VEHICLES' });
  }, []);

  console.log(vehicles)

 

  const navToAdd = (event) => {
    event.preventDefault();
    history.push('/add-vehicle')


  }

  const navToDetails = (vehicleId) => (event) => {
    event.preventDefault();
    history.push(`/details/${vehicleId}`)
   
  }
  const filteredVehicles = selectedBodyStyle ? vehicles.filter(vehicle => vehicle.body_style === selectedBodyStyle) : vehicles;

  return (
    
    <Container className="container" style={{ marginTop: '4rem' }}>
      <Card variant="outlined" sx={{boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.3)', borderRadius: '8px', textAlign: 'center', padding: '1rem' }}>
        <Typography variant="h4" component="div">
          Your Fleet
        </Typography>
      </Card>
    <InputLabel  style={{ marginTop: '1rem' }} align="right" htmlFor="sort-by-select">SORT BY</InputLabel>
    <Select
      id="sort-by-select"
      value={selectedBodyStyle}
      onChange={(event) => setSelectedBodyStyle(event.target.value)}
      fullWidth
    >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Cargo Van">Cargo Van</MenuItem>
            <MenuItem value="Convertible">Convertible</MenuItem>
            <MenuItem value="Coupe">Coupe</MenuItem>
            <MenuItem value="Cross">Crossover</MenuItem>
            <MenuItem value="Hatchback">Hatchback</MenuItem>
            <MenuItem value="Minivan">Minivan</MenuItem>
            <MenuItem value="Truck">Truck</MenuItem>
            <MenuItem value="Sedan">Sedan</MenuItem>
            <MenuItem value="SUV">SUV</MenuItem>
            <MenuItem value="Wagon">Wagon</MenuItem>
          </Select>
  
  <Grid style={{ marginTop: '1rem' }} container spacing={2}>
        {filteredVehicles.map((vehicle, index) => (
          <Grid item xs={12} sm={6} md={4} key={vehicle.id}>
            <Grow in={true} timeout={1000} {...{ appear: true }} {...{ timeout: 1000 * index }}>
          <Card sx={{boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.3)', borderRadius: '8px',}} className='vehicle-card' elevation={3} onClick={navToDetails(vehicle.id)}>
          <ListItem key={vehicle.id}>
            <DirectionsCarIcon/>{vehicle.vehicle_year} {vehicle.vehicle_make} {vehicle.vehicle_model} 
          </ListItem>
          </Card>
          </Grow>
          </Grid>
        ))}
      </Grid>
 
      
      <Button style={{ marginTop: '1rem', color: 'green' }}  onClick={navToAdd}><AddIcon/>ADD YOUR NEW VEHICLE</Button>
    
   
  
  </Container>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
