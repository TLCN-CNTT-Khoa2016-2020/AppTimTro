import {
    GET_LOCATION_INTHECIRCLE_ERROR,
    GET_LOCATION_INTHECIRCLE_REQUEST,
    GET_LOCATION_INTHECIRCLE_SUCCESS
} from '../actions/actionTypes'

const initialState = {
    data        : [],
    error       : {},
    isGetLocationInTheCircleSuccess : false,
    isGetLocationInTheCircleRequest : false,
    isGetLocationInTheCircleError : false
}
export const getLocationInTheCircleReducer = (prevState = initialState, action) => {
    switch(action.type){
        case GET_LOCATION_INTHECIRCLE_REQUEST : 
            return {
                ...prevState,
                isGetLocationInTheCircleSuccess : false,
                isGetLocationInTheCircleRequest : true,
                isGetLocationInTheCircleError : false

            };
        case GET_LOCATION_INTHECIRCLE_SUCCESS : 
            return {
                ...prevState,
                data : action.data,
                isGetLocationInTheCircleSuccess : true,
                isGetLocationInTheCircleRequest : false,
                isGetLocationInTheCircleError : false
            };
        case GET_LOCATION_INTHECIRCLE_ERROR : 
            return {
                ...prevState,
                error : action.error,
                isGetLocationInTheCircleSuccess : false,
                isGetLocationInTheCircleRequest : false,
                isGetLocationInTheCircleError : true
            };
        default : return prevState;
    }
}