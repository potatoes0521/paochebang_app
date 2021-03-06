/*
 * @Author: liuYang
 * @description: 首页
 * @Date: 2019-11-22 16:48:04
 * @LastEditors: liuYang
 * @LastEditTime: 2020-03-25 19:07:39
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';
import {Platform} from 'react-native';
import NavigationUtil from '../navigator/NavigationUtils';
import BottomTabBarNavigator from '../navigator/BottomTabBarNavigator';
// import BackPressComponent from '../components/BackPressComponent/BackPressComponent';
import SplashScreen from 'react-native-splash-screen';
import SafeAreaViewPlus from '../components/SafeAreaViewPlus/SafeAreaViewPlus';
import Storage from '../utils/Storage.js';
import PushUtil from '../../native/PushUtil';
import Actions from '../store/action/index.js';
import api from '../api';
import FirstRegistrationPopup from '../components/FirstRegistrationPopup/FirstRegistrationPopup';

class Home extends Component {
  constructor(props) {
    super(props);
    // this.backPress = new BackPressComponent({
    //   backPress: this.onBackPress,
    // });
    console.disableYellowBox = true;
  }

  componentDidMount() {
    console.log('this.props.userInfo', this.props.userInfo);
    if (Platform.OS === 'android') {
      PushUtil.appInfo(result => {
        // console.log('result', result);
        let res = JSON.parse(result);
        this.props.changeUserInfo({
          pushToken: res.pushToken,
        });
        this.checkLoginState({
          pushToken: res.pushToken,
        });
      });
    }
    // this.backPress.componentDidMount();
  }

  componentWillUnmount() {
    // this.backPress.componentWillUnmount();
  }

  onBackPress = () => {
    const {dispatch} = this.props;
    dispatch(NavigationActions.back());
    return true;
  };
  /**
   * 获取缓存信息
   * @return void
   */
  checkLoginState(pushToken) {
    Storage.getStorage('userInfo')
      .then(res => {
        let sendData = res.data;
        this.props.changeUserInfo(sendData);
        api.user.checkToken(sendData, this).then(checkData => {
          if (!checkData.data) {
            console.log(pushToken);
            Storage.setStorage('userInfo', pushToken);
            this.props.changeUserInfo({});
            this.props.changeUserInfo(pushToken);
            console.log('this.props.userInfo', this.props.userInfo);
          }
          SplashScreen.hide();
          // NavigationUtil.resetToHomPage(this.props);
        });
      })
      .catch(() => {
        SplashScreen.hide();
        // NavigationUtil.resetToHomPage(this.props);
      });
  }
  render() {
    const {theme} = this.props;
    NavigationUtil.navigation = this.props.navigation;
    return (
      <SafeAreaViewPlus topColor={theme.themeColor}>
        <BottomTabBarNavigator {...this.props} />
        <FirstRegistrationPopup />
      </SafeAreaViewPlus>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.theme.theme,
  userInfo: state.user_info.userInfo,
});
const mapDispatchToProps = dispatch => {
  return {
    changeUserInfo: userInfo => dispatch(Actions.changeUserInfo(userInfo)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
