/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-11-22 16:46:56
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-01-16 16:40:42
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native';
import {connect} from 'react-redux';
import NavigationBar from '../../components/NavigatorBar/NavigationBar';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import GlobalStyles from '../../assets/css/GlobalStyles';
import OfferList from './components/OfferList.js';
import OrderList from './components/OrderList.js';
import EmptyList from '../../components/EmptyList/EmptyList';
import Toast from 'react-native-easy-toast';
import Drawer from '../../components/Drawer/Drawer';
import SelectCondition from '../../components/SelectCondition/SelectCondition.js';

class Offer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      sendCityName: '',
      receiveCityName: '',
    };
    this.sendCityId = '';
    this.receiveCityId = '';
  }

  componentDidMount() {
    this.handleEmit();
  }

  componentWillUnmount() {
    this.emitChooseCity.remove(); // 销毁要接受的通知
  }
  /**
   * 处理事件通知
   * @return void
   */
  handleEmit() {
    // 选择城市时候的通知
    this.emitChooseCity = DeviceEventEmitter.addListener(
      'chooseCity_offer',
      data => {
        let state = {};
        if (data.type === 'sendCity') {
          state.sendCityName = data.cityName;
          this.sendCityId = data.cityId;
        } else if (data.type === 'receiveCity') {
          state.receiveCityName = data.cityName;
          this.receiveCityId = data.cityId;
        }
        this.setState(state);
      },
    );
  }
  /**
   * 打开抽屉
   * @return void
   */
  openDrawer() {
    this.setState({
      visible: true,
    });
  }
  /**
   * 关闭抽屉
   * @return void
   */
  closeDrawer() {
    this.setState({
      visible: false,
    });
  }
  /**
   * 清除城市信息
   * @return void
   */
  resetCityMsg() {
    this.setState({
      visible: false,
      sendCityName: '',
      receiveCityName: '',
    });
    this.sendCityId = '';
    this.receiveCityId = '';
    DeviceEventEmitter.emit('selectMsgLikeCity_offer', {
      sendCityId: '',
      receiveCityId: '',
    });
  }
  /**
   * 提交城市信息
   * @return void
   */
  submitCityMsg() {
    if (!this.sendCityId && !this.receiveCityId) {
      this.toastRef.current.show('收车城市或发车城市至少选择一个哦~');
      this.return;
    }
    DeviceEventEmitter.emit('selectMsgLikeCity_offer', {
      sendCityId: this.sendCityId,
      receiveCityId: this.receiveCityId,
    });
    this.closeDrawer();
  }
  _NavigatorTab() {
    if (this.NavigatorTab) {
      return this.NavigatorTab;
    }
    return (this.NavigatorTab = createAppContainer(
      createMaterialTopTabNavigator(
        {
          SellingTab: {
            screen: props => <OfferList {...this.props} />,
            navigationOptions: {
              title: '报价',
            },
          },
          VacancyTab: {
            screen: props => <OrderList {...this.props} />,
            navigationOptions: {
              title: '接单',
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
    ));
  }
  render() {
    let {userInfo} = this.props;
    let {sendCityName, receiveCityName} = this.state;

    const NavigatorTab = this._NavigatorTab();
    return (
      <View style={styles.pageWrapper}>
        <NavigationBar title={'报价/接单'} />
        {!userInfo || !userInfo.userId || !userInfo.token ? (
          <EmptyList pageType={'login_offer'} />
        ) : (
          <>
            <View style={styles.tabWrapper}>
              <NavigatorTab />
              <TouchableOpacity
                style={styles.select}
                onPress={this.openDrawer.bind(this)}>
                <View style={styles.line} />
                <View style={styles.selectMain}>
                  <Text>筛选</Text>
                  <Text style={[GlobalStyles.icon, styles.selectIcon]}>
                    &#xe665;
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <Drawer
              visible={this.state.visible}
              onClickModel={this.closeDrawer.bind(this)}>
              <SelectCondition
                from={'offer'}
                sendCityName={sendCityName}
                receiveCityName={receiveCityName}
                onCancel={this.resetCityMsg.bind(this)}
                onSubmit={this.submitCityMsg.bind(this)}
              />
            </Drawer>
            <Toast
              ref={this.toastRef}
              position={'center'}
              defaultCloseDelay={3000}
            />
          </>
        )}
      </View>
    );
  }
}
const itemWidth = (GlobalStyles.window_width - 70) / 2;
const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  tabWrapper: {
    flex: 1,
  },
  select: {
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 2,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    height: 44,
    flexDirection: 'row',
  },
  line: {
    width: 1,
    height: 26,
    backgroundColor: '#f5f5f5',
  },
  selectMain: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectIcon: {
    fontSize: 12,
    marginLeft: 4,
  },
  tabStyle: {
    borderBottomColor: GlobalStyles.themeColor,
    borderBottomWidth: 2,
    width: itemWidth,
    height: 44,
  },
  labelStyle: {
    fontSize: 16,
    fontWeight: '700',
  },
  indicatorStyle: {
    height: 3,
    width: 60,
    marginLeft: itemWidth - itemWidth / 2 - 30,
    backgroundColor: GlobalStyles.themeColor,
  },
});
// 如果需要引入store
const mapStateToProps = state => {
  return {
    userInfo: state.user_info.userInfo,
  };
};
export default connect(mapStateToProps)(Offer);
