import React, { Component, createRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Platform,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import { MAIN_COLOR } from '../../assets/color';
import CalloutMap from '../components/CalloutMap';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import FilterBar from '../components/FilterBar';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { mockData } from '../mockData';






export default class TimKiem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentLocation: null,
            isLoading: true,
            errorMessage: null,
            markers: [],
           
        };

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


    componentDidMount = async () => {
        await this._getLocationAsync();
        this.setState({
            isLoading: false,
            markers: mockData
        });
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
                        customMapStyle={mapStyle}
                        loadingEnabled = {true}

                    >
                       
                        <Marker
                            coordinate={this.state.currentLocation}
                        ></Marker>
                        
                        {this.state.markers.map((item, index) => {
                            return (
                                <Marker
                                    key={index.toString()}
                                    coordinate={{
                                        latitude: item.latitude,
                                        longitude: item.longitude
                                    }}
                                    tracksViewChanges = {false}

                                //onCalloutPress = {()=>this.navigation.navigate("XemBaiDang")}
                                >
                                    <MaterialCommunityIcons name="home-circle" size={28} color={MAIN_COLOR} />
                                    <Callout
                                        onPress={() => console.log('press')}
                                    >
                                        <CalloutMap item={item} />
                                    </Callout>
                                </Marker>
                            );
                        })}
                         

                    </MapView>
                    {/* Overlay component => FilterBar */}
                    <FilterBar />
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