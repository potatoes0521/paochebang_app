/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2019-12-29 11:26:06
 * @LastEditors  : liuYang
 * @LastEditTime : 2019-12-30 16:51:01
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
import DetailsStyles from '../../assets/css/detailsStyles1';
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
      carAmount: '', // 空位数
      carInfo: '', // 车辆信息
      dueTime: '', // 有效期
      isActive: 1, // 订单状态
      payType: '', // 支付方式
      returnPrice: '',
      pubTime: '', // 发布时间
      receiveCityName: '', // 收车城市
      remarks: '', // 备注
      sendCityName: '', // 发车城市
      sendTime: '', // 发车时间
      saleToPalletId: '', // 卖板信息ID
      isEdit: '', // 是否可编辑
      usedType: '', // 车辆性质
      disabled: true,
      sendTimerInit: '', // 初始化时间
    };
    this.backPress = new BackPressComponent({
      backPress: () => this.onBackPress(),
    });
    this.pageParams = {};
    this.dateChooseType = '';
  }

  componentDidMount() {
    const {navigation} = this.props;
    const {state} = navigation;
    const {params} = state;
    console.log('params', params);
    this.handleEmit();
    if (this.pageParams && this.pageParams.pageType === 'edit') {
      this.getSellingDetail();
    }

    this.backPress.componentDidMount();
  }

  componentWillUnmount() {
    this.emitRemark.remove(); // 销毁要接受的通知
    this.backPress.componentWillUnmount();
  }

  onBackPress() {
    NavigationUtil.goBack(this.props.navigation);
    return true;
  }
  handleEmit() {
    this.emitRemark = DeviceEventEmitter.addListener('submitRemark', data => {
      this.setState({
        remarks: data,
      });
    });
  }
  getSellingDetail() {}
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
  chooseActionSheet(index) {
    if (index === payWey.length) {
      return;
    }
    this.setState({
      payType: payWey[index].id,
    });
  }
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
  navigationToRemark() {
    NavigationUtil.goPage({}, 'RemarkPage');
  }
  cancel() {}
  submit() {}
  render() {
    const {theme, navigation} = this.props;
    let {
      carAmount,
      carInfo,
      dueTime,
      isActive,
      payType,
      returnPrice,
      pubTime,
      receiveCityName,
      remarks,
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
    let textClassName = [DetailsStyles.contentText];
    let textThemeDisabled = [
      DetailsStyles.contentText,
      DetailsStyles.textThemeDisabled,
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
            <View style={DetailsStyles.card}>
              {/* 发车城市 */}
              <View style={DetailsStyles.formItem}>
                <View style={DetailsStyles.formLabel}>
                  <Text style={DetailsStyles.labelText}>发车城市:</Text>
                </View>
                <View style={DetailsStyles.formContent}>
                  <Text
                    style={sendCityName ? textClassName : textThemeDisabled}>
                    {sendCityName || '请选择发车城市'}
                  </Text>
                  <Text style={DetailsStyles.iconRight}>&#xe61d;</Text>
                </View>
              </View>
              {/* 收车城市 */}
              <View style={DetailsStyles.formItem}>
                <View style={DetailsStyles.formLabel}>
                  <Text style={DetailsStyles.labelText}>收车城市:</Text>
                </View>
                <View style={DetailsStyles.formContent}>
                  <Text
                    style={receiveCityName ? textClassName : textThemeDisabled}>
                    {receiveCityName || '请选择收车城市'}
                  </Text>
                  <Text style={DetailsStyles.iconRight}>&#xe61d;</Text>
                </View>
              </View>
              {/* 预计发车时间 */}
              <View style={DetailsStyles.formItem}>
                <View style={DetailsStyles.formLabel}>
                  <Text style={DetailsStyles.labelText}>预计发车时间:</Text>
                </View>
                <TouchableOpacity
                  onPress={this.handleShowDate.bind(this, 'sendTime')}
                  style={DetailsStyles.formContent}>
                  <Text
                    style={
                      sendTime.split('T')[0] ? textClassName : textThemeDisabled
                    }>
                    {sendTime.split('T')[0] || '请选择发车时间'}
                  </Text>
                  <Text style={DetailsStyles.iconRight}>&#xe61d;</Text>
                </TouchableOpacity>
              </View>
              {/* 车辆信息 */}
              <View style={DetailsStyles.formItem}>
                <View style={DetailsStyles.formLabel}>
                  <Text style={DetailsStyles.labelText}>车辆信息:</Text>
                </View>
                <View style={DetailsStyles.formContent}>
                  <TextInput
                    style={DetailsStyles.textInput}
                    maxLength={20}
                    value={carInfo}
                    placeholderTextColor={GlobalStyles.themeDisabled}
                    placeholder={'请输入车辆信息，如大众迈腾'}
                    onChangeText={this.carInfoInput.bind(this)}
                  />
                </View>
              </View>
              {/* 车辆性质 */}
              <View style={DetailsStyles.formItem}>
                <View style={DetailsStyles.formLabel}>
                  <Text style={DetailsStyles.labelText}>车辆性质:</Text>
                </View>
                <View style={DetailsStyles.formContent}>
                  <Radio
                    options={carNatureList}
                    activeIndex={radioActiveIndex}
                    onClick={this.chooseRadio.bind(this)}
                  />
                </View>
              </View>
              {/* 台数 */}
              <View style={DetailsStyles.formItem}>
                <View style={DetailsStyles.formLabel}>
                  <Text style={DetailsStyles.labelText}>台数:</Text>
                </View>
                <View style={DetailsStyles.formContent}>
                  <NumberInput
                    initNumber={carAmount}
                    onInputTextChange={this.numberInputChange.bind(this)}
                  />
                  <Text style={DetailsStyles.unit}>台</Text>
                </View>
              </View>
              {/* 结算方式 */}
              <View style={DetailsStyles.formItem}>
                <View style={DetailsStyles.formLabel}>
                  <Text style={DetailsStyles.labelText}>结算方式:</Text>
                </View>
                <TouchableOpacity
                  onPress={this.showActionSheet.bind(this)}
                  style={DetailsStyles.formContent}>
                  <Text
                    style={
                      payWeyText && payWeyText.name
                        ? textClassName
                        : textThemeDisabled
                    }>
                    {payWeyText ? payWeyText.name : '请选择结算方式'}
                  </Text>
                  <Text style={DetailsStyles.iconRight}>&#xe61d;</Text>
                </TouchableOpacity>
              </View>
              {/* 报价 */}
              <View style={DetailsStyles.formItem}>
                <View style={DetailsStyles.formLabel}>
                  <Text style={DetailsStyles.labelText}>报价:</Text>
                </View>
                <View style={DetailsStyles.formContent}>
                  <TextInput
                    style={DetailsStyles.textInput}
                    maxLength={8}
                    value={price}
                    keyboardType={'numeric'}
                    placeholderTextColor={GlobalStyles.themeDisabled}
                    placeholder={'请填写报价，不填默认私聊'}
                    onChangeText={this.priceInput.bind(this)}
                  />
                </View>
              </View>
              {/* 有效期至 */}
              <View style={DetailsStyles.formItem}>
                <View style={DetailsStyles.formLabel}>
                  <Text style={DetailsStyles.labelText}>有效期至:</Text>
                </View>
                <TouchableOpacity
                  onPress={this.handleShowDate.bind(this, 'dueTime')}
                  style={DetailsStyles.formContent}>
                  <Text
                    style={
                      dueTime.split('T')[0] ? textClassName : textThemeDisabled
                    }>
                    {dueTime.split('T')[0] || '请选择发车时间'}
                  </Text>
                  <Text style={DetailsStyles.iconRight}>&#xe61d;</Text>
                </TouchableOpacity>
              </View>
              <View style={DetailsStyles.formItem}>
                <View style={DetailsStyles.formLabel}>
                  <Text style={DetailsStyles.labelText}>备注:</Text>
                </View>
                <TouchableOpacity
                  onPress={this.navigationToRemark.bind(this)}
                  style={[
                    DetailsStyles.formContent,
                    DetailsStyles.moreTextFormItem,
                  ]}>
                  <Text style={remarks ? textClassName : textThemeDisabled}>
                    {remarks || '请输入备注信息'}
                  </Text>
                  <Text style={DetailsStyles.iconRight}>&#xe61d;</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* button */}
            <View style={DetailsStyles.btnWrapper}>
              <Button
                type={'plain'}
                btnStyle={[DetailsStyles.btnLeft]}
                text={'取消'}
                onClick={this.cancel.bind(this)}
              />
              <Button
                btnStyle={[DetailsStyles.btnRight]}
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
