/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-11-22 16:47:53
 * @LastEditors: liuYang
 * @LastEditTime: 2019-11-22 16:47:57
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class Mine extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <View style={style.pageWrapper}>
        <Text>Mine</Text>
      </View>
    );
  }
}

const style = StyleSheet.create({
  pageWrapper: {
    flex: 1,
  },
});
