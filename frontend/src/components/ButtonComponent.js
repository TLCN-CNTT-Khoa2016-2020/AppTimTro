import React from 'react';
import { Text, View,TouchableOpacity, StyleSheet } from 'react-native';
import {Button} from 'react-native-elements';
import {TEXT_COLOR, MAIN_COLOR} from '../../assets/color';


const ButtonComponent = ({
    icon,
    title,
    style,
    onPress
}) => (
    <Button
        title = {title ? title : 'Button'}
        buttonStyle = { [styles.buttonStyle,style]}
        titleStyle = {styles.titleStyle}
        icon = {icon ? icon : null} />
);
const styles = StyleSheet.create({
    titleStyle : {
        color : TEXT_COLOR,
        fontSize : 16,
        fontFamily : 'roboto-medium',
        marginHorizontal :5
    }, 
    buttonStyle :{
        borderColor : MAIN_COLOR,
        borderWidth : 2,
        borderRadius : 8,
        backgroundColor : 'white',
    }
});


export default ButtonComponent;
