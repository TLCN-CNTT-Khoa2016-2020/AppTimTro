/* ACTION GET POST APRROVED FOR BAIDANG SCREEN */
import {
    GETPOSTAPPROVED_ERROR,
    GETPOSTAPPROVED_REQUEST,
    GETPOSTAPPROVED_SUCCESS
} from '../actions/actionTypes';
import {url} from '../ultils/index'


const getPostApprovedRequest = () => {
    return {
        type :  GETPOSTAPPROVED_REQUEST
    }
};
const getPostApprovedSuccess = (data, isInTheEnd) => {
    return {
        type        : GETPOSTAPPROVED_SUCCESS,
        data        : data,
        isInTheEnd  : isInTheEnd
    }
};
const getPostApprovedError = (error) => {
    return {
        type  : GETPOSTAPPROVED_ERROR,
        error : error
    }
}
//thunk
export const getPostApproved = (authToken, page, userID, navigateToLoginScreen) => dispatch => {
    dispatch(getPostApprovedRequest());
    //fetch data
    fetch(`${url}` + "/posts/approvedpost/" + userID + "?page=" + page +"&limit=10",{
        method : 'GET',
        headers : {
            'Authorization' : 'Bearer '+`${authToken}`
        }
    }).then(response => {
        //if request success 
        if(response.status === 200){
            response.json().then(data => {
                if(data.result.length < 1){
                    dispatch(getPostApprovedSuccess(data.result), true);
                } else {
                    dispatch(getPostApprovedSuccess(data.result, false))
                }
            })
        } 
        if(response.status === 401){
            dispatch(getPostUnApprovedError())
            console.log("Token expert")
            navigateToLoginScreen()
        }
    }).catch(error => {
        dispatch(getPostApprovedError());
        console.log(error);
    })

}