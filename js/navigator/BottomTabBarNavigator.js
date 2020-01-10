/*
 * @Author: liuYang
 * @description: 底部tabBar
 * @Date: 2019-11-29 11:38:36
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-01-10 10:53:47
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, Text} from 'react-native';
import {createAppContainer} from 'react-navigation';
// BottomTabBar
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {connect} from 'react-redux';
// import EventBus from 'react-native-event-bus';
// import EventTypes from '../util/EventTypes';
import LinearGradient from 'react-native-linear-gradient';

import Index from '../pages/Index/Index';
import Offer from '../pages/Offer/Offer';
import Order from '../pages/Order/Order';
import Mine from '../pages/Mine/Mine';
// import PublishPage from '../pages/Publish/Publish.js';
import GlobalStyles from '../assets/css/GlobalStyles';
const styles = StyleSheet.create({
  icon: {
    fontSize: 28,
    fontFamily: 'iconfont',
  },
  publishIcon: {
    backgroundColor: 'green',
    width: 54,
    height: 54,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 27,
    borderWidth: 5,
    borderColor: '#fff',
  },
  publishIconText: {
    color: '#fff',
    fontSize: 21,
  },
});

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
      createBottomTabNavigator(
        {
          Index: {
            screen: Index,
            navigationOptions: {
              tabBarLabel: '市场',
              tabBarIcon: ({tintColor, focused}) => (
                <Text style={[styles.icon, {color: tintColor}]}>&#xe60a;</Text>
              ),
            },
          },
          Offer: {
            screen: Offer,
            navigationOptions: {
              tabBarLabel: '报价/接单',
              tabBarIcon: ({tintColor, focused}) => (
                <Text style={[styles.icon, {color: tintColor}]}>&#xe607;</Text>
              ),
            },
          },
          Publish: {
            screen: Index,
            navigationOptions: {
              title: '',
              tabBarLabel: '',
              tabBarIcon: ({tintColor, focused}) => (
                <LinearGradient
                  colors={['#FAD961', '#FF9A03', '#F76B1C']}
                  style={styles.publishIcon}>
                  <Text style={[styles.icon, styles.publishIconText]}>
                    &#xe668;
                  </Text>
                </LinearGradient>
              ),
              tabBarOnPress: ({props}) => {
                if (global.signInStatus) {
                  this.props.navigation.navigate('PublishPage');
                } else {
                  this.props.navigation.navigate('PublishPage');
                }
              },
            },
          },
          Order: {
            screen: Order,
            navigationOptions: {
              tabBarLabel: '订单',
              tabBarIcon: ({tintColor, focused}) => (
                <Text style={[styles.icon, {color: tintColor}]}>&#xe606;</Text>
              ),
            },
          },
          Mine: {
            screen: Mine,
            navigationOptions: {
              tabBarLabel: '我的',
              tabBarIcon: ({tintColor, focused}) => (
                <Text style={[styles.icon, {color: tintColor}]}>&#xe605;</Text>
              ),
            },
          },
        },
        {
          tabBarOptions: {
            activeTintColor: GlobalStyles.themeColor,
            inactiveTintColor: GlobalStyles.themeHColor,
            style: {
              height: 50,
              borderTopWidth: 0,
            },
          },
          // tabBarComponent: props => {
          //   return (
          //     <TabBarComponent {...props} theme={this.props.theme.themeColor} />
          //   );
          // },
        },
      ),
    ));
  }

  render() {
    const Tab = this._tabNavigator();
    return <Tab />;
  }
}

// class TabBarComponent extends React.Component {
//   render() {
//     console.log('this.props', this.props);
//     return <BottomTabBar {...this.props} activeTintColor={this.props.theme} />;
//   }
// }

// 如果需要引入store
const mapStateToProps = state => {
  return {
    userInfo: state.user_info.userInfo,
    theme: state.theme.theme,
  };
};
export default connect(mapStateToProps)(BottomTabBarNavigator);
