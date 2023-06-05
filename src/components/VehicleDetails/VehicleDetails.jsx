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

const deleteHistory = (historyId) => {
    event.preventDefault();
    console.log('In deleteHistory. History id is:', historyId);
    dispatch({
        type: 'HISTORY_DELETE',
        payload: {
          historyId: historyId,
          vehicleId: vehicleId
        }
      });
}


console.log(vehicleId)
useEffect(() => {
    dispatch({ type: 'FETCH_CAR_HISTORY', payload: vehicleId  });
    console.log('Fetching car history');
    dispatch({type: 'FETCH_SELECTED_VEHICLE', payload: vehicleId })
  }, []);

    return (
        <Container style={{ marginTop: '4rem' }}>
    <VehicleEdit />
    <Button startIcon={<DeleteIcon />} onClick={() => deleteVehicle(vehicleId)} style={{ backgroundColor: 'red', color: 'white' }}>Delete Vehicle</Button>
    <Divider style={{ marginTop: '2rem' }} />
    <Typography variant="h6" align="left" sx={{ mt: 2 }}>
      Add Your Vehicle History 
      </Typography>
      <Typography variant="h8">(Mainteenance, purchased Items, oil changes, etc.)</Typography>
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
      <Button startIcon={<AddCircleOutlineIcon/>}type="submit" variant="contained" sx={{ mt: 2 }}>
        Add
      </Button>
      
      <Divider style={{ marginTop: '2rem' }} />
      <Typography variant="h6" align="left" sx={{ mt: 2 }}>
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
            <TableCell><Button onClick={() => deleteHistory(item.id)}>Delete</Button></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Container>
);
    
};

export default VehicleDetails;