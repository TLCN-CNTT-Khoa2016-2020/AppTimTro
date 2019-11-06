import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR} from '../actions/actionTypes';

const initialState = {
    user: {},
    error :{},
    isLoginComplete : false,
    isLoginError: false,
    isLoginRequest: false

}

export const loginReducer = (prevState = initialState, action) =>{
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...prevState,
                isLoginRequest: true,
                isLoginComplete: false,
                isLoginError : false,
            };
        case LOGIN_SUCCESS:
            return {
                ...prevState,
                user : action.user,
                isLoginComplete: true,
                isLoginError: false,
                isLoginRequest : false
            };
        case LOGIN_ERROR :
            return {
                ...prevState,
                error : action.err,
                isLoginError: true,
                isLoginComplete: false,
                isLoginRequest: false
            }
    
        default: return prevState;
    }
}