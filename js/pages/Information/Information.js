/*
 * @Author: liuYang
 * @description: 市场
 * @Date: 2019-11-22 16:11:20
 * @LastEditors  : liuYang
 * @LastEditTime : 2019-12-23 15:50:11
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import {connect} from 'react-redux';
import GlobalStyles from '../../assets/css/GlobalStyles';
import NavigationBar from '../../components/NavigatorBar/NavigationBar';
import SafeAreaViewPlus from '../../components/SafeAreaViewPlus/SafeAreaViewPlus';
import SellingList from './components/SellingList.js';
import VacancyList from './components/VacancyList.js';
class Information extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const {theme, navigation} = this.props;

    const NavigatorTab = createAppContainer(
      createMaterialTopTabNavigator(
        {
          SellingTab: {
            screen: props => <SellingList {...props} />,
            navigationOptions: {
              title: '卖板信息',
            },
          },
          VacancyTab: {
            screen: props => <VacancyList {...props} />,
            navigationOptions: {
              title: '空位信息',
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
      <SafeAreaViewPlus topColor={theme.themeColor}>
        <NavigationBar
          leftViewShow={true}
          navigation={navigation}
          title={'市场信息'}
        />
        <NavigatorTab />
      </SafeAreaViewPlus>
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

const mapStateToProps = state => ({
  userInfo: state.user_info.userInfo,
  theme: state.theme.theme,
});
export default connect(mapStateToProps)(Information);
