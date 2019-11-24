/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-11-22 13:51:52
 * @LastEditors: liuYang
 * @LastEditTime: 2019-11-24 10:44:20
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import AppNavigators from './navigator/AppNavigators';
import store from './store';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigators />
      </Provider>
    );
  }
}
