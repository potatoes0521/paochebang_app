/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-11-22 16:11:20
 * @LastEditors: liuYang
 * @LastEditTime: 2019-11-24 09:40:22
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
export default class Information extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const NavigatorTab = createAppContainer(
      createMaterialTopTabNavigator({
        SellingTab: {
          screen: Selling,
          navigationOptions: {
            title: '卖板信息',
          },
        },
        VacancyTab: {
          screen: Vacancy,
          navigationOptions: {
            title: '空位信息',
          },
        },
      }),
    );
    return (
      <View style={style.pageWrapper}>
        <NavigatorTab />
      </View>
    );
  }
}
class Selling extends Component {
  render() {
    return (
      <View>
        <Text>卖板信息</Text>
      </View>
    );
  }
}
class Vacancy extends Component {
  render() {
    return (
      <View>
        <Text>空位信息</Text>
      </View>
    );
  }
}
const style = StyleSheet.create({
  pageWrapper: {
    flex: 1,
    marginTop: 30,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 2,
  },
});
