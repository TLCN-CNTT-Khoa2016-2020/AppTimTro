import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_ERROR
} from './actionTypes';
import {AsyncStorage} from 'react-native';
import axios from 'axios';
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
    fetch('http://192.168.1.5:8080/users/login', {
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