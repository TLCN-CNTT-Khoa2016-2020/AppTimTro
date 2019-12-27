import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView, { PROVIDER_GOOGLE, Marker, Callout, Polygon } from "react-native-maps";
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import ButtonComponent from '../components/ButtonComponent';
import { CheckBox } from 'react-native-elements';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { MAIN_COLOR } from '../../assets/color';
import { url } from '../ultils/index'
import RadioForm from 'react-native-simple-radio-button';




const { height, width } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;
// declare for radio form
const rangePrice = [
    { label: "Dưới 3 triệu", value: { minPrice: 0, maxPrice: 3000000 } },
    { label: "Từ 3 triệu đến 7 triệu", value: { minPrice: 3000000, maxPrice: 7000000 } },
    { label: "Trên 7 triệu", value: { minPrice: 7000000, maxPrice: 900000000 } },
]

export default class CaiDatTaiKhoan extends Component {
    static navigationOptions = {
        title: "Cài Đặt Trạng Thái"
    }
    constructor(props) {
        super(props);
        this.state = {
            region: null,
            currentLocation: null,
            isLoading: true,
            errorMessage: null,
            duoi_3m: false,
            tu_3m_den_7m: false,
            tren_7m: false,
            rangePrice: {
                minPrice: 0,
                maxPrice: 3000000
            },
            initialRadioForm : 0,
            // polygon
            polygons: [],
            editing: null,
            creatingHole: false

        };
    }
    finish = async () => {
        const { polygons, editing } = this.state;
        await this.setState({
            polygons: [...polygons, editing],
            editing: null,
            creatingHole: false,
        });
        // await console.log(this.state.polygons)
        // await console.log(this.state.polygons.map(item => {
        //     return item.coordinates
        // }))
        // await console.log(this.state.rangePrice)
    }
    cancel = () => {
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
        await this.getTimTroSetting();
        await console.log(this.state.initialRadioForm)
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


    updateTimTroSetting = async () => {
        let dataUserID = await AsyncStorage.getItem("userID");
        let userID = await JSON.parse(dataUserID);
        let dataAuthToken = await AsyncStorage.getItem("authToken");
        let authToken = await JSON.parse(dataAuthToken);

        try {
            fetch(`${url}` + "/users/updatetimtrosetting/" + userID, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + `${authToken}`
                },
                body: JSON.stringify({
                    area: this.state.polygons.map(item => {
                        return item.coordinates
                    }),
                    rangePrice: {
                        maxPrice: this.state.rangePrice.maxPrice,
                        minPrice: this.state.rangePrice.minPrice
                    }
                })
            }).then(response => {
                // if request success
                if (response.status === 200) {
                    response.json().then(data => {
                        console.log(data.message);
                    })
                } else if (response.status === 401) { // token expire
                    console.log(" Token expire")
                    this.navigateToLoginScreen();
                } else {
                    console.log("Request fail. Status code : "+ response.status)
                }
            }).catch(error => {
                console.log(error)
            })
        } catch (error) {
            console.log(error)
        }


    }
    getTimTroSetting = async() => {
        let dataUserID = await AsyncStorage.getItem("userID");
        let userID = await JSON.parse(dataUserID);
        let dataAuthToken = await AsyncStorage.getItem("authToken");
        let authToken = await JSON.parse(dataAuthToken);

        //
        fetch(`${url}`+ "/users/timtrosetting/" + userID,{
            method : 'GET',
            headers : { 
                Accept: 'application/json', 
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer '+`${authToken}`
            }
        }).then(response => {
            //if success
            let id = 0;
            if(response.status === 200){
                response.json().then(data => {
                    const polygons = data.result.timtroSetting.area.map(item => {
                        return { 
                            "coordinates" : item,
                            "id"          : id++,
                            "holes"       : []
                        }
                    })
                    const rangePrice = data.result.timtroSetting.rangePrice;
                    //let initialRadioForm = 0;
                    console.log(rangePrice)
                    if(rangePrice.minPrice === 0){
                        this.setState({
                            polygons,
                            rangePrice,
                            initialRadioForm : 0
                        })
                    } else if(rangePrice.minPrice === 3000000){
                        this.setState({
                            polygons,
                            rangePrice,
                            initialRadioForm : 1
                        })
                    } else {
                        this.setState({
                            polygons,
                            rangePrice,
                            initialRadioForm: 2
                        })
                    }
                   
                })
            } else if (response.status === 401) { // token expire
                console.log(" Token expire")
                this.navigateToLoginScreen();
            } else {
                console.log("Request fail. Status code : "+ response.status)
            }

        }).catch(error => {
            console.log(error)
        })
    }
    removePolygon = () => {
        console.log("cc")
    }
    navigateToLoginScreen = async () => {
        await AsyncStorage.removeItem('authToken');
        await AsyncStorage.removeItem('userID');
        await this.props.navigation.navigate('DangNhap');
    }
    render() {
        console.log(this.state.initialRadioForm)
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
                            onLongPress = {()=>this.removePolygon}
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
                                    //onPress = {()=>this.removePolygon}
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
                                    //onPress = {()=>this.removePolygon}
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
                                        onPress={() => this.cancel()}
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
                            <RadioForm
                                key = {Date.now.toString()}
                                //isSelected = {this.state.initialRadioForm}
                                radio_props={rangePrice}
                                initial={this.state.initialRadioForm}
                                buttonColor={MAIN_COLOR}
                                selectedButtonColor={MAIN_COLOR}
                                buttonSize={12}
                                buttonOuterSize={24}
                                labelStyle={{ fontSize: 20, fontFamily: 'roboto-regular' }}
                                // style={{ marginVertical: 10 }}
                                radioStyle={{ marginVertical: 10 }}
                                onPress={(value) => { this.setState({ 
                                    rangePrice: value 
                                }) }} />

                        </View>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "flex-end"
                        }} >
                            <ButtonComponent
                                onPress={() => this.updateTimTroSetting()}
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
