import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
  FlatList,
  ActivityIndicator,
  AsyncStorage,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import Constants from "expo-constants";
import ButtonComponent from "../components/ButtonComponent";
import { Ionicons } from "@expo/vector-icons";
import { MAIN_COLOR, TEXT_COLOR } from "../../assets/color";
import CardPost from "../components/CardPost";
//push notification
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import { url } from "../ultils/index";

import { mockData } from "../mockData";

const { width, height } = Dimensions.get("window");

export default class ManHinhChinh extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      notification: {},
      page: 0,
      dataRecommend: null,
    };
  }
  _handleNotification = async (notification) => {
    await this.setState({ notification: notification });
    await console.log(this.state.notification.origin);
    if (this.state.notification.origin === "selected") {
      this.props.navigation.navigate("XemBaiDang", {
        post_id: this.state.notification.data.postID,
      });
    }
    await console.log(this.state.notification.data);
    await console.log(this.state.notification.remote);
  };
  headerComponent = () => {
    return (
      <View style={styles.header}>
        <View style={styles.topHeader}>
          <ButtonComponent
            title="Tìm trọ ngay"
            icon={<Ionicons name="ios-search" size={28} color={MAIN_COLOR} />}
            onPress={() => this.props.navigation.navigate("TimKiem")}
          />
          <ButtonComponent
            title="Đăng phòng"
            icon={
              <Ionicons name="ios-add-circle" size={28} color={MAIN_COLOR} />
            }
            onPress={() => this.props.navigation.navigate("stackDangPhong")}
          />
        </View>
        <Text
          numberOfLines={1}
          style={{
            marginVertical: 10,
            marginHorizontal: width * 0.07,
            fontFamily: "roboto-medium",
            fontSize: 20,
          }}
        >
          Gợi ý cho bạn
        </Text>
      </View>
    );
  };
  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 10,
          width: "100%",
          backgroundColor: "#fff",
        }}
      />
    );
  };

  getPostForMainScreen = async () => {
    let authToken = await AsyncStorage.getItem("authToken");
    let data = await JSON.parse(authToken);
    await this.props.getPostForMainScreen(
      data,
      this.state.page,
      this.navigateToLoginScreen
    );
  };
  navigateToLoginScreen = async () => {
    await AsyncStorage.removeItem("authToken");
    await AsyncStorage.removeItem("userID");
    await this.props.navigation.navigate("DangNhap");
  };
  loadMore = async () => {
    console.log("Loading more data....");
    let authToken = await AsyncStorage.getItem("authToken");
    let data = await JSON.parse(authToken);
    await this.props.getPostForMainScreen(
      data,
      this.state.page + 1,
      this.navigateToLoginScreen
    );
    this.setState({ page: this.state.page + 1 });
  };
  registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== "granted") {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== "granted") {
      return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    console.log(token);
    let dataAuthToken = await AsyncStorage.getItem("authToken");
    let authToken = await JSON.parse(dataAuthToken);
    let dataUserID = await AsyncStorage.getItem("userID");
    let userID = await JSON.parse(dataUserID);

    // POST the token to your backend server from where you can retrieve it to send push notifications.
    return fetch(`${url}` + "/users/updateexpopushtoken", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + `${authToken}`,
      },
      body: JSON.stringify({
        token: token,
        userID: userID,
      }),
    });
  };
  componentDidMount = async () => {
    await this.registerForPushNotificationsAsync();
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
    await this.getPostForMainScreen();
    await this.setState({
      isLoading: false,
    });
  };

  render() {
    return this.state.isLoading ? (
      <ActivityIndicator size="large" style={{ flex: 1 }} />
    ) : (
      <SafeAreaView style={styles.container}>
        <View style={styles.body}>
          <FlatList
            contentContainerStyle={styles.flatList}
            data={this.props.data}
            renderItem={({ item, index }) => (
              <CardPost
                item={item}
                index={index}
                onPress={() =>
                  this.props.navigation.navigate("XemBaiDang", {
                    post_id: item._id,
                  })
                }
              />
            )}
            keyExtractor={(item, index) => String(index)}
            numColumns={2}
            ListHeaderComponent={this.headerComponent}
            ListHeaderComponentStyle={styles.header}
            ItemSeparatorComponent={this.FlatListItemSeparator}
            onEndReached={
              this.props.isInTheEnd
                ? console.log("No more for loading !")
                : this.loadMore
            }
            onEndReachedThreshold={0.4}
          />
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    flexDirection: "column",
    justifyContent: "center",
  },
  flatList: {
    flexDirection: "column",
    alignItems: "center",
  },

  header: {},
  topHeader: {
    width: width,
    height: width / 1.5,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  body: {
    flex: 1,
    backgroundColor: "white",
  },
  text: {
    fontSize: 20,
    fontFamily: "roboto-regular",
    color: TEXT_COLOR,
  },
});
