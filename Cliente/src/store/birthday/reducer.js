const initialState = {birthday: false};

export default (state= initialState,action)=>{
    
    if(action.type === 'UPDATE_BIRTHDAY'){
    
        return {
            ...state,
            birthday: action.payload    
        }
    }

    return state;
};

export const getBirthday = state => state.birthdayReducer.birthday;