/*
 * @Author: liuYang
 * @description: 页面/navigator配置
 * @Date: 2019-11-22 16:52:09
 * @LastEditors  : guorui
 * @LastEditTime : 2019-12-25 13:11:04
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import WelcomePage from '../pages/WelcomePage';
import HomePage from '../pages/Home';
import OfferDetailsPage from '../pages/OfferDetails/OfferDetails';
import DriverPage from '../pages/Driver/Driver';
import InformationPage from '../pages/Information/Information';
import SellingDetailsPage from '../pages/SellingDetails/SellingDetails';
import VacancyDetailsPage from '../pages/VacancyDetails/VacancyDetails';

export const rootCom = 'Init'; //设置根路由，对应RootNavigator中第一个初始化的路由名

const InitNavigator = createStackNavigator({
  WelcomePage: {
    // screen: WelcomePage,
    screen: DriverPage, // 调试界面可以吧这个写成你调试的界面 不用一直一级一级点进去
    navigationOptions: {
      header: null, // 隐藏头部
    },
  },
});

const MainNavigator = createStackNavigator(
  {
    HomePage: {
      screen: HomePage,
      navigationOptions: {
        header: null, // 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
      },
    },
    // 询价/报价详情
    OfferDetailsPage: {
      screen: OfferDetailsPage,
      navigationOptions: {
        header: null,
      },
    },
    // 市场信息
    InformationPage: {
      screen: InformationPage,
      navigationOptions: {
        header: null,
      },
    },
    // 卖板详情
    SellingDetailsPage: {
      screen: SellingDetailsPage,
      navigationOptions: {
        header: null,
      },
    },
    // 空位详情
    VacancyDetailsPage: {
      screen: VacancyDetailsPage,
      navigationOptions: {
        header: null,
      },
    },
    DriverPage: {
      screen: DriverPage,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  },
);

export default createAppContainer(
  createSwitchNavigator(
    {
      [rootCom]: InitNavigator,
      Main: MainNavigator,
    },
    {
      navigationOptions: {
        header: null,
      },
    },
  ),
);
