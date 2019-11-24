import { connect } from 'react-redux';
import TimKiem from '../screens/TimKiem';
import {getLocationInTheCircle} from '../actions/actionGetLocationInTheCirCle';

const mapStateToProps = (state) => {
    return {
        data    : state.getLocationInTheCircleReducer.data,
        error   : state.getLocationInTheCircleReducer.error,
        isGetLocationInTheCircleSuccess : state.getLocationInTheCircleReducer.isGetLocationInTheCircleSuccess,
        isGetLocationInTheCircleRequest : state.getLocationInTheCircleReducer.isGetLocationInTheCircleRequest,
        isGetLocationInTheCircleError : state.getLocationInTheCircleReducer.isGetLocationInTheCircleError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getLocationInTheCircle : (authToken, centerPoint, raduis, navigateToLoginScreen) => {
            return dispatch(getLocationInTheCircle(authToken, centerPoint, raduis, navigateToLoginScreen))
        }
    }
}

export const TimKiemContainer = connect(mapStateToProps, mapDispatchToProps)(TimKiem);