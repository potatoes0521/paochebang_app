/*
 * @Author: guorui
 * @description: 我的基本信息
 * @Date: 2019-12-25 15:10:15
 * @LastEditors  : guorui
 * @LastEditTime : 2019-12-27 17:35:20
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import NavigationBar from '../../components/NavigatorBar/NavigationBar';
import NavigationUtil from '../../navigator/NavigationUtils';
import BackPressComponent from '../../components/BackPressComponent/BackPressComponent';
import SafeAreaViewPlus from '../../components/SafeAreaViewPlus/SafeAreaViewPlus';
import MineStyles from '../../assets/css/MineStyles';
import Button from '../../components/Button/Button.js';
import api from '../../api';

class MineDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetailsInfo: {},
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
    // this.getUserInfo();
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
        userDetailsInfo: res,
      });
    });
  }
  /**
   * 跳转页面
   * @return void
   */
  navigationEdit() {
    NavigationUtil.goPage(this.state.userDetailsInfo, 'MineEditPage');
  }
  render() {
    let {userDetailsInfo} = this.state;
    const {theme, navigation} = this.props;
    return (
      <SafeAreaViewPlus topColor={theme.themeColor}>
        <View style={styles.pageWrapper}>
          <NavigationBar
            navigation={navigation}
            leftViewShow={true}
            title={'我的基本信息'}
          />
          <View style={MineStyles.itemWrapper}>
            <View style={[MineStyles.itemStyle, MineStyles.line]}>
              <Text style={MineStyles.titleStyle}>姓名</Text>
              <Text style={MineStyles.textStyle}>
                {userDetailsInfo.realName || ''}
              </Text>
            </View>
            <View style={[MineStyles.itemStyle, MineStyles.line]}>
              <Text style={MineStyles.titleStyle}>联系方式</Text>
              <Text style={MineStyles.textStyle}>
                {userDetailsInfo.mobile || ''}
              </Text>
            </View>
            <View style={[MineStyles.itemStyle, MineStyles.line]}>
              <Text style={MineStyles.titleStyle}>身份证号</Text>
              <Text style={MineStyles.textStyle}>
                {userDetailsInfo.idCard || ''}
              </Text>
            </View>
            <View style={[MineStyles.itemStyle, MineStyles.line]}>
              <Text style={MineStyles.titleStyle}>所属物流公司</Text>
              <Text style={MineStyles.textStyle}>
                {userDetailsInfo.merchantName || ''}
              </Text>
            </View>
            <View style={[MineStyles.itemStyle, MineStyles.line]}>
              <Text style={MineStyles.titleStyle}>车牌号</Text>
              <Text style={MineStyles.textStyle}>
                {userDetailsInfo.carNum || ''}
              </Text>
            </View>
            <View style={[MineStyles.itemStyle, MineStyles.line]}>
              <Text style={MineStyles.titleStyle}>车辆信息</Text>
              <Text style={MineStyles.textStyle}>
                {userDetailsInfo.carTypeDesc || ''}
              </Text>
            </View>
            <View style={MineStyles.itemStyle}>
              <Text style={MineStyles.titleStyle}>注册时间</Text>
              <Text style={MineStyles.textStyle}>
                {userDetailsInfo.createTimeDesc || ''}
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
export default connect(mapStateToProps)(MineDetails);
