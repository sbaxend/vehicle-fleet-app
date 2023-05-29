import { put, takeEvery } from 'redux-saga/effects'
import axios from 'axios';
function* fetchVehicles () {
    try {
      const vehicles = yield axios.get('/api/vehicle')
      yield put ({type: 'SET_VEHICLES', payload: vehicles.data});
      console.log(vehicles.data)
    } catch (error) {
      console.log(`error in fetchVehicles: ${error}`);
          alert('Something went wrong.');
    }
  };

  function* fetchSelectedVehicle (action) {
    const carId = action.payload.vehicleId;
    try {
      const selection = yield axios.get(`/api/vehicle/${carId}`);
      yield put({type: 'SET_SELECTION', payload: selection.data});
    } catch (error) {
      console.log(`error in fetchSelection: ${error}`)
      alert('Something went wrong')
    }
  }

function* postVehicle (action) {
  console.log('in postVehicle', action.payload)
  try {
    yield axios.post('/api/vehicle', action.payload);
    console.log('FETCH_VECHILES');
    yield put ({type: 'FETCH_VEHICLES' });
    console.log('Done with FETCH_VECHILES');
    
    action.clearForm();
   
  } catch (error) {
    console.log(`error in postVehicle`);
    alert('Something went wrong');
  }
};

function* fetchCarHistory (action) {
  console.log('IN fetchCarHistory');
  const carId = action.payload.vehicleId
  console.log('History Vehicle ID:', carId)
  try {
    const history = yield axios.get(`/api/vehicle/history/${carId}`)
    yield put ({type: 'SET_HISTORY', payload: history.data})
  } catch (error) {
    console.log(`error in fetchCarHistory: ${error}`);
    alert('Something went wrong.');
  }
}


function* garageSaga(){
    yield takeEvery('FETCH_VEHICLES', fetchVehicles);
    yield takeEvery('ADD_VEHICLE', postVehicle);
    yield takeEvery('FETCH_CAR_HISTORY', fetchCarHistory );
    yield takeEvery('FETCH_SELECTED_VEHICLE', fetchSelectedVehicle)
};

export default garageSaga;