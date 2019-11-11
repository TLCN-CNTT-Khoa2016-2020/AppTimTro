import {
    GETPOSTAPPROVED_ERROR,
    GETPOSTAPPROVED_REQUEST,
    GETPOSTAPPROVED_SUCCESS
} from '../actions/actionTypes';

const initialState = {
    data        : [],
    error       : {},
    isInTheEnd  : false,
    isGetPostApprovedRequest : false,
    isGetPostApprovedSuccess : false,
    isGetPostApprovedError : false
}

export const getPostApprovedReducer = (prevState = initialState, action) => {
    switch(action.type) {
        case GETPOSTAPPROVED_REQUEST : 
            return {
                ...prevState,
                isGetPostApprovedRequest : true,
                isGetPostApprovedSuccess : false,
                isGetPostApprovedError : false
            };
        case GETPOSTAPPROVED_SUCCESS :
            return {
                ...prevState,
                data : [...prevState.data,...action.data],
                isInTheEnd : action.isInTheEnd,
                isGetPostApprovedRequest : false,
                isGetPostApprovedSuccess : true,
                isGetPostApprovedError : false
            };
        case GETPOSTAPPROVED_ERROR : 
            return {
                ...prevState,
                error : action.error,
                isGetPostApprovedRequest : false,
                isGetPostApprovedSuccess : false,
                isGetPostApprovedError : true
            };
        default : return prevState
    }
}