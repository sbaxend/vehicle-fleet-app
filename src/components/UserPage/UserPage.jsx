import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useDispatch, useSelector} from 'react-redux';
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import TemporaryDrawer from '../MenuDrawer/MenuDrawer';
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


  return (
    
    <div className="container">
    <ul>
    {vehicles.map(vehicle => (
      <li key={vehicle.id}>
       {vehicle.vehicle_year} {vehicle.vehicle_make} {vehicle.vehicle_model}
      </li>
    ))}
  </ul>
 
      <button onClick={navToAdd}>Add</button>
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      
   
  
  </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
