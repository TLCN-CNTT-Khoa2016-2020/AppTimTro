import {LOGOUT_REQUEST, 
    LOGOUT_SUCCESS, 
    LOGOUT_ERROR} from '../action/actionTypes';


    const requestLogout = () =>{
        return {
            type: LOGOUT_REQUEST
        }
    }
    const logoutSuccess = () =>{
        return {
            type : LOGOUT_SUCCESS
        }
    }
    const logoutError = (error) =>{
        return {
            type: LOGOUT_ERROR,
            error
        } 
    }
    //thunk
    export const logoutUser = (navigateToLogin) => dispatch =>{
        console.log('thunk here')
    }