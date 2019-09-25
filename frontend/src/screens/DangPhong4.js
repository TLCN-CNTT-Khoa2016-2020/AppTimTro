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
import ButtonComponent from '../components/ButtonComponent';
import StepIndicator from '../components/StepIndicator';
import { MAIN_COLOR, BORDER_COLOR, TEXT_COLOR } from '../../assets/color';


const { height, width } = Dimensions.get('window');
export default class DangPhong4 extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enable >
                <StepIndicator step={4} />
                <ScrollView contentContainerStyle={{ marginTop: 0 }} >
                    {/* body */}
                    <View style={styles.body} >
                        <Text style={styles.title} > Xác nhận thông tin</Text>
                        <View style={styles.cell} >
                            <Text style={styles.smallTitle} >Số điện thoại</Text>
                            <TextInput
                                placeholder='Nhập số điện thoại'
                                placeholderTextColor='gray'
                                fontSize={16}
                                fontFamily='roboto-regular'
                                style={styles.textInputStyle} />
                            <View style={styles.underLine} ></View>
                        </View>
                        <View style={styles.cell} >
                            <Text style={styles.smallTitle} >Tiêu đề bài đăng</Text>
                            <TextInput
                                placeholder='Nhập tiêu đề'
                                placeholderTextColor='gray'
                                fontSize={16}
                                fontFamily='roboto-regular'
                                style={styles.textInputStyle} />
                            <View style={styles.underLine} ></View>
                        </View>
                        <View style={styles.cell} >
                            <Text style={styles.smallTitle} >Nội dung mô tả</Text>
                            <TextInput
                                placeholder='Mô tả'
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
                        title="Xác nhận"
                        onPress={() => this.props.navigation.navigate("DangPhong4")} />
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
