/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-11-22 16:11:20
 * @LastEditors  : guorui
 * @LastEditTime : 2020-01-14 14:54:25
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View, Platform} from 'react-native';
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
    this.timer = setTimeout(() => {
      SplashScreen.hide();
      // console.log('Dimensions', Platform);
      if (Platform.OS === 'android') {
        PushUtil.appInfo(result => {
          // console.log('result', result);
          let res = JSON.parse(result);
          Storage.getStorage('userInfo')
            .then(response => {
              let sendData = response.data.data;
              api.user.checkToken(sendData, this).then(resInfo => {
                if (resInfo.data) {
                  let resData = Object.assign({}, resInfo.data);
                  Actions.changeUserInfo(resData);
                } else {
                  NavigationUtil.resetToHomPage(this.props);
                }
              });
            })
            .catch(() => {
              NavigationUtil.resetToHomPage(this.props);
            });
          this.props.changeUserInfo({
            deviceToken: 'deviceToken',
            pushToken: res.pushToken,
          });
          // 跳转到首页
          NavigationUtil.resetToHomPage(this.props);
        });
      }
    }, 1000);
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  render() {
    let {theme} = this.props;
    return (
      <SafeAreaViewPlus topColor={theme.themeColor}>
        <View style={styles.pageWrapper}>
          <Text>欢迎页</Text>
        </View>
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
