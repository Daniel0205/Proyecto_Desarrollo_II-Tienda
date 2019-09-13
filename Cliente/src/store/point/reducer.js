const initialState = {point: "---"};

export default (state= initialState,action)=>{
    console.log(action.type)
    if(action.type === 'UPDATE_POINT'){
        console.log("entreo")
        return {
            ...state,
            point: action.payload    
        }
    }

    return state;
};

export const getPoint = state => state.pointReducer.point;