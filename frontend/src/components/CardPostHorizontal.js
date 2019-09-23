import React from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { MAIN_COLOR, TEXT_COLOR } from '../../assets/color';
import { Foundation } from '@expo/vector-icons';

const CardPostHorizontal = ({
    item,
    index
}) => (
        <View style={styles.container} >
            <TouchableOpacity style={styles.post} >
                <Image
                    style={styles.image}
                    source={{ uri: item.image }} />
                <View style={styles.content} >
                    <Text
                        style={{
                            fontFamily: 'roboto-medium',
                            fontSize: 18
                        }} >
                        {item.title.length < 23
                            ? `${item.title}`
                            : `${item.title.substring(0, 20)}...`}
                    </Text>
                    <Text
                        style={{
                            color: MAIN_COLOR,
                            fontFamily: 'roboto-regular',
                            fontSize: 14
                        }} >
                        {item.price}
                    </Text>
                    <Text
                        style={{
                            fontFamily: 'roboto-regular',
                            fontSize: 14
                        }}>
                        {item.address.length < 33
                            ? `${item.address}`
                            : `${item.address.substring(0, 30)}...`}
                    </Text>
                </View>
            </TouchableOpacity>
            <Foundation name="pencil" size={26} color={MAIN_COLOR} />
        </View>
    );
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection : "row",
        justifyContent : "space-between",
        marginVertical: 5,
        marginHorizontal: 5
    },
    post :{
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    content: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start"
    },
    image: {
        height: 100,
        width: 100,
        marginRight: 5
    },
    title: {

    },
    text: {

    }
});

export default CardPostHorizontal;
