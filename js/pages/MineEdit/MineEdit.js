/*
 * @Author: guorui
 * @description: 我的基本信息
 * @Date: 2019-12-25 15:10:15
 * @LastEditors  : guorui
 * @LastEditTime : 2020-01-13 13:37:16
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native';
import {connect} from 'react-redux';
import NavigationBar from '../../components/NavigatorBar/NavigationBar';
import SafeAreaViewPlus from '../../components/SafeAreaViewPlus/SafeAreaViewPlus';
import BackPressComponent from '../../components/BackPressComponent/BackPressComponent';
import ActionSheet from '../../components/ActionSheet/ActionSheet';
import MineStyles from '../../assets/css/MineStyles';
import GlobalStyles from '../../assets/css/GlobalStyles';
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
      carTypeList: [],
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
    this.getCarInfoType();
    if (this.pageParams.userDetailsInfo) {
      this.getMineInfoDetails();
    }
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
   * 获取用户信息详情
   * @return void
   */
  getMineInfoDetails() {
    let res = this.pageParams.userDetailsInfo;
    this.setState({
      realName: res.realName,
      mobile: res.mobile,
      idCard: res.idCard,
      carType: res.carType,
      carTypeDesc: res.carTypeDesc,
      carNum: res.carNum,
    });
  }
  /**
   * 获取车辆信息类型
   * @return void
   */
  getCarInfoType() {
    api.driver.getCarInfoList({}, this).then(res => {
      if (!res.data) {
        return;
      }
      this.setState({
        carTypeList: res.data,
      });
    });
  }
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
   * 显示actionSheet
   * @return void
   */
  showActionSheet() {
    this.ActionSheet.show();
  }
  /**
   * 选择车辆类型
   * @param {Type} index 被选中的下标
   * @return void
   */
  chooseCarType(index) {
    if (index === this.state.carTypeList.length) {
      return;
    }
    this.setState({
      carType: this.state.carTypeList[index].carInfoId,
      carTypeDesc: this.state.carTypeList[index].carInfoName,
    });
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
    DeviceEventEmitter.emit('submitMineCarType', this.state.carType);
    DeviceEventEmitter.emit('submitMineCarNum', this.state.carNum);
    api.user.editUserInfo(sendData, this).then(() => {
      this.toastRef.current.show('编辑成功');
      setTimeout(() => {
        NavigationUtil.goBack(this.props.navigation);
      }, 1800);
    });
  }
  render() {
    let {
      realName,
      mobile,
      idCard,
      carNum,
      carTypeDesc,
      carTypeList,
    } = this.state;
    const {theme, navigation} = this.props;
    const carTypeName = carTypeList.map(item => item.carInfoName);
    carTypeName.push('取消');
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
              <TouchableOpacity
                onPress={this.showActionSheet.bind(this)}
                style={styles.formContent}>
                {carTypeDesc ? (
                  <Text style={MineStyles.textStyle}>{carTypeDesc}</Text>
                ) : (
                  <Text style={MineStyles.inputStyle}>请选择车辆类型</Text>
                )}
              </TouchableOpacity>
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
          {/* 动作指示器 */}
          <ActionSheet
            ref={o => (this.ActionSheet = o)}
            options={carTypeName}
            tintColor={GlobalStyles.themeFontColor}
            cancelButtonIndex={carTypeName.length - 1}
            onPress={this.chooseCarType.bind(this)}
          />
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
    fontSize: 15,
    color: GlobalStyles.themeFontColor,
  },
  formContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
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
