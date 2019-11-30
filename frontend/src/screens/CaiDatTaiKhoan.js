import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView, { PROVIDER_GOOGLE, Marker, Callout, Polygon } from "react-native-maps";
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import ButtonComponent from '../components/ButtonComponent';
import { CheckBox } from 'react-native-elements';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { MAIN_COLOR } from '../../assets/color';




const { height, width } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;
export default class CaiDatTaiKhoan extends Component {
    static navigationOptions = {
        title: "Cài Đặt Trạng Thái"
    }
    constructor(props) {
        super(props);
        this.state = {
            coordinates: [
                { latitude: 10.828824, longitude: 106.771327 },
                { latitude: 10.828024, longitude: 106.768102 },
                { latitude: 10.825748, longitude: 106.774089 }
            ],
            region : null,
            currentLocation: null,
            isLoading: true,
            errorMessage: null,
            duoi_3m: false,
            tu_3m_den_7m: false,
            tren_7m: false,
            // polygon
            polygons: [],
            editing: null,
            creatingHole: false

        };
    }
    finish = async() => {
        const { polygons, editing } = this.state;
        await this.setState({
            polygons: [...polygons, editing],
            editing: null,
            creatingHole: false,
        });
        await console.log(this.state.polygons)
    }
    cancel = () =>{
        //const { polygons, editing } = this.state;
        this.setState({
            //polygons: [...polygons, editing],
            editing: null,
            creatingHole: false,
        });
    }
   
    onPress = (e) => {
        const { editing, creatingHole } = this.state;
        if (!editing) {
            this.setState({
                editing: {
                    id: id++,
                    coordinates: [e.nativeEvent.coordinate],
                    holes: [],
                },
            });
        } else if (!creatingHole) {
            this.setState({
                editing: {
                    ...editing,
                    coordinates: [...editing.coordinates, e.nativeEvent.coordinate],
                },
            });
        } else {
            const holes = [...editing.holes];
            holes[holes.length - 1] = [
                ...holes[holes.length - 1],
                e.nativeEvent.coordinate,
            ];
            this.setState({
                editing: {
                    ...editing,
                    id: id++, // keep incrementing id to trigger display refresh
                    coordinates: [...editing.coordinates],
                    holes,
                },
            });
        }
    }

    componentDidMount = async () => {
        await this._getLocationAsync();
        this.setState({
            isLoading: false,
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
            latitudeDelta: 0.008,
            longitudeDelta: 0.008,
        };
        this.setState({
            currentLocation,
            region: currentLocation
        });
    };
    render() {
        const mapOptions = {
            scrollEnabled: true,
        };
        if (this.state.editing) {
            mapOptions.scrollEnabled = false;
            mapOptions.onPanDrag = e => this.onPress(e);
        }
        return (
            this.state.isLoading
                ? <ActivityIndicator style={{ flex: 1 }} size='large' />
                : <ScrollView contentContainerStyle={{}} >
                    <View style={styles.container} >
                        <Text style={styles.text} > Chọn khu vực muốn tìm : </Text>
                        <MapView
                            style={styles.mapStyle}
                            initialRegion={this.state.region}
                            customMapStyle={mapStyle}
                            onPress={e => this.onPress(e)}
                            {...mapOptions} >
                            <Marker
                                coordinate={this.state.currentLocation} />
                            {this.state.polygons.map(polygon => (
                                <Polygon
                                    key={polygon.id}
                                    coordinates={polygon.coordinates}
                                    holes={polygon.holes}
                                    strokeColor="#F00"
                                    fillColor="rgba(200,200,280,0.3)"
                                    strokeWidth={1}
                                />
                            ))}
                            {this.state.editing && (
                                <Polygon
                                    key={this.state.editing.id}
                                    coordinates={this.state.editing.coordinates}
                                    holes={this.state.editing.holes}
                                    strokeColor="#000"
                                    fillColor="rgba(200,200,800,0.3)"
                                    strokeWidth={1}
                                />
                            )}
                        </MapView>
                        <View style={styles.buttonContainer}>
                            {this.state.editing && (
                                <TouchableOpacity
                                    onPress={() => this.finish()}
                                    style={[styles.bubble, styles.button]}
                                >
                                    <Text>Finish</Text>
                                </TouchableOpacity>
                            )}
                            {
                                this.state.editing && (
                                    <TouchableOpacity
                                        onPress = {()=> this.cancel()}
                                        style={[styles.bubble, styles.button]} >
                                        <Text>Cancel</Text>
                                    </TouchableOpacity>
                                )
                            }
                        </View>
                        <Text style={styles.text} > Khoảng giá  </Text>
                        <View style={{
                            flexDirection: "column",
                            alignItems: "flex-start"

                        }} >
                            <CheckBox
                                title="Dưới 3.000.000"
                                center
                                containerStyle={{ backgroundColor: 'rgba(52, 52, 52, 0)', borderColor: '#fff', }}
                                textStyle={{ fontFamily: 'roboto-regular' }}
                                checkedIcon={<Ionicons name="md-checkmark-circle" size={32} color={MAIN_COLOR} />}
                                uncheckedIcon={<Ionicons name="md-checkmark-circle" size={32} color="gray" />}
                                checked={this.state.duoi_3m}
                                onPress={() =>
                                    this.setState({
                                        duoi_3m: !this.state.duoi_3m
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
                                checked={this.state.tu_3m_den_7m}
                                onPress={() =>
                                    this.setState({
                                        tu_3m_den_7m: !this.state.tu_3m_den_7m
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
                                checked={this.state.tren_7m}
                                onPress={() =>
                                    this.setState({
                                        tren_7m: !this.state.tren_7m
                                    })
                                }
                            />

                        </View>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "flex-end"
                        }} >
                            <ButtonComponent
                                title="Xác Nhận"
                                style={{
                                    marginVertical: 20,
                                    width: width / 3,
                                    marginRight: 10,
                                }} />
                        </View>

                    </View>
                </ScrollView>

        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    mapStyle: {
        width: width,
        height: height / 1.7
    },
    text: {
        fontSize: 18,
        fontFamily: 'roboto-regular',
        marginVertical: 5
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    bubble: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 20,
    },
    latlng: {
        width: 200,
        alignItems: 'stretch',
    },
    button: {
        width: 80,
        paddingHorizontal: 12,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: 20,
        backgroundColor: 'transparent',
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
