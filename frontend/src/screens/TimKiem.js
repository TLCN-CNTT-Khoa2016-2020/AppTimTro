import React, { Component, createRef, PureComponent } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  Platform,
  Dimensions,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage,
} from "react-native";
import { MAIN_COLOR } from "../../assets/color";
import CalloutMap from "../components/CalloutMap";
import Constants from "expo-constants";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import MapView from "react-native-map-clustering";
import { CheckBox } from "react-native-elements";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import FilterBar from "../components/FilterBar";
import {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome5,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";
import ButtonComponent from "../components/ButtonComponent";
import isEqual from "lodash.isequal";
import debounce from "lodash.debounce";
import CardPostHorizontal from "../components/CardPostHorizontal";
import { mockData } from "../mockData";
//new
import TimKiemServices from "../Services/TimkiemServices";
import CardPostTimkiem from "../components/CardPostTimKiem";

const { height, width } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.014241;
const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA;

export default class TimKiem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: null,
      isLoading: true,
      errorMessage: null,
      markers: [],
      region: null,
      //
      tracksViewChanges: true,
      //modal Filter
      isFilterModalVisible: false,
      isModalScreen: false,
      //filter consition
      // filterCondition: {
      //     phongChoThue: false,
      //     phongOGhep: false,
      //     nhaNguyenCan: false,
      //     canHo: false,
      //     gioiTinhNam: false,
      //     gioiTinhNu: false,
      //     duoi_3m : false,
      //     tu_3m_den_7m : false,
      //     tren_7m : false
      // },
      filterCondition: {
        room_price_min: 0,
        room_price_max: 30000000,
        kind_of_room: "",
        gender: "",
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props, nextProps)) {
      this.setState(() => ({
        tracksViewChanges: true,
      }));
    }
  }
  // shouldComponentUpdate(nextProps, nextState){

  // }
  componentDidUpdate(prevProps) {
    if (this.state.tracksViewChanges) {
      this.setState(() => ({
        tracksViewChanges: false,
        markers: this.props.data,
      }));
    }
  }
  componentDidMount = async () => {
    await this._getLocationAsync();
    await this.getMarker(this.state.region);
    await this.setState({
      isLoading: false,
      markers: this.props.data,
    });
    await this._handleFilterMarker();
  };

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied",
      });
    }

    const location = await Location.getCurrentPositionAsync({});
    const currentLocation = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };
    // console.log("location", currentLocation);

    this.setState({
      currentLocation,
      region: currentLocation,
    });
  };

  setFilterModalVisible = (visible) => {
    this.setState({ isFilterModalVisible: visible });
  };
  setModalScreen = (visible) => {
    this.setState({ isModalScreen: visible });
  };

  onRegionChange = async (region) => {
    await this.getMarker(region);
  };
  getMarker = async (region) => {
    let dataAuthToken = await AsyncStorage.getItem("authToken");
    let authToken = await JSON.parse(dataAuthToken);
    //clone region state
    let latitude = region.latitude;
    let longitude = region.longitude;
    // create centerPoint
    let centerPoint = { latitude, longitude };

    this.props.getLocationInTheCircle(
      authToken,
      centerPoint,
      "100",
      this.navigateToLoginScreen
    );
  };
  navigateToLoginScreen = async () => {
    await AsyncStorage.removeItem("authToken");
    await AsyncStorage.removeItem("userID");
    await this.props.navigation.navigate("DangNhap");
  };
  // _handleFilterMarker = async () => {
  //   console.log(this.state.filterCondition);
  //   const newDataMK = await fetch(
  //     "http://192.168.0.20:8080/posts/postdataroom",
  //     {
  //       method: "POST",
  //       body: JSON.stringify(this.state.filterCondition),
  //     }
  //   )
  //     .then((res) => res.json())
  //     .catch((err) => console.log(err));
  //   console.log("data", newDataMK);
  // };
  _handleFilterMarker = () => {
    TimKiemServices.getMarkerFollowFilter(this.state.filterCondition)
      .then((res) => {
        this.setState({
          markers: res.data,
        });
      })
      .catch((err) => console.log(err));

    this.setFilterModalVisible(false);
  };
  _resetFilter = () => {
    this.setState(
      (prevState) => {
        return {
          filterCondition: {
            room_price_min: 0,
            room_price_max: 30000000,
            kind_of_room: "",
            gender: "",
          },
        };
      },
      () => this._handleFilterMarker()
    );
  };

  render() {
    // console.log("render");
    // console.log("marker", this.state.markers);

    return this.state.isLoading ? (
      <ActivityIndicator size="large" style={styles.container} />
    ) : (
      <View style={styles.container}>
        <MapView
          style={styles.mapStyle}
          provider={PROVIDER_GOOGLE}
          initialRegion={this.state.currentLocation}
          region={this.state.currentLocation}
          customMapStyle={mapStyle}
          loadingEnabled={true}
          // onRegionChangeComplete={debounce(this.onRegionChange,1000)}// debounce technical
          clustering={true}
          // moveOnMarkerPress = {false} // prevent map move when marker is press
          tracksViewChanges={false}
        >
          <Marker
            coordinate={this.state.currentLocation}
            cluster={false}
          ></Marker>

          {this.props.isGetLocationInTheCircleSuccess
            ? this.state.markers.map((item, index) => {
                return (
                  <Marker
                    key={item._id.toString()}
                    coordinate={{
                      latitude: item.coordinates.latitude,
                      longitude: item.coordinates.longitude,
                    }}
                    cluster={false}
                    tracksViewChanges={this.state.tracksViewChanges}
                  >
                    <MaterialCommunityIcons
                      name="home-circle"
                      size={28}
                      color={MAIN_COLOR}
                    />
                    <Callout
                      onPress={() =>
                        this.props.navigation.navigate("XemBaiDang", {
                          post_id: item._id,
                        })
                      }
                    >
                      <CalloutMap item={item} />
                    </Callout>
                  </Marker>
                );
              })
            : null}
        </MapView>
        {/* Overlay component => FilterBar */}
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.btnFilter}
            onPress={() =>
              this.setFilterModalVisible(!this.state.isFilterModalVisible)
            }
          >
            <FontAwesome5 name="filter" size={25} color={MAIN_COLOR} />
          </TouchableOpacity>
        </View>
        <View style={styles.btnModelView}>
          <TouchableOpacity
            style={styles.btnFilter}
            onPress={() => this.setModalScreen(!this.state.isModalScreen)}
          >
            <MaterialIcons name="event-note" size={25} color={MAIN_COLOR} />
          </TouchableOpacity>
        </View>
        <View style={styles.btnResertFilter}>
          <TouchableOpacity
            style={styles.btnFilter}
            onPress={() => this._resetFilter()}
          >
            <MaterialCommunityIcons
              name="filter-remove"
              size={25}
              color={MAIN_COLOR}
            />
          </TouchableOpacity>
        </View>

        <Modal
          visible={this.state.isFilterModalVisible}
          transparent={true}
          onRequestClose={() => this.setFilterModalVisible(false)}
        >
          <View style={styles.containerModal}>
            <View style={styles.modal}>
              <ScrollView contentContainerStyle={styles.scrollModal}>
                <View style={styles.modalCell}>
                  <Text style={styles.smallTitle}>Loại phòng</Text>
                  <View style={styles.groupCheckbox}>
                    <CheckBox
                      title="Phòng cho thuê"
                      center
                      containerStyle={{
                        backgroundColor: "rgba(52, 52, 52, 0)",
                        borderColor: "#fff",
                      }}
                      textStyle={{ fontFamily: "roboto-regular" }}
                      checkedIcon={
                        <Ionicons
                          name="md-checkmark-circle"
                          size={32}
                          color={MAIN_COLOR}
                        />
                      }
                      uncheckedIcon={
                        <Ionicons
                          name="md-checkmark-circle"
                          size={32}
                          color="gray"
                        />
                      }
                      checked={
                        this.state.filterCondition.kind_of_room ===
                        "Phòng cho thuê"
                          ? true
                          : false
                      }
                      onPress={() =>
                        this.setState({
                          filterCondition: {
                            ...this.state.filterCondition,
                            kind_of_room: "Phòng cho thuê",
                          },
                        })
                      }
                    />
                    <CheckBox
                      title="Phòng ở ghép"
                      center
                      containerStyle={{
                        backgroundColor: "rgba(52, 52, 52, 0)",
                        borderColor: "#fff",
                      }}
                      textStyle={{ fontFamily: "roboto-regular" }}
                      checkedIcon={
                        <Ionicons
                          name="md-checkmark-circle"
                          size={32}
                          color={MAIN_COLOR}
                        />
                      }
                      uncheckedIcon={
                        <Ionicons
                          name="md-checkmark-circle"
                          size={32}
                          color="gray"
                        />
                      }
                      checked={
                        this.state.filterCondition.kind_of_room ===
                        "Phòng ở ghép"
                          ? true
                          : false
                      }
                      onPress={() =>
                        this.setState({
                          filterCondition: {
                            ...this.state.filterCondition,
                            kind_of_room: "Phòng ở ghép",
                          },
                        })
                      }
                    />
                    <CheckBox
                      title="Nhà nguyên căn"
                      center
                      containerStyle={{
                        backgroundColor: "rgba(52, 52, 52, 0)",
                        borderColor: "#fff",
                      }}
                      textStyle={{ fontFamily: "roboto-regular" }}
                      checkedIcon={
                        <Ionicons
                          name="md-checkmark-circle"
                          size={32}
                          color={MAIN_COLOR}
                        />
                      }
                      uncheckedIcon={
                        <Ionicons
                          name="md-checkmark-circle"
                          size={32}
                          color="gray"
                        />
                      }
                      checked={
                        this.state.filterCondition.kind_of_room ===
                        "Nhà nguyên căn"
                          ? true
                          : false
                      }
                      onPress={() =>
                        this.setState({
                          filterCondition: {
                            ...this.state.filterCondition,
                            kind_of_room: "Nhà nguyên căn",
                          },
                        })
                      }
                    />
                    <CheckBox
                      title="Căn hộ"
                      center
                      containerStyle={{
                        backgroundColor: "rgba(52, 52, 52, 0)",
                        borderColor: "#fff",
                      }}
                      textStyle={{ fontFamily: "roboto-regular" }}
                      checkedIcon={
                        <Ionicons
                          name="md-checkmark-circle"
                          size={32}
                          color={MAIN_COLOR}
                        />
                      }
                      uncheckedIcon={
                        <Ionicons
                          name="md-checkmark-circle"
                          size={32}
                          color="gray"
                        />
                      }
                      checked={
                        this.state.filterCondition.kind_of_room === "Căn hộ"
                          ? true
                          : false
                      }
                      onPress={() =>
                        this.setState({
                          filterCondition: {
                            ...this.state.filterCondition,
                            kind_of_room: "Căn hộ",
                          },
                        })
                      }
                    />
                  </View>
                </View>
                <View style={styles.modalCell}>
                  <Text style={styles.smallTitle}>Giới tính</Text>
                  <View style={styles.groupCheckbox}>
                    <CheckBox
                      title="Nam"
                      center
                      containerStyle={{
                        backgroundColor: "rgba(52, 52, 52, 0)",
                        borderColor: "#fff",
                      }}
                      textStyle={{ fontFamily: "roboto-regular" }}
                      checkedIcon={
                        <Ionicons
                          name="md-checkmark-circle"
                          size={32}
                          color={MAIN_COLOR}
                        />
                      }
                      uncheckedIcon={
                        <Ionicons
                          name="md-checkmark-circle"
                          size={32}
                          color="gray"
                        />
                      }
                      checked={
                        this.state.filterCondition.gender === "Nam"
                          ? true
                          : false
                      }
                      onPress={() =>
                        this.setState({
                          filterCondition: {
                            ...this.state.filterCondition,
                            gender: "Nam",
                          },
                        })
                      }
                    />
                    <CheckBox
                      title="Nữ"
                      center
                      containerStyle={{
                        backgroundColor: "rgba(52, 52, 52, 0)",
                        borderColor: "#fff",
                      }}
                      textStyle={{ fontFamily: "roboto-regular" }}
                      checkedIcon={
                        <Ionicons
                          name="md-checkmark-circle"
                          size={32}
                          color={MAIN_COLOR}
                        />
                      }
                      uncheckedIcon={
                        <Ionicons
                          name="md-checkmark-circle"
                          size={32}
                          color="gray"
                        />
                      }
                      checked={
                        this.state.filterCondition.gender === "Nữ"
                          ? true
                          : false
                      }
                      onPress={() =>
                        this.setState({
                          filterCondition: {
                            ...this.state.filterCondition,
                            gender: "Nữ",
                          },
                        })
                      }
                    />
                  </View>
                </View>
                <View style={styles.modalCell}>
                  <Text style={styles.smallTitle}>Giá phòng</Text>
                  <View
                    style={{
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <CheckBox
                      title="Dưới 3.000.000"
                      center
                      containerStyle={{
                        backgroundColor: "rgba(52, 52, 52, 0)",
                        borderColor: "#fff",
                      }}
                      textStyle={{ fontFamily: "roboto-regular" }}
                      checkedIcon={
                        <Ionicons
                          name="md-checkmark-circle"
                          size={32}
                          color={MAIN_COLOR}
                        />
                      }
                      uncheckedIcon={
                        <Ionicons
                          name="md-checkmark-circle"
                          size={32}
                          color="gray"
                        />
                      }
                      checked={
                        this.state.filterCondition.room_price_max === 3000000
                          ? true
                          : false
                      }
                      onPress={() =>
                        this.setState({
                          filterCondition: {
                            ...this.state.filterCondition,
                            room_price_min: 0,
                            room_price_max: 3000000,
                          },
                        })
                      }
                    />
                    <CheckBox
                      title="Từ 3.000.000 đến 7.000.000"
                      center
                      containerStyle={{
                        backgroundColor: "rgba(52, 52, 52, 0)",
                        borderColor: "#fff",
                      }}
                      textStyle={{ fontFamily: "roboto-regular" }}
                      checkedIcon={
                        <Ionicons
                          name="md-checkmark-circle"
                          size={32}
                          color={MAIN_COLOR}
                        />
                      }
                      uncheckedIcon={
                        <Ionicons
                          name="md-checkmark-circle"
                          size={32}
                          color="gray"
                        />
                      }
                      checked={
                        this.state.filterCondition.room_price_max === 7000000
                          ? true
                          : false
                      }
                      onPress={() =>
                        this.setState({
                          filterCondition: {
                            ...this.state.filterCondition,
                            room_price_min: 3000000,
                            room_price_max: 7000000,
                          },
                        })
                      }
                    />
                    <CheckBox
                      title="Trên 7.000.000"
                      center
                      containerStyle={{
                        backgroundColor: "rgba(52, 52, 52, 0)",
                        borderColor: "#fff",
                      }}
                      textStyle={{ fontFamily: "roboto-regular" }}
                      checkedIcon={
                        <Ionicons
                          name="md-checkmark-circle"
                          size={32}
                          color={MAIN_COLOR}
                        />
                      }
                      uncheckedIcon={
                        <Ionicons
                          name="md-checkmark-circle"
                          size={32}
                          color="gray"
                        />
                      }
                      checked={
                        this.state.filterCondition.room_price_max === 20000000
                          ? true
                          : false
                      }
                      onPress={() =>
                        this.setState({
                          filterCondition: {
                            ...this.state.filterCondition,
                            room_price_min: 7000000,
                            room_price_max: 20000000,
                          },
                        })
                      }
                    />
                  </View>
                </View>
              </ScrollView>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: 15,
                }}
              >
                <ButtonComponent
                  title="Hủy"
                  onPress={() => this.setFilterModalVisible(false)}
                />
                <ButtonComponent
                  title="Xác nhận"
                  onPress={() => this._handleFilterMarker()}
                />
              </View>
            </View>
          </View>
        </Modal>

        {/*  */}
        <Modal
          visible={this.state.isModalScreen}
          transparent={true}
          onRequestClose={() => this.setModalScreen(false)}
        >
          <View style={styles.containerModal}>
            <View style={styles.modal}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginHorizontal: 15,
                }}
              >
                <Text
                  style={{
                    fontFamily: "roboto-medium",
                    fontSize: 18,
                  }}
                >
                  Phòng phù hợp :&nbsp;
                  {this.state.markers ? this.state.markers.length : 0}
                </Text>
                <TouchableOpacity
                  // style={styles.btnFilter}
                  onPress={() => this.setModalScreen(false)}
                >
                  <AntDesign name="closecircle" size={32} color={MAIN_COLOR} />
                </TouchableOpacity>
              </View>
              <ScrollView contentContainerStyle={styles.scrollModal}>
                {this.state.markers.map((item, index) => {
                  return (
                    <CardPostTimkiem
                      item={item}
                      key={index}
                      onPress={() => {
                        this.setModalScreen(false);
                        this.props.navigation.navigate("XemBaiDang", {
                          post_id: item._id,
                        });
                      }}
                    />
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    marginTop: Constants.statusBarHeight,
  },
  mapStyle: {
    ...StyleSheet.absoluteFillObject,
  },
  btnFilter: {
    borderRadius: 50,
    width: 50,
    height: 50,
    backgroundColor: "#fff",
    borderColor: MAIN_COLOR,
    borderWidth: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  btnContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  btnModelView: {
    position: "absolute",
    top: 0,
    left: 0,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  btnResertFilter: {
    position: "absolute",
    top: 55,
    right: 0,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  containerModal: {
    flex: 1,
    backgroundColor: "rgba(52, 52, 52, 0)",
    flexDirection: "column",
    //justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    marginTop: 65,

    height: height * 0.85,
    width: width * 0.95,
    backgroundColor: "white",
    borderRadius: 10,
  },
  scrollModal: {
    flexDirection: "column",
    justifyContent: "center",
    padding: 10,
  },
  modalCell: {},
  groupCheckbox: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  smallTitle: {
    fontSize: 18,
    fontFamily: "roboto-medium",
  },
});
const mapStyle = [
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
];
