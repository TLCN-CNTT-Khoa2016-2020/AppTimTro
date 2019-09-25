import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TextInput,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import ButtonComponent from '../components/ButtonComponent';
import StepIndicator from '../components/StepIndicator';
import { MAIN_COLOR, BORDER_COLOR, TEXT_COLOR } from '../../assets/color';
import { CheckBox } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';

const { height, width } = Dimensions.get('window');
export default class DangPhong3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listImage: [],
            tienIch : {
                wcRieng : false,
                choDeXe : false,
                cuaSo : false,
                anNinh : false,
                wifi : false,
                tudo : false,
                chuRieng : false,
                mayLanh : false,
                nhaBep : false,
                tuLanh: false,
                mayGiat : false,
                thuCung : false
            }
        };
    }
    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }
    componentDidMount() {
        this.getPermissionAsync();
    }
    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            // aspect: [4, 3],
        });

        //console.log(result);

        if (!result.cancelled) {
            this.setState({ listImage: [...this.state.listImage, result.uri] });
        }
    };
 

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enable >
                <StepIndicator step={3} />
                <ScrollView contentContainerStyle={{ marginTop: 0 }} >
                    {/* body */}
                    <View style={styles.body} >
                        <Text style={styles.title} >Thông tin hình ảnh</Text>
                        <Text style={styles.smallTitle} >Hình ảnh</Text>
                        <View style={styles.listImage} >
                            <ButtonComponent
                                style={styles.btnDangAnh}
                                title="Đăng hình"
                                onPress={this._pickImage}
                                icon={<Ionicons name="md-checkmark-circle" size={32} color="green" />} />
                            {this.state.listImage.map((uri, index) => {
                                return (
                                    <Image
                                        key={index.toString()}
                                        style={styles.image}
                                        source={{ uri: uri }} />
                                );
                            })}
                        </View>
                        <Text style={styles.smallTitle} >Tiện ích</Text>
                        <View style={styles.tienIch} >
                            <View style={styles.columnCheckBox} >
                                <CheckBox
                                    title="WC riêng"
                                    center
                                    containerStyle={{ backgroundColor: 'rgba(52, 52, 52, 0)', borderColor: '#fff', }}
                                    textStyle={{ fontFamily: 'roboto-regular' }}
                                    checkedIcon={<Ionicons name="md-checkmark-circle" size={32} color={MAIN_COLOR} />}
                                    uncheckedIcon={<Ionicons name="md-checkmark-circle" size={32} color="gray" />}
                                    checked={this.state.tienIch.wcRieng}
                                    onPress={() =>
                                        this.setState({
                                            tienIch : {
                                                ...this.state.tienIch,
                                                wcRieng : !this.state.tienIch.wcRieng
                                            }
                                        })
                                    }
                                />
                                <CheckBox
                                    title="Cửa sổ"
                                    center
                                    containerStyle={{ backgroundColor: 'rgba(52, 52, 52, 0)', borderColor: '#fff', }}
                                    textStyle={{ fontFamily: 'roboto-regular' }}
                                    checkedIcon={<Ionicons name="md-checkmark-circle" size={32} color={MAIN_COLOR} />}
                                    uncheckedIcon={<Ionicons name="md-checkmark-circle" size={32} color="gray" />}
                                    checked={this.state.tienIch.cuaSo}
                                    onPress={() =>
                                        this.setState({
                                            tienIch : {
                                                ...this.state.tienIch,
                                                cuaSo : !this.state.tienIch.cuaSo
                                            }
                                        })
                                    }
                                />
                                <CheckBox
                                    title="Wifi"
                                    center
                                    containerStyle={{ backgroundColor: 'rgba(52, 52, 52, 0)', borderColor: '#fff', }}
                                    textStyle={{ fontFamily: 'roboto-regular' }}
                                    checkedIcon={<Ionicons name="md-checkmark-circle" size={32} color={MAIN_COLOR} />}
                                    uncheckedIcon={<Ionicons name="md-checkmark-circle" size={32} color="gray" />}
                                    checked={this.state.tienIch.wifi}
                                    onPress={() =>
                                        this.setState({
                                            tienIch : {
                                                ...this.state.tienIch,
                                                wifi : !this.state.tienIch.wifi
                                            }
                                        })
                                    }
                                />
                                <CheckBox
                                    title="Chủ riêng"
                                    center
                                    containerStyle={{ backgroundColor: 'rgba(52, 52, 52, 0)', borderColor: '#fff', }}
                                    textStyle={{ fontFamily: 'roboto-regular' }}
                                    checkedIcon={<Ionicons name="md-checkmark-circle" size={32} color={MAIN_COLOR} />}
                                    uncheckedIcon={<Ionicons name="md-checkmark-circle" size={32} color="gray" />}
                                    checked={this.state.tienIch.chuRieng}
                                    onPress={() =>
                                        this.setState({
                                            tienIch : {
                                                ...this.state.tienIch,
                                                chuRieng : !this.state.tienIch.chuRieng
                                            }
                                        })
                                    }
                                />
                                <CheckBox
                                    title="Nhà bếp"
                                    center
                                    containerStyle={{ backgroundColor: 'rgba(52, 52, 52, 0)', borderColor: '#fff', }}
                                    textStyle={{ fontFamily: 'roboto-regular' }}
                                    checkedIcon={<Ionicons name="md-checkmark-circle" size={32} color={MAIN_COLOR} />}
                                    uncheckedIcon={<Ionicons name="md-checkmark-circle" size={32} color="gray" />}
                                    checked={this.state.tienIch.nhaBep}
                                    onPress={() =>
                                        this.setState({
                                            tienIch : {
                                                ...this.state.tienIch,
                                                nhaBep : !this.state.tienIch.nhaBep
                                            }
                                        })
                                    }
                                />
                                <CheckBox
                                    title="Máy giặt"
                                    center
                                    containerStyle={{ backgroundColor: 'rgba(52, 52, 52, 0)', borderColor: '#fff', }}
                                    textStyle={{ fontFamily: 'roboto-regular' }}
                                    checkedIcon={<Ionicons name="md-checkmark-circle" size={32} color={MAIN_COLOR} />}
                                    uncheckedIcon={<Ionicons name="md-checkmark-circle" size={32} color="gray" />}
                                    checked={this.state.tienIch.mayGiat}
                                    onPress={() =>
                                        this.setState({
                                            tienIch : {
                                                ...this.state.tienIch,
                                                mayGiat : !this.state.tienIch.mayGiat
                                            }
                                        })
                                    }
                                />
                            </View>
                            <View style={styles.columnCheckBox} >
                                <CheckBox
                                    title="Chỗ để xe"
                                    center
                                    containerStyle={{ backgroundColor: 'rgba(52, 52, 52, 0)', borderColor: '#fff', }}
                                    textStyle={{ fontFamily: 'roboto-regular' }}
                                    checkedIcon={<Ionicons name="md-checkmark-circle" size={32} color={MAIN_COLOR} />}
                                    uncheckedIcon={<Ionicons name="md-checkmark-circle" size={32} color="gray" />}
                                    checked={this.state.tienIch.choDeXe}
                                    onPress={() =>
                                        this.setState({
                                            tienIch : {
                                                ...this.state.tienIch,
                                                choDeXe : !this.state.tienIch.choDeXe
                                            }
                                        })
                                    }
                                />
                                <CheckBox
                                    title="An ninh"
                                    center
                                    containerStyle={{ backgroundColor: 'rgba(52, 52, 52, 0)', borderColor: '#fff', }}
                                    textStyle={{ fontFamily: 'roboto-regular' }}
                                    checkedIcon={<Ionicons name="md-checkmark-circle" size={32} color={MAIN_COLOR} />}
                                    uncheckedIcon={<Ionicons name="md-checkmark-circle" size={32} color="gray" />}
                                    checked={this.state.tienIch.anNinh}
                                    onPress={() =>
                                        this.setState({
                                            tienIch : {
                                                ...this.state.tienIch,
                                                anNinh : !this.state.tienIch.anNinh
                                            }
                                        })
                                    }
                                />
                                <CheckBox
                                    title="Tự do"
                                    center
                                    containerStyle={{ backgroundColor: 'rgba(52, 52, 52, 0)', borderColor: '#fff', }}
                                    textStyle={{ fontFamily: 'roboto-regular' }}
                                    checkedIcon={<Ionicons name="md-checkmark-circle" size={32} color={MAIN_COLOR} />}
                                    uncheckedIcon={<Ionicons name="md-checkmark-circle" size={32} color="gray" />}
                                    checked={this.state.tienIch.tudo}
                                    onPress={() =>
                                        this.setState({
                                            tienIch : {
                                                ...this.state.tienIch,
                                                tudo : !this.state.tienIch.tudo
                                            }
                                        })
                                    }
                                />
                                <CheckBox
                                    title="Máy lạnh"
                                    center
                                    containerStyle={{ backgroundColor: 'rgba(52, 52, 52, 0)', borderColor: '#fff', }}
                                    textStyle={{ fontFamily: 'roboto-regular' }}
                                    checkedIcon={<Ionicons name="md-checkmark-circle" size={32} color={MAIN_COLOR} />}
                                    uncheckedIcon={<Ionicons name="md-checkmark-circle" size={32} color="gray" />}
                                    checked={this.state.tienIch.mayLanh}
                                    onPress={() =>
                                        this.setState({
                                            tienIch : {
                                                ...this.state.tienIch,
                                                mayLanh : !this.state.tienIch.mayLanh
                                            }
                                        })
                                    }
                                />
                                <CheckBox
                                    title="Tủ lạnh"
                                    center
                                    containerStyle={{ backgroundColor: 'rgba(52, 52, 52, 0)', borderColor: '#fff', }}
                                    textStyle={{ fontFamily: 'roboto-regular' }}
                                    checkedIcon={<Ionicons name="md-checkmark-circle" size={32} color={MAIN_COLOR} />}
                                    uncheckedIcon={<Ionicons name="md-checkmark-circle" size={32} color="gray" />}
                                    checked={this.state.tienIch.tuLanh}
                                    onPress={() =>
                                        this.setState({
                                            tienIch : {
                                                ...this.state.tienIch,
                                                tuLanh : !this.state.tienIch.tuLanh
                                            }
                                        })
                                    }
                                />
                                <CheckBox
                                    title="Thú cưng"
                                    center
                                    containerStyle={{ backgroundColor: 'rgba(52, 52, 52, 0)', borderColor: '#fff', }}
                                    textStyle={{ fontFamily: 'roboto-regular' }}
                                    checkedIcon={<Ionicons name="md-checkmark-circle" size={32} color={MAIN_COLOR} />}
                                    uncheckedIcon={<Ionicons name="md-checkmark-circle" size={32} color="gray" />}
                                    checked={this.state.tienIch.thuCung}
                                    onPress={() =>
                                        this.setState({
                                            tienIch : {
                                                ...this.state.tienIch,
                                                thuCung : !this.state.tienIch.thuCung
                                            }
                                        })
                                    }
                                />
                            </View>

                        </View>
                    </View>
                </ScrollView>
                <View style={styles.bottomBar} >
                    <ButtonComponent
                        title="Tiếp theo"
                        onPress={() => this.props.navigation.navigate("DangPhong4")} />
                </View>
            </KeyboardAvoidingView >
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",


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

    title: {
        fontSize: 20,
        fontFamily: 'roboto-medium',
        marginVertical: 5
    },
    smallTitle: {
        fontSize: 14,
        fontFamily: 'roboto-medium',
        marginVertical : 10
    },
    underLine: {
        height: 2,
        width: width * 0.8,
        backgroundColor: MAIN_COLOR
    },

    listImage: {
        height: 205,
        width: 300,
        flex: 1,
        flexDirection: "row",
        flexWrap: 'wrap',
        borderColor: '#000',
        borderWidth: 1,
        padding: 10,
        position: 'relative',
        borderRadius : 20,

    },
    image: {
        width: 130,
        height: 80
    },
    btnDangAnh: {
        position: 'absolute',
        zIndex: 100,
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0)'

    },
    tienIch : {
        flexDirection : "row",
        justifyContent: 'center',

    },
    columnCheckBox : {
        flexDirection : "column",
        justifyContent : "center",
        alignItems : "flex-start"
    }
});
