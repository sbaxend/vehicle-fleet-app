import { combineReducers } from 'redux';

const vehicleList = (state = [], action) => {
    switch (action.type) {
        case 'SET_VEHICLES':
           
            return action.payload;
        default:
            return state;
    }
}; 

const selectedVehicleHistory = (state = [], action) => {
    switch (action.type) {
        case 'SET_HISTORY':
            return action.payload;
        // case 'CLEAR_CAR_HISTORY' :
        //     return [];
        default:
            return state
    }
};

const selectedVehicle = (state = [], action) => {
    switch (action.type) {
        case 'SET_SELECTION':
            return action.payload;
        default:
            return state
    }
};





export default combineReducers({
    vehicleList,
    selectedVehicleHistory,
    selectedVehicle
})