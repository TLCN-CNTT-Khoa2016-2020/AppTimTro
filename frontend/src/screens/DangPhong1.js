import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Picker,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    ActivityIndicator
} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import ButtonComponent from '../components/ButtonComponent';
import StepIndicator from '../components/StepIndicator';
import { CheckBox } from 'react-native-elements'
import { Ionicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { MAIN_COLOR, BORDER_COLOR, TEXT_COLOR } from '../../assets/color';
import { quanHuyen, xaPhuong } from '../dataPlace';
import {GEOCODINGAPI} from 'react-native-dotenv'

const { height, width } = Dimensions.get('window');
export default class DangPhong1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading : true,
            codeTPHCM: 79,
            codeQuan: {
                "name": "1",
                "type": "quan",
                "slug": "1",
                "name_with_type": "Quận 1",
                "path": "1, Hồ Chí Minh",
                "path_with_type": "Quận 1, Thành phố Hồ Chí Minh",
                "code": "760",
                "parent_code": "79"
            },
            codePhuong: null,
            dataQuanHuyen: quanHuyen,
            dataXaPhuongOrigin: xaPhuong,
            dataXaPhuong: xaPhuong,
            tenDuong: null,
            soNha: null,
            //
            choPhepSuDungViTri : false,
            currentLocation : null,
            errorMessage : null
        };
    }

    handleUpdateQuan = (itemQuan) => {
        const dataXaPhuongNew = this.state.dataXaPhuongOrigin.filter((item) => item.parent_code === itemQuan.code);
        this.setState({
            codeQuan: itemQuan,
            dataXaPhuong: dataXaPhuongNew,
            codePhuong: dataXaPhuongNew[0]
        });
    }
    handleUpdatePhuong = async (itemPhuong) => {
        await this.setState({ codePhuong: itemPhuong });
        // await console.log(JSON.stringify(this.state.codeQuan.name_with_type)
        //     + ', ' + JSON.stringify(this.state.codePhuong.name_with_type)
        //     + ',' + this.state.tenDuong + ',' + this.state.soNha);
    }
    handleButtonTiepTheo = async() => {
        //convert address
        const address = this.state.soNha
            + ', ' + this.state.tenDuong + ', '
            + this.state.codePhuong.name_with_type
            + ', ' + this.state.codeQuan.name_with_type
            + ', TP.Hồ Chí Minh';
        console.log(JSON.stringify(address))
        if(this.state.choPhepSuDungViTri){
            //navigate to DangPhong2
            const coordinates = {
                latitude    : this.state.currentLocation.latitude,
                longitude   : this.state.currentLocation.longitude
            }
            this.props.navigation.navigate('DangPhong2', { address: address, coordinates : coordinates })
        } else {
            // 
            await fetch('https://maps.googleapis.com/maps/api/geocode/json?address='+`${JSON.stringify(address)}`+'&key=' + `${GEOCODINGAPI}`)
                .then(response => {
                    if(response.status === 200){
                        response.json().then(data => {
                            
                            const coordinates = {
                                latitude    : data.results[0].geometry.location.lat,
                                longitude   : data.results[0].geometry.location.lng
                            }
                            console.log(coordinates)
                            this.props.navigation.navigate('DangPhong2', { address: address, coordinates : coordinates })
                        })
                    } else {
                        console.log("geocodingAPI return != 200")
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }
        
        

    }
    geocodingAPI = () => {
        
    }
    componentDidMount = async() => {
        await this.handleUpdateQuan(this.state.codeQuan);
        await this._getLocationAsync();
        this.setState({
            isLoading : false
        })
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
        };
        this.setState({
            currentLocation,
        });
    };

    render() {
        return (

            this.state.isLoading 
                ? <ActivityIndicator size = 'large' style ={{flex : 1}} />
                : <KeyboardAvoidingView style={styles.container} behavior="padding" enable >
                <StepIndicator step={1} />
                <ScrollView contentContainerStyle={{ marginTop: 0 }} >
                    {/* body */}
                    <View style={styles.body} >
                        <Text style={styles.title} >Địa Chỉ</Text>

                        <View style={styles.cell} >
                            <Text style={styles.smallTitle} >Thành phố</Text>
                            {/* picker TP */}
                            <Picker style={styles.pickerStyle} >
                                <Picker.Item label="Thành Phố Hồ Chí Minh" value={this.state.codeTPHCM} />
                            </Picker>
                            <View style={styles.underLine} ></View>
                        </View>
                        <View style={styles.cell} >
                            <Text style={styles.smallTitle}  >Quận/huyện</Text>
                            {/* picker Quan */}
                            <Picker
                                onValueChange={this.handleUpdateQuan}
                                selectedValue={this.state.codeQuan}
                                style={styles.pickerStyle} >
                                {this.state.dataQuanHuyen.map((item, index) => {
                                    return (
                                        <Picker.Item
                                            key={index.toString()}
                                            label={item.name_with_type}
                                            value={item} />
                                    );
                                })}
                            </Picker>
                            <View style={styles.underLine} ></View>
                        </View>
                        <View style={styles.cell} >
                            <Text style={styles.smallTitle} >Phường</Text>
                            {/* picker Phuong */}
                            <Picker
                                onValueChange={this.handleUpdatePhuong}
                                selectedValue={this.state.codePhuong}
                                style={styles.pickerStyle} >
                                {this.state.dataXaPhuong.map((item, index) => {
                                    return (
                                        <Picker.Item
                                            key={index.toString()}
                                            label={item.name_with_type}
                                            value={item} />
                                    );
                                })}
                            </Picker>
                            <View style={styles.underLine} ></View>
                        </View>
                        <View style={styles.cell} >
                            <Text style={styles.smallTitle} >Tên đường</Text>
                            <TextInput
                                placeholder='Tên đường'
                                placeholderTextColor='gray'
                                fontSize={16}
                                fontFamily='roboto-regular'
                                onChangeText={tenDuong => this.setState({ tenDuong })}
                                style={styles.textInputStyle} />
                            <View style={styles.underLine} ></View>
                        </View>
                        <View style={styles.cell} >
                            <Text style={styles.smallTitle} >Số nhà</Text>
                            <TextInput
                                placeholder='Số nhà'
                                placeholderTextColor='gray'
                                fontSize={16}
                                fontFamily='roboto-regular'
                                style={styles.textInputStyle}
                                onChangeText={soNha => this.setState({ soNha })} />
                            <View style={styles.underLine} ></View>
                        </View>
                        <View style={styles.cell} >
                            <CheckBox
                                title="Sử dụng vị trí hiện tại cho địa chỉ này"
                                center
                                containerStyle={{ backgroundColor: 'rgba(52, 52, 52, 0)', borderColor: '#fff', }}
                                textStyle={{ fontFamily: 'roboto-regular', fontSize : 16  }}
                                checkedIcon={<MaterialCommunityIcons name="target" size={32} color={MAIN_COLOR} />}
                                uncheckedIcon={<MaterialCommunityIcons name="target" size={32} color="gray" />}
                                checked={this.state.choPhepSuDungViTri}
                                onPress={() =>
                                    this.setState({
                                       choPhepSuDungViTri : !this.state.choPhepSuDungViTri
                                    })
                                }
                            />

                        </View>

                    </View>
                </ScrollView>
                <View style={styles.bottomBar} >
                    <ButtonComponent
                        title="Tiếp theo"
                        onPress={() => this.handleButtonTiepTheo()} />
                </View>
            </KeyboardAvoidingView>

        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",


    },
    stepIndicator: {
        // // position: "absolute",
        // top: 10,
        // left: 0,
        // zIndex : 100
    },
    bottomBar: {
        width: width,
        height: height / 11,
        backgroundColor: BORDER_COLOR,
        //position: "absolute",
        bottom: 0,
        left: 0,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingRight: 10
    },
    body: {
        flexDirection: 'column',
        justifyContent: "center",
        marginHorizontal: 30,
        marginBottom: 30
    },
    cell: {
        marginVertical: 10
    },
    title: {
        fontSize: 20,
        fontFamily: 'roboto-medium',
        marginVertical: 5
    },
    smallTitle: {
        fontSize: 14,
        fontFamily: 'roboto-medium'
    },
    underLine: {
        height: 2,
        width: width * 0.8,
        backgroundColor: MAIN_COLOR
    },
    pickerStyle: {
        color: 'gray',
        marginHorizontal: 20
    },
    textInputStyle: {
        marginHorizontal: 30,
        marginBottom: 10,
        marginTop: 5

    }
});
