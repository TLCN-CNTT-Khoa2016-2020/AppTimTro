import {connect} from 'react-redux';
import {getPostApproved} from '../actions/actionGetPostApproved';
import {getPostUnApproved} from '../actions/actionGetPostUnApproved';
import BaiDang from '../screens/BaiDang';

const mapStateToProps = (state) => { 
    return {
        dataGetPostApproved     : state.getPostApprovedReducer.data,
        errorGetPostApproved    : state.getPostApprovedReducer.error,
        isPostApprovedEnd       : state.getPostApprovedReducer.isInTheEnd,
        dataGetPostUnApproved   : state.getPostUnApprovedReducer.data,
        errorGetPostUnApproved  : state.getPostUnApprovedReducer.error,
        isPostUnApprovedEnd     : state.getPostUnApprovedReducer.isInTheEnd,
    }
}
const  mapDispatchToProps = (dispatch) => {
    return {
        getPostApproved : (authToken, page, userID, navigateToLoginScreen) => {
            return dispatch(getPostApproved(authToken, page, userID, navigateToLoginScreen))
        },
        getPostUnApproved : (authToken, page, userID, navigateToLoginScreen) => {
            return dispatch(getPostUnApproved(authToken, page, userID, navigateToLoginScreen))
        }
    }
}
export const BaiDangContainer = connect(mapStateToProps, mapDispatchToProps)(BaiDang);