import {combineReducers} from 'redux';

import {registerReducer} from './registerReducer';
import {loginReducer} from './loginReducer';
import {logoutReducer} from './logoutReducer';




export const rootReducer = combineReducers({
    registerReducer,
    loginReducer,
    logoutReducer
});