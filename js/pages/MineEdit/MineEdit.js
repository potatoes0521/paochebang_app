/*
 * @Author: guorui
 * @description: 我的基本信息
 * @Date: 2019-12-25 15:10:15
 * @LastEditors  : guorui
 * @LastEditTime : 2019-12-30 17:24:19
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {connect} from 'react-redux';
import NavigationBar from '../../components/NavigatorBar/NavigationBar';
import SafeAreaViewPlus from '../../components/SafeAreaViewPlus/SafeAreaViewPlus';
import MineStyles from '../../assets/css/MineStyles';
import NavigationUtil from '../../navigator/NavigationUtils';
import Button from '../../components/Button/Button.js';
import Toast from 'react-native-easy-toast';
import api from '../../api';

class MineEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      realName: '',
      mobile: '',
      idCard: '',
      carType: '',
      carNum: '',
      carTypeDesc: '',
    };
    this.carTypeList = [];
    this.pageParams = {};
    this.toastRef = React.createRef();
  }

  componentDidMount() {
    const {navigation} = this.props;
    const {state} = navigation;
    const {params} = state;
    console.log('params', params);
    this.pageParams = params || {};
    if (this.pageParams.userDetailsInfo) {
      this.getMineInfoDetails();
    }
    this.getCarInfoType();
  }
  componentWillUnmount() {}
  /**
   * 获取用户信息详情
   * @return void
   */
  getMineInfoDetails() {
    this.setState({
      realName: this.pageParams.userDetailsInfo.realName,
      mobile: this.pageParams.userDetailsInfo.mobile,
      idCard: this.pageParams.userDetailsInfo.idCard,
      carType: this.pageParams.userDetailsInfo.carType,
      carTypeDesc: this.pageParams.userDetailsInfo.carTypeDesc,
      carNum: this.pageParams.userDetailsInfo.carNum,
    });
  }
  /**
   * 获取车辆信息类型
   * @return void
   */
  getCarInfoType() {}
  /**
   * 输入车牌号
   * @return void
   */
  inputCarNum(value) {
    this.setState({
      carNum: value,
    });
  }
  /**
   * 函数功能描述
   * @return void
   */
  chooseCarType() {
    console.log('选择车辆类型');
  }
  /**
   * 取消编辑
   * @return void
   */
  cancelEdit() {
    NavigationUtil.goBack(this.props.navigation);
  }
  /**
   * 提交编辑
   * @return void
   */
  submitEdit() {
    let {carType, carNum} = this.state;
    let sendData = {
      userId: this.props.userInfo.userId,
      carType,
      carNum,
    };
    api.user.editUserInfo(sendData, this).then(() => {
      this.toastRef.current.show('编辑成功');
      setTimeout(() => {
        NavigationUtil.goBack(this.props.navigation);
      }, 1800);
    });
  }
  render() {
    let {realName, mobile, idCard, carNum, carTypeDesc} = this.state;
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
              <Text style={MineStyles.textStyle}>{realName || ''}</Text>
            </View>
            <View style={[MineStyles.itemStyle, MineStyles.line]}>
              <Text style={MineStyles.titleStyle}>联系方式</Text>
              <Text style={MineStyles.textStyle}>{mobile || ''}</Text>
            </View>
            <View style={[MineStyles.itemStyle, MineStyles.line]}>
              <Text style={MineStyles.titleStyle}>身份证号</Text>
              <Text style={MineStyles.textStyle}>{idCard || ''}</Text>
            </View>
            <View style={[MineStyles.itemStyle, MineStyles.line]}>
              <Text style={MineStyles.titleStyle}>车牌号</Text>
              <TextInput
                style={styles.input}
                placeholder="请输入车牌号"
                maxLength={20}
                onChangeText={this.inputCarNum.bind(this)}
                value={carNum}
              />
            </View>
            <View style={MineStyles.itemStyle}>
              <Text style={MineStyles.titleStyle}>车辆信息</Text>
              <Text
                style={MineStyles.textStyle}
                onPress={this.chooseCarType.bind(this)}>
                {carTypeDesc || '请选择车辆类型'}
              </Text>
            </View>
          </View>
          <View style={styles.btnWrapper}>
            <Button
              btnStyle={[styles.btnStyle, MineStyles.btnLeft]}
              text={'取消'}
              type={'plain'}
              onClick={this.cancelEdit.bind(this)}
            />
            <Button
              btnStyle={[styles.btnStyle]}
              text={'保存'}
              type={'round'}
              onClick={this.submitEdit.bind(this)}
            />
          </View>
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
  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 12,
    marginTop: 35,
    height: 40,
  },
  btnStyle: {
    height: 40,
  },
  input: {
    flex: 1,
    textAlign: 'right',
    padding: 0,
  },
});

// 如果需要引入store
const mapStateToProps = state => {
  return {
    userInfo: state.user_info.userInfo,
    theme: state.theme.theme,
  };
};
export default connect(mapStateToProps)(MineEdit);
