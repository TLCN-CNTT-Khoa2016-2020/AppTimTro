import React, { Component, createRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Modal,
    Platform,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    AsyncStorage
} from 'react-native';
import { MAIN_COLOR } from '../../assets/color';
import CalloutMap from '../components/CalloutMap';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import MapView from 'react-native-map-clustering';
import { CheckBox } from 'react-native-elements';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import FilterBar from '../components/FilterBar';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import ButtonComponent from '../components/ButtonComponent';
import isEqual from 'lodash.isequal';


import { mockData } from '../mockData';






const { height, width } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.014241;
const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA

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
            //filter consition
            filterCondition: {
                phongChoThue: false,
                phongOGhep: false,
                nhaNguyenCan: false,
                canHo: false,
                gioiTinhNam: false,
                gioiTinhNu: false,
                duoi_3m : false,
                tu_3m_den_7m : false,
                tren_7m : false
            },

        };

    }
    componentWillReceiveProps(nextProps) {
        //console.log(this.props.data)
        if (!isEqual(this.props, nextProps)) {
            this.setState(() => ({
                tracksViewChanges: true,
                markers : this.props.data
            }))
        }
    }
    componentDidUpdate() {
        if (this.state.tracksViewChanges) {
            this.setState(() => ({
                tracksViewChanges: false,
                //markers : this.props.data
            }))
        }
    }
    componentWillMount = async () => {
        //await this.getMarker()
    }
    componentDidMount = async () => {
        await this._getLocationAsync();
        await this.getMarker()
        //console.log(this.props.data)
        await this.setState({
            isLoading: false,
            markers: this.props.data
        });
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        const location = await Location.getCurrentPositionAsync({});
        const currentLocation = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        };
        this.setState({
            currentLocation,
            region: currentLocation
        });
    };

    setFilterModalVisible = (visible) => {
        this.setState({ isFilterModalVisible: visible })
    }
    

    onRegionChange = async (region) => {
        //console.log(region)
        await this.setState({region})
        await this.getMarker()
        //console.log(this.props.data)
    }
    getMarker = async () => {
        let dataAuthToken = await AsyncStorage.getItem("authToken");
        let authToken = await JSON.parse(dataAuthToken);
        //clone region state
        let latitude = this.state.region.latitude
        let longitude = this.state.region.longitude
        // create centerPoint
        let centerPoint = { latitude, longitude }

        this.props.getLocationInTheCircle(authToken, centerPoint, "2", this.navigateToLoginScreen)
    }
    navigateToLoginScreen = async () => {
        await AsyncStorage.removeItem('authToken');
        await AsyncStorage.removeItem('userID');
        await this.props.navigation.navigate('DangNhap');
    }


    render() {
        return (
            this.state.isLoading
                ? <ActivityIndicator size='large' style={styles.container} />
                : <View style={styles.container} >
                    <MapView
                        style={styles.mapStyle}
                        provider={PROVIDER_GOOGLE}
                        initialRegion={this.state.currentLocation}
                        //region = {this.state.currentLocation}
                        customMapStyle={mapStyle}
                        loadingEnabled={true}
                        onRegionChangeComplete={this.onRegionChange}
                        clustering={true}
                        moveOnMarkerPress = {false} // prevent map move when marker is press

                    >

                        <Marker
                            coordinate={this.state.currentLocation}
                            cluster={false}
                        ></Marker>
                        <Marker
                            coordinate={{
                                latitude: 10.85621,
                                longitude: 106.767725
                            }}
                            cluster={false}
                        ></Marker>


                        {   this.props.isGetLocationInTheCircleSuccess ?
                            this.state.markers.map((item, index) => {
                                return (

                                    <Marker
                                        key={index.toString()}
                                        coordinate={{
                                            latitude: item.coordinates.latitude,
                                            longitude: item.coordinates.longitude
                                        }}
                                        cluster  = {false}
                                        tracksViewChanges={this.state.tracksViewChanges}

                                    //onCalloutPress = {()=>this.navigation.navigate("XemBaiDang")}
                                    >
                                        <MaterialCommunityIcons name="home-circle" size={28} color={MAIN_COLOR} />
                                        <Callout
                                            onPress={() => this.props.navigation.navigate('XemBaiDang',
                                            {
                                                post_id : item._id
                                            })}
                                        >
                                            <CalloutMap item={item} />
                                        </Callout> 
                                    </Marker>
                                );
                            })
                            : null
                        }


                    </MapView>
                    {/* Overlay component => FilterBar */}
                    <View style={styles.btnContainer}>
                        <TouchableOpacity
                            style={styles.btnFilter}
                            onPress={() => this.setFilterModalVisible(!this.state.isFilterModalVisible)} >
                            <Ionicons
                                name="ios-list"
                                size={32}
                                color={MAIN_COLOR}
                            />
                        </TouchableOpacity>
                    </View>
                    <Modal
                        visible={this.state.isFilterModalVisible}
                        transparent={true}
                        onRequestClose={() => this.setFilterModalVisible(false)} >
                        <View style={styles.containerModal} >
                            <View style={styles.modal} >
                                <ScrollView contentContainerStyle={styles.scrollModal} >
                                    <View style={styles.modalCell} >
                                        <Text style={styles.smallTitle} >Loại phòng</Text>
                                        <View style={styles.groupCheckbox} >
                                            <CheckBox
                                                title="Phòng cho thuê"
                                                center
                                                containerStyle={{ backgroundColor: 'rgba(52, 52, 52, 0)', borderColor: '#fff', }}
                                                textStyle={{ fontFamily: 'roboto-regular' }}
                                                checkedIcon={<Ionicons name="md-checkmark-circle" size={32} color={MAIN_COLOR} />}
                                                uncheckedIcon={<Ionicons name="md-checkmark-circle" size={32} color="gray" />}
                                                checked={this.state.filterCondition.phongChoThue}
                                                onPress={() =>
                                                    this.setState({
                                                        filterCondition: {
                                                            ...this.state.filterCondition,
                                                            phongChoThue: !this.state.filterCondition.phongChoThue
                                                        }
                                                    })
                                                }
                                            />
                                            <CheckBox
                                                title="Phòng ở ghép"
                                                center
                                                containerStyle={{ backgroundColor: 'rgba(52, 52, 52, 0)', borderColor: '#fff', }}
                                                textStyle={{ fontFamily: 'roboto-regular' }}
                                                checkedIcon={<Ionicons name="md-checkmark-circle" size={32} color={MAIN_COLOR} />}
                                                uncheckedIcon={<Ionicons name="md-checkmark-circle" size={32} color="gray" />}
                                                checked={this.state.filterCondition.phongOGhep}
                                                onPress={() =>
                                                    this.setState({
                                                        filterCondition: {
                                                            ...this.state.filterCondition,
                                                            phongOGhep: !this.state.filterCondition.phongOGhep
                                                        }
                                                    })
                                                }
                                            />
                                            <CheckBox
                                                title="Nhà nguyên căn"
                                                center
                                                containerStyle={{ backgroundColor: 'rgba(52, 52, 52, 0)', borderColor: '#fff', }}
                                                textStyle={{ fontFamily: 'roboto-regular' }}
                                                checkedIcon={<Ionicons name="md-checkmark-circle" size={32} color={MAIN_COLOR} />}
                                                uncheckedIcon={<Ionicons name="md-checkmark-circle" size={32} color="gray" />}
                                                checked={this.state.filterCondition.nhaNguyenCan}
                                                onPress={() =>
                                                    this.setState({
                                                        filterCondition: {
                                                            ...this.state.filterCondition,
                                                            nhaNguyenCan: !this.state.filterCondition.nhaNguyenCan
                                                        }
                                                    })
                                                }
                                            />
                                            <CheckBox
                                                title="Căn hộ"
                                                center
                                                containerStyle={{ backgroundColor: 'rgba(52, 52, 52, 0)', borderColor: '#fff', }}
                                                textStyle={{ fontFamily: 'roboto-regular' }}
                                                checkedIcon={<Ionicons name="md-checkmark-circle" size={32} color={MAIN_COLOR} />}
                                                uncheckedIcon={<Ionicons name="md-checkmark-circle" size={32} color="gray" />}
                                                checked={this.state.filterCondition.canHo}
                                                onPress={() =>
                                                    this.setState({
                                                        filterCondition: {
                                                            ...this.state.filterCondition,
                                                            canHo: !this.state.filterCondition.canHo
                                                        }
                                                    })
                                                }
                                            />
                                        </View>

                                    </View>
                                    <View style={styles.modalCell} >
                                        <Text style={styles.smallTitle} >Giới tính</Text>
                                        <View style={styles.groupCheckbox} >
                                            <CheckBox
                                                title="Nam"
                                                center
                                                containerStyle={{ backgroundColor: 'rgba(52, 52, 52, 0)', borderColor: '#fff', }}
                                                textStyle={{ fontFamily: 'roboto-regular' }}
                                                checkedIcon={<Ionicons name="md-checkmark-circle" size={32} color={MAIN_COLOR} />}
                                                uncheckedIcon={<Ionicons name="md-checkmark-circle" size={32} color="gray" />}
                                                checked={this.state.filterCondition.gioiTinhNam}
                                                onPress={() =>
                                                    this.setState({
                                                        filterCondition: {
                                                            ...this.state.filterCondition,
                                                            gioiTinhNam: !this.state.filterCondition.gioiTinhNam
                                                        }
                                                    })
                                                }
                                            />
                                            <CheckBox
                                                title="Nữ"
                                                center
                                                containerStyle={{ backgroundColor: 'rgba(52, 52, 52, 0)', borderColor: '#fff', }}
                                                textStyle={{ fontFamily: 'roboto-regular' }}
                                                checkedIcon={<Ionicons name="md-checkmark-circle" size={32} color={MAIN_COLOR} />}
                                                uncheckedIcon={<Ionicons name="md-checkmark-circle" size={32} color="gray" />}
                                                checked={this.state.filterCondition.gioiTinhNu}
                                                onPress={() =>
                                                    this.setState({
                                                        filterCondition: {
                                                            ...this.state.filterCondition,
                                                            gioiTinhNu: !this.state.filterCondition.gioiTinhNu
                                                        }
                                                    })
                                                }
                                            />
                                        </View>

                                    </View>
                                    <View style={styles.modalCell} >
                                        <Text style={styles.smallTitle} >Giá phòng</Text>
                                        <View style={{
                                            flexDirection: "column",

                                        }} >
                                            <CheckBox
                                                title="Dưới 3.000.000"
                                                center
                                                containerStyle={{ backgroundColor: 'rgba(52, 52, 52, 0)', borderColor: '#fff', }}
                                                textStyle={{ fontFamily: 'roboto-regular' }}
                                                checkedIcon={<Ionicons name="md-checkmark-circle" size={32} color={MAIN_COLOR} />}
                                                uncheckedIcon={<Ionicons name="md-checkmark-circle" size={32} color="gray" />}
                                                checked={this.state.filterCondition.duoi_3m}
                                                onPress={() =>
                                                    this.setState({
                                                        filterCondition: {
                                                            ...this.state.filterCondition,
                                                            duoi_3m: !this.state.filterCondition.duoi_3m
                                                        }
                                                    })
                                                }
                                            />
                                            <CheckBox
                                                title="Từ 3.000.000 đến 7.000.000"
                                                center
                                                containerStyle={{ backgroundColor: 'rgba(52, 52, 52, 0)', borderColor: '#fff', }}
                                                textStyle={{ fontFamily: 'roboto-regular' }}
                                                checkedIcon={<Ionicons name="md-checkmark-circle" size={32} color={MAIN_COLOR} />}
                                                uncheckedIcon={<Ionicons name="md-checkmark-circle" size={32} color="gray" />}
                                                checked={this.state.filterCondition.tu_3m_den_7m}
                                                onPress={() =>
                                                    this.setState({
                                                        filterCondition: {
                                                            ...this.state.filterCondition,
                                                            tu_3m_den_7m: !this.state.filterCondition.tu_3m_den_7m
                                                        }
                                                    })
                                                }
                                            />
                                            <CheckBox
                                                title="Trên 7.000.000"
                                                center
                                                containerStyle={{ backgroundColor: 'rgba(52, 52, 52, 0)', borderColor: '#fff', }}
                                                textStyle={{ fontFamily: 'roboto-regular' }}
                                                checkedIcon={<Ionicons name="md-checkmark-circle" size={32} color={MAIN_COLOR} />}
                                                uncheckedIcon={<Ionicons name="md-checkmark-circle" size={32} color="gray" />}
                                                checked={this.state.filterCondition.tren_7m}
                                                onPress={() =>
                                                    this.setState({
                                                        filterCondition: {
                                                            ...this.state.filterCondition,
                                                            tren_7m: !this.state.filterCondition.tren_7m
                                                        }
                                                    })
                                                }
                                            />

                                        </View>
                                    </View>
                                </ScrollView>
                                <View style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginHorizontal: 15
                                }} >
                                    <ButtonComponent title="Hủy" onPress={() => this.setFilterModalVisible(false)} />
                                    <ButtonComponent title="Xác nhận" onPress={() => console.log(this.state.filterCondition)} />
                                </View>

                            </View>

                        </View>
                    </Modal>


                    {/*  */}
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
        ...StyleSheet.absoluteFillObject
    },
    btnFilter: {
        borderRadius: 50,
        width: 50,
        height: 50,
        backgroundColor: '#fff',
        borderColor: MAIN_COLOR,
        borderWidth: 2,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    btnContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        marginHorizontal: 10,
        marginVertical: 10,

    },
    containerModal: {
        flex: 1,
        backgroundColor: 'rgba(52, 52, 52, 0)',
        flexDirection: "column",
        //justifyContent: "center",
        alignItems: "center",

    },
    modal: {
        marginTop: 65,

        height: height * 0.75,
        width: width * 0.95,
        backgroundColor: "white",
        borderRadius: 10

    },
    scrollModal: {
        flexDirection: "column",
        justifyContent: "center",
        padding: 10

    },
    modalCell: {

    },
    groupCheckbox: {
        flexDirection: "column",
        alignItems: "flex-start"
    },
    smallTitle: {
        fontSize: 18,
        fontFamily: 'roboto-medium'
    },

});
const mapStyle = [
    {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    }
];