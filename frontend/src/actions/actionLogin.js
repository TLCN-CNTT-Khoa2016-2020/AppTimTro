import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_ERROR
} from './actionTypes';
import {url} from '../ultils/index'
//action
const requestLogin = () => {
    return {
        type: LOGIN_REQUEST
    };
}
const loginSuccess = (user) => {
    return {
        type: LOGIN_SUCCESS,
        user
    }
}
const loginError = (err) => {
    return {
        type: LOGIN_ERROR,
        err
    }
}
//thunk
export const loginUser = (username, password, navigateToMainScreen) => dispatch => {
    dispatch(requestLogin());
    fetch( `${url}`+'/users/login', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
    }).then(response => {
        if(response.status === 200){
            dispatch(loginSuccess());
            //storage to asyncStorage
            response.json().then(data => {
                navigateToMainScreen(data);
                console.log({
                    status      : response.status,
                    message     : data.message,
                })
            })

        }
        
    }).catch(err => {
        dispatch(loginError())
        console.log(err)
    })
   

}