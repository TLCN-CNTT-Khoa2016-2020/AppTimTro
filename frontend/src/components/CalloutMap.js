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
            <Text style = {styles.text} >{item.title}</Text>
            <Text style = {styles.text} >{item.address}</Text>
            <Image source = {{uri : item.image}} style = {{height : 50, width : 50}}  />
         </View>
    );

const styles = StyleSheet.create({
    container : {
        height : height/4,
        width : width * 0.5,
        borderColor: '#000' ,
        borderWidth: 1,
        borderRadius :5
    },  
    text: {
        
    }
});

export default CalloutMap;
