import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	Switch,
	TouchableOpacity,
	StyleSheet,
	AsyncStorage,
	ActivityIndicator
} from 'react-native';
import { Button } from 'react-native-elements';
import Constants from 'expo-constants';
import { MAIN_COLOR, TEXT_COLOR } from '../../assets/color';
import { Ionicons, Entypo } from '@expo/vector-icons';
import {url} from '../ultils/index';

export default class TaiKhoan extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading : true,
			userID : null,
			fullname : null,
			timTroStatus : false
		};
	}


	logOut = async () => {
		await AsyncStorage.removeItem('authToken');
		await this.props.navigation.navigate('DangNhap'); 
	}
	componentDidMount = async() => {
		// get userID and authToken from asyncStorege
        let dataUserID      = await AsyncStorage.getItem("userID");
        let userID          = await JSON.parse(dataUserID);
        let dataAuthToken   = await AsyncStorage.getItem("authToken");
		let authToken       = await JSON.parse(dataAuthToken);
		await this.getUserInfor(authToken, userID, this.navigateToLoginScreen)

	}
	getUserInfor = (authToken, userID, navigateToLoginScreen) => {
		fetch(`${url}`+ "/users/" + userID,{
			method : 'GET',
			headers : {
				'Authorization' : 'Bearer '+`${authToken}`
			}
		}).then(response => {
			if(response.status === 200){
				response.json().then(data => {
					this.setState({
						userID 		: data.result.userID,
						fullname 	: data.result.fullname,
						timTroStatus: data.result.timtroStatus,
						isLoading : false	 
					})
				})
			}
			if(response.status === 401){ // token expire
				console.log("Token expire")
				navigateToLoginScreen();
			}
		}).catch(error => {
			console.log(error)
		})
	} 
	changeTimTroStatus = async(authToken,status, userID, navigateToLoginScreen) => {
		await fetch(`${url}`+ "/users/changetimtrostatus/" + userID,{
			method : 'POST',
			headers : {
				Accept: 'application/json', 
            	'Content-Type': 'application/json',
				'Authorization' : 'Bearer '+`${authToken}`
			},
			body : JSON.stringify({"status":status})
		}).then(response => {
			if(response.status === 200){
				response.json().then(data => {
					console.log(data.message)
				})
			}
			if(response.status === 401){ // token expire
				console.log("Token expire")
				navigateToLoginScreen();
			}
		}).catch(error => {
			console.log(error)
		})
	}
	navigateToLoginScreen = async() => {
        await AsyncStorage.removeItem('authToken');
        await AsyncStorage.removeItem('userID');
        await this.props.navigation.navigate('DangNhap');
	}
	handleChangeSwitchButton = async() => {
		// get userID and authToken from asyncStorege
        let dataUserID      = await AsyncStorage.getItem("userID");
        let userID          = await JSON.parse(dataUserID);
        let dataAuthToken   = await AsyncStorage.getItem("authToken");
		let authToken       = await JSON.parse(dataAuthToken);
		//
		await this.setState({timTroStatus : !this.state.timTroStatus})
		await console.log(this.state.timTroStatus)
		await this.changeTimTroStatus(authToken,this.state.timTroStatus, userID, this.navigateToLoginScreen)
	}
	render() {
		return (
			console.log(this.state.timTroStatus),
			this.state.isLoading 
				? <ActivityIndicator size = 'large' style = {{flex : 1}} />
				:<View style={styles.container} >
				<View style={styles.head} > 
					<Image
						source={require('../../assets/bg.png')}
						style={styles.image} />
					<View style={styles.infor} >
						<Text style = {styles.text} > Tên : {this.state.fullname}</Text>
						<View style={styles.timTroStatus} >
							<Text style = {styles.text} > Trạng thái tìm trọ  </Text>
							<Switch
								value = {this.state.timTroStatus}
								onValueChange = {this.handleChangeSwitchButton}
								thumbColor  = {MAIN_COLOR}
								trackColor = {{true : 'rgba(245, 102, 25, 0.3)'}}
								ios_backgroundColor = {MAIN_COLOR} 
								 />
						</View>
					</View>
				</View>
				<View style={styles.bottom} >
					<TouchableOpacity 
						style = {styles.btn}
						onPress = {()=>this.props.navigation.navigate('CaiDatTaiKhoan')} >
						<Ionicons name="ios-settings" size={38} color={TEXT_COLOR} />
						<Text style = {styles.text} > Cài đặt trạng thái tìm trọ </Text>
					</TouchableOpacity>
					<TouchableOpacity 
						style = {styles.btn}
						onPress = {()=>this.props.navigation.navigate('ThongBao')} >
						<Ionicons name="ios-settings" size={38} color={TEXT_COLOR} />
						<Text style = {styles.text} > Xem Thông Báo </Text>
					</TouchableOpacity>
					<TouchableOpacity 
						style = {styles.btn}
						onPress = {()=>this.props.navigation.navigate('LichHen')} >
						<Ionicons name="ios-settings" size={38} color={TEXT_COLOR} />
						<Text style = {styles.text} > Xem Lịch Hẹn </Text>
					</TouchableOpacity>
					<TouchableOpacity 
						style = {styles.btn}
						onPress = {this.logOut} >
						<Entypo name="log-out" size={38} color={TEXT_COLOR} />
						<Text style = {styles.text} > Đăng xuất </Text>
					</TouchableOpacity>
				</View>

			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		marginTop: Constants.statusBarHeight + 30 ,
		justifyContent: "flex-start",
	},
	image: {
		height: 120,
		width: 120,
		borderRadius: 10
	},
	text: {
		fontSize: 18,
		fontFamily: 'roboto-regular'
	},
	bottom : {
		flexDirection : "column",
		alignItems : "flex-start",
		//alignSelf : "center",
		marginTop : 30,
		marginHorizontal : 20
	},
	btn : {
		flexDirection  : "row",
		justifyContent : "flex-start",
		alignItems : "center",
		marginVertical : 5
		
	},
	head: {
		flexDirection: "row",
		justifyContent: "space-around"
	},
	timTroStatus: {
		flexDirection: "row",
		justifyContent: "space-around"
	}
});
