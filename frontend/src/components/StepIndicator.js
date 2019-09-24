import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { MAIN_COLOR } from '../../assets/color';



const { height, width } = Dimensions.get('window')
const StepIndicator = ({
    step,
}) => (
    <View style={styles.container} >
                <View style={styles.cell} >
                    <Text 
                        style={
                            step >= 1
                            ? [styles.number, styles.hightLightNumber]
                            : [styles.number]
                            } >1</Text>
                    <Text 
                        style={
                            step >=1
                            ? [styles.text, styles.hightLightText]
                            : [styles.text]
                            } >Vị trí</Text>
                </View>
                <View 
                    style={
                        step >=2
                        ? [styles.space, styles.hightLightDash]
                        : [styles.space]
                        } ></View>
                <View style={styles.cell} >
                <Text 
                        style={
                            step >= 2
                            ? [styles.number, styles.hightLightNumber]
                            : [styles.number]
                            } >2</Text>
                    <Text 
                        style={
                            step >=2
                            ? [styles.text, styles.hightLightText]
                            : [styles.text]
                            } >Thông tin</Text>
                </View>
                <View 
                    style={
                        step >=3
                        ? [styles.space, styles.hightLightDash]
                        : [styles.space]
                        } ></View>

                <View style={styles.cell} >
                <Text 
                        style={
                            step >= 3
                            ? [styles.number, styles.hightLightNumber]
                            : [styles.number]
                            } >3</Text>
                    <Text 
                        style={
                            step >=3
                            ? [styles.text, styles.hightLightText]
                            : [styles.text]
                            } >Tiện ích</Text>
                </View>
                <View 
                    style={
                        step >=4
                        ? [styles.space, styles.hightLightDash]
                        : [styles.space]
                        } ></View>

                <View style={styles.cell} >
                <Text 
                        style={
                            step >= 4
                            ? [styles.number, styles.hightLightNumber]
                            : [styles.number]
                            } >4</Text>
                    <Text 
                        style={
                            step >=4
                            ? [styles.text, styles.hightLightText]
                            : [styles.text]
                            } >Xác nhận</Text>
                </View>
            </View>
);

export default StepIndicator;


const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "flex-start",
        marginHorizontal: 15,
        marginVertical : 10
        
    },
    cell: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",

    },
    number: {
        width: 40,
        height: 40,
        fontFamily: 'roboto-medium',
        fontSize: 26,
        textAlign: "center",
        borderRadius: 50,
        borderColor: '#000',
        borderWidth: 1
    },
    text: {
        fontFamily: 'roboto-medium',
        fontSize: 10
    },
    space: {
        height: 3,
        width: height / 10,
        backgroundColor: '#000',
        marginTop: 20
    },
    hightLightNumber: {
        color: MAIN_COLOR,
        borderColor: MAIN_COLOR
    },
    hightLightText: {
        color: MAIN_COLOR
    },
    hightLightDash: {
        backgroundColor: MAIN_COLOR
    }
});


