import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    SafeAreaView,
    ScrollView,
    FlatList,
    ActivityIndicator,
    AsyncStorage
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Constants from 'expo-constants';
import ButtonComponent from '../components/ButtonComponent';
import { Ionicons } from '@expo/vector-icons';
import { MAIN_COLOR, TEXT_COLOR } from '../../assets/color';
import CardPost from '../components/CardPost';


import { mockData } from '../mockData';

const { width, height } = Dimensions.get('window');



export default class ManHinhChinh extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading : true,
            page : 0,
            dataRecommend : null
        };
    }
    headerComponent = () => {
        return (
            <View style = {styles.header} >
                <View style={styles.topHeader} >
                    <ButtonComponent
                        title="Tìm trọ ngay"
                        icon={
                            <Ionicons name="ios-search" size={28} color={MAIN_COLOR}
                             />
                        } 
                        onPress = {()=>this.props.navigation.navigate("TimKiem")}/>
                    <ButtonComponent
                        title="Đăng phòng"
                        icon={
                            <Ionicons name="ios-add-circle" size={28} color={MAIN_COLOR} />
                        }
                        onPress = {()=>this.props.navigation.navigate("stackDangPhong")} />
                </View>
                <Text
                    numberOfLines={1}
                    style={{
                        marginVertical : 10,
                        marginHorizontal : width*0.07,
                        fontFamily : 'roboto-medium',
                        fontSize : 20
                    }} >
                    Gợi ý cho bạn 
                </Text>
            </View>

        );
    }
    FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 10,
                    width: "100%",
                    backgroundColor: "#fff",
                }}
            />
        );
    }

    getPostForMainScreen = async() => {
        let authToken = await AsyncStorage.getItem("authToken");
        let data = await JSON.parse(authToken);
        await this.props.getPostForMainScreen(data, this.state.page, this.navigateToLoginScreen);
    }
    navigateToLoginScreen = async() => {
        await AsyncStorage.removeItem('authToken');
        await AsyncStorage.removeItem('userID');
        await this.props.navigation.navigate('DangNhap');
    }
    loadMore = async() => {
        console.log('Loading more data....')
        let authToken = await AsyncStorage.getItem("authToken");
        let data = await JSON.parse(authToken);
        await this.props.getPostForMainScreen(data, this.state.page + 1, this.navigateToLoginScreen);
        this.setState({page : this.state.page + 1})
    };
    componentDidMount = async() => {
        await this.getPostForMainScreen();
        await this.setState({
            isLoading : false,
        })
    }


    render() {
        return (
            this.state.isLoading
                 ? <ActivityIndicator size = 'large' style = {{flex : 1}} />
                 : <SafeAreaView style={styles.container} >
                <View style={styles.body} >
                    <FlatList
                        contentContainerStyle={styles.flatList}
                        data={this.props.data}
                        renderItem={({ item, index }) =>
                            <CardPost 
                                item={item} 
                                index={index}
                                onPress = {()=>this.props.navigation.navigate("XemBaiDang",
                                {
                                    post_id : item._id
                                })} 
                                />}
                        keyExtractor={(item, index) => String(index)}
                        numColumns={2}
                        ListHeaderComponent={this.headerComponent}
                        ListHeaderComponentStyle={styles.header}
                        ItemSeparatorComponent={this.FlatListItemSeparator} 
                        onEndReached = {
                            this.props.isInTheEnd   ? console.log("No more for loading !")
                                                    : this.loadMore
                        }
                        onEndReachedThreshold = {0.4}
                    />
                </View>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        flexDirection: "column",
        justifyContent: "center",
    },
    flatList: {
        flexDirection: "column",
        alignItems: "center"
    },

    header: {
        
    },
    topHeader : {
        width: width,
        height: width / 1.5,
        flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: "center"
    },
    body: {
        flex: 1,
        backgroundColor: 'white',

    },
    text: {
        fontSize: 20,
        fontFamily: 'roboto-regular',
        color: TEXT_COLOR
    }
});
