import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR} from '../actions/actionTypes';

const initialState = {
    user: {},
    error :{},
    isLoginComplete : false,
    isLoginError: false,
    isLogining: false

}

export const loginReducer = (prevState = initialState, action) =>{
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...prevState,
                isLogining: true,
                isLoginComplete: false,
                isLoginError : false,
            };
        case LOGIN_SUCCESS:
            return {
                ...prevState,
                user : action.user,
                isLoginComplete: true,
                isLoginError: false,
                isLogining : false
            };
        case LOGIN_ERROR :
            return {
                ...prevState,
                error : action.err,
                isLoginError: true,
                isLoginComplete: false,
                isLogining: false
            }
    
        default: return prevState;
    }
}