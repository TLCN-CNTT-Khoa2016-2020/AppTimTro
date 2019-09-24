import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    SafeAreaView,
    ScrollView,
    FlatList
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
            dataRecommend: mockData
        };
    }
    headerComponent = () => {
        return (
            <View style = {styles.header} >
                <View style={styles.topHeader} >
                    <ButtonComponent
                        title="Tìm trọ ngay"
                        icon={
                            <Ionicons name="ios-search" size={28} color={MAIN_COLOR} />
                        } />
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

    render() {
        return (
            <SafeAreaView style={styles.container} >
                <View style={styles.body} >
                    <FlatList
                        contentContainerStyle={styles.flatList}
                        data={this.state.dataRecommend}
                        renderItem={({ item, index }) =>
                            <CardPost 
                                item={item} 
                                index={index}
                                onPress = {()=>this.props.navigation.navigate("XemBaiDang")} 
                                />}
                        keyExtractor={item => item.id.toString()}
                        numColumns={2}
                        ListHeaderComponent={this.headerComponent}
                        ListHeaderComponentStyle={styles.header}
                        ItemSeparatorComponent={this.FlatListItemSeparator}
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
