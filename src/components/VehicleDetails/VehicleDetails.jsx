import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button'
import {useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2'
import VehicleEdit from './VehicleEdit';
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
        <Card>  <h2>WELCOME TO DETAILS</h2></Card>
        <VehicleEdit />
            <Button onClick={() => deleteVehicle(vehicleId)}>Delete Vehicle</Button>
        <form onSubmit={submitHistory}>
        <input
          value={date}
          onChange={(evt) => setDate(evt.target.value)}
          type="date"
          placeholder="Date"
          required
        />
        <input
          value={description}
          onChange={(evt) => setDescription(evt.target.value)}
          type="text"
          placeholder="Description"
          required
        />
        <input
          value={notes}
          onChange={(evt) => setNotes(evt.target.value)}
          type="text"
          placeholder="Notes"
          
        />
        <button type="submit">Add</button>
      </form>
        <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        {info.map((item) => (
          <tr key={item.id}>
            <td>{new Date(item.history_date).toLocaleDateString()}</td>
            <td>{item.history_description}</td>
            <td>{item.history_notes}</td>
          </tr>
        ))}
      </tbody>
    </table>
        
        </Container>
    )
};

export default VehicleDetails;