import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SocialIcon } from 'react-native-elements';
import {OauthKey} from '../androidClientid';
import * as Expo from 'expo';
import * as Google from 'expo-google-app-auth';



export default class DangNhap extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    signInWithGoogleAsync = async() => {
        try {
          const result = await Google.logInAsync({
            androidClientId: OauthKey,
            // iosClientId: YOUR_CLIENT_ID_HERE,
            scopes: ['profile', 'email'],
          });
          console.log(result)
      
          if (result.type === 'success') {
            // return result.accessToken;
            console.log(result.accessToken)
          } else {
            // return { cancelled: true };
            console.log("cancel")
          }
        } catch (e) {
        //   return { error: true };
        console.log(e)
        }
      }

    render() {
        return (
            <View style={styles.container} >
                <SocialIcon
                    title='Sign In With Google'
                    button
                    type='google'
                    onPress = {this.signInWithGoogleAsync}
                />
            </View>


        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center"
    }
});
