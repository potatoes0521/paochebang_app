/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-11-22 16:11:20
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-01-15 17:16:32
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, View, Platform} from 'react-native';
import NavigationUtil from '../navigator/NavigationUtils';
import SplashScreen from 'react-native-splash-screen';
import {connect} from 'react-redux';
import SafeAreaViewPlus from '../components/SafeAreaViewPlus/SafeAreaViewPlus';
import PushUtil from '../../native/PushUtil';
import Actions from '../store/action/index.js';
import Storage from '../utils/Storage.js';
import api from '../api';

class WelcomePage extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    if (Platform.OS === 'android') {
      PushUtil.appInfo(result => {
        // console.log('result', result);
        let res = JSON.parse(result);
        this.props.changeUserInfo({
          pushToken: res.pushToken,
        });
        this.getStorage();
      });
    }
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }
  /**
   * 获取缓存信息
   * @return void
   */
  getStorage() {
    Storage.getStorage('userInfo')
      .then(res => {
        console.log('res', res);
        let sendData = res.data;
        api.user.checkToken(sendData, this).then(checkData => {
          console.log('res', checkData);
          if (checkData.data) {
            this.props.changeUserInfo(sendData);
          } else {
            Storage.setStorage('userInfo', {});
          }
          SplashScreen.hide();
          NavigationUtil.resetToHomPage(this.props);
        });
      })
      .catch(() => {
        SplashScreen.hide();
        NavigationUtil.resetToHomPage(this.props);
      });
  }

  render() {
    let {theme} = this.props;
    return (
      <SafeAreaViewPlus topColor={theme.themeColor}>
        <View style={styles.pageWrapper}>{/* <Text>欢迎页</Text> */}</View>
      </SafeAreaViewPlus>
    );
  }
}
const mapStateToProps = state => {
  return {
    userInfo: state.user_info.userInfo,
    theme: state.theme.theme,
  };
};
// 如果需要引入actions
const mapDispatchToProps = dispatch => {
  return {
    changeUserInfo: userInfo => dispatch(Actions.changeUserInfo(userInfo)),
  };
};
// 如果不需要引入state  connect第一个参数可以放null 第二个参数就是放 mapDispatchToProps
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WelcomePage);

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
