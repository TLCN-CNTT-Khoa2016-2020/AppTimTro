import {connect} from 'react-redux';
import {registerUser, registerUserWithGG} from '../actions/actionRegister';
import {loginUser} from '../actions/actionLogin';
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
        registerUserWithGG: (googleID, fullname, avatarUrl) => {
            return dispatch(registerUserWithGG(googleID, fullname, avatarUrl  ))
        }
    }
}
export const DangKyContainer = connect(mapStateToProps, mapDispatchToProps)(DangKi);