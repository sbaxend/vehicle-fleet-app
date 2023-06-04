import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button'
import { useHistory } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { deepOrange, green } from '@mui/material/colors';

function VehicleEdit () {
const dispatch = useDispatch();
const history = useHistory();

const { vehicleId } = useParams();
const [make, setMake] = useState('');
const [model, setModel] = useState('');
const [year, setYear] = useState('');
const [body, setBody] = useState('');


const [editMake, setEditMake] = useState('');
const [editModel, setEditModel] = useState('');
const [editYear, setEditYear] = useState('');
const [editBody, setEditBody] = useState('');

const clearForm = () => {
    setMake('')
    setModel('')
    setYear('')
    setBody('')
}

const selection = useSelector((store) => store.vehicles.selectedVehicle)

const [editMode, setEditMode] = useState(false);
// console.log('Year:', selection[0].vehicle_year)

const updateCarInfo = () => {
    console.log('updateCarInfo triggered')
    const updatedCar = {
        vehicleId: vehicleId,
        vehicle_year: editYear !== '' ? editYear : selection[0].vehicle_year,
        vehicle_make: editMake !== '' ? editMake : selection[0].vehicle_make,
        vehicle_model: editModel !== '' ? editModel : selection[0].vehicle_model,
        body_style: editBody !== '' ? editBody : selection[0].body_style,
      }
    dispatch({type:'SEND_UPDATED_CAR', payload: updatedCar} );
    dispatch({type: 'FETCH_SELECTED_VEHICLE', payload: vehicleId })
  
    
};



    const toggleEditMode = () => {
        setEditMode(!editMode); 
        setEditMake(selection[0].vehicle_make);
        setEditModel(selection[0].vehicle_model);
        setEditYear(selection[0].vehicle_year);
        setEditBody(selection[0].body_style);
      };
    return (
        <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {selection.map((vehicle) => (
          <Card key={vehicle.id} style={{ marginBottom: '1rem', padding: '1rem', width: '400px', position: 'relative' }}>
            {editMode ? (
                <>
                <TextField
                  value={editYear}
                  onChange={(evt) => setEditYear(evt.target.value)}
                  type="number"
                  label="Year"
                  fullWidth
                  sx={{ marginBottom: '0.5rem' }}
                />
                <TextField
                  value={editMake}
                  onChange={(evt) => setEditMake(evt.target.value)}
                  type="text"
                  label="Make"
                  fullWidth
                  sx={{ marginBottom: '0.5rem' }}
                />
                <TextField
                  value={editModel}
                  onChange={(evt) => setEditModel(evt.target.value)}
                  type="text"
                  label="Model"
                  fullWidth
                  sx={{ marginBottom: '0.5rem' }}
                />
                <FormControl fullWidth sx={{ marginBottom: '0.5rem' }}>
                  <InputLabel>Select Body Style</InputLabel>
                  <Select value={editBody} onChange={(evt) => setEditBody(evt.target.value)}>
                    <MenuItem value="">Select Body Style</MenuItem>
                    <MenuItem value="Cargo Van">Cargo Van</MenuItem>
                    <MenuItem value="Convertible">Convertible</MenuItem>
                    <MenuItem value="Coupe">Coupe</MenuItem>
                    <MenuItem value="Crossover">Crossover</MenuItem>
                    <MenuItem value="Hatchback">Hatchback</MenuItem>
                    <MenuItem value="Minivan">Minivan</MenuItem>
                    <MenuItem value="Truck">Truck</MenuItem>
                    <MenuItem value="Sedan">Sedan</MenuItem>
                    <MenuItem value="SUV">SUV</MenuItem>
                    <MenuItem value="Wagon">Wagon</MenuItem>
                  </Select>
                </FormControl>
                <Button onClick={() => { updateCarInfo(); toggleEditMode(); }} variant="contained" sx={{ marginBottom: '0.5rem' }}>
                  Save
                </Button>
              </>
            ) : (
                <>
                <Avatar
                sx={{ position: 'absolute', top: '0', left: '0', margin: '0.5rem', width: 56, height: 56, bgcolor: green[500] }}><DirectionsCarIcon/></Avatar>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{alignItems: 'left'}}>
                <Typography  variant="h5" sx={{ marginBottom: '0.5rem' }}>
                  Year: {vehicle.vehicle_year}
                </Typography>
                <Typography variant="h5" sx={{ marginBottom: '0.5rem' }}>
                  Make: {vehicle.vehicle_make}
                </Typography>
                <Typography variant="h5" sx={{ marginBottom: '0.5rem' }}>
                  Model: {vehicle.vehicle_model}
                </Typography>
                <Typography variant="h5" sx={{ marginBottom: '0.5rem' }}>
                  Body Style: {vehicle.body_style}
                </Typography>
                <Button onClick={toggleEditMode} variant="outlined"
                style={{ position: 'absolute', top: '0', right: '0', margin: '0.5rem' }}>
                  Edit
                </Button>
                </div>
              </div>
              </>
            )}
          </Card>
        ))}
      </div>
    )
}
export default VehicleEdit;