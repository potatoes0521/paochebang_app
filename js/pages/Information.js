/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-11-22 16:11:20
 * @LastEditors: liuYang
 * @LastEditTime: 2019-11-22 17:05:19
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class Information extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <View style={style.pageWrapper}>
        <Text />
      </View>
    );
  }
}

const style = StyleSheet.create({
  pageWrapper: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 2,
  },
});
