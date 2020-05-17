import React from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { MAIN_COLOR, TEXT_COLOR } from "../../assets/color";
import { Foundation, AntDesign } from "@expo/vector-icons";
import NumberFormat from "react-number-format";
import { url } from "../ultils/index";
import ButtonComponent from "../components/ButtonComponent";
import { Button } from "react-native-paper";
const CardPostHorizontal = ({
  item,
  isApprove,
  _deletePostChuaDuyet,
  index,
  onPress,
}) => {
  // console.log("item", item);
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.post} onPress={() => onPress()}>
        <Image
          style={styles.image}
          source={{ uri: `${url}` + "/" + item.room_image }}
        />
        <View style={styles.content}>
          <Text
            style={{
              fontFamily: "roboto-medium",
              fontSize: 18,
            }}
          >
            {item.title.length < 23
              ? `${item.title}`
              : `${item.title.substring(0, 20)}...`}
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
            {item.address.length < 33
              ? `${item.address}`
              : `${item.address.substring(0, 30)}...`}
          </Text>
          {!isApprove && (
            <TouchableOpacity
              style={styles.iconDelete}
              onPress={() => _deletePostChuaDuyet(item._id)}
            >
              <AntDesign name="delete" color="black" size={24} color="black" />
            </TouchableOpacity>
          )}
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
  iconDelete: {
    position: "absolute",
    bottom: 0,
    right: 10,
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

export default CardPostHorizontal;
