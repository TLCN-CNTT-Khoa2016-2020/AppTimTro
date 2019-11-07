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
const getPostForMainScreenSuccess = (data) => {
    return {
        type : GETPOSTFORMAINSCREEN_SUCCESS,
        data : data
    }
};
const getPostForMainScreenError = (err) => {
    return {
        type    : GETPOSTFORMAINSCREEN_ERROR,
        error   : err  
    }
};
//thunk
export const getPostForMainScreen = (authToken, page) => dispatch => {
    dispatch(getPostForMainScreenRequest());
    //fetch data
    fetch(`${url}`+ "/posts/mainscreen/getpost?page="+page+"&limit=10",{
        method : 'GET',
        headers : { 
            'Authorization' : 'Bearer '+`${authToken}`
            
        }
    }).then(response => { 
            // if request success
            if(response.status === 200){
                response.json().then(data => {
                    dispatch(getPostForMainScreenSuccess(data.result));
                    //console.log(data.result)
                })
            } else {
                dispatch(getPostForMainScreenError());
                console.log("another 200")
            }
        })
        .catch(err => {
            dispatch(getPostForMainScreenError());
            console.log(err);
        })

}