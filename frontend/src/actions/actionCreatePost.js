/* ACTION CREATE POST  */
import {
    CREATE_POST_SUCCESS,
    CREATE_POST_REQUEST,
    CREATE_POST_ERROR
} from '../actions/actionTypes';
import {url} from '../ultils/index';


const createPostRequest = () => {
    return {
        type : CREATE_POST_REQUEST
    }
};
const createPostSuccess = () => {
    return {
        type : CREATE_POST_SUCCESS,
    }
}
const createPostError = (error) => {
    return {
        type    : CREATE_POST_ERROR,
        error   : error
    }
}
//thunk

export const createPost = (authToken, post, handleNavigateToMainScreen, navigateToLoginScreen) => dispatch => {
    dispatch(createPostRequest());     
    //fetch data
    fetch(`${url}` + "/posts/",{
        method : 'POST',
        headers : {
            //Accept: 'application/json',
            'Authorization' : 'Bearer '+`${authToken}`,
            'Content-Type': 'multipart/form-data',
        },
        body : post
    }).then(response => {
        if(response.status === 201){
            console.log("Create Successfull !")
            dispatch(createPostSuccess());
            handleNavigateToMainScreen()
        } else{
            console.log("Create Fail!")
            response.json().then(data => {
                console.log(data.error)
            })
        }
        if(response.status === 401){
            dispatch(getPostUnApprovedError())
            console.log("Token expert")
            navigateToLoginScreen()
        }
        
    }).catch(error => {
        console.log(error + "cmm");
        dispatch(createPostError(error));
    })

}