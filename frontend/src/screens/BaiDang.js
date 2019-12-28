import React, { Component } from 'react';
import { View,
         Text,
         StyleSheet,
         Dimensions,
         FlatList,
         ActivityIndicator,
         AsyncStorage 
          } from 'react-native';
import Constants from 'expo-constants';
import ButtonComponent from '../components/ButtonComponent';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { MAIN_COLOR, TEXT_COLOR } from '../../assets/color';

import CardPostHorizontal from '../components/CardPostHorizontal';
//mock data
import { mockData } from '../mockData';

export default class BaiDang extends Component {
    constructor(props) {
        super(props);
        this.state = {
            baiDaDuyetPage : 0,
            baiChuaDuyetPage : 0,
            dataBaiDaDuyetIsLoading : true,
            dataBaiChuaDuyetIsLoading : true,


        };
    }
    baiDaDuyet = () => {
        return (
            this.state.dataBaiDaDuyetIsLoading 
            ? <ActivityIndicator size = 'large' />
            : (<FlatList
                data={this.props.dataGetPostApproved}
                renderItem={({ item, index }) =>
                    <CardPostHorizontal 
                        item={item} 
                        index={index}
                        onPress = {()=>this.props.navigation.navigate("XemBaiDang",
                                {
                                    post_id : item._id
                                })}  />}
                keyExtractor={(item, index) => String(index)}
                onEndReached = {
                    this.props.isPostApprovedEnd    ? console.log("No more for loading !")
                                                    : this.loadBaiDaDuyet
                }
                onEndReachedThreshold = {0.4}
            />)
        );
    }
    baiChuaDuyet = () => {
        return (
            this.state.dataBaiChuaDuyetIsLoading
            ? <ActivityIndicator size = 'large' />
            : (<FlatList
                data={this.props.dataGetPostUnApproved}
                renderItem={({ item, index }) =>
                    <CardPostHorizontal 
                        item={item} 
                        index={index}
                        onPress = {()=>this.props.navigation.navigate("XemBaiDang",
                                {
                                    post_id : item._id
                                })}  />}
                keyExtractor={(item, index) => String(index)}
                onEndReached = {
                    this.props.isPostUnApprovedEnd    ? console.log("No more for loading !")
                                                      : this.loadBaiChuaDuyet
                }
                onEndReachedThreshold = {0.4}
            />)
        );
    }
    loadBaiDaDuyet = async() => {
        let dataAuthToken   = await AsyncStorage.getItem("authToken");
        let authToken       = await JSON.parse(dataAuthToken);
        let dataUserID      = await AsyncStorage.getItem("userID")
        let userID          = await JSON.parse(dataUserID);
        await this.props.getPostApproved(authToken, this.state.baiDaDuyetPage, userID, this.navigateToLoginScreen);
        this.setState({
            baiDaDuyetPage : this.state.baiDaDuyetPage + 1,
            dataBaiDaDuyetIsLoading : false
        })
    }
    loadBaiChuaDuyet = async() => {
        let dataAuthToken   = await AsyncStorage.getItem("authToken");
        let authToken       = await JSON.parse(dataAuthToken);
        let dataUserID      = await AsyncStorage.getItem("userID")
        let userID          = await JSON.parse(dataUserID);
        await this.props.getPostUnApproved(authToken, this.state.baiChuaDuyetPage, userID, this.navigateToLoginScreen);
        this.setState({
            baiChuaDuyetPage : this.state.baiChuaDuyetPage + 1,
            dataBaiChuaDuyetIsLoading : false
        })
    }
    navigateToLoginScreen = async() => {
        await AsyncStorage.removeItem('authToken');
        await AsyncStorage.removeItem('userID');
        await this.props.navigation.navigate('DangNhap');
    }
    componentDidMount = async() => {
         await this.loadBaiDaDuyet();
         await this.loadBaiChuaDuyet();
    }

    render() {
        return (
            <View style={styles.container} >
                <View style={styles.header} >
                    <ButtonComponent
                        title="Đăng phòng ngay"
                        onPress = {()=>this.props.navigation.navigate('stackDangPhong')} />
                </View>
                <View style={styles.body} >
                    <ScrollableTabView
                        renderTabBar={() => (
                            <ScrollableTabBar
                                style={styles.scrollStyle}
                                tabStyle={styles.tabStyle}
                            />
                        )}
                        tabBarTextStyle={styles.tabBarTextStyle}
                        tabBarInactiveTextColor={TEXT_COLOR}
                        tabBarActiveTextColor={MAIN_COLOR}
                        tabBarUnderlineStyle={styles.underlineStyle}
                        initialPage={0}
                    >

                        <View key={'1'} tabLabel={'Bài đã duyệt'} style={{ flex: 1 }} >
                            {this.baiDaDuyet()}
                        </View>
                        <View key={'2'} tabLabel={'Bài chưa duyệt'} style={{ flex: 1 }}>
                            {this.baiChuaDuyet()}
                        </View>
                    </ScrollableTabView>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        marginTop: Constants.statusBarHeight,

    },
    header: {
        flex: 1 / 5,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",

    },
    body: {
        flex: 4 / 5,

    },
    scrollStyle: {

    },
    tabBarTextStyle: {
        fontSize: 14,
        fontWeight: 'normal',
    },
    underlineStyle: {
        height: 3,
        backgroundColor: MAIN_COLOR,
        borderRadius: 3,
        width: 120,
    },
});

