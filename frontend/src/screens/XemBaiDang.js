import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet
} from 'react-native';

export default class XemBaiDang extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <ScrollView style = {styles.container} >
                <Text> XemBaiDang </Text>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex : 1
    },

});
