import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    Dimensions
} from 'react-native';
import NumberFormat from 'react-number-format';

const {height, width} = Dimensions.get('window');
const CalloutMap = ({
    item,
}) => ( 
        <View style = {styles.container} >
                <NumberFormat 
                    value={item.room_price}
                    thousandSeparator={true} 
                    displayType = 'text' 
                    suffix = {' VND'}
                    renderText={value => <Text style = {styles.text}>{value}</Text>} />
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
