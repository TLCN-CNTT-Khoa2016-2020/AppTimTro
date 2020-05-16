import React from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { MAIN_COLOR, TEXT_COLOR } from "../../assets/color";
import { Foundation } from "@expo/vector-icons";
import NumberFormat from "react-number-format";
import { url } from "../ultils/index";
import ButtonComponent from "../components/ButtonComponent";
import { Button } from "react-native-paper";

const CardPostTimkiem = ({ item, index, onPress }) => {
  console.log("item", item);
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.post} onPress={() => onPress()}>
        <Image
          style={styles.image}
          source={
            item.room_image
              ? { uri: `${url}` + "/" + item.room_image[0] }
              : "https://mk0theworldandtbvs1v.kinstacdn.com/wp-content/uploads/2015/09/Screen-Shot-2015-09-07-at-18.01.12.png"
          }
        />
        <View style={styles.content}>
          <Text
            style={{
              fontFamily: "roboto-medium",
              fontSize: 18,
            }}
          >
            {item.title
              ? item.title.length < 23
                ? `${item.title}`
                : `${item.title.substring(0, 20)}...`
              : "No title"}
          </Text>
          <NumberFormat
            value={item.room_price}
            thousandSeparator={true}
            displayType="text"
            suffix={" VND"}
            renderText={(value) => (
              <Text
                style={{
                  color: MAIN_COLOR,
                  fontFamily: "roboto-regular",
                  fontSize: 14,
                }}
              >
                {value}
              </Text>
            )}
          />
          <Text
            style={{
              fontFamily: "roboto-regular",
              fontSize: 14,
            }}
          >
            {item.address
              ? item.address.length < 33
                ? `${item.address}`
                : `${item.address.substring(0, 25)}...`
              : "No adddress"}
          </Text>
        </View>
      </TouchableOpacity>
      {/* <Foundation name="pencil" size={26} color={MAIN_COLOR} /> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
    marginHorizontal: 5,
  },
  post: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  content: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  image: {
    height: 100,
    width: 100,
    marginRight: 5,
  },
  title: {},
  text: {},
});

export default CardPostTimkiem;
