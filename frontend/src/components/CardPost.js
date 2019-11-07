import React from 'react';
import { Text,
         View,
         TouchableOpacity,
         StyleSheet,
         Image,
         Platform,
         Dimensions
         } from 'react-native';
import {url} from '../ultils';
import  { ParallaxImage } from 'react-native-snap-carousel';

const { width, height } = Dimensions.get('window')
const CardPost = ({
    item,
    index,
    onPress
}) => (
    <TouchableOpacity
        onPress = {()=>onPress()}
        style = {styles.container} >
            <Image
                style={styles.image} 
                source = {{uri : `${url}`+ "/"  + item.room_image }} />
            <Text 
                numberOfLines={1}
                style = {{fontFamily : 'roboto-medium'}} > 
                {item.title.length < 23
                    ? `${item.title}`
                    : `${item.title.substring(0,20)}...` } 
            </Text>
            <Text numberOfLines={1}> {item.room_price} </Text>
    </TouchableOpacity>
);
const styles = StyleSheet.create({
    container: {
        flexDirection : "column",
        justifyContent : "center",
        alignItems : "center",
        marginHorizontal : 8
        
        
      },
      image: {
        height : 150,
        width : 150
      },
});
export default CardPost;
