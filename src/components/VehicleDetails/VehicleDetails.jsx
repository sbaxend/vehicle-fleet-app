import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import {useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

function VehicleDetails () {
const  carId  = useParams()
const dispatch = useDispatch();
const history = useSelector((store) => store.vehicles.selectedVehicleHistory);
const vehicleList = useSelector((store) => store.vehicles.vehicleList)

console.log(history)
console.log(carId);

console.log(vehicleList)
useEffect(() => {
    dispatch({ type: 'FETCH_CAR_HISTORY', payload: carId }, {type: 'FETCH_SELECTED_VEHICLE', payload: carId});
  }, []);

    return (
        <Container style={{ marginTop: '4rem' }}>
        <Card>  <h2>WELCOME TO DETAILS</h2></Card>
        
        </Container>
    )
};

export default VehicleDetails;