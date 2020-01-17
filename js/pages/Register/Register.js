/*
 * @Author: guorui
 * @description: 注册
 * @Date: 2019-12-04 11:58:23
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-01-17 10:43:27
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import api from '../../api';
import {phoneNumberPatter, verificationCodePatter} from '../../utils/patter.js';
import Button from '../../components/Button/Button.js';
import GlobalStyles from '../../assets/css/GlobalStyles';
import NavigationUtil from '../../navigator/NavigationUtils';
import LoginLogo from '../../assets/image/register/paoche_logo.png';
import BackPressComponent from '../../components/BackPressComponent/BackPressComponent';
import SafeAreaViewPlus from '../../components/SafeAreaViewPlus/SafeAreaViewPlus';
import NavigationBar from '../../components/NavigatorBar/NavigationBar';
import Agreement from '../../components/Agreement/Agreement';
import Actions from '../../store/action/index.js';
import Storage from '../../utils/Storage.js';
import Toast from 'react-native-easy-toast';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countDown: 90,
      timerFlag: false,
      phoneNumber: '', //手机号
      verificationCode: '', //验证码
      visible: false,
    };
    // this.backPress = new BackPressComponent({
    //   backPress: () => this.onBackPress(),
    // });
    this.timer = null;
    this.timeout = null;
    this.toastRef = React.createRef();
  }

  componentDidMount() {
    const {navigation} = this.props;
    const {state} = navigation;
    const {params} = state;
    console.log('params', params);
    this.handelData(params);
    // this.backPress.componentDidMount();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    clearTimeout(this.timeout);
    // this.backPress.componentWillUnmount();
  }

  onBackPress() {
    if (!this.state.noBack) {
      console.log('1', 1);
      NavigationUtil.goBack(this.props.navigation);
      return true;
    }
  }
  handelData(params) {
    this.setState({
      noBack: (params && params.noBack) || false,
    });
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
    let {countDown, timerFlag, phoneNumber} = this.state;
    if (timerFlag) {
      return;
    }
    if (!phoneNumberPatter.test(phoneNumber)) {
      this.toastRef.current.show('手机号输入格式有误');
      return;
    }
    let sendData = {
      mobile: phoneNumber,
    };
    this.setState({
      timerFlag: true,
    });
    this.handleCountDown(countDown, timerFlag);
    api.user.getVerificationCode(sendData, this).then(() => {
      this.toastRef.current.show('验证码已发送');
    });
  }
  /**
   * 倒计时
   * @param {Number} countDown 倒计时的数字
   * @param {Boolean} timerFlag 倒计时的开关
   * @return void
   */
  handleCountDown(countDown, timerFlag) {
    if (timerFlag) {
      return;
    }
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      countDown -= 1;
      if (countDown <= 0) {
        countDown = 0;
        clearInterval(this.timer);
        this.setState({
          timerFlag: false,
        });
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.setState({
            countDown: 90,
          });
        }, 1000);
      } else {
        this.setState({
          countDown,
        });
      }
    }, 1000);
  }
  /**
   * 提交注册
   * @return void
   */
  submitRegister() {
    let {phoneNumber, verificationCode} = this.state;
    if (!phoneNumberPatter.test(phoneNumber)) {
      this.toastRef.current.show('手机号输入格式有误');
      return;
    }
    if (!verificationCodePatter.test(verificationCode)) {
      this.toastRef.current.show('验证码格式有误');
      return;
    }
    this.handleRegister(
      phoneNumber,
      verificationCode,
      this.props.userInfo.pushToken,
    );
  }
  /**
   * 注册
   * @param {Type} phoneNumber 手机号
   * @param {Type} verificationCode='' 验证码
   * @return void
   */
  handleRegister(phoneNumber, verificationCode = '', pushToken) {
    let sendData = {
      mobile: phoneNumber,
      verificationCode,
      pushToken,
    };
    api.user.register(sendData, this).then(res => {
      this.toastRef.current.show('登录成功');
      Storage.setStorage('userInfo', res.data);
      this.props.changeUserInfo(res.data);
      NavigationUtil.goBack(this.props.navigation);
    });
  }
  /**
   * 打开用户协议
   * @return void
   */
  showRegistrationAgreement() {
    this.setState({
      visible: true,
    });
  }
  /**
   * 关闭用户协议
   * @return void
   */
  closeRegistrationAgreement() {
    this.setState({
      visible: false,
    });
  }

  render() {
    let {
      phoneNumber,
      verificationCode,
      timerFlag,
      countDown,
      visible,
      noBack,
    } = this.state;
    let btnBorderStyle = [styles.codeBtn];
    let btnTextStyle = [styles.codeColor];
    if (timerFlag) {
      btnBorderStyle.push(styles.borderStyle);
      btnTextStyle.push(styles.textStyle);
    }
    const {theme, navigation} = this.props;
    return (
      <SafeAreaViewPlus topColor={theme.themeColor}>
        <View style={styles.pageWrapper}>
          <NavigationBar
            navigation={navigation}
            leftViewShow={!noBack}
            title={'跑车帮'}
          />
          <View style={styles.imgWrapper}>
            <Image source={LoginLogo} style={styles.imgStyle} />
          </View>
          <View style={styles.registerWrapper}>
            <View style={styles.inputStyle}>
              <TextInput
                style={styles.input}
                keyboardType={'number-pad'}
                maxLength={11}
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
                maxLength={6}
                onChangeText={this.inputVerificationCode.bind(this)}
                value={verificationCode}
              />
              <TouchableOpacity onPress={this.getVerificationCode.bind(this)}>
                <View style={btnBorderStyle}>
                  <Text style={btnTextStyle}>
                    {!timerFlag ? '获取验证码' : `${countDown}S后重试`}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.registerBtn}>
            <Button
              btnStyle={[styles.btnWrapper]}
              type={'round'}
              text={'同意协议并登录'}
              onClick={this.submitRegister.bind(this)}
            />
          </View>
          <View style={styles.agreementTips}>
            <Text style={styles.tipsStyle}>我已阅读并同意跑车帮</Text>
            <TouchableOpacity
              onPress={this.showRegistrationAgreement.bind(this)}>
              <Text style={styles.themeColor}>注册服务协议</Text>
            </TouchableOpacity>
          </View>
          <Toast
            ref={this.toastRef}
            position={'center'}
            defaultCloseDelay={3000}
          />
          <Agreement
            visible={visible}
            onClick={this.closeRegistrationAgreement.bind(this)}
          />
        </View>
      </SafeAreaViewPlus>
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
    flex: 1,
  },
  codeBtn: {
    width: 104,
    height: 36,
    marginTop: 15,
    marginLeft: 10,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: GlobalStyles.themeColor,
    borderRadius: 18,
  },
  codeColor: {
    fontSize: 14,
    color: GlobalStyles.themeColor,
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
    color: '#fff',
  },
  borderStyle: {
    borderColor: GlobalStyles.themeDisabled,
  },
  textStyle: {
    color: GlobalStyles.themeDisabled,
  },
  agreementTips: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 32,
    marginTop: 8,
  },
  tipsStyle: {
    fontSize: 12,
    color: GlobalStyles.themeFontColor,
  },
  themeColor: {
    fontSize: 12,
    color: GlobalStyles.themeColor,
  },
});
const mapStateToProps = state => {
  return {
    userInfo: state.user_info.userInfo,
    theme: state.theme.theme,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    changeUserInfo: userInfo => dispatch(Actions.changeUserInfo(userInfo)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Register);
