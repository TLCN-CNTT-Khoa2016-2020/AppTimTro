import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native';
import ButtonComponent from '../components/ButtonComponent';
import StepIndicator from '../components/StepIndicator';
import {MAIN_COLOR,BORDER_COLOR, TEXT_COLOR} from '../../assets/color';


const {height, width}  = Dimensions.get('window');
export default class DangPhong4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style = {styles.container} >
                <StepIndicator step = {4} />
            <View style = {styles.bottomBar} >
                <ButtonComponent 
                  title = "Xác nhận"
                  onPress = {()=>this.props.navigation.navigate("DangPhong4")} />
            </View>
            </View>
    );
  }
}
const styles = StyleSheet.create({
  container : {
      flex : 1,
      flexDirection : "column",
      justifyContent : "center",
      //alignItems : "center"

  },
  stepIndicator : {
      position : "absolute",
      top : 10,
      left : 0
  },
  bottomBar : {
      width : width,
      height : height/11,
      backgroundColor : BORDER_COLOR,
      position : "absolute",
      bottom: 0,
      left: 0,
      flexDirection : "row",
      justifyContent : "flex-end",
      alignItems : "center",
      paddingRight : 10
  }
});
