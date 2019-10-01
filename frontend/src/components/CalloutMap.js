import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    Dimensions
} from 'react-native';

const {height, width} = Dimensions.get('window');
const CalloutMap = ({
    item,
}) => (
        <View style = {styles.container} >
            <Text style = {styles.text} >{item.price}</Text>
         </View>
    );

const styles = StyleSheet.create({
    container : {
        height : null,
        width : width * 0.3,
        borderColor: '#000' ,
        borderWidth: 1,
        borderRadius :5,
        flexDirection : "column",
        justifyContent : "center",
        alignItems : "center"
        
    },  
    text: {
        fontFamily : 'roboto-medium'
    }
});

export default CalloutMap;
