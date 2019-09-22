import React, { Component } from 'react';
import { View, Text, ActivityIndicator, AsyncStorage } from 'react-native';
import { AppLoading} from 'expo';
import { Asset} from 'expo-asset';
import * as Font from 'expo-font';

function cacheImages(images) {
    return images.map(image => {
      if (typeof image === 'string') {
        return Image.prefetch(image);
      } else {
        return Asset.fromModule(image).downloadAsync();
      }
    });
  }
export default class AuthLoading extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isReady : false,
            userData: {}
        };
    }
    async _loadAssetsAsync() {
        const imageAssets = cacheImages([
            require('../../assets/orange.jpg')
        ]);
        await Promise.all([...imageAssets]);
      }
    componentDidMount = async () => {
        try {
            let userData = await AsyncStorage.getItem("userData");
            let data = await JSON.parse(userData);
            await Font.loadAsync({
              'roboto-regular' : require('../../assets/fonts/Roboto-Regular.ttf'),
              'roboto-medium' : require('../../assets/fonts/Roboto-Medium.ttf')
            });
            this.setState({
                userData: data,
                isLoading: false
            })
            this.props.navigation.navigate(userData ? 'tabNavigation' : 'DangNhap')
        } catch (error) {
            console.log("something went wrong" + `${error}`);
        }
    }

    render() {
        if (!this.state.isReady) {
            return (
              <AppLoading
                startAsync={this._loadAssetsAsync}
                onFinish={() => this.setState({ isReady: true })}
                onError={console.warn}
              />
            );
          }
        return (
            <View>
                <Text>ddd</Text>
            </View>
        );
    }
}
