/*
 * @Author: guorui
 * @description: 司机详情
 * @Date: 2019-12-25 15:23:46
 * @LastEditors  : guorui
 * @LastEditTime : 2020-01-02 10:49:02
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import NavigationBar from '../../components/NavigatorBar/NavigationBar';
import SafeAreaViewPlus from '../../components/SafeAreaViewPlus/SafeAreaViewPlus';
import BackPressComponent from '../../components/BackPressComponent/BackPressComponent';
import MineStyles from '../../assets/css/MineStyles';
import Button from '../../components/Button/Button.js';
import NavigationUtil from '../../navigator/NavigationUtils';
import api from '../../api';

class DriverDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      driverInfo: {},
    };
    this.pageParams = {};
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
    this.getDriverDetails();
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
   * 获取司机信息详情
   * @return void
   */
  getDriverDetails() {
    if (!this.pageParams.userId) {
      return;
    }
    let sendData = {
      userId: this.pageParams.userId,
      createUserId: this.props.userInfo.userId,
    };
    api.driver.getDriverDetail(sendData, this).then(res => {
      if (!res) {
        return;
      }
      this.setState({
        driverInfo: res.data,
      });
    });
  }
  /**
   * 导航到客户详情
   * @return void
   */
  navigationEdit() {
    NavigationUtil.goPage(
      {pageType: 'edit', driverInfo: this.state.driverInfo},
      'DriverEditPage',
    );
  }
  render() {
    const {theme, navigation} = this.props;
    let {driverInfo} = this.state;
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
              <Text style={MineStyles.titleStyle}>姓名</Text>
              <Text style={MineStyles.textStyle}>
                {driverInfo.remarkName || ''}
              </Text>
            </View>
            <View style={[MineStyles.itemStyle, MineStyles.line]}>
              <Text style={MineStyles.titleStyle}>联系方式</Text>
              <Text style={MineStyles.textStyle}>
                {driverInfo.mobile || ''}
              </Text>
            </View>
            <View style={[MineStyles.itemStyle, MineStyles.line]}>
              <Text style={MineStyles.titleStyle}>身份证号</Text>
              <Text style={MineStyles.textStyle}>
                {driverInfo.idCard || ''}
              </Text>
            </View>
            {driverInfo.carNum ? (
              <View style={[MineStyles.itemStyle, MineStyles.line]}>
                <Text style={MineStyles.titleStyle}>车牌号</Text>
                <Text style={MineStyles.textStyle}>
                  {driverInfo.carNum || ''}
                </Text>
              </View>
            ) : null}
            {driverInfo.carTypeDesc ? (
              <View style={[MineStyles.itemStyle, MineStyles.line]}>
                <Text style={MineStyles.titleStyle}>车辆信息</Text>
                <Text style={MineStyles.textStyle}>
                  {driverInfo.carTypeDesc || ''}
                </Text>
              </View>
            ) : null}
            {driverInfo.merchantName ? (
              <View style={[MineStyles.itemStyle, MineStyles.line]}>
                <Text style={MineStyles.titleStyle}>所属物流公司</Text>
                <Text style={MineStyles.textStyle}>
                  {driverInfo.merchantName || ''}
                </Text>
              </View>
            ) : null}
            <View style={MineStyles.itemStyle}>
              <Text style={MineStyles.titleStyle}>添加时间</Text>
              <Text style={MineStyles.textStyle}>
                {driverInfo.createTimeDesc || ''}
              </Text>
            </View>
            <View style={MineStyles.itemStyle}>
              <Text style={MineStyles.titleStyle}>最后更新时间</Text>
              <Text style={MineStyles.textStyle}>
                {driverInfo.updateTimeDesc || ''}
              </Text>
            </View>
          </View>
          <View style={styles.btnWrapper}>
            <Button
              text={'修改'}
              type={'round'}
              onClick={this.navigationEdit.bind(this)}
            />
          </View>
        </View>
      </SafeAreaViewPlus>
    );
  }
}

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
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
export default connect(mapStateToProps)(DriverDetails);
