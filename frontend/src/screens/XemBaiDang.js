import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Picker,
    Image,
    Modal,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    TouchableOpacity,
    ActivityIndicator,
    AsyncStorage
} from 'react-native';
import Constants from 'expo-constants';
import ButtonComponent from '../components/ButtonComponent';
import { Ionicons, Entypo, FontAwesome } from '@expo/vector-icons';
import { MAIN_COLOR, BORDER_COLOR, TEXT_COLOR } from '../../assets/color';
import ImageViewer from 'react-native-image-zoom-viewer';
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from 'moment';
import { lstPost } from '../mockData';
import {url} from '../ultils/index';


const { height, width } = Dimensions.get('window');
export default class XemBaiDang extends Component {
    static navigationOptions = {
        title : "Chi Tiết",
        
    }

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isImageModalVisible: false,
            isFormModalVisible: false,
            isDateTimePickerVisible: false,
            indexImage: 0,
            // appiontment state
            fullname    : null,
            SDT         : null,
            choosenDate  : '',
            // post state
            postData: null,
            postID : null,
            postImage : null
        };
    }

    componentDidMount = async() => {
        const postID = await this.props.navigation.state.params.post_id;
        let dataAuthToken = await AsyncStorage.getItem("authToken");
        let authToken = await JSON.parse(dataAuthToken);
        await this.getPostData(postID, authToken);
    }
    getPostData = async(postID, authToken) => {
        return await fetch(`${url}`+ "/posts/" + `${postID}`,{
            method : 'GET',
            headers : { 
                'Authorization' : 'Bearer '+`${authToken}`
                
            }
        }).then(response => { 
                // if request success
                if(response.status === 200){
                    response.json().then(data => {
                        const postImage = data.result.room_image.map(item => {
                            return {
                                "url" : `${url}`+ "/"  + item
                            }
                        })
                        this.setState({
                            postData : data.result,
                            postImage :postImage,
                            isLoading : false
                        })
                        
                    })
                } else {
                    
                    console.log(" Response status another 200")
                }
            })
            .catch(err => {

                console.log(err);
            })
    }
    componentWillMount = () => {
        this.showModalImage(false, 0);
        this.showModalForm(false);
        this.hideDateTimePicker();
    }

    showModalImage = (visible, index) => {
        this.setState({
            isImageModalVisible: visible,
            indexImage: index
        })
    }
    showModalForm = (visible) => {
        this.setState({ isFormModalVisible: visible })
    }
    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = date => {
        this.setState({
            choosenDate : moment.utc(date).format()//'DD-MM-YYYY'
        });
        this.hideDateTimePicker();
    };

    handleModalSubmit = async() => {
        const postID        = await this.props.navigation.state.params.post_id;
        let dataUserID      = await AsyncStorage.getItem("userID");
        let userID          = await JSON.parse(dataUserID);
        let dataAuthToken   = await AsyncStorage.getItem("authToken");
        let authToken       = await JSON.parse(dataAuthToken);
        //
        const appointment = {
            appointmentDate : this.state.choosenDate, // 2018-01-30 10:26:2 -0500
            roomMaster      : this.state.postData.user._id,
            postID          : postID,
            peopleBooking   : {
                _id         : userID,
                fullname    : this.state.fullname,
                SDT         : this.state.SDT
            }
        }
        console.log(appointment)
        // post data
        fetch(`${url}`+ "/appointment",{
            method : 'POST',
            headers : { 
                'Authorization' : 'Bearer '+`${authToken}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Origin': '',   
            },
            body : JSON.stringify(appointment)
        }).then(response => {
            if(response.status === 201){
                response.json().then(result => {
                    console.log(result.message)
                })
            } else {
                response.json().then(data => {
                    console.log(data.error)
                })
                //console.log("Create appointment fail" + response.error)
            }
        }).catch(error => {
            console.log(error)
        })
        

        this.showModalForm(false);
    }

    render() {

        const { postData, postImage } = this.state
        //console.log(postData)
        return (
            this.state.isLoading
                ? <ActivityIndicator size='large' style = {{flex :1}} />
                : <KeyboardAvoidingView style={styles.container} behavior="padding" enable >

                    <ScrollView contentContainerStyle={{ marginTop: 0 }} >
                        {/* body */}
                        <View style={styles.body} >
                            <View style={styles.detailImage} >
                                {/* modal for image */}
                                <Modal
                                    visible={this.state.isImageModalVisible}
                                    transparent={false}
                                    onRequestClose={() => this.showModalImage(false, 0)} >
                                    <ImageViewer
                                        imageUrls={postImage}
                                        enableSwipeDown={true}
                                        index={this.state.indexImage}
                                        onSwipeDown={() => this.showModalImage(!this.state.isImageModalVisible)} />
                                </Modal>
                                {/* modal for form Đặt lịch ngay */}

                                <Modal
                                    visible={this.state.isFormModalVisible}
                                    transparent={true}
                                    onRequestClose={() => this.showModalForm(false)} >
                                    <View style={styles.containerModal} >
                                        <View style={styles.modal} >
                                            <View style={{
                                                flexDirection: "column"
                                            }} >
                                                <Text style={styles.smallTitle} >Họ tên</Text>
                                                <TextInput
                                                    placeholder='VD: Phùng Đại Hiệp'
                                                    placeholderTextColor='gray'
                                                    fontSize={16}
                                                    fontFamily='roboto-regular'
                                                    style={styles.textInputStyle}
                                                    onChangeText = {fullname => this.setState({fullname}) } />
                                                <View style={[styles.underLine, { width: width * 0.5 }]} ></View>
                                            </View>
                                            <View style={{ flexDirection: "column" }} >
                                                <Text style={styles.smallTitle} >Số ĐT</Text>
                                                <TextInput
                                                    placeholder='VD: 0386656556'
                                                    placeholderTextColor='gray'
                                                    fontSize={16}
                                                    fontFamily='roboto-regular'
                                                    style={styles.textInputStyle} 
                                                    onChangeText = {SDT => this.setState({SDT})}/>
                                                <View style={[styles.underLine, { width: width * 0.5 }]} ></View>
                                            </View>
                                            <View style={{ flexDirection: "column" }} >
                                                <Text style={styles.smallTitle} >Ngày giờ đặt lịch</Text>
                                                <TouchableOpacity 
                                                    onPress = {this.showDateTimePicker}
                                                    style = {styles.textInputStyle} >
                                                    <Text style = {
                                                        this.state.choosenDate != ""
                                                        ? {color : TEXT_COLOR, fontFamily : 'roboto-regular',fontSize : 16}
                                                        : {color : 'gray',fontFamily : 'roboto-regular',fontSize : 16}
                                                    } >
                                                        {
                                                            this.state.choosenDate != ""
                                                            ?  moment(this.state.choosenDate).format('DD-MM-YYYY')//'DD-MM-YYYY'
                                                            : "Nhấn để chọn ngày"
                                                            
                                                        }
                                                    </Text>
                                                </TouchableOpacity>
                                                <DateTimePicker
                                                    isVisible={this.state.isDateTimePickerVisible}
                                                    onConfirm={this.handleDatePicked}
                                                    onCancel={this.hideDateTimePicker}
                                                    mode = {'date'}
                                                    datePickerModeAndroid = {'calendar'}
                                                />
                                            </View>
                                            <View style={{
                                                flexDirection: "row",
                                                justifyContent: 'space-between',
                                                marginTop: 10
                                            }} >
                                                <ButtonComponent title="Xác nhận" onPress = {()=> this.handleModalSubmit()} />
                                                <ButtonComponent title="Hủy" onPress={() => this.showModalForm(false)} />
                                            </View>
                                        </View>
                                    </View>
                                </Modal>
                                <View style={styles.detailImageDivice} >
                                    <TouchableOpacity
                                        onPress={() => this.showModalImage(!this.state.isImageModalVisible, 0)}  >
                                        <Image style={styles.imageDivice2} source={{uri : `${url}`+ "/"  + postData.room_image[0] }} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => this.showModalImage(!this.state.isImageModalVisible, 1)}  >
                                        <Image style={styles.imageDivice2} source={{uri : `${url}`+ "/"  + postData.room_image[1] }} />
                                    </TouchableOpacity>


                                </View>
                                <View style={styles.detailImageDivice} >
                                    <TouchableOpacity
                                        onPress={() => this.showModalImage(!this.state.isImageModalVisible, 2)} >
                                        <Image style={styles.imageDivice3} source={{uri : `${url}`+ "/"  + postData.room_image[2] }} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => this.showModalImage(!this.state.isImageModalVisible, 3)} >
                                        <Image style={styles.imageDivice3} source={{uri : `${url}`+ "/"  + postData.room_image[3] }} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => this.showModalImage(!this.state.isImageModalVisible, 4)} >
                                        <Image style={styles.imageDivice3} source={{uri : `${url}`+ "/"  + postData.room_image[4] }} />
                                    </TouchableOpacity>


                                </View>
                            </View>
                            <View style={styles.infor} >
                                <Text numberOfLines={2} style={styles.title} > {postData.title} </Text>
                                <View style={styles.cell}>
                                    <View style={styles.smallCell} >
                                        <Text style={styles.smallTitle} >Loại phòng</Text>
                                        <Text style={styles.subSmallTitle} > {postData.kind_of_room} </Text>
                                    </View  >
                                    <View style={styles.smallCell} >
                                        <Text style={styles.smallTitle} >Giá phòng</Text>
                                        <Text style={styles.subSmallTitle} >{postData.room_price}/tháng </Text>
                                    </View>
                                    <View style={styles.smallCell} >
                                        <Text style={styles.smallTitle} >Diện tích</Text>
                                        <Text style={styles.subSmallTitle} > {postData.room_area} m2 </Text>
                                    </View>
                                    <View style={styles.smallCell} >
                                        <Text style={styles.smallTitle} >Đặt cọc</Text>
                                        <Text style={styles.subSmallTitle} > {postData.room_deposi}đ </Text>
                                    </View>
                                </View>
                                <View style={styles.underLine} ></View>
                                <View style={[styles.cell, { justifyContent: "space-around" }]}>
                                    <View style={styles.smallCell} >
                                        <Entypo name="light-bulb" size={32} color={TEXT_COLOR} />
                                        <Text style={styles.subSmallTitle} > {postData.electric_price} </Text>
                                    </View  >
                                    <View style={styles.smallCell} >
                                        <Ionicons name="ios-water" size={32} color={TEXT_COLOR} />
                                        <Text style={styles.subSmallTitle} >{postData.water_price} </Text>
                                    </View>
                                    <View style={styles.smallCell} >
                                        <FontAwesome name="motorcycle" size={32} color={TEXT_COLOR} />
                                        <Text style={styles.subSmallTitle} > {postData.parking_price} </Text>
                                    </View>
                                    <View style={styles.smallCell} >
                                        <FontAwesome name="wifi" size={32} color={TEXT_COLOR} />
                                        <Text style={styles.subSmallTitle} > {postData.wifi_price} </Text>
                                    </View>
                                </View>
                                <Text style={{
                                    fontSize: 18,
                                    fontFamily: 'roboto-medium', 
                                    marginHorizontal :10 
                                }}> Tiện ích </Text>
                                <View style={[styles.cell, { justifyContent: "space-around" }]} >
                                    <View style={styles.smallCell} >
                                        <Ionicons name="md-checkmark-circle" size={32} color="green" />
                                        <Text style={styles.subSmallTitle} > {postData.wifi_price} </Text>
                                    </View  >
                                    <View style={styles.smallCell} >
                                        <Ionicons name="md-checkmark-circle" size={32} color="green" />
                                        <Text style={styles.subSmallTitle} >{postData.wifi_price} </Text>
                                    </View>
                                    <View style={styles.smallCell} >
                                        <Ionicons name="md-checkmark-circle" size={32} color="green" />
                                        <Text style={styles.subSmallTitle} > {postData.wifi_price} </Text>
                                    </View>
                                    <View style={styles.smallCell} >
                                        <Ionicons name="md-checkmark-circle" size={32} color="green" />
                                        <Text style={styles.subSmallTitle} > {postData.wifi_price} </Text>
                                    </View>
                                </View>
                                <View style={styles.underLine} ></View>
                                <Text style={{
                                    fontSize: 18,
                                    fontFamily: 'roboto-medium',
                                    marginHorizontal : 10
                                     }} >Địa chỉ</Text>
                                <View style={[styles.cell, { justifyContent: "flex-start", marginLeft: 30 }]} >
                                    <Ionicons name="ios-pin" size={32} color={MAIN_COLOR} />
                                    <Text> {postData.address} </Text>
                                </View>
                                <View style={styles.underLine} ></View>
                                <Text style={{ 
                                    fontSize: 18, 
                                    fontFamily: 'roboto-medium',
                                    marginHorizontal : 10 }} >Ngày đăng</Text>
                                <View style={[styles.cell, { justifyContent: "flex-start", marginLeft: 30 }]} >
                                    <Ionicons name="ios-calendar" size={32} color={MAIN_COLOR} />
                                    <Text> {postData.day_submit} </Text>
                                </View>
                                <View style={styles.underLine} ></View>
                            </View>
                            <View style={styles.description} >

                            </View>
                        </View>

                    </ScrollView>
                    <View style={styles.bottomBar} >
                        <ButtonComponent
                            title="Đặt lịch ngay"
                            onPress={() => this.showModalForm(true)} />
                    </View>
                </KeyboardAvoidingView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //marginTop: Constants.statusBarHeight,
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
        alignItems: "center",
        marginHorizontal: 10,
        marginBottom: 30
    },
    infor: {
        flexDirection: "column",

    },
    detailImage: {
        flexDirection: "column",
        justifyContent: "center",
        marginTop: 10,
        width: width - 10,
        height: height / 2.5,
    },
    detailImageDivice: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 1.5
    },
    imageDivice2: {
        height: height / 2.5 / 2 - 10,
        width: (width - 20) / 2 - 5,
        marginHorizontal: 1.5,
        borderRadius: 10,

    },
    imageDivice3: {
        height: height / 2.5 / 2 - 10,
        width: (width - 20) / 3 - 5,
        marginHorizontal: 1.5,
        borderRadius: 10
    },
    cell: {
        marginVertical: 10,
        marginHorizontal : 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    smallCell: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // borderColor : 'black',
        // borderWidth : 1
    },
    title: {
        fontSize: 24,
        fontFamily: 'roboto-medium',
        marginVertical: 5,
        marginHorizontal : 5
    },
    smallTitle: {
        fontSize: 16
    },
    subSmallTitle: {
        fontSize: 12,
        color: MAIN_COLOR
    },
    underLine: {
        height: 2,
        width: width * 0.8,
        backgroundColor: MAIN_COLOR,
        alignSelf: "center",
        marginVertical: 10
    },
    containerModal: {
        flex: 1,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        
    },
    modal: {
        padding: 20,
        height: height / 1.8,
        width: width * 0.8,
        backgroundColor: "white",
        borderRadius : 10

    },
    textInputStyle: {
        marginHorizontal: 30,
        marginBottom: 10,
        marginTop: 5

    }

});


