import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Picker,
    TextInput,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import ButtonComponent from '../components/ButtonComponent';
import StepIndicator from '../components/StepIndicator';
import { MAIN_COLOR, BORDER_COLOR, TEXT_COLOR } from '../../assets/color';


const kindOfRoom = [
    { label: "Phòng cho thuê", value: 0 },
    { label: "Phòng ở ghép", value: 1 },
    { label: "Nhà nguyên căn", value: 2 },
    { label: "Căn hộ", value: 3 }
];
const sex = [
    { label: "Tất cả", value: 0 },
    { label: "Nam", value: 1 },
    { label: "Nữ", value: 2 },
];
const { height, width } = Dimensions.get('window');
export default class DangPhong2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kindOfRoom: 0,
            sex: 0
        };
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enable >
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
                                onPress={(value) => { this.setState({ kindOfRoom: value }) }} />
                        </View>
                        <View style={styles.cell} >
                            <Text style={styles.smallTitle} >Sức chứa</Text>
                            <TextInput
                                placeholder='người/phòng'
                                placeholderTextColor='gray'
                                fontSize={16}
                                fontFamily='roboto-regular'
                                style={styles.textInputStyle} />
                            <View style={styles.underLine} ></View>
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
                                onPress={(value) => { this.setState({ sex: value }) }} />
                        </View>
                        <View style={styles.cell} >
                            <Text style={styles.smallTitle} >Diện tích</Text>
                            <TextInput
                                placeholder='m2'
                                placeholderTextColor='gray'
                                fontSize={16}
                                fontFamily='roboto-regular'
                                style={styles.textInputStyle} />
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
                                style={styles.textInputStyle} />
                            <View style={styles.underLine} ></View>
                        </View>
                        <View style={styles.cell} >
                            <Text style={styles.smallTitle} >Đặt cọc</Text>
                            <TextInput
                                placeholder='đồng'
                                placeholderTextColor='gray'
                                fontSize={16}
                                fontFamily='roboto-regular'
                                style={styles.textInputStyle} />
                            <View style={styles.underLine} ></View>
                        </View>
                        <View style={styles.cell} >
                            <Text style={styles.smallTitle} >Tiền điện</Text>
                            <TextInput
                                placeholder='đồng'
                                placeholderTextColor='gray'
                                fontSize={16}
                                fontFamily='roboto-regular'
                                style={styles.textInputStyle} />
                            <View style={styles.underLine} ></View>
                        </View>
                        <View style={styles.cell} >
                            <Text style={styles.smallTitle} >Tiền nước</Text>
                            <TextInput
                                placeholder='đồng'
                                placeholderTextColor='gray'
                                fontSize={16}
                                fontFamily='roboto-regular'
                                style={styles.textInputStyle} />
                            <View style={styles.underLine} ></View>
                        </View>
                        <View style={styles.cell} >
                            <Text style={styles.smallTitle} >Internet</Text>
                            <TextInput
                                placeholder='đồng/tháng'
                                placeholderTextColor='gray'
                                fontSize={16}
                                fontFamily='roboto-regular'
                                style={styles.textInputStyle} />
                            <View style={styles.underLine} ></View>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.bottomBar} >
                    <ButtonComponent
                        title="Tiếp theo"
                        onPress={() => this.props.navigation.navigate("DangPhong3")} />
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
