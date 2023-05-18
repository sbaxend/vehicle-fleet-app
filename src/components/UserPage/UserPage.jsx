import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useDispatch, useSelector} from 'react-redux';
import { useState, useEffect } from 'react';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_VEHICLES' });
  }, []);

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <LogOutButton className="btn" />
    </div>
    
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
