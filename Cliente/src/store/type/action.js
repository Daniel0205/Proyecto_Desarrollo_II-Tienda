const updateType = type => {
    console.log(type)
    return{
        type: 'UPDATE_TYPE',
        payload: type
    }
}


export default updateType;