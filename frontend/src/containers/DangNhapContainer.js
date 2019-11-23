import {connect} from 'react-redux';
import {loginUser, loginUserWithGG} from '../actions/actionLogin';
import DangNhap from '../screens/DangNhap';
 


const mapStateToProps = (state) => { 
    return {
        isLoginRequest   : state.loginReducer.isLoginRequest,
        isLoginComplete  : state.loginReducer.isLoginRequest,
        isLoginError     : state.loginReducer.isLoginError,
        user             : state.loginReducer.user,
        error            : state.loginReducer.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginUser : (username, password, navigateToMainScreen) => {
            return dispatch(loginUser(username, password, navigateToMainScreen));
        },
        loginUserWithGG : (googleID, accessToken, navigateToMainScreen) => {
            return dispatch(loginUserWithGG(googleID, accessToken, navigateToMainScreen))
        }
    }
}

export const DangNhapContainer = connect(mapStateToProps, mapDispatchToProps)(DangNhap);