const vehicleList = (state = [], action) => {
    switch (action.type) {
        case 'SET_VEHICLES':
            return action.payload;
        default:
            return state;
    }
}; 

export default vehicleList;