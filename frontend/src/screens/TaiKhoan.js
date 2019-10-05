import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	Switch,
	TouchableOpacity,
	StyleSheet,
	AsyncStorage,
} from 'react-native';
import { Button } from 'react-native-elements';
import Constants from 'expo-constants';
import { MAIN_COLOR, TEXT_COLOR } from '../../assets/color';
import { Ionicons, Entypo } from '@expo/vector-icons';

export default class TaiKhoan extends Component {
	constructor(props) {
		super(props);
		this.state = {
			timTroStatus : false
		};
	}


	logOut = async () => {
		await AsyncStorage.removeItem('userData');
		await this.props.navigation.navigate('DangNhap');
	}
	render() {
		return (
			<View style={styles.container} >
				<View style={styles.head} >
					<Image
						source={require('../../assets/bg.jpg')}
						style={styles.image} />
					<View style={styles.infor} >
						<Text style = {styles.text} > Tên : Võ Thị Sơn</Text>
						<Text style = {styles.text} > SĐT :  01927727338</Text>
						<View style={styles.timTroStatus} >
							<Text style = {styles.text} > Trạng thái tìm trọ  </Text>
							<Switch 
								value = {this.state.timTroStatus}
								onValueChange = {()=>this.setState({timTroStatus : !this.state.timTroStatus})}
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
