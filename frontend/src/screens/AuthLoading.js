import React, { Component } from 'react';
import { View, Text, ActivityIndicator,AsyncStorage} from 'react-native';

export default class AuthLoading extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoading : true,
        isLogin : false,
    };
  }
  componentDidMount = async ()=>{
    try {
        this.props.navigation.navigate(this.state.isLogin ? 'tabNavigation' : 'DangNhap')
    } catch (error) {
        console.log("something went wrong" + `${error}`);
    }
  }

  render() {
    return (
      <View>
          <Text>ddd</Text>
      </View>
    );
  }
}
