import React, { Component } from 'react';
import { View,
		 Text,
		 ActivityIndicator,
		 FlatList ,
		 AsyncStorage
		} from 'react-native';

import CardHorizontal from '../components/CardHorizontal';
import {url} from '../ultils/index';

export default class ThongBao extends Component {
	static navigationOptions = {
        title: "Thông Báo"
    }
	constructor(props) {
		super(props);
		this.state = {
			isLoading : true,
			page : 0,
			data : []
		};
	}

	componentDidMount = async() => {
		// get userID and authToken from asyncStorege
        let dataUserID      = await AsyncStorage.getItem("userID");
        let userID          = await JSON.parse(dataUserID);
        let dataAuthToken   = await AsyncStorage.getItem("authToken");
		let authToken       = await JSON.parse(dataAuthToken);
		await this.getThongBao(authToken, userID, this.navigateToLoginScreen)
	}
	getThongBao = async(authToken, userID, navigateToLoginScreen) => {
		await fetch(`${url}`+ "/users/getnotification/get?page="+ `${this.state.page}` +"&limit=10",{
			method : 'POST',
			headers : {
				Accept: 'application/json', 
            	'Content-Type': 'application/json',
				'Authorization' : 'Bearer '+`${authToken}`
			},
			body: JSON.stringify({userID : userID})
		}).then(response => {
			console.log(response.status)
			if(response.status === 200){
				response.json().then(data => {
					this.setState({
						data : data.notification,
						page : this.state.page +1,
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
	navigateToLoginScreen = async() => {
        await AsyncStorage.removeItem('authToken');
        await AsyncStorage.removeItem('userID');
        await this.props.navigation.navigate('DangNhap');
	}

	render() {
		return (
			this.state.isLoading  
				?<ActivityIndicator size = 'large' style={{flex :1}} />
				: 
					<FlatList  
						//contentContainerStyle={styles.flatList}
						data = {this.state.data}
						renderItem = {({ item, index }) => 
							<CardHorizontal 
								item = {item}
								index = {index}
								onPress = {()=>this.props.navigation.navigate("XemBaiDang",
                                {
                                    post_id : item
                                })}
							/>
						}
						keyExtractor={(item, index) => String(index)}
						onEndReachedThreshold = {0.4}
						onEndReached = {
							this.props.isPostUnApprovedEnd    ? console.log("No more for loading !")
															  : this.loadBaiChuaDuyet
						}
					/>				
		);
	}
}
