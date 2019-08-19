const initialState = {username: ""};

export default (state= initialState,action)=>{

    if(action.type === "UPDATE_USERNAME"){
        return {...state,username: action.payload}
    }

    return state;
};

export const getUsername = state => state.usernameReducer.username;