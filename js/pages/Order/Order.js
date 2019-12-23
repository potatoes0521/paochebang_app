/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-11-22 16:47:02
 * @LastEditors  : liuYang
 * @LastEditTime : 2019-12-23 13:57:51
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import NavigationBar from '../../components/NavigatorBar/NavigationBar';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import GlobalStyles from '../../assets/css/GlobalStyles';
import OrderList from './components/OrderList.js';

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const NavigatorTab = createAppContainer(
      createMaterialTopTabNavigator(
        {
          WaitingOrderTab: {
            screen: props => <OrderList {...props} status={10} />,
            navigationOptions: {
              title: '待提车',
            },
          },
          PendingOrderTab: {
            screen: props => <OrderList {...props} status={20} />,
            navigationOptions: {
              title: '待交车',
            },
          },
          AllOrderTab: {
            screen: props => <OrderList {...props} />,
            navigationOptions: {
              title: '全部',
            },
          },
        },
        {
          tabBarOptions: {
            tabStyle: styles.tabStyle,
            activeTintColor: GlobalStyles.themeColor,
            inactiveTintColor: GlobalStyles.themeFontColor,
            style: {
              backgroundColor: '#fff', //TabBar 的背景颜色
              height: 44,
              borderRightWidth: 0,
              borderBottomWidth: 0,
              marginBottom: 10,
            },
            indicatorStyle: styles.indicatorStyle, //标签指示器的样式
            labelStyle: styles.labelStyle, //文字的样式
            lazy: true,
          },
        },
      ),
    );
    return (
      <View style={styles.pageWrapper}>
        <NavigationBar title={'我的订单'} />
        <NavigatorTab />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  tabStyle: {
    borderBottomColor: GlobalStyles.themeColor,
    borderBottomWidth: 2,
    height: 44,
  },
  labelStyle: {
    fontSize: 16,
    fontWeight: '700',
  },
  indicatorStyle: {
    height: 3,
    // width: 60,
    // marginHorizontal: 30,
    backgroundColor: GlobalStyles.themeColor,
  },
});
// 如果需要引入store
const mapStateToProps = state => {
  return {
    userInfo: state.user_info.userInfo,
  };
};
export default connect(mapStateToProps)(Order);
