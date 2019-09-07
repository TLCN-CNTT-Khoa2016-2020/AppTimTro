import {createAppContainer,
        createStackNavigator, 
        createBottomTabNavigator} from 'react-navigation';
import ManHinhChinh from '../screens/ManHinhChinh';
import TimKiem from '../screens/TimKiem';
import BaiDang from '../screens/BaiDang';
import CaiDatTaiKhoan from '../screens/CaiDatTaiKhoan';
import DangPhong from '../screens/DangPhong';
import TaiKhoan from '../screens/TaiKhoan';
import XemBaiDang from '../screens/XemBaiDang';


// create stack ManHinhChinh
const stackManHinhChinh = createStackNavigator({
    ManHinhChinh :{
        screen: ManHinhChinh
    },
    TimKiem : {
        screen : TimKiem
    },
    DangPhong : {
        screen : DangPhong
    },
    XemBaiDang : {
        screen : XemBaiDang
    }
},{
    initialRouteName: "ManHinhChinh"
});
// create stack TimKiem
const stackTimKiem = createStackNavigator({
    TimKiem :{
        screen :TimKiem
    },
    XemBaiDang : {
        screen : XemBaiDang
    }
},{
    initialRouteName: "TimKiem"
});
// create stack BaiDang
const stackBaiDang = createStackNavigator({
    BaiDang : {
        screen : BaiDang
    },
    XemBaiDang  :{
        screen : XemBaiDang
    },
    DangPhong : {
        screen : DangPhong
    }
},{
    initialRouteName: "BaiDang"
});
// create stackTaiKhoan
const stackTaiKhoan = createStackNavigator({
    TaiKhoan :{
        screen : TaiKhoan
    },
    CaiDatTaiKhoan : {
        screen : CaiDatTaiKhoan
    }
},{
    initialRouteName: "TaiKhoan"
});
// create tabNavigate

const tabNavigation = createBottomTabNavigator({
    ManHinhChinh : stackManHinhChinh,
    TimKiem : stackTimKiem,
    BaiDang : stackBaiDang,
    TaiKhoan : stackTaiKhoan
},{
    initialRouteName: "ManHinhChinh"
});
//create AppContainer
export const AppContainer = createAppContainer(tabNavigation);