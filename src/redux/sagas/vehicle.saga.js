import { put, takeEvery, takeLatest } from 'redux-saga/effects'
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
    const carId = action.payload;
    try {
      const selection = yield axios.get(`/api/vehicle/${carId}`);
      yield put({type: 'SET_SELECTION', payload: selection.data});
    } catch (error) {
      console.log(`error in fetchSelection: ${error}`)
      alert('Something went wrong')
    }
  };
  
  function* fetchCarHistory (action) {
    console.log('IN fetchCarHistory');
    const vehicleId  = action.payload;
    console.log('History Vehicle ID:', vehicleId)
    try {
      const history = yield axios.get(`/api/vehicle/history/${vehicleId}`)
      yield put ({type: 'SET_HISTORY', payload: history.data})
    } catch (error) {
      console.log(`error in fetchCarHistory: ${error}`);
      alert('Something went wrong.');
    }
  };

  function* fetchWishlist (action) {
    console.log('IN fetchWishlist');
    const vehicleId  = action.payload;
    console.log('Wishlist Vehicle ID:', vehicleId)
    try {
      const wish = yield axios.get(`/api/vehicle/wishlist/${vehicleId}`)
      yield put ({type: 'SET_WISHLIST', payload: wish.data})
    } catch (error) {
      console.log(`error in fetchWishlist: ${error}`);
      alert('Something went wrong.');
    }
  };

function* postVehicle (action) {
  console.log('in postVehicle', action.payload)
  try {
    yield axios.post('/api/vehicle', action.payload);
    console.log('FETCH_VECHILES');
    yield put ({type: 'FETCH_VEHICLES' });
    console.log('Done with FETCH_VECHILES');
    
    
   
  } catch (error) {
    console.log(`error in postVehicle`);
    alert('Something went wrong');
  }
};

function* postHistory (action) {
  const carId = action.payload.vehicleId
  console.log(carId)
  console.log('in postHistory', carId)
  try {
    yield axios.post(`/api/vehicle/history/${carId}`, {
      history_date: action.payload.history_date,
      history_description: action.payload.history_description,
      history_notes: action.payload.history_notes
    });
    yield put({type: 'FETCH_CAR_HISTORY', payload: carId});
    //clear history form
  } catch (error) {
    console.log(`error in postHistory`);
    alert('Something went wrong');
  }
}

function* postWishlist (action) {
  const carId = action.payload.vehicleId
  console.log(carId)
  console.log('in postWishlist', carId)
  console.log(action.payload.wishlist_description)
  try {
    yield axios.post(`/api/vehicle/wishlist/${carId}`, {
      wishlist_description: action.payload.wishlist_description,
     
    });
    yield put({type: 'FETCH_WISHLIST', payload: carId});
    
  } catch (error) {
    console.log(`error in postHistory`);
    alert('Something went wrong');
  }
}

function* deleteAll (action) {
  const vehicleId = action.payload.vehicleId;
  console.log('In deleteAll car id is:', vehicleId)
  try {
    yield axios.delete(`/api/vehicle/history/${vehicleId}`);
    console.log('History Cleared');
    yield axios.delete(`/api/vehicle/wishlist/${vehicleId}`);
    console.log('Wishlist Cleared');
    yield axios.delete(`/api/vehicle/car/${vehicleId}`);
    console.log('Car Deletion Completed');
    yield put ({type: 'FETCH_VEHICLES' });
  } catch (error) {
    console.log(`error in deleteAll`);
    alert('Something went wrong')
  }
};

function* deleteHistory (action) {
  let vehicleId = action.payload.vehicleId;
  let historyId = action.payload.historyId;
  try {
    yield axios.delete(`/api/vehicle/past/${historyId}`)
    yield put({type: 'FETCH_CAR_HISTORY', payload:vehicleId})
  } catch (error) {
    console.log('Error in deleteHistory')
  };
};

function* deleteWish (action) {
  let vehicleId = action.payload.vehicleId;
  let wishlistId = action.payload.wishlistId;
  console.log('In deleteWish. wishlist ID: ', wishlistId)
  console.log('In deleteWish. vehicle ID: ', vehicleId)
  try {
    yield axios.delete(`/api/vehicle/wish/${wishlistId}`);
    yield put ({type: 'FETCH_WISHLIST', payload: vehicleId})
  }  catch (error) {
    console.log('Error in deleteWish')
  };
}

function* updateCarInfo(action) {
  const vehicleId = action.payload.vehicleId;
  console.log('IN updateCarInfo Saga. ID:', vehicleId);
  try { 
    yield axios.put(`/api/vehicle/car/${vehicleId}`, {
      vehicle_make: action.payload.vehicle_make, 
      vehicle_year: action.payload.vehicle_year, 
      vehicle_model:action.payload.vehicle_model, 
      body_style: action.payload.body_style
    });
    console.log('CAR UPDATED')
    yield put({type: 'FETCH_SELECTED_CAR'});
    console.log('SELECTION FETCHED')
   } catch (error) {
    console.log(`error in UpdateCarInfo`);
    alert('Something went wrong')
  }
};



function* garageSaga(){
    yield takeEvery('FETCH_VEHICLES', fetchVehicles);
    yield takeEvery('ADD_VEHICLE', postVehicle);
    yield takeLatest('FETCH_CAR_HISTORY', fetchCarHistory );
    yield takeEvery('FETCH_SELECTED_VEHICLE', fetchSelectedVehicle);
    yield takeEvery('ADD_HISTORY', postHistory);
    yield takeEvery('DELETE_VEHICLE', deleteAll );
    yield takeEvery('SEND_UPDATED_CAR', updateCarInfo);
    yield takeEvery('HISTORY_DELETE', deleteHistory);
    yield takeEvery('FETCH_WISHLIST', fetchWishlist)
    yield takeEvery('ADD_WISHLIST', postWishlist);
    yield takeEvery('WISHLIST_DELETE', deleteWish)
};

export default garageSaga;