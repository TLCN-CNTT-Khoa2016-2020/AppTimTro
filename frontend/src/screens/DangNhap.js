import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    AsyncStorage,
    Dimensions,
    TextInput,
    KeyboardAvoidingView,
    TouchableOpacity
} from 'react-native';
import Svg, { Image, Circle, ClipPath } from 'react-native-svg';
import { SocialIcon, Icon } from 'react-native-elements'
import Animated, { Easing } from 'react-native-reanimated';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import { OauthKey } from '../androidClientid';
import * as Google from 'expo-google-app-auth';

const { width, height } = Dimensions.get('window');
const {
    Value,
    event,
    block,
    cond,
    eq,
    set,
    Clock,
    startClock,
    stopClock,
    debug,
    timing,
    clockRunning,
    interpolate,
    Extrapolate,
    concat
} = Animated;
function runTiming(clock, value, dest) {
    const state = {
        finished: new Value(0),
        position: new Value(0),
        time: new Value(0),
        frameTime: new Value(0)
    };

    const config = {
        duration: 1000,
        toValue: new Value(0),
        easing: Easing.inOut(Easing.ease)
    };

    return block([
        cond(clockRunning(clock), 0, [
            set(state.finished, 0),
            set(state.time, 0),
            set(state.position, value),
            set(state.frameTime, 0),
            set(config.toValue, dest),
            startClock(clock)
        ]),
        timing(clock, state, config),
        cond(state.finished, debug('stop clock', stopClock(clock))),
        state.position
    ]);
}



export default class DangNhap extends Component {
    constructor(props) {
        super(props);
        this.buttonOpacity = new Value(1);
        this.onStateChange = event([
            {
                nativeEvent: ({ state }) =>
                    block([
                        cond(
                            eq(state, State.END),
                            set(this.buttonOpacity, runTiming(new Clock(), 1, 0))
                        )
                    ])
            }
        ]);
        this.onCloseState = event([
            {
                nativeEvent: ({ state }) =>
                    block([
                        cond(
                            eq(state, State.END),
                            set(this.buttonOpacity, runTiming(new Clock(), 0, 1))
                        )
                    ])
            }
        ]);

        this.buttonY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [100, 0],
            extrapolate: Extrapolate.CLAMP
        });

        this.bgY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [-height / 3 - 70, 0],
            extrapolate: Extrapolate.CLAMP
        });
        this.textInputZindex = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [1, -1],
            extrapolate: Extrapolate.CLAMP
        });
        this.textInputY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [0, 100],
            extrapolate: Extrapolate.CLAMP
        });
        this.textInputOpacity = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [1, 0],
            extrapolate: Extrapolate.CLAMP
        });
        this.rotateCross = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [180, 360],
            extrapolate: Extrapolate.CLAMP
        });

        this.state = {
            isLogin: false,
            username : '',
            password : ''

        };
    }


    storeLogin = async (user) => {
        try {
            await AsyncStorage.setItem('userData', JSON.stringify(user));
        } catch (error) {
            console.log(error)
        }
    };

    signInWithGoogleAsync = async () => {
        try {
            const result = await Google.logInAsync({
                androidClientId: OauthKey,
                // iosClientId: YOUR_CLIENT_ID_HERE,
                scopes: ['profile', 'email'],
            });
            console.log(result)

            if (result.type === 'success') {
                 await this.props.loginUserWithGG(result.user.id,result.accessToken, this.navigateToMainScreen)
            } else {
                // return { cancelled: true };
                console.log("cancel")
            }
        } catch (e) {
            //   return { error: true };
            console.log(e)
        }
    }

    handleSubmit = () => { 
        this.props.loginUser(this.state.username, this.state.password , this.navigateToMainScreen);
    }
    navigateToMainScreen = async (data) => {
        try {
            await AsyncStorage.setItem('userID', JSON.stringify(data.userID));
            await AsyncStorage.setItem('authToken', JSON.stringify(data.token));
            await this.props.navigation.navigate('tabNavigation');
        } catch(error) {
            console.log("Something went wrong", error);
        }
    }

    render() {

        return (
            <KeyboardAvoidingView
                style={{
                    flex: 1,
                    backgroundColor: 'white',
                    justifyContent: 'flex-end'
                }}
                behavior="height" enabled>
                <Animated.View
                    style={{
                        ...StyleSheet.absoluteFill,
                        transform: [{ translateY: this.bgY }]
                    }}>
                    <Svg height={height + 80} width={width} >
                        <ClipPath id="clip" >
                            <Circle r={height + 80} cx={width / 2} />
                        </ClipPath>
                        <Image
                            href={require('../../assets/orange.jpg')}
                            width={width}
                            height={height + 80}
                            preserveAspectRatio="xMidYMid slice "
                            clipPath="url(#clip)"
                        />
                    </Svg>
                </Animated.View>
                <View style={{ height: height / 3, justifyContent: 'center' }}>
                    <TapGestureHandler onHandlerStateChange={this.onStateChange}>
                        <Animated.View
                            style={{
                                ...styles.button,
                                opacity: this.buttonOpacity,
                                transform: [{ translateY: this.buttonY }]
                            }}>
                            <Text style={{ color: '#F56619', fontSize: 20, fontWeight: 'bold' }}>SIGN IN</Text>
                        </Animated.View>
                    </TapGestureHandler>
                    <Animated.View
                        style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>

                        <Animated.View
                            style={{
                                ...styles.circleButton,
                                opacity: this.buttonOpacity,
                                transform: [{ translateY: this.buttonY }]
                            }}>
                            <TouchableOpacity onPress={this.signInWithGoogleAsync} >
                                {/* <SocialIcon
                                    type='google'
                                /> */}
                            </TouchableOpacity>

                        </Animated.View>
                        <Animated.View
                            style={{
                                ...styles.circleButton,
                                opacity: this.buttonOpacity,
                                transform: [{ translateY: this.buttonY }]
                            }}>
                            <TouchableOpacity onPress={this.signInWithGoogleAsync} >
                                {/* <SocialIcon
                                    type='facebook'
                                /> */}
                            </TouchableOpacity>

                        </Animated.View>
                        <Animated.View
                            style={{
                                ...styles.circleButton,
                                opacity: this.buttonOpacity,
                                transform: [{ translateY: this.buttonY }]
                            }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('DangKi')} >
                                {/* <Icon
                                    reverse
                                    name='ios-add-circle'
                                    type='ionicon'
                                    color='#517fa4'
                                /> */}
                            </TouchableOpacity>

                        </Animated.View>

                    </Animated.View>



                    <Animated.View
                        style={{
                            zIndex: this.textInputZindex,
                            opacity: this.textInputOpacity,
                            transform: [{ translateY: this.textInputY }],
                            height: height / 3,
                            ...StyleSheet.absoluteFill,
                            top: null,
                            justifyContent: "center"
                        }} >
                        <TapGestureHandler onHandlerStateChange={this.onCloseState} >
                            <Animated.View style={styles.closeButton} >
                                <Animated.Text
                                    style={{
                                        fontSize: 15,
                                        transform: [{ rotate: concat(this.rotateCross, 'deg') }]
                                    }}>
                                    X
                                </Animated.Text>
                            </Animated.View>
                        </TapGestureHandler>
                        <View style={styles.wrapTextInput} >
                            <TextInput
                                placeholder="USERNAME"
                                style={styles.textInput}
                                placeholderTextColor='gray'
                                onChangeText = {(username) => this.setState({username})} />
                        </View>
                        <View style={styles.wrapTextInput} >
                            <TextInput
                                secureTextEntry={true}
                                placeholder="PASSWORD"
                                style={styles.textInput}
                                placeholderTextColor='gray'
                                onChangeText = {(password) => this.setState({password}) } />
                        </View>


                        <Animated.View style={styles.button} >
                            <TouchableOpacity onPress = {this.handleSubmit} >
                                <Text
                                    style={{ color: '#F56619', fontSize: 20, fontWeight: 'bold' }} >
                                    SIGN IN 
                            </Text>
                            </TouchableOpacity>

                        </Animated.View>
                    </Animated.View>
                </View>
            </KeyboardAvoidingView>


        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        backgroundColor: 'white',
        height: 50,
        marginHorizontal: 20,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
    circleButton: {
        backgroundColor: 'white',
        marginHorizontal: 20,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
    wrapTextInput: {
        backgroundColor: 'white',
        height: 50,
        borderRadius: 25,
        borderWidth: 0.5,
        marginHorizontal: 20,
        marginVertical: 5,
        borderColor: 'rgba(0,0,0,0.2)',
    },
    textInput: {
        height: 50,
        borderRadius: 25,
        borderWidth: 0.5,
        paddingLeft: 10,
        borderColor: 'rgba(0,0,0,0.2)',
        color: '#000'
    },
    closeButton: {
        height: 40,
        width: 40,
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: -30,
        left: width / 2 - 20,
        shadowColor: "#F56619",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    }
});
