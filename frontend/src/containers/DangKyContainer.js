import {connect} from 'react-redux';
import {registerUser, registerUserWithGG} from '../actions/actionRegister';
import {loginUser, loginUserWithGG} from '../actions/actionLogin';
import  DangKi from '../screens/DangKi';


const mapStateToProps = (state) => {
    return {
        isRegistering   : state.registerReducer.isRegistering,
        registerError  : state.registerReducer.registerError,
        isRegisterComplete     : state.registerReducer.isRegisterComplete,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        registerUser : (username, password, fullname, loginUser) => {
            return dispatch(registerUser(username, password, fullname, loginUser))
        },
        loginUser : (username, password, navigateToMainScreen) => {
            return dispatch(loginUser(username, password, navigateToMainScreen));
        },
        registerUserWithGG: (googleID, fullname, avatarUrl,loginUserWithGG) => {
            return dispatch(registerUserWithGG(googleID, fullname, avatarUrl, loginUserWithGG ))
        },
        loginUserWithGG : (googleID, accessToken, navigateToMainScreen) => {
            return dispatch(loginUserWithGG(googleID, accessToken, navigateToMainScreen))
        }
    }
}
export const DangKyContainer = connect(mapStateToProps, mapDispatchToProps)(DangKi);