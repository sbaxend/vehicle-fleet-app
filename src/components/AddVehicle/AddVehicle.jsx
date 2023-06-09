import Container from '@mui/material/Container';
import {useState, useEffect} from 'react'
import { useDispatch, useHistory } from 'react-redux';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Card from '@mui/material/Card';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
function AddVehicle () {
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [body, setBody] = useState('');
    const [showAlert, setShowAlert] = useState(false);

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
              payload: {
                vehicle_make: make,
                vehicle_year: year,
                vehicle_model: model,
                body_style: body,
              },
            });
            clearForm;
            setShowAlert(true); 
          } else {
            alert('Please fill out all input fields');
          }
    };

    const handleAlertClose = () => {
        setShowAlert(false);
      };

console.log(year, make, model, body)
    return (
        <>
        <Container   style={{ marginTop: '5rem' }} >

        <Card variant="outlined" sx={{boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.3)', borderRadius: '8px', textAlign: 'center', padding: '1rem' }}>
        <Typography variant="h4" component="div">
          Add Your New Vehicle
        </Typography>
      </Card>
        <form style={{ marginTop: '2rem' }} >
        <TextField
          label="Year"
          type="number"
          inputProps={{ min: 1900, max: 2099 }}
          value={year}
          onChange={(evt) => setYear(evt.target.value)}
          required
          fullWidth
          sx={{ mb: 2 }}
        />
        
        <TextField
          label="Make"
          type="text"
          value={make}
          onChange={(evt) => setMake(evt.target.value)}
          required
          fullWidth
          sx={{ mb: 2 }}
        />
        
        <TextField
          label="Model"
          type="text"
          value={model}
          onChange={(evt) => setModel(evt.target.value)}
          required
          fullWidth
          sx={{ mb: 2 }}
        />
       
        <FormControl required fullWidth>
          <InputLabel>Select Body Style</InputLabel>
          <Select value={body} onChange={(evt) => setBody(evt.target.value)}>
            <MenuItem value="Cargo Van">Cargo Van</MenuItem>
            <MenuItem value="Convertible">Convertible</MenuItem>
            <MenuItem value="Coupe">Coupe</MenuItem>
            <MenuItem value="Cross">Crossover</MenuItem>
            <MenuItem value="Hatchback">Hatchback</MenuItem>
            <MenuItem value="Minivan">Minivan</MenuItem>
            <MenuItem value="Truck">Truck</MenuItem>
            <MenuItem value="Sedan">Sedan</MenuItem>
            <MenuItem value="SUV">SUV</MenuItem>
            <MenuItem value="Wagon">Wagon</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" onClick={AddVehicle} type="submit" sx={{ mt: 2 }}>
          Submit
        </Button>
      </form>
      <Snackbar open={showAlert} autoHideDuration={4000} onClose={handleAlertClose}>
        <MuiAlert onClose={handleAlertClose} severity="success" elevation={6} variant="filled">
          Vehicle added successfully!
        </MuiAlert>
      </Snackbar>

        </Container>
        

        </>
    )
}

export default AddVehicle