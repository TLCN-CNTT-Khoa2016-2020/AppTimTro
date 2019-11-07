import {combineReducers} from 'redux';

import {registerReducer} from './registerReducer';
import {loginReducer} from './loginReducer';
import {logoutReducer} from './logoutReducer';
import {getPostForMainScreenReducer} from './getPostForMainScreenReducer';



export const rootReducer = combineReducers({
    registerReducer,
    loginReducer,
    logoutReducer,
    getPostForMainScreenReducer
});