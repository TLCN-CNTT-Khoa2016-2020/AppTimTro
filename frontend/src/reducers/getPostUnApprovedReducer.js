import {
    GETPOSTUNAPPROVED_ERROR,
    GETPOSTUNAPPROVED_REQUEST,
    GETPOSTUNAPPROVED_SUCCESS
} from '../actions/actionTypes';

const initialState = {
    data        : [],
    error       : {},
    isInTheEnd  : false,
    isGetPostUnApprovedRequest : false,
    isGetPostUnApprovedSuccess : false,
    isGetPostUnApprovedError : false
}

export const getPostUnApprovedReducer = (prevState = initialState, action) => {
    switch(action.type) {
        case GETPOSTUNAPPROVED_REQUEST : 
            return {
                ...prevState,
                isGetPostUnApprovedRequest : true,
                isGetPostUnApprovedSuccess : false,
                isGetPostUnApprovedError : false
            };
        case GETPOSTUNAPPROVED_SUCCESS :
            return {
                ...prevState,
                data : [...prevState.data,...action.data],
                isInTheEnd : action.isInTheEnd,
                isGetPostUnApprovedRequest : false,
                isGetPostUnApprovedSuccess : true,
                isGetPostUnApprovedError : false
            };
        case GETPOSTUNAPPROVED_ERROR : 
            return {
                ...prevState,
                error : action.error,
                isGetPostUnApprovedRequest : false,
                isGetPostUnApprovedSuccess : false,
                isGetPostUnApprovedError : true
            };
        default : return prevState
    }
}