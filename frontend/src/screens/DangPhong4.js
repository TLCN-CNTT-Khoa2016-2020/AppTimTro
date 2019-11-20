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
    ActivityIndicator,
    AsyncStorage
} from 'react-native';
import ButtonComponent from '../components/ButtonComponent';
import StepIndicator from '../components/StepIndicator';
import { MAIN_COLOR, BORDER_COLOR, TEXT_COLOR } from '../../assets/color';
import moment from 'moment'; 


const { height, width } = Dimensions.get('window');
export default class DangPhong4 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading       : true,
            post            : null,
            title           : null,
            day_submit      : null,
            description     : null
        };
    }
    componentDidMount = () => {
        const post = this.props.navigation.state.params.post;
        ///console.log(post)
        this.setState({
            isLoading : false,
            post
        })
    }
    handleButtonXacNhan = async() => { 
        // get userID and authToken from asyncStorege
        let dataUserID      = await AsyncStorage.getItem("userID");
        let userID          = await JSON.parse(dataUserID);
        let dataAuthToken   = await AsyncStorage.getItem("authToken");
        let authToken       = await JSON.parse(dataAuthToken);
        //get current Time
        day_submit = moment().format();
        // clone post
        const post          = this.state.post;
        post["title"]       = this.state.title;
        post["description"] = this.state.description;
        post["userId"]      = userID,
        post["day_submit"]  = day_submit
        console.log(post)
        // create fromData to create post
        let formData = new FormData();
        // append data
        formData.append("title", post.title);
        formData.append("address", post.address );
        formData.append("day_submit", post.day_submit);
        formData.append("kind_of_room", post.kind_of_room);
        formData.append("room_price", post.room_price );
        formData.append("room_area", post.room_area );
        formData.append("room_deposi", post.room_deposi );
        formData.append("electric_price", post.electric_price);
        formData.append("water_price", post.water_price);
        formData.append("parking_price", post.parking_price);
        formData.append("wifi_price", post.wifi_price);
        formData.append("gender", post.gender );
        formData.append("userId", post.userId );
        formData.append("description", post.description );
        formData.append("utilities[wc_rieng]", JSON.stringify(post.utilities.wc_rieng ));
        formData.append("utilities[an_ninh]", JSON.stringify(post.utilities.an_ninh ));
        formData.append("utilities[chu_rieng]", JSON.stringify(post.utilities.chu_rieng ));
        formData.append("utilities[tu_do]", JSON.stringify(post.utilities.tu_do ));
        formData.append("utilities[cua_so]", JSON.stringify(post.utilities.cua_so ));
        formData.append("utilities[chode_xe]", JSON.stringify(post.utilities.chode_xe ));
        formData.append("utilities[wifi]", JSON.stringify(post.utilities.wifi ));
        formData.append("utilities[may_lanh]", JSON.stringify(post.utilities.may_lanh ));
        formData.append("utilities[tu_lanh]", JSON.stringify(post.utilities.tu_lanh ));
        formData.append("utilities[may_giat]", JSON.stringify(post.utilities.may_giat ));
        formData.append("utilities[nha_bep]", JSON.stringify(post.utilities.nha_bep ));
        formData.append("utilities[thu_cung]", JSON.stringify(post.utilities.thu_cung));
        //
        post.room_image.map((item,index) => {
            let fileType = item.uri.substring(item.uri.lastIndexOf(".") + 1);
            return formData.append("room_image",{
                uri : item.uri,
                name :  item.uri ,
                type: `image/${fileType}`
            });
        })//
        formData.append("coordinates[latitude]",JSON.stringify(post.coordinates.latitude));
        formData.append("coordinates[longitude]", JSON.stringify(post.coordinates.longitude))

        console.log(formData)
        await this.props.createPost(authToken,formData, this.handleNavigateToMainScreen)

        
    }

    handleNavigateToMainScreen = () => {
        this.props.navigation.navigate('ManHinhChinh')
    }

    render() {
        return (
            this.state.isLoading 
                ? <ActivityIndicator size = 'large' style ={{flex : 1}} />
                : <KeyboardAvoidingView style={styles.container} behavior="padding" enable >
                <StepIndicator step={4} />
                <ScrollView contentContainerStyle={{ marginTop: 0 }} >
                    {/* body */}
                    <View style={styles.body} >
                        <Text style={styles.title} > Xác nhận thông tin</Text>
                        <View style={styles.cell} >
                            <Text style={styles.smallTitle} >Tiêu đề bài đăng</Text>
                            <TextInput
                                placeholder='Nhập tiêu đề'
                                placeholderTextColor='gray'
                                fontSize={16}
                                fontFamily='roboto-regular'
                                style={styles.textInputStyle}
                                onChangeText = {title => this.setState({title})} />
                            <View style={styles.underLine} ></View>
                        </View>
                        <View style={styles.cell} >
                            <Text style={styles.smallTitle} >Nội dung mô tả</Text>
                            <TextInput
                                placeholder='Mô tả'
                                placeholderTextColor='gray'
                                fontSize={16}
                                fontFamily='roboto-regular'
                                style={styles.textInputStyle}
                                onChangeText = {description => this.setState({description})} />
                            <View style={styles.underLine} ></View>
                        </View>
                    </View>

                </ScrollView>
                <View style={styles.bottomBar} >
                    <ButtonComponent
                        title="Xác nhận"
                        onPress={() => this.handleButtonXacNhan()} />
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
