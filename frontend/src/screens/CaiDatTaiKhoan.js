import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import ButtonComponent from '../components/ButtonComponent';

const { height, width } = Dimensions.get('window');
export default class CaiDatTaiKhoan extends Component {
    static navigationOptions = {
        title  : "Cài Đặt Trạng Thái"
    }
    constructor(props) {
        super(props);
        this.state = {
            currentLocation: null,
            isLoading: true,
            errorMessage: null,
            giaPhong: [500000, 8000000],
            //scroll for multislider
            scrollEnabled: true
        };
    }
    componentDidMount = async () => {
        await this._getLocationAsync();
        this.setState({
            isLoading: false,
        });
    }
    enableScroll = () => this.setState({ scrollEnabled: true });
    disableScroll = () => this.setState({ scrollEnabled: false });
    multiSliderValuesChange = (values) => {
        this.setState({
            giaPhong: values
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
        });
    };
    render() {
        return (
            this.state.isLoading
                ? <ActivityIndicator style={{ flex: 1 }} size='large' />
                : <ScrollView contentContainerStyle={{}} >
                    <View style={styles.container} >
                        <Text style={styles.text} > Chọn khu vực muốn tìm : </Text>
                        <MapView
                            style={styles.mapStyle}
                            region={this.state.currentLocation}
                            customMapStyle={mapStyle} >
                            <Marker coordinate={this.state.currentLocation} />
                        </MapView>
                        <Text style={styles.text} > Khoảng giá  </Text>
                        <View>
                            <ScrollView
                                contentContainerStyle={{ alignSelf: "center", paddingHorizontal: 20 }}
                                scrollEnabled={this.state.scrollEnabled}>
                                <MultiSlider
                                    values={[this.state.giaPhong[0], this.state.giaPhong[1]]}
                                    sliderLength={240}
                                    onValuesChange={this.multiSliderValuesChange}
                                    onValuesChangeStart={this.disableScroll}
                                    onValuesChangeFinish={this.enableScroll}
                                    min={500000}
                                    max={8000000}
                                    step={100}

                                />
                            </ScrollView>
                        </View>
                        <View style={{
                            flexDirection : "row",
                            justifyContent : "flex-end"
                        }} >
                            <ButtonComponent
                                title="Xác Nhận"
                                style={{
                                    marginVertical: 20,
                                    width: width / 3,
                                    marginRight:  10,
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
        height: height / 2
    },
    text: {
        fontSize: 18,
        fontFamily: 'roboto-regular',
        marginVertical: 5
    }
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
