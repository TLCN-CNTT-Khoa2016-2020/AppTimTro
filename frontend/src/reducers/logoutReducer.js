import {LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_ERROR} from '../actions/actionTypes';
const initialState = {
    error :{},
    isLogout: false
}

export const logoutReducer = (prevState = initialState, action) =>{
    switch (action.type) {
        case LOGOUT_REQUEST:
            return {
                ...prevState,
            };
        case LOGOUT_SUCCESS :
            return {
                ...prevState,
                isLogout: true
            };
        case LOGOUT_ERROR : 
            return {
                ...prevState,
                error : action.error
            };
        default: return prevState;
    }
}