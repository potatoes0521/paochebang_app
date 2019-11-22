/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-11-22 16:48:04
 * @LastEditors: liuYang
 * @LastEditTime: 2019-11-22 21:55:38
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Information from './Information';
import Offer from './Offer';
import Order from './Order';
import Mine from './Mine';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  _tabNavigator() {
    return createAppContainer(
      createBottomTabNavigator({
        Information: {
          screen: Information,
          navigationOptions: {
            tavBarLabel: '市场',
            tabBarIcon: ({tintColor, focused}) => {
              <AntDesign name={'home'} size={26} style={{color: tintColor}} />;
            },
          },
        },
        Offer: {
          screen: Offer,
          navigationOptions: {
            tavBarLabel: '报价/接单',
            tabBarIcon: ({tintColor, focused}) => {
              <MaterialIcons
                name={'local-offer'}
                size={26}
                style={{color: tintColor}}
              />;
            },
          },
        },
        Order: {
          screen: Order,
          navigationOptions: {
            tavBarLabel: '订单',
            tabBarIcon: ({tintColor, focused}) => {
              <FontAwesome
                name={'reorder'}
                size={26}
                style={{color: tintColor}}
              />;
            },
          },
        },
        Mine: {
          screen: Mine,
          navigationOptions: {
            tavBarLabel: '我的',
            tabBarIcon: ({tintColor, focused}) => {
              <SimpleLineIcons
                name={'people'}
                size={26}
                style={{color: tintColor}}
              />;
            },
          },
        },
      }),
    );
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const Tab = this._tabNavigator();
    return <Tab />;
  }
}
