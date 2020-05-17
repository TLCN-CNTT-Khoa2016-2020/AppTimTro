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
import { CheckBox } from 'react-native-elements';
import RadioForm from 'react-native-simple-radio-button';
import ButtonComponent from '../components/ButtonComponent';
import StepIndicator from '../components/StepIndicator';
import { MAIN_COLOR, BORDER_COLOR, TEXT_COLOR } from '../../assets/color';


const kindOfRoom = [
    { label: "Phòng cho thuê", value: 'Phòng cho thuê' },
    { label: "Phòng ở ghép", value: "Phòng ở ghép" },
    { label: "Nhà nguyên căn", value: "Nhà nguyên căn" },
    { label: "Căn hộ", value: "Căn hộ" }
];
const sex = [
    { label: "Nam", value: "Nam" },
    { label: "Nữ", value: "Nữ" },
];
const { height, width } = Dimensions.get('window');
export default class DangPhong2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading       : true,
            kind_of_room    : "Phòng cho thuê",
            room_area       : null,
            gender          : "Nam",
            room_price      : null,
            room_deposi     : null,
            electric_price  : null,
            water_price     : null,
            wifi_price      : null,
            parking_price   : null,   
            address         : null,
            coordinates     : null
        };
    }

    componentDidMount = () => {
        const address = this.props.navigation.state.params.address;
        const coordinates = this.props.navigation.state.params.coordinates
        this.setState({
            isLoading : false,
            address,
            coordinates
        })
    }
    handleButtonTiepTheo = () => {
        const post = {
            kind_of_room    : this.state.kind_of_room,
            room_area       : this.state.room_area,
            gender          : this.state.gender,
            room_price      : this.state.room_price,
            room_deposi     : this.state.room_deposi,
            electric_price  : this.state.electric_price,
            water_price     : this.state.water_price,
            wifi_price      : this.state.wifi_price,
            parking_price   : this.state.parking_price,
            address         : this.state.address,
            coordinates     : this.state.coordinates
        }
        console.log(post)
        //navigate to DangPhong3
        this.props.navigation.navigate('DangPhong3',{post : post});
    }
    render() {
        return (
            this.state.isLoading
                ? <ActivityIndicator size = "large" style = {{flex: 1}} />
                :<KeyboardAvoidingView style={styles.container} behavior="height" enable >
                <StepIndicator step={2} />
                <ScrollView contentContainerStyle={{ marginTop: 0 }} >
                    {/* body */}
                    <View style={styles.body} >
                        <Text style={styles.title} >Thông tin phòng</Text>
                        <View style={styles.cell} >
                            <Text style={styles.smallTitle} >Loại Phòng</Text>
                            <RadioForm
                                radio_props={kindOfRoom}
                                initial={0}
                                buttonColor={MAIN_COLOR}
                                selectedButtonColor={MAIN_COLOR}
                                buttonSize={12}
                                buttonOuterSize={24}
                                labelStyle={{ fontSize: 20, fontFamily: 'roboto-regular' }}
                                // style={{ marginVertical: 10 }}
                                radioStyle={{ marginVertical: 10 }}
                                onPress={(value) => { this.setState({ kind_of_room: value }) }} />
                        </View>
                        <View style={styles.cell} >
                            <Text style={styles.smallTitle} >Giới tính</Text>
                            <RadioForm
                                radio_props={sex}
                                initial={0}
                                buttonColor={MAIN_COLOR}
                                selectedButtonColor={MAIN_COLOR}
                                buttonSize={12}
                                buttonOuterSize={24}
                                labelStyle={{ fontSize: 20, fontFamily: 'roboto-regular' }}
                                // style={{ marginVertical: 10 }}
                                radioStyle={{ marginVertical: 10 }}
                                onPress={(value) => { this.setState({ gender: value }) }} />
                        </View>
                        <View style={styles.cell} >
                            <Text style={styles.smallTitle} >Diện tích</Text>
                            <TextInput
                                placeholder='m2'
                                placeholderTextColor='gray'
                                fontSize={16}
                                fontFamily='roboto-regular'
                                style={styles.textInputStyle}
                                onChangeText = {room_area => this.setState({room_area})} />
                            <View style={styles.underLine} ></View>
                        </View>
                        <Text style={styles.title} >Chi phí</Text>
                        <View style={styles.cell} >
                            <Text style={styles.smallTitle} >Giá cho thuê</Text>
                            <TextInput
                                placeholder='đồng/phòng'
                                placeholderTextColor='gray'
                                fontSize={16}
                                fontFamily='roboto-regular'
                                style={styles.textInputStyle}
                                onChangeText = {room_price => this.setState({room_price})} />
                            <View style={styles.underLine} ></View>
                        </View>
                        <View style={styles.cell} >
                            <Text style={styles.smallTitle} >Đặt cọc</Text>
                            <TextInput
                                placeholder='đồng'
                                placeholderTextColor='gray'
                                fontSize={16}
                                fontFamily='roboto-regular'
                                style={styles.textInputStyle}
                                onChangeText = {room_deposi => this.setState({room_deposi})} />
                            <View style={styles.underLine} ></View>
                        </View>
                        <View style={styles.cell} >
                            <Text style={styles.smallTitle} >Tiền điện</Text>
                            <TextInput
                                placeholder='đồng'
                                placeholderTextColor='gray'
                                fontSize={16}
                                fontFamily='roboto-regular'
                                style={styles.textInputStyle}
                                onChangeText = {electric_price => this.setState({electric_price})} />
                            <View style={styles.underLine} ></View>
                        </View>
                        <View style={styles.cell} >
                            <Text style={styles.smallTitle} >Tiền nước</Text>
                            <TextInput
                                placeholder='đồng'
                                placeholderTextColor='gray'
                                fontSize={16}
                                fontFamily='roboto-regular'
                                style={styles.textInputStyle}
                                onChangeText = {water_price => this.setState({water_price})} />
                            <View style={styles.underLine} ></View>
                        </View>
                        <View style={styles.cell} >
                            <Text style={styles.smallTitle} >Internet</Text>
                            <TextInput
                                placeholder='đồng/tháng'
                                placeholderTextColor='gray'
                                fontSize={16}
                                fontFamily='roboto-regular'
                                style={styles.textInputStyle}
                                onChangeText = {wifi_price => this.setState({wifi_price})} />
                            <View style={styles.underLine} ></View>
                        </View>
                        <View style={styles.cell} >
                            <Text style={styles.smallTitle} >Chỗ để xe</Text>
                            <TextInput
                                placeholder='đồng/tháng'
                                placeholderTextColor='gray'
                                fontSize={16}
                                fontFamily='roboto-regular'
                                style={styles.textInputStyle}
                                onChangeText = {parking_price => this.setState({parking_price})} />
                            <View style={styles.underLine} ></View>
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
