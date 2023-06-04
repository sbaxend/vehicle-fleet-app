import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button'
import {useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2'
import VehicleEdit from './VehicleEdit';

import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
function VehicleDetails () {
// const  carId  = useParams()
//this extracts from the carId
const { vehicleId } = useParams();
const dispatch = useDispatch();
const info = useSelector((store) => store.vehicles.selectedVehicleHistory);

const history = useHistory();
const [date, setDate] = useState('');
const [description, setDescription] = useState('');
const [notes, setNotes] = useState('');




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
  }

const submitHistory = (event) => {
    event.preventDefault()
    // let vehicleId = carId.vehicleId
    console.log('In submitHistory. car id is:', vehicleId)
    dispatch(
        {
            type: 'ADD_HISTORY',
            payload: {
              vehicleId: vehicleId,
              history_date: date,
              history_description: description,
              history_notes: notes,
            },
          }
    )
    
};



console.log(vehicleId)
useEffect(() => {
    dispatch({ type: 'FETCH_CAR_HISTORY', payload: vehicleId  });
    console.log('Fetching car history');
    dispatch({type: 'FETCH_SELECTED_VEHICLE', payload: vehicleId })
  }, []);

    return (
        <Container style={{ marginTop: '4rem' }}>
    <VehicleEdit />
    <Button onClick={() => deleteVehicle(vehicleId)}>Delete Vehicle</Button>
    <Typography variant="h4" align="center" sx={{ mt: 2 }}>
      Add More Info
      </Typography>
    <form onSubmit={submitHistory}>
      <TextField
        value={date}
        onChange={(evt) => setDate(evt.target.value)}
        type="date"
        required
        fullWidth
        sx={{ mt: 2 }}
      />
      <TextField
        value={description}
        onChange={(evt) => setDescription(evt.target.value)}
        type="text"
        label="Description"
        required
        fullWidth
        sx={{ mt: 2 }}
      />
      <TextField
        value={notes}
        onChange={(evt) => setNotes(evt.target.value)}
        type="text"
        label="Notes"
        fullWidth
        sx={{ mt: 2 }}
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Add
      </Button>
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
       Your Vehicle History:
      </Typography>
    </form>
    <Table sx={{ mt: 4 }}>
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Notes</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {info.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{new Date(item.history_date).toLocaleDateString()}</TableCell>
            <TableCell>{item.history_description}</TableCell>
            <TableCell>{item.history_notes}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Container>
);
    
};

export default VehicleDetails;