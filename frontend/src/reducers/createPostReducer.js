import {
    CREATE_POST_REQUEST,
    CREATE_POST_SUCCESS,
    CREATE_POST_ERROR
} from '../actions/actionTypes';

const initialState = {
    error           : {},
    isCreateSuccess : false, 
    isCreateRequest : false,
    isCreateError   : false
}

export const createPostReducer = (prevState = initialState, action) => {
    switch (action.type) {
        case CREATE_POST_REQUEST : 
            return {
                ...prevState,
                isCreateRequest : true,
                isCreateSuccess : false,
                isCreateError   : false
            };
        case CREATE_POST_SUCCESS :
            return {
                ...prevState,
                isCreateSuccess : true,
                isCreateError   : false,
                isCreateRequest : false
            };
        case CREATE_POST_ERROR : 
            return { 
                ...prevState,
                error : action.error,
                isCreateError   : true,
                isCreateRequest : false,
                isCreateSuccess : false
            };
        default : return prevState;
    }
}