
import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { MAIN_COLOR, TEXT_COLOR } from '../../assets/color';

const CardHorizontal = ({
    item,
    index,
    onPress
}) => (
    <View style={styles.container}>
        <TouchableOpacity
            onPress={() => onPress()} >
                    <Text style ={styles.text} >{index + 1}</Text>
                    <Text style={styles.text} >Thông báo tìm thấy phòng trọ phù hợp</Text>
                    <Text style={styles.bottext} >Nhấp vào để xem chi tiết >></Text>
                
        </TouchableOpacity>
        </View>
    );

const styles = StyleSheet.create({
    container: {
        marginTop : 3,
        marginBottom : 3,
        height: 80,
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor : "#F4F4F8",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    text: {
        fontSize: 16,
        marginLeft : 20
    },
    bottext : {
        fontSize : 16,
        color : MAIN_COLOR,
        marginLeft: 30
    }
})
export default CardHorizontal;

