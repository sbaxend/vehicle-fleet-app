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

function* garageSaga(){
    yield takeEvery('FETCH_VEHICLES', fetchVehicles)
};

export default garageSaga;