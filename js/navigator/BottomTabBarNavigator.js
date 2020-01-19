/*
 * @Author: liuYang
 * @description: 底部tabBar
 * @Date: 2019-11-29 11:38:36
 * @LastEditors: liuYang
 * @LastEditTime: 2019-11-30 11:23:04
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

import Index from '../pages/Index/Index';
import Offer from '../pages/Offer';
import Order from '../pages/Order';
import Mine from '../pages/Mine/Mine';
const TABS = {
  Index: {
    screen: Index,
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
class BottomTabBarNavigator extends Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
  }

  _tabNavigator() {
    if (this.Tabs) {
      return this.Tabs;
    }
    return (this.Tabs = createAppContainer(
      createBottomTabNavigator(TABS, {
        tabBarComponent: props => {
          return (
            <TabBarComponent {...props} theme={this.props.theme.themeColor} />
          );
        },
      }),
    ));
  }

  render() {
    const Tab = this._tabNavigator();
    return <Tab />;
  }
}
class TabBarComponent extends React.Component {
  render() {
    return <BottomTabBar {...this.props} activeTintColor={this.props.theme} />;
  }
}

// 如果需要引入store
const mapStateToProps = state => {
  return {
    // userInfo: state.user_msg.userInfo,
    theme: state.theme.theme,
  };
};
export default connect(mapStateToProps)(BottomTabBarNavigator);
