/*
 * @Author: liuYang
 * @description: 市场
 * @Date: 2019-11-22 16:11:20
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-01-16 13:50:22
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
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import {connect} from 'react-redux';
import GlobalStyles from '../../assets/css/GlobalStyles';
import NavigationBar from '../../components/NavigatorBar/NavigationBar';
import SafeAreaViewPlus from '../../components/SafeAreaViewPlus/SafeAreaViewPlus';
import SellingList from './components/SellingList.js';
import VacancyList from './components/VacancyList.js';
import FloatPublishBtn from '../../components/FloatPublishBtn/FloatPublishBtn';
import BackPressComponent from '../../components/BackPressComponent/BackPressComponent';
import Toast from 'react-native-easy-toast';
import Drawer from '../../components/Drawer/Drawer';
import SelectCondition from '../../components/SelectCondition/SelectCondition.js';
class Information extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabType: 'selling',
      sendCityName: '',
      receiveCityName: '',
      visible: false,
    };
    this.sendCityId = '';
    this.receiveCityId = '';
    this.backPress = new BackPressComponent({
      backPress: () => this.onBackPress(),
    });
    // this.tabType = 'selling';
  }

  componentDidMount() {
    this.handleEmit();
    this.backPress.componentDidMount();
  }

  componentWillUnmount() {
    this.emitChooseCity.remove(); // 销毁要接受的通知
    this.backPress.componentWillUnmount();
  }

  onBackPress() {
    const {navigation} = this.props;
    navigation.goBack();
    return true;
  }
  /**
   * 处理事件通知
   * @return void
   */
  handleEmit() {
    // 选择城市时候的通知
    this.emitChooseCity = DeviceEventEmitter.addListener(
      'chooseCity_information',
      data => {
        let state = {};
        console.log(data);
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
    DeviceEventEmitter.emit('selectMsgLikeCity_information', {
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
    DeviceEventEmitter.emit('selectMsgLikeCity_information', {
      sendCityId: this.sendCityId,
      receiveCityId: this.receiveCityId,
    });
    this.closeDrawer();
  }
  _NavigatorTab(params) {
    if (this.NavigatorTab) {
      return this.NavigatorTab;
    }
    return (this.NavigatorTab = createAppContainer(
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
          initialRouteName: params.type,
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
    const {theme, navigation} = this.props;
    const {state} = navigation;
    const {params} = state;
    const {sendCityName, receiveCityName} = this.state;
    const NavigatorTab = this._NavigatorTab(params);
    return (
      <SafeAreaViewPlus topColor={theme.themeColor}>
        <NavigationBar
          leftViewShow={true}
          navigation={navigation}
          title={'市场信息'}
        />
        <View style={styles.tabWrapper}>
          <NavigatorTab />
          <TouchableOpacity
            onPress={this.openDrawer.bind(this)}
            style={styles.select}>
            <View style={styles.line} />
            <View style={styles.selectMain}>
              <Text>筛选</Text>
            </View>
          </TouchableOpacity>
          <FloatPublishBtn type={this.tabType} />
          <Drawer
            visible={this.state.visible}
            onClickModel={this.closeDrawer.bind(this)}>
            <SelectCondition
              from={'information'}
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
        </View>
      </SafeAreaViewPlus>
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
    width: 80,
    marginLeft: itemWidth - itemWidth / 2 - 40,
    backgroundColor: GlobalStyles.themeColor,
  },
});

const mapStateToProps = state => ({
  userInfo: state.user_info.userInfo,
  theme: state.theme.theme,
});
export default connect(mapStateToProps)(Information);
