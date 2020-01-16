/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-11-22 16:46:56
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-01-15 21:58:56
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
import Drawer from '../../components/Drawer/Drawer';
import Button from '../../components/Button/Button';
import DetailsStyle from '../../assets/css/DetailsStyle.js';
import NavigationUtils from '../../navigator/NavigationUtils';
import EmptyList from '../../components/EmptyList/EmptyList';
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
    this.emitChooseCity = DeviceEventEmitter.addListener('chooseCity', data => {
      let state = {
        visible: true,
      };
      if (data.type === 'sendCity') {
        state.sendCityName = data.cityName;
        this.sendCityId = data.cityId;
      } else if (data.type === 'receiveCity') {
        state.receiveCityName = data.cityName;
        this.receiveCityId = data.cityId;
      }
      this.setState(state);
    });
  }
  openDrawer() {
    this.setState({
      visible: true,
    });
  }
  closeDrawer() {
    this.setState({
      visible: false,
    });
  }
  navigatorTo(type) {
    this.closeDrawer();
    console.log('type', type);
    NavigationUtils.goPage({type}, 'ChooseCityPage');
  }
  resetCityMsg() {
    this.setState({
      visible: false,
      sendCityName: '',
      receiveCityName: '',
    });
    this.sendCityId = '';
    this.receiveCityId = '';
    DeviceEventEmitter.emit('selectMsgLikeCity', {
      sendCityId: '',
      receiveCityId: '',
    });
  }
  submitCityMsg() {
    DeviceEventEmitter.emit('selectMsgLikeCity', {
      sendCityId: this.sendCityId,
      receiveCityId: this.receiveCityId,
    });
    this.closeDrawer();
  }
  render() {
    let {userInfo} = this.props;
    let {sendCityName, receiveCityName} = this.state;
    const NavigatorTab = createAppContainer(
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
    );
    const sendCityTextClassName = [DetailsStyle.contentText];
    const receiveCityTextClassName = [DetailsStyle.contentText];
    if (!sendCityName) {
      sendCityTextClassName.push(styles.disabledText);
    }
    if (!receiveCityName) {
      receiveCityTextClassName.push(styles.disabledText);
    }
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
                </View>
              </TouchableOpacity>
            </View>
            <Drawer
              visible={this.state.visible}
              onClickModel={this.closeDrawer.bind(this)}>
              <View style={styles.drawerList}>
                <View
                  style={[styles.drawerItem, DetailsStyle.formItem]}
                  onPress={this.closeDrawer.bind(this)}>
                  <View style={DetailsStyle.formLabel}>
                    <Text style={DetailsStyle.labelText}>发车城市:</Text>
                  </View>
                  <TouchableOpacity
                    onPress={this.navigatorTo.bind(this, 'sendCity')}
                    style={DetailsStyle.formContent}>
                    <Text style={sendCityTextClassName}>
                      {sendCityName || '请选择收车城市'}
                    </Text>
                    <Text style={DetailsStyle.iconRight}>&#xe61d;</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={[styles.drawerItem, DetailsStyle.formItem]}
                  onPress={this.closeDrawer.bind(this)}>
                  <View style={DetailsStyle.formLabel}>
                    <Text style={DetailsStyle.labelText}>收车城市:</Text>
                  </View>
                  <TouchableOpacity
                    onPress={this.navigatorTo.bind(this, 'receiveCity')}
                    style={DetailsStyle.formContent}>
                    <Text style={receiveCityTextClassName}>
                      {receiveCityName || '请选择收车城市'}
                    </Text>
                    <Text style={DetailsStyle.iconRight}>&#xe61d;</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.drawerBtn}>
                <Button
                  text={'重置'}
                  btnStyle={[styles.btn, styles.btnReset]}
                  fontStyles={[styles.btnResetText]}
                  onClick={this.resetCityMsg.bind(this)}
                  type={'plain'}
                />
                <Button
                  text={'提交'}
                  btnStyle={[styles.btn]}
                  type={'round'}
                  onClick={this.submitCityMsg.bind(this)}
                />
              </View>
            </Drawer>
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
    alignItems: 'center',
    justifyContent: 'center',
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
  drawerList: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  drawerItem: {
    paddingVertical: 8,
  },
  drawerBtn: {
    height: 40,
    flexDirection: 'row',
    overflow: 'hidden',
    alignItems: 'center',
  },
  btn: {
    borderRadius: 0,
    height: 40,
  },
  btnReset: {
    borderColor: '#f5f5f5',
  },
  btnResetText: {
    color: GlobalStyles.themeHColor,
  },
  disabledText: {
    color: GlobalStyles.themeDisabled,
  },
});
// 如果需要引入store
const mapStateToProps = state => {
  return {
    userInfo: state.user_info.userInfo,
  };
};
export default connect(mapStateToProps)(Offer);
