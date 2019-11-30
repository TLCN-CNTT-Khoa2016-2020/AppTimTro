import {REGISTER_REQUEST,
    REGISTER_SUCCESS, 
    REGISTER_ERROR} from './actionTypes';
    import {url} from '../ultils/index'
//action
const requestRegister = () =>{
    return {
        type: REGISTER_REQUEST
    };
};
const registerSuccess = (user) =>{
    return {
        type: REGISTER_SUCCESS,
        user
    }
}
const registerError = () =>{
    return {
        type: REGISTER_ERROR
    }
}
// thunk
export const registerUser = (username, password, fullname, loginUser) => dispath => {
    dispath(requestRegister());
    fetch( `${url}`+'/users/signup', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password,
            fullname: fullname
        }),
    }).then(response => {
        if(response.status === 201){ // if create success
            dispath(registerSuccess());
            console.log("Register Success !")
            // then login
            loginUser()
        }
        if(response.status === 409){ // if username already exist
            console.log("Username already exist")
        }
        if(response.status === 500){ // if error
            response.json().then(data => {
                console.log(data.error)
                dispath(registerError(data.error))
            })
        }
    }).catch(error => {
        dispath(registerError(error))
        console.log(error)
    })

}
export const registerUserWithGG = (googleID, fullname, avatarUrl, loginUserWithGG) => dispath => {
    dispath(requestRegister());
    fetch( `${url}`+'/users/signupwithgoogle', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            googleID    : googleID,
            fullname    : fullname,
            avatarUrl   : avatarUrl
        }),
    }).then(response => {
        if(response.status === 201){ // if create success
            dispath(registerSuccess());
            console.log("Register Success !")
            loginUserWithGG() 
            // then login
            //`loginUser`()
        }
        if(response.status === 409){ // if username already exist
            console.log("Username already exist")
        }
        if(response.status === 500){ // if error
            response.json().then(data => {
                console.log(data.error)
                dispath(registerError(data.error))
            })
        }
    })
}