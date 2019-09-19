const initialState = {car: []};

export default (state= initialState,action)=>{
    if(action.type === 'UPDATE_CAR'){
        
        return {
            ...state,
            car: action.payload    
        }
    } 

    return state;
};

export const getCar = state => state.carReducer.car;