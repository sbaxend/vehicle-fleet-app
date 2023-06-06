import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button'
import  Divider  from '@mui/material/Divider';
import { useParams } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
function History() {
    const { vehicleId } = useParams();
    const dispatch = useDispatch();
    const info = useSelector((store) => store.vehicles.selectedVehicleHistory);
    
    const history = useHistory();
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [notes, setNotes] = useState('');

    const submitHistory = (event) => {
        event.preventDefault();
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

    useEffect(() => {
        dispatch({ type: 'FETCH_CAR_HISTORY', payload: vehicleId  });
        console.log('Fetching car history');
        dispatch({type: 'FETCH_SELECTED_VEHICLE', payload: vehicleId })
      }, []);

    return (
        <Container>
        <Typography variant="h6" align="left" sx={{ mt: 2 }}>
        Add Your Vehicle History 
        </Typography>
        <Typography variant="h8">(Maintenance, purchases, oil changes, etc.)</Typography>
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
    )
}

export default History;