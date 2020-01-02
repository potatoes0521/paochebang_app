/*
 * @Author: guorui
 * @description: 编辑、添加司机信息
 * @Date: 2019-12-26 10:36:06
 * @LastEditors  : guorui
 * @LastEditTime : 2020-01-02 09:48:29
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
} from 'react-native';
import {connect} from 'react-redux';
import NavigationBar from '../../components/NavigatorBar/NavigationBar';
import MineStyles from '../../assets/css/MineStyles';
import GlobalStyles from '../../assets/css/GlobalStyles';
import Button from '../../components/Button/Button.js';
import {
  validateIdCard,
  realNamePatter,
  phoneNumberPatter,
} from '../../utils/patter.js';
import SafeAreaViewPlus from '../../components/SafeAreaViewPlus/SafeAreaViewPlus';
import BackPressComponent from '../../components/BackPressComponent/BackPressComponent';
import NavigationUtil from '../../navigator/NavigationUtils';
import Toast from 'react-native-easy-toast';
import api from '../../api';

class DriverEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      remarkName: '',
      mobile: '',
      idCard: '',
      carType: '',
      merchantName: '',
      carNum: '',
      carTypeDesc: '',
    };
    this.pageParams = {};
    this.driverInfo = {};
    this.carTypeList = [];
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
    if (this.pageParams.pageType === 'edit') {
      this.getDriverInfoDetails();
    }
    this.chooseCarType();
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
  getDriverInfoDetails() {
    this.driverInfo = this.pageParams.driverInfo;
    let res = this.pageParams.driverInfo;
    this.setState({
      remarkName: res.remarkName,
      mobile: res.mobile,
      idCard: res.idCard,
      carNum: res.carNum,
      carType: res.carType,
      carTypeDesc: res.carTypeDesc,
      merchantName: res.merchantName,
    });
  }
  /**
   * 获取车辆信息类型
   * @return void
   */
  chooseCarType() {}
  /**
   * 输入司机姓名
   * @param {Type} value 参数描述
   * @return void
   */
  inputRemarkName(value) {
    this.setState({
      remarkName: value,
    });
  }
  /**
   * 输入司机联系方式
   * @param {Type} value 参数描述
   * @return void
   */
  inputMobile(value) {
    this.setState({
      mobile: value,
    });
  }
  /**
   * 输入司机身份证号
   * @param {Type} value 参数描述
   * @return void
   */
  inputIdCard(value) {
    this.setState({
      idCard: value,
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
   * 输入所属物流公司
   * @return void
   */
  inputMerchantName(value) {
    this.setState({
      merchantName: value,
    });
  }
  /**
   * 取消添加
   * @return void
   */
  cancelAdd() {
    NavigationUtil.goBack(this.props.navigation);
  }
  /**
   * 提交添加
   * @return void
   */
  submitAdd() {
    let {
      mobile,
      idCard,
      remarkName,
      carNum,
      carType,
      merchantName,
    } = this.state;
    if (!realNamePatter.test(remarkName)) {
      this.toastRef.current.show('请输入2-8位的中文姓名');
      return;
    }
    if (!phoneNumberPatter.test(mobile)) {
      this.toastRef.current.show('手机号格式有误');
      return;
    }
    if (!validateIdCard(idCard)) {
      this.toastRef.current.show('客户身份证号格式有误');
      return;
    }
    let sendData = {
      userId: this.driverInfo.userId,
      mobile,
      idCard,
      remarkName,
      carNum,
      carType,
      merchantName,
    };
    console.log('sendData', sendData);
    api.driver.updateDriverData(sendData, this).then(() => {
      if (this.pageParams.pageType === 'edit') {
        this.toastRef.current.show('编辑成功');
      }
      this.toastRef.current.show('添加成功');
      setTimeout(() => {
        NavigationUtil.goBack(this.props.navigation);
      }, 1800);
    });
  }
  render() {
    let {
      remarkName,
      mobile,
      idCard,
      merchantName,
      carNum,
      carTypeDesc,
    } = this.state;
    const {theme, navigation} = this.props;
    return (
      <SafeAreaViewPlus topColor={theme.themeColor}>
        <View style={styles.pageWrapper}>
          <NavigationBar
            navigation={navigation}
            leftViewShow={true}
            title={'添加司机'}
          />
          <View style={MineStyles.itemWrapper}>
            <View style={[MineStyles.itemStyle, MineStyles.line]}>
              <Text style={styles.iconStyle}>*</Text>
              <Text style={MineStyles.titleStyle}>姓名</Text>
              <TextInput
                style={styles.input}
                placeholder="请输入司机姓名"
                maxLength={8}
                onChangeText={this.inputRemarkName.bind(this)}
                value={remarkName}
              />
            </View>
            <View style={[MineStyles.itemStyle, MineStyles.line]}>
              <Text style={styles.iconStyle}>*</Text>
              <Text style={MineStyles.titleStyle}>联系方式</Text>
              <TextInput
                style={styles.input}
                placeholder="请输入司机联系方式"
                maxLength={11}
                keyboardType={'number-pad'}
                onChangeText={this.inputMobile.bind(this)}
                value={mobile}
              />
            </View>
            <View style={[MineStyles.itemStyle, MineStyles.line]}>
              <Text style={styles.iconStyle}>*</Text>
              <Text style={MineStyles.titleStyle}>身份证号</Text>
              <TextInput
                style={styles.input}
                placeholder="请输入司机身份证号"
                maxLength={20}
                onChangeText={this.inputIdCard.bind(this)}
                value={idCard}
              />
            </View>
            <View style={[MineStyles.itemStyle, MineStyles.line]}>
              <Text style={styles.iconStyle} />
              <Text style={MineStyles.titleStyle}>车牌号</Text>
              <TextInput
                style={styles.input}
                placeholder="请输入车牌号"
                maxLength={20}
                onChangeText={this.inputCarNum.bind(this)}
                value={carNum}
              />
            </View>
            <View style={[MineStyles.itemStyle, MineStyles.line]}>
              <Text style={styles.iconStyle} />
              <Text style={MineStyles.titleStyle}>所属物流公司</Text>
              <TextInput
                style={styles.input}
                placeholder="请输入所属物流公司"
                maxLength={20}
                onChangeText={this.inputMerchantName.bind(this)}
                value={merchantName}
              />
            </View>
            <TouchableOpacity onPress={this.chooseCarType.bind(this)}>
              <View style={MineStyles.itemStyle}>
                <Text style={styles.iconStyle} />
                <Text style={MineStyles.titleStyle}>车辆信息</Text>
                {carTypeDesc ? (
                  <Text style={MineStyles.textStyle}>{carTypeDesc}</Text>
                ) : (
                  <Text style={MineStyles.textStyle}>请选择车辆类型</Text>
                )}
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.btnWrapper}>
            <Button
              btnStyle={[styles.btnStyle, MineStyles.btnLeft]}
              text={'取消'}
              type={'plain'}
              onClick={this.cancelAdd.bind(this)}
            />
            <Button
              btnStyle={[styles.btnStyle]}
              text={'保存'}
              type={'round'}
              onClick={this.submitAdd.bind(this)}
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
  iconStyle: {
    width: 9,
    color: GlobalStyles.themeColor,
    marginRight: 4,
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
export default connect(mapStateToProps)(DriverEdit);
