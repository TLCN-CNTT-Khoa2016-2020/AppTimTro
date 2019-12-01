import {
    GET_LOCATION_INTHECIRCLE_REQUEST,
    GET_LOCATION_INTHECIRCLE_SUCCESS,
    GET_LOCATION_INTHECIRCLE_ERROR
} from '../actions/actionTypes';
import {url} from '../ultils/index';

const getLocationInTheCircleRequest = () => {
    return {
        type : GET_LOCATION_INTHECIRCLE_REQUEST
    }
}
const getLocationInTheCircleSuccess = (data) => {
    return {
        type : GET_LOCATION_INTHECIRCLE_SUCCESS,
        data : data
    }
}
const getLocationInTheCircleError = (error) => {
    return {
        type  : GET_LOCATION_INTHECIRCLE_ERROR,
        error : error
    }
}

// thunk
export const getLocationInTheCircle = (authToken, centerPoint, radius, navigateToLoginScreen) => dispatch => {
    dispatch(getLocationInTheCircleRequest());
    //fetch data
    fetch(`${url}`+ "/maps/getlocationwithradius",{
        method :'POST',
        headers : { 
            Accept: 'application/json', 
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer '+`${authToken}`
        },
        body : JSON.stringify({
            centerPoint : centerPoint,
            radius      : radius
        })
    }).then(response => {
        //if resquest success
        if(response.status === 200){
            response.json().then(data => {
                dispatch(getLocationInTheCircleSuccess(data.result))
            })
        }

        if(response.status === 401){ // token expire
            dispatch(getPostForMainScreenError());
            console.log(" Token expire")
            navigateToLoginScreen();
        }
    }).catch(error => {
        dispatch(getLocationInTheCircleError(error));
        console.log(error)
    })
}