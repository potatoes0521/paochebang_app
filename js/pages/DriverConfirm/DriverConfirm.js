/*
 * @Author: guorui
 * @description: 确认司机页面
 * @Date: 2019-12-30 15:01:46
 * @LastEditors  : guorui
 * @LastEditTime : 2020-01-07 14:57:50
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
import SafeAreaViewPlus from '../../components/SafeAreaViewPlus/SafeAreaViewPlus';
import BackPressComponent from '../../components/BackPressComponent/BackPressComponent';
import MineStyles from '../../assets/css/MineStyles';
import Button from '../../components/Button/Button.js';
import NavigationUtil from '../../navigator/NavigationUtils';
import Toast from 'react-native-easy-toast';
import api from '../../api';
import GlobalStyles from '../../assets/css/GlobalStyles';

class DriverConfirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      realName: '',
      mobile: '',
      idCard: '',
    };
    this.pageParams = {};
    this.toastRef = React.createRef();
    this.backPress = new BackPressComponent({
      backPress: () => this.onBackPress(),
    });
  }

  componentDidMount() {
    const {navigation} = this.props;
    const {state} = navigation;
    const {params} = state;
    console.log('params', params);
    this.pageParams = params || {};
    this.handleEmit();
    this.getOrderDriver();
    this.backPress.componentDidMount();
  }
  componentWillUnmount() {
    this.emitMineInfo.remove();
    this.emitChooseDriver.remove();
    this.backPress.componentWillUnmount();
  }
  onBackPress() {
    NavigationUtil.goBack(this.props.navigation);
    return true;
  }
  /**
   * 处理事件通知
   * @return void
   */
  handleEmit() {
    this.emitMineInfo = DeviceEventEmitter.addListener('mineInfo', data => {
      this.setState({
        realName: data.realName,
        mobile: data.mobile,
        idCard: data.idCard,
      });
    });
    this.emitChooseDriver = DeviceEventEmitter.addListener(
      'chooseDriver',
      data => {
        this.setState({
          realName: data.realName,
          mobile: data.mobile,
          idCard: data.idCard,
        });
      },
    );
  }
  /**
   * 获取订单的司机
   * @return void
   */
  getOrderDriver() {
    if (!this.pageParams.orderCode) {
      this.toastRef.current.show('请传入订单Id或者订单Code');
      return;
    }
    let sendData = {
      orderCode: this.pageParams.orderCode,
    };
    api.order.getOrderDriver(sendData, this).then(res => {
      let data = res.data;
      if (!data) {
        return;
      }
      if (data && data.extractDriver) {
        this.setState({
          realName: data.extractDriver,
          mobile: data.extractDriverMobile,
          idCard: data.extractDriverCardNo,
        });
      } else {
        this.getUserInfo();
      }
    });
  }
  /**
   * 获取用户信息
   * @return void
   */
  getUserInfo() {
    let {userInfo} = this.props;
    let sendData = {
      userId: userInfo.userId,
    };
    api.user.getUserInfo(sendData, this).then(res => {
      let data = res.data;
      if (!data) {
        return;
      }
      this.setState({
        realName: data.realName,
        mobile: data.mobile,
        idCard: data.idCard,
      });
    });
  }
  /**
   * 去选择司机
   * @return void
   */
  chooseDriver() {
    if (this.pageParams.type === 'see') {
      return;
    }
    NavigationUtil.goPage({pageType: 'choose'}, 'DriverPage');
  }
  /**
   * 确认司机
   * @return void
   */
  chooseDriverSubmit() {
    let {realName, mobile, idCard} = this.state;
    if (!realName || !mobile || !idCard) {
      this.toastRef.current.show('请补全司机信息');
      return;
    }
    let sendData = {
      extractDriver: realName,
      extractDriverCardNo: idCard,
      extractDriverMobile: mobile,
      orderCode: this.pageParams.orderCode,
    };
    api.order.confirmDriver(sendData, this).then(res => {
      this.toastRef.current.show('提交成功');
      setTimeout(() => {
        NavigationUtil.goBack(this.props.navigation);
      }, 1800);
    });
  }
  render() {
    const {theme, navigation} = this.props;
    let {realName, mobile, idCard} = this.state;
    return (
      <SafeAreaViewPlus topColor={theme.themeColor}>
        <View style={styles.pageWrapper}>
          <NavigationBar
            navigation={navigation}
            leftViewShow={true}
            title={'司机信息'}
          />
          <View style={MineStyles.itemWrapper}>
            <View style={[MineStyles.itemStyle, MineStyles.line]}>
              <Text style={MineStyles.titleStyle}>司机信息</Text>
              <TouchableOpacity
                style={styles.touchStyle}
                onPress={this.chooseDriver.bind(this)}>
                <View style={styles.chooseWrapper}>
                  <Text style={MineStyles.inputStyle}>
                    {realName || '请选择司机信息'}
                  </Text>
                  {this.pageParams.type !== 'see' ? (
                    <Text style={styles.iconStyle}>&#xe61d;</Text>
                  ) : (
                    <Text style={styles.selectIcon} />
                  )}
                </View>
              </TouchableOpacity>
            </View>
            <View style={[MineStyles.itemStyle, MineStyles.line]}>
              <Text style={MineStyles.titleStyle}>联系方式</Text>
              <Text style={MineStyles.inputStyle}>{mobile || ''}</Text>
              <Text style={styles.selectIcon} />
            </View>
            <View style={MineStyles.itemStyle}>
              <Text style={MineStyles.titleStyle}>身份证号码</Text>
              <Text style={MineStyles.inputStyle}>{idCard || ''}</Text>
              <Text style={styles.selectIcon} />
            </View>
          </View>
          {this.pageParams.type !== 'see' ? (
            <View style={styles.btnWrapper}>
              <Button
                text={'确认'}
                type={'round'}
                onClick={this.chooseDriverSubmit.bind(this)}
              />
            </View>
          ) : null}
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

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
  },
  touchStyle: {
    flex: 1,
  },
  chooseWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    width: 12,
    fontSize: 12,
    fontFamily: 'iconfont',
    color: GlobalStyles.themeDisabled,
  },
  selectIcon: {
    width: 12,
  },
  btnWrapper: {
    marginHorizontal: 12,
    marginTop: 35,
    height: 40,
  },
});

// 如果需要引入store
const mapStateToProps = state => {
  return {
    userInfo: state.user_info.userInfo,
    theme: state.theme.theme,
  };
};
export default connect(mapStateToProps)(DriverConfirm);
