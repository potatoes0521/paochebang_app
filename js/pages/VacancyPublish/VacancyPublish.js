/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2019-12-29 11:26:06
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-01-02 15:20:21
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
import {handleMoney} from '../../utils/patter.js';
import NumberInput from '../../components/NumberInput/NumberInput';
import DatePicker from '../../components/DatePicker/datePicker.js';

class VacancyPublish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vacantAmount: '1', // 空位数
      startTime: '', // 预期发车时间
      isActive: 1, // 订单状态
      returnPrice: '',
      dueTime: '', // 有效期
      receiveCityName: '', // 收车城市
      remark: '', // 备注
      sendCityName: '', // 发车城市
      throughCitys: '',
      vacantPalletId: '', // 卖板信息ID
      isEdit: '', // 是否可编辑
      disabled: true,
      startTimerInit: '', // 初始化时间
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
    if (this.pageParams && this.pageParams.vacantPalletId) {
      this.getVacancyDetail();
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
  getVacancyDetail() {
    if (!this.pageParams.vacantPalletId) {
      this.toastRef.current.show('缺少vacantPalletId或vacantPalletCode');
      return;
    }
    let sendData = {
      id: this.pageParams.vacantPalletId,
    };
    api.vacancy.getVacancyDetail(sendData, this).then(res => {
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
   * 数字选择框
   * @param {Number | String} value 台数
   * @return void
   */
  numberInputChange(value) {
    this.setState({
      vacantAmount: value,
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
      vacantAmount, // 台数
      startTime, // 预期发车时间
      dueTime, // 有效期
      price, // 报价
      remark, // 备注
      receiveCityId, // 收车城市
      sendCityId, // 发车城市
      throughCitys, // 途经城市
    } = this.state;
    if (
      !sendCityId ||
      !receiveCityId ||
      !startTime ||
      !vacantAmount ||
      !dueTime
    ) {
      this.toastRef.current.show('请填写完整信息');
      return;
    }
    let sendData = {
      vacantAmount: vacantAmount,
      dueTime: dueTime,
      price: price * 100,
      receiveCityId: receiveCityId,
      throughCitys: throughCitys ? throughCitys.toString() : '',
      remark: remark,
      sendCityId: sendCityId,
      startTime: startTime,
      userId: this.props.userInfo.userId,
      sourceId: 1,
    };
    if (this.pageParams.pageType === 'edit') {
      this.editVacancyData(sendData);
    } else {
      this.addVacancyData(sendData);
    }
  }
  /**
   * 编辑卖板信息
   * @param {Object} sendData 请求参数
   * @return void
   */
  editVacancyData(sendData) {
    let data = Object.assign({}, sendData, {
      vacantPalletId: this.pageParams.vacantPalletId,
    });
    api.vacancy.updateOneVacancyData(data, this).then(() => {
      this.toastRef.current.show('编辑成功');
      DeviceEventEmitter.emit('refreshVacancy');
      DeviceEventEmitter.emit('refreshVacancyDetails');
      setTimeout(() => {
        NavigationUtil.goBack(this.props.navigation);
      }, 2000);
    });
  }
  /**
   * 卖板发布
   * @return void
   */
  addVacancyData(sendData) {
    api.vacancy.addVacancyData(sendData, this).then(() => {
      this.toastRef.current.show('发布成功');
      DeviceEventEmitter.emit('refreshVacancy');
      setTimeout(() => {
        NavigationUtil.goBack(this.props.navigation);
      }, 2000);
    });
  }
  render() {
    const {theme, navigation} = this.props;
    let {
      vacantAmount,
      dueTime,
      receiveCityName,
      remark,
      sendCityName,
      startTime,
      price,
      datePickerShow,
    } = this.state;
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
            title={'空位发布'}
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
              {/* 途径城市 */}
              <View style={DetailsStyle.formItem}>
                <View style={DetailsStyle.formLabel}>
                  <Text style={DetailsStyle.isRequired} />
                  <Text style={DetailsStyle.labelText}>途径城市:</Text>
                </View>
                <TouchableOpacity
                  onPress={this.navigationToChooseCity.bind(
                    this,
                    'receiveCity',
                  )}
                  style={DetailsStyle.formContent}>
                  <Text
                    style={receiveCityName ? textClassName : textThemeDisabled}>
                    {receiveCityName || '请选择途径城市'}
                  </Text>
                  <Text style={DetailsStyle.iconRight}>&#xe61d;</Text>
                </TouchableOpacity>
              </View>
              {/* 预计发车时间 */}
              <View style={DetailsStyle.formItem}>
                <View style={DetailsStyle.formLabel}>
                  <Text style={DetailsStyle.isRequired}>*</Text>
                  <Text style={DetailsStyle.labelText}>出发时间:</Text>
                </View>
                <TouchableOpacity
                  onPress={this.handleShowDate.bind(this, 'startTime')}
                  style={DetailsStyle.formContent}>
                  <Text
                    style={
                      startTime.split('T')[0]
                        ? textClassName
                        : textThemeDisabled
                    }>
                    {startTime.split('T')[0] || '请选择发车时间'}
                  </Text>
                  <Text style={DetailsStyle.iconRight}>&#xe61d;</Text>
                </TouchableOpacity>
              </View>
              {/* 台数 */}
              <View style={DetailsStyle.formItem}>
                <View style={DetailsStyle.formLabel}>
                  <Text style={DetailsStyle.isRequired}>*</Text>
                  <Text style={DetailsStyle.labelText}>余位:</Text>
                </View>
                <View style={DetailsStyle.formContent}>
                  <NumberInput
                    initNumber={vacantAmount}
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
export default connect(mapStateToProps)(VacancyPublish);
