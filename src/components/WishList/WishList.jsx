import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button'
import {useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import  Divider  from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';


function WishList() {
const { vehicleId } = useParams();
const dispatch = useDispatch();
const wish = useSelector((store) => store.vehicles.selectedVehicleWishlist);
const selection = useSelector((store) => store.vehicles.selectedVehicle)
console.log(wish)
const history = useHistory();

const [wishlistDescription, setWishlistDescription] = useState('');


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };




const submitWish = (event) => {
    event.preventDefault()
    // let vehicleId = carId.vehicleId
    console.log('In submitWish. car id is:', vehicleId)
    dispatch(
        {
            type: 'ADD_WISHLIST',
            payload: {
              vehicleId: vehicleId,
              wishlist_description: wishlistDescription
            },
          }
    )
    
};

const deleteWish = (wishlistId) => {
    event.preventDefault();
    console.log('In deleteWishlist. wishlist id is:', wishlistId);
    dispatch({
        type: 'WISHLIST_DELETE',
        payload: {
          wishlistId: wishlistId,
          vehicleId: vehicleId
        }
      });
}


console.log(vehicleId)
useEffect(() => {
    dispatch({ type: 'FETCH_WISHLIST', payload: vehicleId  });
    console.log('Fetching car history');
    dispatch({type: 'FETCH_SELECTED_VEHICLE', payload: vehicleId })
  }, []);

    return (
        <Container>
        <Typography variant="h6" align="left" sx={{ mt: 2 }}>
        Add To Your Wishlist 
        </Typography>
        <Typography variant="h8">(Upgrades and accessories)</Typography>
      <form onSubmit={submitWish}>
        <TextField
          value={wishlistDescription}
          onChange={(evt) => setWishlistDescription(evt.target.value)}
          type="text"
          label="Description"
          required
          fullWidth
          sx={{ mt: 2 }}
        />
        <Button startIcon={<AddCircleOutlineIcon/>}type="submit" variant="contained" sx={{ mt: 2 }}>
          Add
        </Button>
        
        <Divider style={{ marginTop: '2rem' }} />
      
        <Typography variant="h6" align="left" sx={{ mt: 2 }}>
         Your Wishlist:
        </Typography>
      </form>
      <Table sx={{ mt: 4 }}>
        <TableHead>
          <TableRow>
            <TableCell>Completion</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {wish.map((item) => (
            <TableRow key={item.id}>
              <TableCell><Checkbox {...label} /></TableCell>
              <TableCell>{item.wishlist_description}</TableCell>
              <TableCell><Button onClick={() => deleteWish(item.id)}>Delete</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </Container>
);
}

export default WishList