const updateBirth = bool => {
    console.log(bool)
    return{
        type: 'UPDATE_BIRTHDAY',
        payload: bool
    }
}


export default updateBirth;