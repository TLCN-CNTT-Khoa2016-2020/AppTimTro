import React from 'react';
import { Text,
         View,
         TouchableOpacity,
         StyleSheet,
         Image,
         Platform,
         Dimensions
         } from 'react-native';
import  { ParallaxImage } from 'react-native-snap-carousel';

const { width, height } = Dimensions.get('window')
const CardPost = ({
    item,
    index,
}) => (
    <TouchableOpacity
        onPress = {()=>console.log(item)}
        style = {styles.container} >
            <Image
                style={styles.image} 
                source = {{uri : item.image }} />
            <Text numberOfLines={1} > 
                {item.address < 23
                    ? `${item.address}`
                    : `${item.address.substring(0,20)}...` } 
            </Text>
            <Text numberOfLines={1}> {item.price} </Text>
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
