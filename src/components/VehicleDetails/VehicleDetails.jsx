import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import {useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

function VehicleDetails () {
const  carId  = useParams()
const dispatch = useDispatch();
const history = useSelector((store) => store.vehicles.selectedVehicleHistory);
const selection = useSelector((store) => store.vehicles.selectedVehicle)

const [date, setDate] = useState('');
const [description, setDescription] = useState('');
const [notes, setNotes] = useState('');

console.log(selection)

useEffect(() => {
    dispatch({ type: 'FETCH_CAR_HISTORY', payload: carId });
    dispatch({type: 'FETCH_SELECTED_VEHICLE', payload: carId})
  }, []);

    return (
        <Container style={{ marginTop: '4rem' }}>
        <Card>  <h2>WELCOME TO DETAILS</h2></Card>
        <div>
            {selection.map((vehicle) => (
                <Card >
                <h3>Year: {vehicle.vehicle_year}</h3>
                <h3>Make: {vehicle.vehicle_make}</h3>
                <h3>Model: {vehicle.vehicle_model}</h3>
                <h3>Body Style: {vehicle.body_style}</h3>
                </Card>
            ))}
        </div>
        <input></input> <input></input> <input></input> <button>Add</button>
        <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        {history.map((item) => (
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