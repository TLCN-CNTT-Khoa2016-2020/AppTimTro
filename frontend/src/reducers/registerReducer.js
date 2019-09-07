import {REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_ERROR} from '../actions/actionTypes';


const initialState = { 
    isRegistering : false,
    registerError : false,
    isRegisterComplete : false ,
    user : {}
}

export const registerReducer = (prevState = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST :
            return {
                ...prevState,
                isRegistering: true,    
                registerError : false,
                isRegisterComplete : false
            };
        case REGISTER_SUCCESS :
            return {
                ...prevState,
                isRegistering : false,
                registerError : false,
                isRegisterComplete: true,
                user: action.user
            };
        case REGISTER_ERROR : 
            return {
                ...prevState,
                isRegistering: false,
                registerError: true,
                isRegisterComplete : false
            };
    
        default: return prevState;
    }
}