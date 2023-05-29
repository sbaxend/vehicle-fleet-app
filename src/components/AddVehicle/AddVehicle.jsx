import Container from '@mui/material/Container';
import {useState, useEffect} from 'react'
import { useDispatch, useHistory } from 'react-redux';
function AddVehicle () {
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [body, setBody] = useState('');

    const dispatch = useDispatch();
    
    const clearForm = () => {
        setMake('')
        setModel('')
        setYear('')
        setBody('')
    }

    const AddVehicle = () => {
        if (make && model && year && body) {
        dispatch({
            type: 'ADD_VEHICLE',
            payload: { vehicle_make: make,
                       vehicle_year: year,
                       vehicle_model: model,
                       body_style: body},
            clearForm,
          });
         } else {
            alert('Please fill out all input fields');
          }
          
    };

console.log(year, make, model, body)
    return (
        <>
        <Container   style={{ marginTop: '4rem' }} >

        <h1>ADD PAGE</h1>
        <form>
           Year: <input value={year} onChange={evt => setYear(evt.target.value)} type="number"  max="2099" required></input>
           Make:<input value={make} onChange={evt => setMake(evt.target.value)}type="text" required></input>
           Model: <input value={model} onChange={evt => setModel(evt.target.value)}type="text" required></input>
           Body: <select value={body} onChange={evt => setBody(evt.target.value)} required>
          <option >Select Body Style</option>
          <option>Cargo Van</option>
          <option>Convertible</option>
          <option>Coupe</option>
          <option>Hatchback</option>
          <option>Minivan</option>
          <option>Truck</option>
          <option>Sedan</option>
          <option>Wagon</option>

          
        </select>
           <br />
      <button onClick={AddVehicle} type="submit">Submit</button>
            

        </form>

        </Container>
        

        </>
    )
}

export default AddVehicle