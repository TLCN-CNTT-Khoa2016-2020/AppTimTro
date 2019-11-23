import {
    GETPOSTFORMAINSCREEN_ERROR,
    GETPOSTFORMAINSCREEN_REQUEST,
    GETPOSTFORMAINSCREEN_SUCCESS
} from '../actions/actionTypes';

const initialState = {
    data    : [],
    error   : {},
    isInTheEnd : false,
    isGetPostForMainScreenSuccess : false, 
    isGetPostForMainScreenRequest  : false,
    isGetPostForMainScreenError    : false
}   

export const getPostForMainScreenReducer = (prevState = initialState, action) => {
    switch(action.type) {
        case GETPOSTFORMAINSCREEN_REQUEST : 
            return {
                ...prevState,
                isGetPostForMainScreenRequest   : true,
                isGetPostForMainScreenSuccess  : false,
                isGetPostForMainScreenError     : false
            };
        case GETPOSTFORMAINSCREEN_SUCCESS :
            return {
                ...prevState,
                data : [...prevState.data,...action.data] ,
                isInTheEnd : action.isInTheEnd,
                isGetPostForMainScreenRequest   : false,
                isGetPostForMainScreenSuccess   : true,
                isGetPostForMainScreenError     : false,
            };
        case GETPOSTFORMAINSCREEN_ERROR :
            return {
                ...prevState,
                error : action.error,
                isGetPostForMainScreenRequest   : false,
                isGetPostForMainScreenSuccess   : false,
                isGetPostForMainScreenError     : true
            }
        default : return prevState;
    }
}