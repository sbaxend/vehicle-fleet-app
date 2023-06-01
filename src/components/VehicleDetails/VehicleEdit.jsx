import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button'
import { useHistory } from "react-router-dom";
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
        <div>
            {selection.map((vehicle) => (
                <Card key={vehicle.id}>
                    {editMode ? ( 
              <>
               <input
                value={editYear}
                onChange={(evt) => setEditYear(evt.target.value)}
                type="number"
                placeholder="Year"
              />
              <br />
              <input
                value={editMake}
                onChange={(evt) => setEditMake(evt.target.value)}
                type="text"
                placeholder="Make"
              />
              <br />
              <input
                value={editModel}
                onChange={(evt) => setEditModel(evt.target.value)}
                type="text"
                placeholder="Model"
              />
              <br />
              <select value={editBody} onChange={(evt) => setEditBody(evt.target.value)}>
                <option>Select Body Style</option>
                <option>Cargo Van</option>
                <option>Convertible</option>
                <option>Coupe</option>
                <option>Hatchback</option>
                <option>Minivan</option>
                <option>Truck</option>
                <option>Sedan</option>
                <option>Wagon</option>
              </select>
                 <Button onClick={() => { updateCarInfo(); toggleEditMode(); }}>Save</Button>
              </>
            ) : (
              <>
                <h3>Year: {vehicle.vehicle_year}</h3>
                <h3>Make: {vehicle.vehicle_make}</h3>
                <h3>Model: {vehicle.vehicle_model}</h3>
                <h3>Body Style: {vehicle.body_style}<Button onClick={toggleEditMode}>Edit</Button></h3> 
                
              </>
            )}

                {/* <h3>Year: {vehicle.vehicle_year}</h3>
                <h3>Make: {vehicle.vehicle_make}</h3>
                <h3>Model: {vehicle.vehicle_model}</h3>
                <h3>Body Style: {vehicle.body_style}</h3> */}
                </Card>
            ))}
        </div>
    )
}
export default VehicleEdit;