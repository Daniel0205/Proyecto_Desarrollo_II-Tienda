const initialState = {type: "init"};

export default (state= initialState,action)=>{
    if(action.type === 'UPDATE_TYPE'){
        console.log(action.type)
        return {
            ...state,
            type: action.payload    
        }
    }

    return state;
};

export const getType = state => state.typeReducer.type;