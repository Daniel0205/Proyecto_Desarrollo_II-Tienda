const initialState = {point: ""};

export default (state= initialState,action)=>{
    if(action.point === 'UPDATE_POINT'){
        
        return {
            ...state,
            point: action.payload    
        }
    }

    return state;
};

export const getPoint = state => state.pointReducer.point;