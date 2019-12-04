/*
 * @Author: guorui
 * @description: 注册
 * @Date: 2019-12-04 11:58:23
 * @LastEditors: guorui
 * @LastEditTime: 2019-12-04 14:58:40
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import React, {Component} from 'react';
import {Button, StyleSheet, Image, View, TextInput} from 'react-native';
import {connect} from 'react-redux';
import GlobalStyles from '../../assets/css/GlobalStyles';
import NavigationUtil from '../../navigator/NavigationUtils';
import BackPressComponent from '../../components/BackPressComponent/BackPressComponent';
// import NavigationBar from '../../components/NavigatorBar/NavigationBar';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '', //手机号
      verificationCode: '', //验证码
    };
    this.backPress = new BackPressComponent({
      backPress: () => this.onBackPress(),
    });
  }

  componentDidMount() {
    this.backPress.componentDidMount();
  }

  componentWillUnmount() {
    this.backPress.componentWillUnmount();
  }

  onBackPress() {
    NavigationUtil.goBack(this.props.navigation);
    return true;
  }

  render() {
    return (
      <View style={styles.pageWrapper}>
        <View style={styles.imgWrapper}>
          <Image
            source={{uri: 'assets:/paoche_logo.png'}}
            style={styles.imgStyle}
          />
        </View>
        <View style={styles.registerWrapper}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              onChangeText={text => {
                this.phoneNumber = text;
              }}
            />
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              onChangeText={text => {
                this.verificationCode = text;
              }}
            />
            <Button
              title="获取验证码"
              onPress={() => {
                this.getVerificationCode();
              }}
            />
          </View>
          <Button
            style={styles.btnWrapper}
            title="登录"
            onPress={() => {
              this.submitRegister();
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
  },
  imgWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 74,
  },
  imgStyle: {
    width: 132,
    height: 132,
  },
  registerWrapper: {
    marginTop: 104,
  },
  inputWrapper: {
    width: 640,
    height: 100,
  },
  input: {
    fontSize: 28,
    color: GlobalStyles.themeFontColor,
  },
  btnWrapper: {
    width: 654,
    height: 80,
    backgroundColor: GlobalStyles.themeColor,
    borderRadius: 40,
    fontSize: 34,
    textAlign: 'center',
    lineHeight: 80,
    color: '#FFFFFF',
  },
});
// 如果需要引入store
const mapStateToProps = state => {
  return {
    userInfo: state.user_info.userInfo,
  };
};
export default connect(mapStateToProps)(Register);
