const initialState = {point: "Cali"};

export default (state= initialState,action)=>{
    
    if(action.type === 'UPDATE_POINT'){
    
        return {
            ...state,
            point: action.payload    
        }
    }

    return state;
};

export const getPoint = state => state.pointReducer.point;