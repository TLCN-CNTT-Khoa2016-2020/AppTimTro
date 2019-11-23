import { connect } from 'react-redux';
import ManHinhChinh from '../screens/ManHinhChinh';
import {getPostForMainScreen} from '../actions/actionGetPostForMainScreen';

const mapStateToProps = (state) => {
    return {
        data    : state.getPostForMainScreenReducer.data, 
        error   : state.getPostForMainScreenReducer.error,
        isInTheEnd : state.getPostForMainScreenReducer.isInTheEnd,
        isGetPostForMainScreenSuccess : state.getPostForMainScreenReducer.isGetPostForMainScreenSuccess,
        isGetPostForMainScreenRequest  : state.getPostForMainScreenReducer.isGetPostForMainScreenRequest,
        isGetPostForMainScreenError    : state.getPostForMainScreenReducer.isGetPostForMainScreenError
    }
}
const mapDispatchToProps = (dispatch) => {
    return { 
        getPostForMainScreen : (authToken, page,navigateToLoginScreen) => {
            return dispatch(getPostForMainScreen(authToken, page, navigateToLoginScreen))
        }
    }
} 
export const ManHinhChinhContainer = connect(mapStateToProps, mapDispatchToProps)(ManHinhChinh);