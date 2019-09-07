import {REGISTER_REQUEST,
    REGISTER_SUCCESS, 
    REGISTER_ERROR} from './actionTypes';
//action
const requestRegister = () =>{
    return {
        type: REGISTER_REQUEST
    };
};
const registerSuccess = (user) =>{
    return {
        type: REGISTER_SUCCESS,
        user
    }
}
const registerError = () =>{
    return {
        type: REGISTER_ERROR
    }
}
// thunk
export const registerUser = (email, password) => dispath => {
    console.log("use thunk in here")
}