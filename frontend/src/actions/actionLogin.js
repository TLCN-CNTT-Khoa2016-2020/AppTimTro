import {LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_ERROR } from './actionTypes';

    
//action
const requestLogin = () =>{
    return {
        type: LOGIN_REQUEST
    };
}
const loginSuccess = (user) =>{
    return {
        type: LOGIN_SUCCESS,
        user
    }
}
const loginError = (err) =>{
    return {
        type: LOGIN_ERROR,
        err
    }
}
//thunk
export const loginUser = (email, password, navigateToLobby) => dispatch =>{
    console.log("thunk here")

}