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
import { quanHuyen, xaPhuong } from '../dataPlace';

const { height, width } = Dimensions.get('window');
export default class DangPhong1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
            dataXaPhuong: xaPhuong
        };
    }

    handleUpdateQuan = (itemQuan) => {
        const dataXaPhuongNew = this.state.dataXaPhuongOrigin.filter((item) => item.parent_code === itemQuan.code);
        this.setState({
            codeQuan: itemQuan,
            dataXaPhuong: dataXaPhuongNew
        });
    }
    handleUpdatePhuong = (itemPhuong) => {
        this.setState({ codePhuong: itemPhuong });
    }
    componentDidMount = () => {
        this.handleUpdateQuan(this.state.codeQuan);
    }


    render() {
        return (

            <KeyboardAvoidingView style={styles.container} behavior="padding" enable >
                <StepIndicator step={1} />
                <ScrollView contentContainerStyle={{  marginTop : 0 }} >
                    {/* body */}
                    <View style={styles.body} >
                        <Text style={styles.title} >Địa Chỉ</Text>

                        <View style={styles.cell} >
                            <Text style={styles.smallTitle} >Thành phố</Text>
                            {/* picker TP */}
                            <Picker style = {styles.pickerStyle} >
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
                                style = {styles.pickerStyle} >
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
                                style = {styles.pickerStyle} >
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
                                placeholderTextColor = 'gray'
                                fontSize={16}
                                fontFamily='roboto-regular' 
                                style = {styles.textInputStyle} />
                            <View style={styles.underLine} ></View>
                        </View>
                        <View style={styles.cell} >
                            <Text style={styles.smallTitle} >Số nhà</Text>
                            <TextInput
                                placeholder='Số nhà'
                                placeholderTextColor = 'gray'
                                fontSize={16}
                                fontFamily='roboto-regular'
                                style = {styles.textInputStyle} />
                            <View style={styles.underLine} ></View>
                        </View>

                    </View>
                </ScrollView>
                <View style={styles.bottomBar} >
                    <ButtonComponent
                        title="Tiếp theo"
                        onPress={() => this.props.navigation.navigate("DangPhong2")} />
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
        marginHorizontal : 30,
        marginBottom : 30
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
    pickerStyle : {
        color: 'gray',
        marginHorizontal : 20
    },
    textInputStyle : {
        marginHorizontal : 30,
        marginBottom : 10,
        marginTop : 5
        
    }
});
