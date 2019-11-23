import React from 'react';
import {
    createAppContainer,
    createStackNavigator,
    createBottomTabNavigator
} from 'react-navigation';
//import icon-vector
import { Ionicons } from '@expo/vector-icons';
//color animation
import {MAIN_COLOR, TEXT_COLOR} from '../../assets/color';
import { fromLeft, fromTop, fromRight, fromBottom, fadeIn, fadeOut, zoomIn, zoomOut, flipY, flipX } from 'react-navigation-transitions';
//auth
import DangKi from '../screens/DangKi';
//import DangNhap from '../screens/DangNhap';
import AuthLoading from '../screens/AuthLoading';
//import screen
//import ManHinhChinh from '../screens/ManHinhChinh';
import TimKiem from '../screens/TimKiem';
import BaiDang from '../screens/BaiDang';
import CaiDatTaiKhoan from '../screens/CaiDatTaiKhoan';
import DangPhong1 from '../screens/DangPhong1';
import DangPhong2 from '../screens/DangPhong2';
import DangPhong3 from '../screens/DangPhong3';
import DangPhong4 from '../screens/DangPhong4';
import TaiKhoan from '../screens/TaiKhoan';
import XemBaiDang from '../screens/XemBaiDang';
//import contianer 
import {DangNhapContainer} from '../containers/DangNhapContainer';
import {ManHinhChinhContainer} from '../containers/ManHinhChinhContainer';
import {BaiDangContainer} from '../containers/BaiDangContainer';
import {DangPhong4Container} from '../containers/DangPhong4Container';
import {DangKyContainer} from '../containers/DangKyContainer';


// create stackTaiKhoan
const stackTaiKhoan = createStackNavigator({
    TaiKhoan: {
        screen: TaiKhoan,
        navigationOptions : {
             header : null
        }
    },
    CaiDatTaiKhoan: {
        screen: CaiDatTaiKhoan
    }
}, {
        initialRouteName: "TaiKhoan",
        headerLayoutPreset: "center",
        transitionConfig: () => fadeIn(1000),
        
    });
//create stack DangPhong
const stackDangPhong = createStackNavigator({
    DangPhong1 : DangPhong1,
    DangPhong2 : DangPhong2,
    DangPhong3 : DangPhong3,
    DangPhong4 : DangPhong4Container
},{
    initialRouteName : "DangPhong1",
    headerLayoutPreset: "center",
    transitionConfig: () => fadeIn(1000),
    defaultNavigationOptions : {
        title : "Đăng phòng", 
    }
});


// create tabNavigate

const tabNavigation = createBottomTabNavigator({
    ManHinhChinh: {
        screen : ManHinhChinhContainer,
        navigationOptions: {
            title : "Màn Hình Chính",
            labelStyle : {color : MAIN_COLOR},
            tabBarIcon: ({tintColor}) => <Ionicons name="ios-home" size={28} color={tintColor} />
        }
    },
    TimKiem: {
        screen : TimKiem,
        navigationOptions: {
            title : "Tìm Kiếm",
            labelStyle : {color : MAIN_COLOR},
            tabBarIcon: ({tintColor}) => <Ionicons name="ios-search" size={28} color={tintColor} />
        }
    },
    BaiDang: {
        screen : BaiDangContainer,
        navigationOptions: {
            title : "Bài Đăng",
            labelStyle : {color : MAIN_COLOR},
            tabBarIcon: ({tintColor}) => <Ionicons name="ios-add-circle" size={28} color={tintColor} />
        }
    },
    TaiKhoan: {
        screen : stackTaiKhoan,
        navigationOptions: {
            title : "Tài Khoản",
            labelStyle : {color : MAIN_COLOR},
            tabBarIcon: ({tintColor}) => <Ionicons name="ios-person" size={28} color={tintColor} />
        }
    },
}, {
        initialRouteName: "ManHinhChinh",
        tabBarOptions : {
            activeTintColor : MAIN_COLOR,
            
            style : {
                backgroundColor : 'white' 
            }
        }
    });
//create stack App
const stackAuth = createStackNavigator({
    AuthLoading : {
        screen : AuthLoading,
        navigationOptions : {
            header : null
        }
    },
    DangNhap : {
        screen : DangNhapContainer,
        navigationOptions : {
            header : null
        }
    },
    DangKi : {
        screen : DangKyContainer,
        navigationOptions : {
            header : null
        }
    } ,
    tabNavigation : {
        screen : tabNavigation,
        navigationOptions : {
            header : null
        }
    },
    stackDangPhong: {
        screen: stackDangPhong,
        navigationOptions : {
            header : null
        }
    },
    XemBaiDang : {
        screen : XemBaiDang
    }
},{
    initialRouteName : 'AuthLoading',
    headerLayoutPreset: "center",
    transitionConfig: () => fadeIn(1000),
    defaultNavigationOptions: {
        // header : null
    }
});
//create AppContainer
export const AppContainer = createAppContainer(stackAuth);