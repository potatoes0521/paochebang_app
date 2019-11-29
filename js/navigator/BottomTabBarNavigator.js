/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-11-29 11:38:36
 * @LastEditors: liuYang
 * @LastEditTime: 2019-11-29 13:59:04
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator, BottomTabBar} from 'react-navigation-tabs';
import {connect} from 'react-redux';
// import EventBus from 'react-native-event-bus';
// import EventTypes from '../util/EventTypes';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Information from '../pages/Information';
import Offer from '../pages/Offer';
import Order from '../pages/Order';
import Mine from '../pages/Mine';
const TABS = {
  Information: {
    screen: Information,
    navigationOptions: {
      tabBarLabel: '市场',
      tabBarIcon: ({tintColor, focused}) => (
        <MaterialIcons
          name={'whatshot'}
          size={26}
          style={{
            color: tintColor,
          }}
        />
      ),
    },
  },
  Offer: {
    screen: Offer,
    navigationOptions: {
      tabBarLabel: '报价/接单',
      tabBarIcon: ({tintColor, focused}) => (
        <MaterialIcons
          name={'local-offer'}
          size={26}
          style={{
            color: tintColor,
          }}
        />
      ),
    },
  },
  Order: {
    screen: Order,
    navigationOptions: {
      tabBarLabel: '订单',
      tabBarIcon: ({tintColor, focused}) => (
        <FontAwesome
          name={'reorder'}
          size={26}
          style={{
            color: tintColor,
          }}
        />
      ),
    },
  },
  Mine: {
    screen: Mine,
    navigationOptions: {
      tabBarLabel: '我的',
      tabBarIcon: ({tintColor, focused}) => (
        <SimpleLineIcons
          name={'people'}
          size={26}
          style={{
            color: tintColor,
          }}
        />
      ),
    },
  },
};
export default class BottomTabBarNavigator extends Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
  }

  _tabNavigator() {
    if (this.Tabs) {
      return this.Tabs;
    }
    return createAppContainer(
      createBottomTabNavigator(TABS, {
        tabBarComponent: TabBarComponent,
      }),
    );
  }

  render() {
    const Tab = this._tabNavigator();
    return <Tab />;
  }
}
class TabBarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.theme = {
      tintColor: props.activeTintColor,
      updateTime: new Date().getTime(),
    };
  }

  render() {
    const {routes, index} = this.props.navigation.state;
    if (routes[index].params) {
      const {theme} = routes[index].params;
      if (theme && theme.updateTime > this.theme.updateTime) {
        this.theme = theme;
      }
    }

    return (
      <BottomTabBar
        {...this.props}
        activeTintColor={this.theme.tintColor || this.props.activeTintColor}
      />
    );
  }
}
