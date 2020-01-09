/*
 * @Author: liuYang
 * @description: 页面/navigator配置
 * @Date: 2019-11-22 16:52:09
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-01-09 18:30:45
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import WelcomePage from '../pages/WelcomePage';
import HomePage from '../pages/Home';
import OfferDetailsPage from '../pages/OfferDetails/OfferDetails';
import OrderDetailsPage from '../pages/OrderDetails/OrderDetails';
import AccountPage from '../pages/Account/Account';
import CashPage from '../pages/Cash/Cash';
import DriverPage from '../pages/Driver/Driver';
import DriverDetailsPage from '../pages/DriverDetails/DriverDetails';
import DriverEditPage from '../pages/DriverEdit/DriverEdit';
import DriverConfirmPage from '../pages/DriverConfirm/DriverConfirm';
import MineEditPage from '../pages/MineEdit/MineEdit';
import RegisterPage from '../pages/Register/Register';
import AuthenticationPage from '../pages/Authentication/Authentication';
import MineDetailsPage from '../pages/MineDetails/MineDetails';
import InformationPage from '../pages/Information/Information';
import SellingDetailsPage from '../pages/SellingDetails/SellingDetails';
import VacancyDetailsPage from '../pages/VacancyDetails/VacancyDetails';
import MainPublishPage from '../pages/MainPublish/MainPublish';
import LinePage from '../pages/Line/Line';
import LineEditPage from '../pages/LineEdit/LineEdit';
import ChooseCityPage from '../pages/ChooseCity/ChooseCity';
import UploadImagePage from '../pages/UploadImage/UploadImage.js';
import SellingPublishPage from '../pages/SellingPublish/SellingPublish.js';
import VacancyPublishPage from '../pages/VacancyPublish/VacancyPublish.js';
import RemarkPage from '../pages/Remark/Remark';
export const rootCom = 'Init'; //设置根路由，对应RootNavigator中第一个初始化的路由名

const InitNavigator = createStackNavigator({
  WelcomePage: {
    screen: WelcomePage,
    // screen: UploadImagePage, // 调试界面可以吧这个写成你调试的界面 不用一直一级一级点进去
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
    // 询价/报价详情
    OrderDetailsPage: {
      screen: OrderDetailsPage,
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
    // 发布卖板
    SellingPublishPage: {
      screen: SellingPublishPage,
      navigationOptions: {
        header: null,
      },
    },
    // 发布空位
    VacancyPublishPage: {
      screen: VacancyPublishPage,
      navigationOptions: {
        header: null,
      },
    },
    //注册页
    RegisterPage: {
      screen: RegisterPage,
      navigationOptions: {
        header: null,
      },
    },
    //司机信息
    DriverDetailsPage: {
      screen: DriverDetailsPage,
      navigationOptions: {
        header: null,
      },
    },
    //添加、编辑司机信息
    DriverEditPage: {
      screen: DriverEditPage,
      navigationOptions: {
        header: null,
      },
    },
    //司机列表
    DriverPage: {
      screen: DriverPage,
      navigationOptions: {
        header: null,
      },
    },
    //确认司机信息
    DriverConfirmPage: {
      screen: DriverConfirmPage,
      navigationOptions: {
        header: null,
      },
    },
    //我的基本信息
    MineDetailsPage: {
      screen: MineDetailsPage,
      navigationOptions: {
        header: null,
      },
    },
    //我的基本信息编辑
    MineEditPage: {
      screen: MineEditPage,
      navigationOptions: {
        header: null,
      },
    },
    //账户体系
    AccountPage: {
      screen: AccountPage,
      navigationOptions: {
        header: null,
      },
    },
    //提现
    CashPage: {
      screen: CashPage,
      navigationOptions: {
        header: null,
      },
    },
    //实名认证
    AuthenticationPage: {
      screen: AuthenticationPage,
      navigationOptions: {
        header: null,
      },
    },
    //我的卖板、空位
    MainPublishPage: {
      screen: MainPublishPage,
      navigationOptions: {
        header: null,
      },
    },
    //常跑线路
    LinePage: {
      screen: LinePage,
      navigationOptions: {
        header: null,
      },
    },
    //常跑线路
    UploadImagePage: {
      screen: UploadImagePage,
      navigationOptions: {
        header: null,
      },
    },
    LineEditPage: {
      screen: LineEditPage,
      navigationOptions: {
        header: null,
      },
    },
    RemarkPage: {
      screen: RemarkPage,
      navigationOptions: {
        header: null,
      },
    },
    ChooseCityPage: {
      screen: ChooseCityPage,
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
