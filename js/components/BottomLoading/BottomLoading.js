/*
 * @Author: liuYang
 * @description: 上拉加载展示组件
 * @path: 引入路径
 * @Date: 2019-12-23 10:05:26
 * @LastEditors  : liuYang
 * @LastEditTime : 2019-12-23 16:32:55
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import GlobalStyles from '../../assets/css/GlobalStyles';

export default class BottomLoading extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <View style={styles.indicatorContainer}>
        <ActivityIndicator
          style={styles.bottomIndicator}
          size="small"
          animating={true}
          color={GlobalStyles.themeColor}
        />
        <Text style={styles.text}>正在加载更多</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  indicatorContainer: {
    flex: 1,
    alignItems: 'center',
  },
  bottomIndicator: {
    marginVertical: 10,
  },
  text: {
    fontSize: 14,
    color: GlobalStyles.themeFontColor,
    marginBottom: 10,
  },
});
