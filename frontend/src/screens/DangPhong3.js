import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    ActivityIndicator
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import ButtonComponent from '../components/ButtonComponent';
import StepIndicator from '../components/StepIndicator';
import { MAIN_COLOR, BORDER_COLOR, TEXT_COLOR } from '../../assets/color';
import { CheckBox } from 'react-native-elements'
import { Ionicons, MaterialCommunityIcons,  } from '@expo/vector-icons';

const { height, width } = Dimensions.get('window');
export default class DangPhong3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading : true,
            post : null,
            utilities : {
                wc_rieng    : false,
                an_ninh     : false,
                chu_rieng   : false,
                tu_do       : false,
                cua_so      : false,
                chode_xe    : false,
                wifi        : false,
                may_lanh    : false,
                tu_lanh     : false,
                may_giat    : false,
                nha_bep     : false,
                thu_cung    : false
            },
            room_image : []
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
        const post = this.props.navigation.state.params.post;
        this.getPermissionAsync();
        this.setState({
            isLoading : false,
            post
        })
    }
    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            // aspect: [4, 3],
        });

        //console.log(result);

        if (!result.cancelled) {
            console.log(this.state.room_image)
            this.setState({ room_image: [...this.state.room_image, result] });
        }
    };

    handleButtonTiepThep = () => {
        const post = this.state.post;
        post["utilities"]    = this.state.utilities;
        post["room_image"]   = this.state.room_image;
        this.props.navigation.navigate("DangPhong4",{post : post});
       
    }


    render() {
        return (
            this.isLoading 
                ? <ActivityIndicator size = 'large' style={{flex:1}} />
                : <KeyboardAvoidingView style={styles.container} behavior="padding" enable >
                <StepIndicator step={3} />
                <ScrollView contentContainerStyle={{ marginTop: 0 }} >
                    {/* body */}
                    <View style={styles.body} >
                        <Text style={styles.title} >Thông tin hình ảnh</Text>
                        <Text style={styles.smallTitle} >Hình ảnh</Text>
                        <View style={styles.listImage} >
                            {
                                this.state.room_image.length < 1 
                                    ?   <Text 
                                            style = {styles.textHinhAnh}>
                                            Chưa có ảnh nào được chọn
                                        </Text>
                                    : this.state.room_image.map((uri, index) => {
                                        return (
                                            <Image
                                                key={index.toString()}
                                                style={styles.image}
                                                source={{ uri: uri.uri }} />
                                            );
                                    })
                            }
                        </View>
                        <ButtonComponent
                                style={styles.btnDangAnh}
                                title="Nhấn để chọn ảnh"
                                onPress={this._pickImage} />   
                        <Text style={styles.smallTitle} >Tiện ích</Text>
                        <View style={styles.tienIch} >
                            <View style={styles.columnCheckBox} >
                                <CheckBox
                                    title="WC riêng"
                                    center
                                    containerStyle={{ backgroundColor: 'rgba(52, 52, 52, 0)', borderColor: '#fff', }}
                                    textStyle={{ fontFamily: 'roboto-regular' }}
                                    checkedIcon={<MaterialCommunityIcons name="toilet" size={32} color={MAIN_COLOR} />}
                                    uncheckedIcon={<MaterialCommunityIcons name="toilet" size={32} color="gray" />}
                                    checked={this.state.utilities.wc_rieng}
                                    onPress={() =>
                                        this.setState({
                                            utilities: {
                                                ...this.state.utilities,
                                                wc_rieng: !this.state.utilities.wc_rieng
                                            }
                                        })
                                    }
                                />
                                <CheckBox
                                    title="Cửa sổ"
                                    center
                                    containerStyle={{ backgroundColor: 'rgba(52, 52, 52, 0)', borderColor: '#fff', }}
                                    textStyle={{ fontFamily: 'roboto-regular' }}
                                    checkedIcon={<MaterialCommunityIcons name="aspect-ratio" size={32} color={MAIN_COLOR} />}
                                    uncheckedIcon={<MaterialCommunityIcons name="aspect-ratio" size={32} color="gray" />}
                                    checked={this.state.utilities.cua_so}
                                    onPress={() =>
                                        this.setState({
                                            utilities: {
                                                ...this.state.utilities,
                                                cua_so: !this.state.utilities.cua_so
                                            }
                                        })
                                    }
                                />
                                <CheckBox
                                    title="Wifi"
                                    center
                                    containerStyle={{ backgroundColor: 'rgba(52, 52, 52, 0)', borderColor: '#fff', }}
                                    textStyle={{ fontFamily: 'roboto-regular' }}
                                    checkedIcon={<MaterialCommunityIcons name="wifi" size={32} color={MAIN_COLOR} />}
                                    uncheckedIcon={<MaterialCommunityIcons name="wifi" size={32} color="gray" />}
                                    checked={this.state.utilities.wifi}
                                    onPress={() =>
                                        this.setState({
                                            utilities: {
                                                ...this.state.utilities,
                                                wifi: !this.state.utilities.wifi
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
                                    checked={this.state.utilities.chu_rieng}
                                    onPress={() =>
                                        this.setState({
                                            utilities: {
                                                ...this.state.utilities,
                                                chu_rieng: !this.state.utilities.chu_rieng
                                            }
                                        })
                                    }
                                />
                                <CheckBox
                                    title="Nhà bếp"
                                    center
                                    containerStyle={{ backgroundColor: 'rgba(52, 52, 52, 0)', borderColor: '#fff', }}
                                    textStyle={{ fontFamily: 'roboto-regular' }}
                                    checkedIcon={<MaterialCommunityIcons name="silverware-fork-knife" size={32} color={MAIN_COLOR} />}
                                    uncheckedIcon={<MaterialCommunityIcons name="silverware-fork-knife" size={32} color="gray" />}
                                    checked={this.state.utilities.nha_bep}
                                    onPress={() =>
                                        this.setState({
                                            utilities: {
                                                ...this.state.utilities,
                                                nha_bep: !this.state.utilities.nha_bep
                                            }
                                        })
                                    }
                                />
                                <CheckBox
                                    title="Máy giặt"
                                    center
                                    containerStyle={{ backgroundColor: 'rgba(52, 52, 52, 0)', borderColor: '#fff', }}
                                    textStyle={{ fontFamily: 'roboto-regular' }}
                                    checkedIcon={<MaterialCommunityIcons name="washing-machine" size={32} color={MAIN_COLOR} />}
                                    uncheckedIcon={<MaterialCommunityIcons name="washing-machine" size={32} color="gray" />}
                                    checked={this.state.utilities.may_giat}
                                    onPress={() =>
                                        this.setState({
                                            utilities: {
                                                ...this.state.utilities,
                                                may_giat: !this.state.utilities.may_giat
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
                                    checkedIcon={<MaterialCommunityIcons name="bike" size={32} color={MAIN_COLOR} />}
                                    uncheckedIcon={<MaterialCommunityIcons name="bike" size={32} color="gray" />}
                                    checked={this.state.utilities.chode_xe}
                                    onPress={() =>
                                        this.setState({
                                            utilities: {
                                                ...this.state.utilities,
                                                chode_xe: !this.state.utilities.chode_xe
                                            }
                                        })
                                    }
                                />
                                <CheckBox
                                    title="An ninh"
                                    center
                                    containerStyle={{ backgroundColor: 'rgba(52, 52, 52, 0)', borderColor: '#fff', }}
                                    textStyle={{ fontFamily: 'roboto-regular' }}
                                    checkedIcon={<MaterialCommunityIcons name="security" size={32} color={MAIN_COLOR} />}
                                    uncheckedIcon={<MaterialCommunityIcons name="security" size={32} color="gray" />}
                                    checked={this.state.utilities.an_ninh}
                                    onPress={() =>
                                        this.setState({
                                            utilities: {
                                                ...this.state.utilities,
                                                an_ninh: !this.state.utilities.an_ninh
                                            }
                                        })
                                    }
                                />
                                <CheckBox
                                    title="Tự do"
                                    center
                                    containerStyle={{ backgroundColor: 'rgba(52, 52, 52, 0)', borderColor: '#fff', }}
                                    textStyle={{ fontFamily: 'roboto-regular' }}
                                    checkedIcon={<MaterialCommunityIcons name="hand-peace" size={32} color={MAIN_COLOR} />}
                                    uncheckedIcon={<MaterialCommunityIcons name="hand-peace" size={32} color="gray" />}
                                    checked={this.state.utilities.tu_do}
                                    onPress={() =>
                                        this.setState({
                                            utilities: {
                                                ...this.state.utilities,
                                                tu_do: !this.state.utilities.tu_do
                                            }
                                        })
                                    }
                                />
                                <CheckBox
                                    title="Máy lạnh"
                                    center
                                    containerStyle={{ backgroundColor: 'rgba(52, 52, 52, 0)', borderColor: '#fff', }}
                                    textStyle={{ fontFamily: 'roboto-regular' }}
                                    checkedIcon={<MaterialCommunityIcons name="air-conditioner" size={32} color={MAIN_COLOR} />}
                                    uncheckedIcon={<MaterialCommunityIcons name="air-conditioner" size={32} color="gray" />}
                                    checked={this.state.utilities.may_lanh}
                                    onPress={() =>
                                        this.setState({
                                            utilities: {
                                                ...this.state.utilities,
                                                may_lanh: !this.state.utilities.may_lanh
                                            }
                                        })
                                    }
                                />
                                <CheckBox
                                    title="Tủ lạnh"
                                    center
                                    containerStyle={{ backgroundColor: 'rgba(52, 52, 52, 0)', borderColor: '#fff', }}
                                    textStyle={{ fontFamily: 'roboto-regular' }}
                                    checkedIcon={<MaterialCommunityIcons name="fridge" size={32} color={MAIN_COLOR} />}
                                    uncheckedIcon={<MaterialCommunityIcons name="fridge" size={32} color="gray" />}
                                    checked={this.state.utilities.tu_lanh}
                                    onPress={() =>
                                        this.setState({
                                            utilities: {
                                                ...this.state.utilities,
                                                tu_lanh: !this.state.utilities.tu_lanh
                                            }
                                        })
                                    }
                                />
                                <CheckBox
                                    title="Thú cưng"
                                    center
                                    containerStyle={{ backgroundColor: 'rgba(52, 52, 52, 0)', borderColor: '#fff', }}
                                    textStyle={{ fontFamily: 'roboto-regular' }}
                                    checkedIcon={<MaterialCommunityIcons name="dog-service" size={32} color={MAIN_COLOR} />}
                                    uncheckedIcon={<MaterialCommunityIcons name="dog-service" size={32} color="gray" />}
                                    checked={this.state.utilities.thu_cung}
                                    onPress={() =>
                                        this.setState({
                                            utilities: {
                                                ...this.state.utilities,
                                                thu_cung: !this.state.utilities.thu_cung
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
                        onPress={() => this.handleButtonTiepThep()} />
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
        marginVertical: 10
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
        borderRadius: 20,

    },
    textHinhAnh: {
        fontSize : 14,
        fontFamily : 'roboto-medium',
        alignSelf : "center",
        alignContent : "center",
        color : 'gray'
    },
    image: {
        width: 130,
        height: 80
    },
    btnDangAnh: {
        // position: 'absolute',
        // zIndex: 100,
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0)'

    },
    tienIch: {
        flexDirection: "row",
        justifyContent: 'center',

    },
    columnCheckBox: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start"
    }
});
