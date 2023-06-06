import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button'
import {useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2'
import VehicleEdit from './VehicleEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import  Divider  from '@mui/material/Divider';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Box from '@mui/material/Box';
import WishList from '../WishList/WishList';
import History from '../History.jsx/History';
function VehicleDetails () {
const { vehicleId } = useParams();
const dispatch = useDispatch();
const history = useHistory();

const deleteVehicle = (vehicleId) => {
    Swal.fire({
        title: 'Are you sure?',
        text: 'This action will delete everything related to the vehicle. Are you sure you want to proceed?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'red',
        cancelButtonColor: 'grey',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          // Dispatch the action to delete the vehicle
          dispatch({ type: 'DELETE_VEHICLE', payload: {vehicleId: vehicleId} });
          console.log('In deleteVehicle function. ID:', vehicleId)
    
          // Redirect to '/user'
          history.push('/user');
        }
      });
  };

useEffect(() => {
    dispatch({ type: 'FETCH_CAR_HISTORY', payload: vehicleId  });
    console.log('Fetching car history');
    dispatch({type: 'FETCH_SELECTED_VEHICLE', payload: vehicleId })
  }, []);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };


  const [selectedTab, setSelectedTab] = useState(0);
    return (
        <Container style={{ marginTop: '4rem' }}>
    <VehicleEdit />
    <Button startIcon={<DeleteIcon />} onClick={() => deleteVehicle(vehicleId)} style={{ backgroundColor: 'red', color: 'white' }}>Delete Vehicle</Button>
    <Divider style={{ marginTop: '2rem' }} />
    <Tabs value={selectedTab} onChange={handleTabChange} indicatorColor="primary" textColor="primary">
        <Tab label="History" />
        <Tab label="Wishlist" />
      </Tabs>
      {selectedTab === 0 && <History />}
      {selectedTab === 1 && <WishList />}
  </Container>
);
    
};

export default VehicleDetails;