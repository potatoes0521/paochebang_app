/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2019-12-29 11:26:06
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-01-16 21:05:56
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native';
import {connect} from 'react-redux';
import GlobalStyles from '../../assets/css/GlobalStyles';
import DetailsStyle from '../../assets/css/DetailsStyle';
import NavigationUtil from '../../navigator/NavigationUtils';
import BackPressComponent from '../../components/BackPressComponent/BackPressComponent';
import NavigationBar from '../../components/NavigatorBar/NavigationBar';
import SafeAreaViewPlus from '../../components/SafeAreaViewPlus/SafeAreaViewPlus';
import api from '../../api/index.js';
import Button from '../../components/Button/Button.js';
import Toast from 'react-native-easy-toast';
import {payWey, carNatureList} from '../../config/text_config.js';
import {handleMoney} from '../../utils/patter.js';
import Radio from '../../components/Radio/Radio';
import ActionSheet from '../../components/ActionSheet/ActionSheet';
import NumberInput from '../../components/NumberInput/NumberInput';
import DatePicker from '../../components/DatePicker/datePicker.js';

class SellingPublish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carAmount: '1', // 空位数
      carInfo: '', // 车辆信息
      dueTime: '', // 有效期
      isActive: 1, // 订单状态
      payType: '', // 支付方式
      returnPrice: '',
      price: '',
      pubTime: '', // 发布时间
      receiveCityName: '', // 收车城市
      remarks: '', // 备注
      sendCityName: '', // 发车城市
      sendTime: '', // 发车时间
      saleToPalletId: '', // 卖板信息ID
      isEdit: '', // 是否可编辑
      usedType: '1', // 车辆性质
      disabled: true,
      sendTimerInit: '', // 初始化时间
    };
    this.backPress = new BackPressComponent({
      backPress: () => this.onBackPress(),
    });
    this.toastRef = React.createRef();
    this.pageParams = {};
    this.dateChooseType = '';
  }

  componentDidMount() {
    const {navigation} = this.props;
    const {state} = navigation;
    const {params} = state;
    console.log('params', params);
    this.pageParams = params;
    this.handleEmit();
    if (this.pageParams && this.pageParams.saleToPalletId) {
      console.log('1111', 1111);
      this.getSellingDetail();
    }
    this.backPress.componentDidMount();
  }

  componentWillUnmount() {
    this.emitRemark.remove(); // 销毁要接受的通知
    this.emitChooseCity.remove(); // 销毁要接受的通知
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
    // 提交备注时候的通知
    this.emitRemark = DeviceEventEmitter.addListener('submitRemark', data => {
      this.setState({
        remark: data,
      });
    });
    // 选择城市时候的通知
    this.emitChooseCity = DeviceEventEmitter.addListener('chooseCity', data => {
      let state = {};
      if (data.type === 'sendCity') {
        state.sendCityName = data.cityName;
        state.sendCityId = data.cityId;
      } else if (data.type === 'receiveCity') {
        state.receiveCityName = data.cityName;
        state.receiveCityId = data.cityId;
      }
      this.setState(state);
    });
  }
  getSellingDetail() {
    if (!this.pageParams.saleToPalletId) {
      this.toastRef.current.show('缺少saleToPalletId或saleToPalletCode');
      return;
    }
    let sendData = {
      id: this.pageParams.saleToPalletId,
    };
    api.selling.getSellingDetail(sendData, this).then(res => {
      if (!res.data) {
        return;
      }
      res.data.price = res.data.price / 100 + '';
      this.setState(res.data);
    });
  }
  /**
   * 输入车辆信息
   * @return void
   */
  carInfoInput(value) {
    this.setState({
      carInfo: value,
    });
  }
  /**
   * 输入报价信息
   * @return void
   */
  priceInput(value) {
    value = handleMoney(value);
    this.setState({
      price: value,
    });
  }
  /**
   * 单选按钮
   * @param {Object} value 选择的哪一项
   * @param {Number} index 选的第几项下标
   * @return void
   */
  chooseRadio(value, index) {
    this.setState({
      usedType: value.id,
      radioActiveIndex: index,
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
   * ActionSheet被选则
   * @param {Number} index 被选中的下标
   * @return void
   */
  chooseActionSheet(index) {
    if (index === payWey.length) {
      return;
    }
    this.setState({
      payType: payWey[index].id,
    });
  }
  /**
   * 数字选择框
   * @param {Number | String} value 台数
   * @return void
   */
  numberInputChange(value) {
    this.setState({
      carAmount: value,
    });
  }
  /**
   * 显示时间选择框
   * @return void
   */
  handleShowDate(type) {
    this.dateChooseType = type;
    this.setState({
      datePickerShow: true,
    });
  }
  /**
   * 选择了时间
   * @param {String} time 参数描述
   * @return void
   */
  dateConfirm(time) {
    time = time && time.split(' ')[0];
    if (!time) {
      return;
    }
    let data = {};
    data[this.dateChooseType] = time;
    this.setState(data);
    this.dateCancel();
  }
  /**
   * 取消了选择
   * @param {String} time 参数描述
   * @return void
   */
  dateCancel() {
    this.dateChooseType = '';
    this.setState({
      datePickerShow: false,
    });
  }
  /**
   * 跳转到编辑备注
   * @return void
   */
  navigationToRemark() {
    NavigationUtil.goPage({}, 'RemarkPage');
  }
  navigationToChooseCity(type) {
    NavigationUtil.goPage({type}, 'ChooseCityPage');
  }
  cancel() {
    NavigationUtil.goBack(this.props.navigation);
  }
  submit() {
    let {
      sendCityId, // 发车城市
      receiveCityId, // 收车城市
      sendTime, // 预期发车时间
      carInfo, // 车辆信息
      usedType, // 车辆性质
      carAmount, // 台数
      dueTime, // 有效期
      price, // 报价
      payType, // 结算方式
      remark, // 备注
    } = this.state;
    if (
      !sendCityId ||
      !receiveCityId ||
      !sendTime ||
      !carInfo ||
      !usedType ||
      !carAmount ||
      !dueTime ||
      !payType
    ) {
      this.toastRef.current.show('请填写完整信息');
      return;
    }
    let sendData = {
      carAmount: carAmount,
      carInfo: carInfo,
      dueTime: dueTime,
      usedType: usedType,
      payType: payType,
      price: price * 100,
      receiveCityId: receiveCityId,
      remark: remark,
      sendCityId: sendCityId,
      sendTime: sendTime,
      userId: this.props.userInfo.userId,
      sourceId: 1,
    };
    if (this.pageParams && this.pageParams.pageType === 'edit') {
      this.editSellingData(sendData);
    } else {
      this.addSellingData(sendData);
    }
  }
  /**
   * 编辑卖板信息
   * @param {Object} sendData 请求参数
   * @return void
   */
  editSellingData(sendData) {
    let data = Object.assign({}, sendData, {
      saleToPalletId: this.pageParams.saleToPalletId,
    });
    api.selling.updateOneSellingData(data, this).then(() => {
      this.toastRef.current.show('编辑成功');
      DeviceEventEmitter.emit('refreshSelling');
      DeviceEventEmitter.emit('refreshSellingDetails');
      setTimeout(() => {
        NavigationUtil.goBack(this.props.navigation);
      }, 2000);
    });
  }
  /**
   * 卖板发布
   * @return void
   */
  addSellingData(sendData) {
    api.selling.addSellingData(sendData, this).then(() => {
      this.toastRef.current.show('发布成功');
      DeviceEventEmitter.emit('refreshSelling');
      setTimeout(() => {
        NavigationUtil.goBack(this.props.navigation);
      }, 2000);
    });
  }
  render() {
    const {theme, navigation} = this.props;
    let {
      carAmount,
      carInfo,
      dueTime,
      payType,
      receiveCityName,
      remark,
      sendCityName,
      sendTime,
      radioActiveIndex,
      price,
      datePickerShow,
    } = this.state;
    const payWeyText = payWey.filter(item => {
      return +item.id === +payType;
    })[0];
    let payWeyList = payWey.map(item => item.name);
    payWeyList.push('取消');
    let textClassName = [DetailsStyle.contentText];
    let textThemeDisabled = [
      DetailsStyle.contentText,
      DetailsStyle.textThemeDisabled,
    ];
    return (
      <SafeAreaViewPlus topColor={theme.themeColor}>
        <View style={styles.pageWrapper}>
          <NavigationBar
            navigation={navigation}
            leftViewShow={true}
            title={'卖板发布'}
          />
          <ScrollView>
            <View style={DetailsStyle.card}>
              {/* 发车城市 */}
              <View style={DetailsStyle.formItem}>
                <View style={DetailsStyle.formLabel}>
                  <Text style={DetailsStyle.isRequired}>*</Text>
                  <Text style={DetailsStyle.labelText}>发车城市:</Text>
                </View>
                <TouchableOpacity
                  onPress={this.navigationToChooseCity.bind(this, 'sendCity')}
                  style={DetailsStyle.formContent}>
                  <Text
                    style={sendCityName ? textClassName : textThemeDisabled}>
                    {sendCityName || '请选择发车城市'}
                  </Text>
                  <Text style={DetailsStyle.iconRight}>&#xe61d;</Text>
                </TouchableOpacity>
              </View>
              {/* 收车城市 */}
              <View style={DetailsStyle.formItem}>
                <View style={DetailsStyle.formLabel}>
                  <Text style={DetailsStyle.isRequired}>*</Text>
                  <Text style={DetailsStyle.labelText}>收车城市:</Text>
                </View>
                <TouchableOpacity
                  onPress={this.navigationToChooseCity.bind(
                    this,
                    'receiveCity',
                  )}
                  style={DetailsStyle.formContent}>
                  <Text
                    style={receiveCityName ? textClassName : textThemeDisabled}>
                    {receiveCityName || '请选择收车城市'}
                  </Text>
                  <Text style={DetailsStyle.iconRight}>&#xe61d;</Text>
                </TouchableOpacity>
              </View>
              {/* 预计发车时间 */}
              <View style={DetailsStyle.formItem}>
                <View style={DetailsStyle.formLabel}>
                  <Text style={DetailsStyle.isRequired}>*</Text>
                  <Text style={DetailsStyle.labelText}>预计发车时间:</Text>
                </View>
                <TouchableOpacity
                  onPress={this.handleShowDate.bind(this, 'sendTime')}
                  style={DetailsStyle.formContent}>
                  <Text
                    style={
                      sendTime.split('T')[0] ? textClassName : textThemeDisabled
                    }>
                    {sendTime.split('T')[0] || '请选择发车时间'}
                  </Text>
                  <Text style={DetailsStyle.iconRight}>&#xe61d;</Text>
                </TouchableOpacity>
              </View>
              {/* 车辆信息 */}
              <View style={DetailsStyle.formItem}>
                <View style={DetailsStyle.formLabel}>
                  <Text style={DetailsStyle.isRequired}>*</Text>
                  <Text style={DetailsStyle.labelText}>车辆信息:</Text>
                </View>
                <View style={DetailsStyle.formContent}>
                  <TextInput
                    style={DetailsStyle.textInput}
                    maxLength={20}
                    value={carInfo}
                    placeholderTextColor={GlobalStyles.themeDisabled}
                    placeholder={'请输入车辆信息，如大众'}
                    onChangeText={this.carInfoInput.bind(this)}
                  />
                </View>
              </View>
              {/* 车辆性质 */}
              <View style={DetailsStyle.formItem}>
                <View style={DetailsStyle.formLabel}>
                  <Text style={DetailsStyle.isRequired}>*</Text>
                  <Text style={DetailsStyle.labelText}>车辆性质:</Text>
                </View>
                <View style={DetailsStyle.formContent}>
                  <Radio
                    options={carNatureList}
                    activeIndex={radioActiveIndex}
                    onClick={this.chooseRadio.bind(this)}
                  />
                </View>
              </View>
              {/* 台数 */}
              <View style={DetailsStyle.formItem}>
                <View style={DetailsStyle.formLabel}>
                  <Text style={DetailsStyle.isRequired}>*</Text>
                  <Text style={DetailsStyle.labelText}>台数:</Text>
                </View>
                <View style={DetailsStyle.formContent}>
                  <NumberInput
                    initNumber={carAmount}
                    onInputTextChange={this.numberInputChange.bind(this)}
                  />
                  <Text style={DetailsStyle.unit}>台</Text>
                </View>
              </View>
              {/* 有效期至 */}
              <View style={DetailsStyle.formItem}>
                <View style={DetailsStyle.formLabel}>
                  <Text style={DetailsStyle.isRequired}>*</Text>
                  <Text style={DetailsStyle.labelText}>有效期至:</Text>
                </View>
                <TouchableOpacity
                  onPress={this.handleShowDate.bind(this, 'dueTime')}
                  style={DetailsStyle.formContent}>
                  <Text
                    style={
                      dueTime.split('T')[0] ? textClassName : textThemeDisabled
                    }>
                    {dueTime.split('T')[0] || '请选择发车时间'}
                  </Text>
                  <Text style={DetailsStyle.iconRight}>&#xe61d;</Text>
                </TouchableOpacity>
              </View>
              {/* 结算方式 */}
              <View style={DetailsStyle.formItem}>
                <View style={DetailsStyle.formLabel}>
                  <Text style={DetailsStyle.isRequired}>*</Text>
                  <Text style={DetailsStyle.labelText}>结算方式:</Text>
                </View>
                <TouchableOpacity
                  onPress={this.showActionSheet.bind(this)}
                  style={DetailsStyle.formContent}>
                  <Text
                    style={
                      payWeyText && payWeyText.name
                        ? textClassName
                        : textThemeDisabled
                    }>
                    {payWeyText ? payWeyText.name : '请选择结算方式'}
                  </Text>
                  <Text style={DetailsStyle.iconRight}>&#xe61d;</Text>
                </TouchableOpacity>
              </View>
              {/* 报价 */}
              <View style={DetailsStyle.formItem}>
                <View style={DetailsStyle.formLabel}>
                  <Text style={DetailsStyle.isRequired} />
                  <Text style={DetailsStyle.labelText}>报价:</Text>
                </View>
                <View style={DetailsStyle.formContent}>
                  <TextInput
                    style={DetailsStyle.textInput}
                    maxLength={8}
                    value={price}
                    keyboardType={'numeric'}
                    placeholderTextColor={GlobalStyles.themeDisabled}
                    placeholder={'请填写报价，不填默认私聊'}
                    onChangeText={this.priceInput.bind(this)}
                  />
                </View>
              </View>
              <View style={DetailsStyle.formItem}>
                <View style={DetailsStyle.formLabel}>
                  <Text style={DetailsStyle.isRequired} />
                  <Text style={DetailsStyle.labelText}>备注:</Text>
                </View>
                <TouchableOpacity
                  onPress={this.navigationToRemark.bind(this)}
                  style={[
                    DetailsStyle.formContent,
                    DetailsStyle.moreTextFormItem,
                  ]}>
                  <Text style={remark ? textClassName : textThemeDisabled}>
                    {remark || '请输入备注信息'}
                  </Text>
                  <Text style={DetailsStyle.iconRight}>&#xe61d;</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* button */}
            <View style={DetailsStyle.btnWrapper}>
              <Button
                type={'plain'}
                btnStyle={[DetailsStyle.btnLeft]}
                text={'取消'}
                onClick={this.cancel.bind(this)}
              />
              <Button
                btnStyle={[DetailsStyle.btnRight]}
                text={'提交'}
                type={'round'}
                onClick={this.submit.bind(this)}
              />
            </View>
            {/* 动作指示器 */}
            <ActionSheet
              ref={o => (this.ActionSheet = o)}
              title={'请选择结算方式'}
              options={payWeyList}
              tintColor={GlobalStyles.themeFontColor}
              cancelButtonIndex={payWeyList.length - 1}
              onPress={this.chooseActionSheet.bind(this)}
            />
            {/* 时间组件 */}
            <DatePicker
              isShow={datePickerShow}
              chooseBeforeTime={false}
              onConfirm={this.dateConfirm.bind(this)}
              onCancel={this.dateCancel.bind(this)}
            />
            <Toast
              ref={this.toastRef}
              position={'center'}
              defaultCloseDelay={3000}
            />
          </ScrollView>
        </View>
      </SafeAreaViewPlus>
    );
  }
}

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
// 如果需要引入store
const mapStateToProps = state => {
  return {
    userInfo: state.user_info.userInfo,
    theme: state.theme.theme,
  };
};
export default connect(mapStateToProps)(SellingPublish);
