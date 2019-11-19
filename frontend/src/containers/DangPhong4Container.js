import {connect} from 'react-redux';
import {createPost} from '../actions/actionCreatePost';
import DangPhong4 from '../screens/DangPhong4';



const mapStateToProps = (state) => {
    return {
        error           : state.createPostReducer.error,
        isCreateSuccess : state.createPostReducer.isCreateSuccess,
        isCreateRequest : state.createPostReducer.isCreateRequest,
        isCreateError   : state.createPostReducer.isCreateError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createPost : (authToken, post) => {
            return dispatch(createPost(authToken, post))
        }
    }
};
 export const DangPhong4Container = connect(mapStateToProps, mapDispatchToProps)(DangPhong4);