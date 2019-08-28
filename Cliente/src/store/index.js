import {createStore, combineReducers} from 'redux';
import usernameReducer from './username/reducer';
import typeReducer from './type/reducer';
import carReducer from './shopping_car/reducer';
import pointReducer from './point/reducer'

const reducers = combineReducers({
    usernameReducer,
    typeReducer,
    carReducer,
    pointReducer
})

const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)



export default store;