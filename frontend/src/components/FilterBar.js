import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Platform
} from 'react-native';
import Constants from 'expo-constants';
import { RectButton, BorderlessButton } from 'react-native-gesture-handler';
import { Ionicons,Entypo,FontAwesome } from '@expo/vector-icons';
import {MAIN_COLOR, BORDER_COLOR} from '../../assets/color';


const { height, width } = Dimensions.get('window');
class FilterBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.container} >
                <BorderlessButton
                    //onPress={() => navigation.navigate('Search')}
                    style={styles.button}>
                    <Entypo
                        name="documents"
                        size = {32}
                        color={MAIN_COLOR}
                    />
                </BorderlessButton>
                <BorderlessButton
                    //onPress={() => navigation.navigate('Search')}
                    style={styles.button}>
                    <Ionicons
                        name="md-transgender"
                        size = {32}
                        color={MAIN_COLOR}
                    />
                </BorderlessButton>
                <BorderlessButton
                    //onPress={() => navigation.navigate('Search')}
                    style={styles.button}>
                    <Ionicons
                        name="logo-usd"
                        size = {32}
                        color={MAIN_COLOR}
                    />
                </BorderlessButton>
                
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0, // Constants.statusBarHeight,
        width: width,
        height: null,
        backgroundColor: 'rgba(52, 52, 52, 0.1)',
        //backgroundColor : '#fff',
        flexDirection : "row",
        justifyContent : "space-around",
        alignItems : "center"
    },
    button : {
        backgroundColor : "#fff",
        marginVertical : 6,
        width : 43,
        height : 43,
        flexDirection : "column",
        justifyContent : "center",
        alignItems : "center",
        borderRadius : 50,

    }
});

export default FilterBar;
