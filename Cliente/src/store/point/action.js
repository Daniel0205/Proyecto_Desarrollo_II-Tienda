const updatePoint = point => {
    console.log(point)
    return{
        type: 'UPDATE_POINT',
        payload: point
    }
}


export default updatePoint;