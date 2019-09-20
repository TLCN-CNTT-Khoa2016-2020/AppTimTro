import React, { Component } from 'react';
import { View, Text,StyleSheet,AsyncStorage,  } from 'react-native';
import { Button } from 'react-native-elements';

export default class TaiKhoan extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  logOut = async () => {
    await AsyncStorage.removeItem('userData');
    await this.props.navigation.navigate('DangNhap');
}
  render() {  
    return (
      <View style={styles.container} >
                <Button
                    title="Logout"
                    onPress={this.logOut} >
                </Button>
            </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
  }
});
