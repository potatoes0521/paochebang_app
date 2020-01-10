/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-11-22 16:11:20
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-01-10 10:51:14
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import NavigationUtil from '../navigator/NavigationUtils';
import SplashScreen from 'react-native-splash-screen';
import {connect} from 'react-redux';
import SafeAreaViewPlus from '../components/SafeAreaViewPlus/SafeAreaViewPlus';
import PushUtil from '../../native/PushUtil';

class WelcomePage extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    this.timer = setTimeout(() => {
      SplashScreen.hide();
      // PushUtil.appInfo(result => {
      //   console.log('result', result);
      // });
      // PushUtil.getDeviceToken().then(res => {
      //   console.log('res', res);
      // });
      // 跳转到首页
      NavigationUtil.resetToHomPage(this.props);
    }, 1000);
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  render() {
    let {theme} = this.props;
    console.log('theme', theme);
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
export default connect(mapStateToProps)(WelcomePage);

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
