/* eslint-disable react/no-string-refs */
/*
 * @Author: guorui
 * @description: 注册
 * @Date: 2019-12-04 11:58:23
 * @LastEditors  : guorui
 * @LastEditTime : 2019-12-23 14:50:16
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import React, {Component} from 'react';
import {StyleSheet, Image, View, TextInput} from 'react-native';
import {connect} from 'react-redux';
import api from '../../api';
import Actions from '../../store/action/index.js';
import {phoneNumberPatter, verificationCodePatter} from '../../utils/patter.js';
import Button from '../../components/Button/Button.js';
import GlobalStyles from '../../assets/css/GlobalStyles';
import NavigationUtil from '../../navigator/NavigationUtils';
import LoginLogo from '../../assets/image/register/paoche_logo.png';
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
  /**
   * 输入手机号
   * @return void
   */
  inputPhoneNumber(value) {
    this.setState({
      phoneNumber: value,
    });
  }
  /**
   * 输入验证码
   * @return void
   */
  inputVerificationCode(value) {
    this.setState({
      verificationCode: value,
    });
  }
  /**
   * 获取验证码
   * @return void
   */
  getVerificationCode() {
    console.log(1);
  }
  /**
   * 提交注册
   * @return void
   */
  submitRegister() {
    let {phoneNumber, verificationCode} = this.state;
    if (!phoneNumberPatter.test(phoneNumber)) {
      this.refs.toast.show('手机号输入格式有误');
      return;
    }
    if (!verificationCodePatter.test(verificationCode)) {
      this.refs.toast.show('验证码格式有误');
      return;
    }
    this.handleRegister(phoneNumber, verificationCode);
  }
  /**
   * 注册
   * @param {Type} phoneNumber 手机号
   * @param {Type} verificationCode='' 验证码
   * @return void
   */
  handleRegister(phoneNumber, verificationCode = '') {
    let sendData = {
      mobile: phoneNumber,
      verificationCode,
      openId: this.props.userInfo.openId,
    };
    api.user.register(sendData, this).then(res => {
      let resData = Object.assign({}, res.userInfo, res.userInfoExt);
      Actions.changeUserInfo(resData);
      this.login(this.props.userInfo.openId);
    });
  }
  /**
   * 使用openID登录
   * @param {String} openid
   * @return void
   */
  login(openId = this.props.userInfo.openId) {
    let sendData = {
      token: this.props.userInfo.token,
      openId,
    };
    api.user.loginUseOpenID(sendData, this).then(res => {
      if (res) {
        let resData = Object.assign({}, res);
        if (!sendData.token || sendData.token !== resData.token) {
          // refreshToken.setNewToken(resData.token);
        }
        Actions.changeUserInfo(resData);
        // 给redux一个反应时间
        // setTimeout(() => {
        //   Taro.navigateBack()
        // }, 300)
      }
    });
  }

  render() {
    let {phoneNumber, verificationCode} = this.state;
    return (
      <View style={styles.pageWrapper}>
        <View style={styles.imgWrapper}>
          <Image source={LoginLogo} style={styles.imgStyle} />
        </View>
        <View style={styles.registerWrapper}>
          <View style={styles.inputStyle}>
            <TextInput
              style={styles.input}
              keyboardType={'number-pad'}
              placeholder="请输入手机号"
              onChangeText={this.inputPhoneNumber.bind(this)}
              value={phoneNumber}
            />
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.codeInput, styles.input]}
              keyboardType={'number-pad'}
              placeholder="请输入验证码"
              onChangeText={this.inputVerificationCode.bind(this)}
              value={verificationCode}
            />
            <Button
              btnStyle={[styles.codeBtn]}
              fontStyles={[styles.codeColor]}
              type={'plain'}
              text={'获取验证码'}
              onClick={this.getVerificationCode.bind(this)}
            />
          </View>
        </View>
        <View style={styles.registerBtn}>
          <Button
            btnStyle={[styles.btnWrapper]}
            type={'round'}
            text={'注册'}
            onClick={this.submitRegister.bind(this)}
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
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 37,
  },
  imgStyle: {
    width: 66,
    height: 66,
  },
  registerWrapper: {
    paddingHorizontal: 24,
    marginTop: 78,
  },
  inputStyle: {
    paddingHorizontal: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
  },
  input: {
    fontSize: 14,
    color: GlobalStyles.themeFontColor,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  codeInput: {
    width: 195,
  },
  codeBtn: {
    width: 104,
    height: 36,
    marginTop: 15,
    marginLeft: 10,
    borderColor: GlobalStyles.themeDisabled,
    borderRadius: 18,
  },
  codeColor: {
    color: GlobalStyles.themeDisabled,
  },
  registerBtn: {
    paddingHorizontal: 24,
    height: 40,
    marginTop: 36,
  },
  btnWrapper: {
    height: 40,
    backgroundColor: GlobalStyles.themeColor,
    borderRadius: 20,
    fontSize: 17,
    color: GlobalStyles.backgroundColor,
  },
});
// 如果需要引入store
const mapStateToProps = state => {
  return {
    userInfo: state.user_info.userInfo,
  };
};
export default connect(mapStateToProps)(Register);
