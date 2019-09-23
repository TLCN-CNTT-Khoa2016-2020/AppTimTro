import React, { Component } from 'react';
import { View,
         Text,
         StyleSheet,
         Dimensions,
         FlatList,
         ActivityIndicator
          } from 'react-native';
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
            dataBaiDaDuyet: mockData,
            dataBaiChuaDuyet: mockData,
            dataBaiDaDuyetIsLoading : false,
            dataBaiChuaDuyetIsLoading : false,


        };
    }
    baiDaDuyet = () => {
        return (
            this.state.dataBaiDaDuyetIsLoading 
            ? <ActivityIndicator size = 'large' />
            : (<FlatList
                data={this.state.dataBaiDaDuyet}
                renderItem={({ item, index }) =>
                    <CardPostHorizontal item={item} index={index} />}
                keyExtractor={item => item.id.toString()}
            />)
        );
    }
    baiChuaDuyet = () => {
        return (
            this.state.dataBaiChuaDuyetIsLoading
            ? <ActivityIndicator size = 'large' />
            : (<FlatList
                data={this.state.dataBaiChuaDuyet}
                renderItem={({ item, index }) =>
                    <CardPostHorizontal item={item} index={index} />}
                keyExtractor={item => item.id.toString()}
            />)
        );
    }

    render() {
        return (
            <View style={styles.container} >
                <View style={styles.header} >
                    <ButtonComponent
                        title="Đăng phòng ngay" />
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

