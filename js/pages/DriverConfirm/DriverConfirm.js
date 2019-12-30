/*
 * @Author: guorui
 * @description: 确认司机页面
 * @Date: 2019-12-30 15:01:46
 * @LastEditors  : guorui
 * @LastEditTime : 2019-12-30 16:06:31
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import NavigationBar from '../../components/NavigatorBar/NavigationBar';
import SafeAreaViewPlus from '../../components/SafeAreaViewPlus/SafeAreaViewPlus';
import BackPressComponent from '../../components/BackPressComponent/BackPressComponent';
import MainStyles from '../../assets/css/MainStyles';
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
    this.getOrderDriver();
    this.backPress.componentDidMount();
  }
  componentWillUnmount() {
    this.backPress.componentWillUnmount();
  }
  onBackPress() {
    NavigationUtil.goBack(this.props.navigation);
    return true;
  }
  /**
   * 获取订单的司机
   * @return void
   */
  getOrderDriver() {
    if (!this.pageParams.order_code) {
      this.toastRef.current.show('请传入订单Id或者订单Code');
      return;
    }
    let sendData = {
      orderCode: this.pageParams.order_code,
    };
    api.order.getOrderDriver(sendData, this).then(res => {
      if (res && res.extractDriver) {
        this.setState({
          realName: res.extractDriver,
          mobile: res.extractDriverMobile,
          idCard: res.extractDriverCardNo,
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
      if (!res) {
        return;
      }
      this.setState({
        realName: res.realName,
        mobile: res.mobile,
        idCard: res.idCard,
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
    NavigationUtil.goBack({pageType: 'choose'}, 'DriverPage');
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
      orderCode: this.pageParams.order_code,
    };
    api.order.confirmDriver(sendData, this).then(() => {
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
          <View style={MainStyles.itemWrapper}>
            <View style={[MainStyles.itemStyle, MainStyles.line]}>
              <Text style={MainStyles.titleStyle}>司机信息</Text>
              <Text style={MainStyles.textStyle}>
                {realName || '请选择司机信息'}
              </Text>
              {this.pageParams.type !== 'see' ? (
                <Text style={styles.iconStyle}>&#xe61d;</Text>
              ) : (
                <Text style={styles.selectIcon} />
              )}
            </View>
            <View style={[MainStyles.itemStyle, MainStyles.line]}>
              <Text style={MainStyles.titleStyle}>联系方式</Text>
              <Text style={MainStyles.textStyle}>{mobile || ''}</Text>
              <Text style={styles.selectIcon} />
            </View>
            <View style={MainStyles.itemStyle}>
              <Text style={MainStyles.titleStyle}>身份证号码</Text>
              <Text style={MainStyles.textStyle}>{idCard || ''}</Text>
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
