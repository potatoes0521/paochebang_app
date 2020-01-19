/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-11-29 11:21:26
 * @LastEditors  : liuYang
 * @LastEditTime : 2019-12-26 16:08:59
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, StatusBar} from 'react-native';

export default class SafeAreaViewPlus extends Component {
  render() {
    return (
      <SafeAreaView
        style={[styles.container, this.props.style]}
        {...this.props}>
        <StatusBar
          barStyle={'dark-content'}
          hidden={false}
          backgroundColor={'#ffffff'}
          // translucent: true,
        />
        {this.props.children}
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
