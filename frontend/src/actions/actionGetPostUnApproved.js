/* ACTION GET POST UNAPRROVED FOR BAIDANG SCREEN */
import {
    GETPOSTUNAPPROVED_REQUEST,
    GETPOSTUNAPPROVED_ERROR,
    GETPOSTUNAPPROVED_SUCCESS
} from '../actions/actionTypes';
import {url} from '../ultils/index'


const getPostUnApprovedRequest = () => {
    return {
        type :  GETPOSTUNAPPROVED_REQUEST
    }
};
const getPostUnApprovedSuccess = (data, isInTheEnd) => {
    return {
        type        : GETPOSTUNAPPROVED_SUCCESS,
        data        : data,
        isInTheEnd  : isInTheEnd
    }
};
const getPostUnApprovedError = (error) => {
    return {
        type  : GETPOSTUNAPPROVED_ERROR,
        error : error
    }
}
//thunk
export const getPostUnApproved = (authToken, page, userID) => dispatch => {
    dispatch(getPostUnApprovedRequest());
    //fetch data
    fetch(`${url}` + "/posts/unapprovedpost/" + userID + "?page=" + page +"&limit=10",{
        method : 'GET',
        headers : {
            'Authorization' : 'Bearer '+`${authToken}`
        }
    }).then(response => {
        //if request success 
        if(response.status === 200){
            response.json().then(data => {
                if(data.result.length < 1){
                    dispatch(getPostUnApprovedSuccess(data.result, true));
                } else {
                    dispatch(getPostUnApprovedSuccess(data.result, false))
                }
            })
        } else {
            dispatch(getPostUnApprovedError())
            console.log(" Response status another 200")
        }
    }).catch(error => {
        dispatch(getPostUnApprovedError());
        console.log(error);
    })

}