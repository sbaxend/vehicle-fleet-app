import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button'
import {useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
function VehicleDetails () {
// const  carId  = useParams()
//this extracts from the carId
const { vehicleId } = useParams();
const dispatch = useDispatch();
const info = useSelector((store) => store.vehicles.selectedVehicleHistory);
const selection = useSelector((store) => store.vehicles.selectedVehicle)
const history = useHistory();
const [date, setDate] = useState('');
const [description, setDescription] = useState('');
const [notes, setNotes] = useState('');

console.log(selection)

const deleteVehicle = (vehicleId) => {
    // dispatch({ type: 'DELETE_VEHICLE', payload: vehicleId });
    history.push('/user')
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
    
}

console.log(vehicleId)
useEffect(() => {
    dispatch({ type: 'FETCH_CAR_HISTORY', payload: vehicleId  });
    console.log('Fetching car history');
    dispatch({type: 'FETCH_SELECTED_VEHICLE', payload: vehicleId })
  }, []);

    return (
        <Container style={{ marginTop: '4rem' }}>
        <Card>  <h2>WELCOME TO DETAILS</h2></Card>
        <div>
            {selection.map((vehicle) => (
                <Card key={vehicle.id}>
                <h3>Year: {vehicle.vehicle_year}</h3>
                <h3>Make: {vehicle.vehicle_make}</h3>
                <h3>Model: {vehicle.vehicle_model}</h3>
                <h3>Body Style: {vehicle.body_style}</h3>
                </Card>
            ))}
            <Button onClick={deleteVehicle}>Delete Vehicle</Button>
        </div>
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
            <td>{item.history_date}</td>
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