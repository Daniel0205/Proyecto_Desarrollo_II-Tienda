import {createStore, combineReducers} from 'redux';
import usernameReducer from './username/reducer';
import typeReducer from './type/reducer';

const reducers = combineReducers({
    usernameReducer,
    typeReducer
})

const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)



export default store;