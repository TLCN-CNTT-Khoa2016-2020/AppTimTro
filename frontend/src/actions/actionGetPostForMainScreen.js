/* ACTION GET POST FOR MAIN SCREEN */
import {
    GETPOSTFORMAINSCREEN_SUCCESS,
    GETPOSTFORMAINSCREEN_REQUEST,
    GETPOSTFORMAINSCREEN_ERROR 
} from '../actions/actionTypes';
//import url 
import {url} from '../ultils/index';


const getPostForMainScreenRequest = () => {
    return {
        type : GETPOSTFORMAINSCREEN_REQUEST
    }
};
const getPostForMainScreenSuccess = (data, isInTheEnd) => {
    return {
        type        : GETPOSTFORMAINSCREEN_SUCCESS,
        data        : data,
        isInTheEnd  : isInTheEnd
    }
};
const getPostForMainScreenError = (err) => {
    return {
        type    : GETPOSTFORMAINSCREEN_ERROR,
        error   : err  
    }
};
//thunk
export const getPostForMainScreen = (authToken, page, navigateToLoginScreen) => dispatch => {
    dispatch(getPostForMainScreenRequest());
    //fetch data
    fetch(`${url}`+ "/posts/mainscreen/getpost?page="+page+"&limit=10",{
        method : 'GET',
        headers : { 
            'Authorization' : 'Bearer '+`${authToken}`
            
        }
    }).then(response => { 
            // if request success
            console.log(response.status)
            if(response.status === 200){
                response.json().then(data => {
                    if(data.result.length < 1 ){
                        dispatch(getPostForMainScreenSuccess(data.result, true));   
                    } else {
                        dispatch(getPostForMainScreenSuccess(data.result, false));
                    }
                })
            }
            if(response.status === 401){ // token expert
                dispatch(getPostForMainScreenError());
                console.log(" Token expire")
                navigateToLoginScreen();
            } 
        })
        .catch(err => {
            dispatch(getPostForMainScreenError());
            console.log(err);
        })

}