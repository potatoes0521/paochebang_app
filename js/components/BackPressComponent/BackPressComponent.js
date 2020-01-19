/*
 * @Author: liuYang
 * @description: 处理安卓物理返回键
 * @Date: 2019-11-25 16:29:01
 * @LastEditors: liuYang
 * @LastEditTime: 2019-11-29 11:22:55
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
// eslint-disable-next-line no-unused-vars
import React, {PropTypes} from 'react';
import {BackHandler} from 'react-native';

export default class BackPressComponent {
  constructor(props) {
    this._hardwareBackPress = this.onHardwareBackPress.bind(this);
    this.props = props;
  }

  componentDidMount() {
    if (this.props.backPress) {
      BackHandler.addEventListener(
        'hardwareBackPress',
        this._hardwareBackPress,
      );
    }
  }

  componentWillUnmount() {
    if (this.props.backPress) {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        this._hardwareBackPress,
      );
    }
  }

  onHardwareBackPress(e) {
    return this.props.backPress(e);
  }
}
