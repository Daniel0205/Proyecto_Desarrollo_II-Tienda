const initialState = {car: [
    {
        isbn:'9788476588871',
        title:'Libro1',
        quantity:9,
        distribution_point:'Cali',
        limit:10
    },
    {
        isbn:'9788476588871',
        title:'Libro2',
        quantity:2,
        distribution_point:'Medellin',
        limit:10
    },
    {
        isbn:'9788476588871',
        title:'Libro1',
        quantity:9,
        distribution_point:'Bogota',
        limit:10
    }]};

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