/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-11-22 16:11:20
 * @LastEditors: liuYang
 * @LastEditTime: 2019-11-22 17:40:56
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import NavigationUtil from '../navigator/NavigationUtils';

export default class WelcomePage extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    this.timer = setTimeout(() => {
      // 跳转到首页
      NavigationUtil.resetToHomPage(this.props);
    }, 3000);
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  render() {
    return (
      <View style={style.pageWrapper}>
        <Text>欢迎页</Text>
      </View>
    );
  }
}

const style = StyleSheet.create({
  pageWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
