import {combineReducers} from 'redux';

// import Reducer
import {registerReducer} from './registerReducer';
import {loginReducer} from './loginReducer';
import {logoutReducer} from './logoutReducer';
import {getPostForMainScreenReducer} from './getPostForMainScreenReducer';
import {getPostApprovedReducer} from './getPostApprovedReducer';
import {getPostUnApprovedReducer} from './getPostUnApprovedReducer';
import {createPostReducer} from './createPostReducer';
import {getLocationInTheCircleReducer} from './getLocationInTheCircleReducer';

//redux form
import {reducer as formReducer} from 'redux-form'




//combine Reducer
export const rootReducer = combineReducers({
    registerReducer,
    loginReducer,
    logoutReducer,
    getPostForMainScreenReducer,
    getPostApprovedReducer,
    getPostUnApprovedReducer,
    createPostReducer,
    getLocationInTheCircleReducer,
    //
    form : formReducer
});