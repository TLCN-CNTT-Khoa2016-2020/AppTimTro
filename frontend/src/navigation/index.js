import React from 'react';
import {
    createAppContainer,
    createStackNavigator,
    createBottomTabNavigator
} from 'react-navigation';
//import icon-vector
import { Ionicons } from '@expo/vector-icons';
//color
import {MAIN_COLOR, TEXT_COLOR} from '../../assets/color';
//auth
import DangKi from '../screens/DangKi';
import DangNhap from '../screens/DangNhap';
import AuthLoading from '../screens/AuthLoading';
//import screen
import ManHinhChinh from '../screens/ManHinhChinh';
import TimKiem from '../screens/TimKiem';
import BaiDang from '../screens/BaiDang';
import CaiDatTaiKhoan from '../screens/CaiDatTaiKhoan';
import DangPhong1 from '../screens/DangPhong1';
import DangPhong2 from '../screens/DangPhong2';
import DangPhong3 from '../screens/DangPhong3';
import DangPhong4 from '../screens/DangPhong4';
import TaiKhoan from '../screens/TaiKhoan';
import XemBaiDang from '../screens/XemBaiDang';


// create stack ManHinhChinh
const stackManHinhChinh = createStackNavigator({
    ManHinhChinh: {
        screen: ManHinhChinh,
        navigationOptions : {
            header : null
        }
    },
    
    XemBaiDang: {
        screen: XemBaiDang
    }
}, {
        initialRouteName: "ManHinhChinh"
        
    });
// create stack TimKiem
const stackTimKiem = createStackNavigator({
    TimKiem: {
        screen: TimKiem,
        navigationOptions : {
            header : null
        }
    },
    XemBaiDang: {
        screen: XemBaiDang
    }
}, {
        initialRouteName: "TimKiem"
    });
// create stack BaiDang
const stackBaiDang = createStackNavigator({
    BaiDang: {
        screen: BaiDang,
        navigationOptions : {
            header : null
        }
    },
    XemBaiDang: {
        screen: XemBaiDang
    },
}, {
        initialRouteName: "BaiDang"
    });
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
        
    });
//create stack DangPhong
const stackDangPhong = createStackNavigator({
    DangPhong1 : DangPhong1,
    DangPhong2 : DangPhong2,
    DangPhong3 : DangPhong3,
    DangPhong4 : DangPhong4
},{
    initialRouteName : "DangPhong1",
    defaultNavigationOptions : {
        //header : null
    }
});

// create tabNavigate

const tabNavigation = createBottomTabNavigator({
    ManHinhChinh: {
        screen : stackManHinhChinh,
        navigationOptions: {
            title : "Màn Hình Chính",
            labelStyle : {color : MAIN_COLOR},
            tabBarIcon: ({tintColor}) => <Ionicons name="ios-home" size={28} color={tintColor} />
        }
    },
    TimKiem: {
        screen : stackTimKiem,
        navigationOptions: {
            title : "Tìm Kiếm",
            labelStyle : {color : MAIN_COLOR},
            tabBarIcon: ({tintColor}) => <Ionicons name="ios-search" size={28} color={tintColor} />
        }
    },
    BaiDang: {
        screen : stackBaiDang,
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
    AuthLoading : AuthLoading,
    DangNhap : DangNhap,
    DangKi : DangKi,
    tabNavigation : tabNavigation,
    stackDangPhong: {
        screen: stackDangPhong,
    },
},{
    initialRouteName : 'AuthLoading',
    defaultNavigationOptions: {
        header : null
    }
});
//create AppContainer
export const AppContainer = createAppContainer(stackAuth);