/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-12-03 16:47:37
 * @LastEditors  : guorui
 * @LastEditTime : 2020-01-04 14:36:56
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
  Linking,
} from 'react-native';
import {connect} from 'react-redux';
import api from '../../api';
import GlobalStyles from '../../assets/css/GlobalStyles';
import DetailsStyle from '../../assets/css/DetailsStyle';
import BackPressComponent from '../../components/BackPressComponent/BackPressComponent';
import Authentication from '../../components/Authentication/Authentication';
import NavigationBar from '../../components/NavigatorBar/NavigationBar';
import NavigationUtil from '../../navigator/NavigationUtils';
import SafeAreaViewPlus from '../../components/SafeAreaViewPlus/SafeAreaViewPlus';
import DatePicker from '../../components/DatePicker/datePicker.js';
import Button from '../../components/Button/Button.js';
import {handleMoney} from '../../utils/patter.js';
import Toast from 'react-native-easy-toast';

class OfferDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datePickerShow: false,
      quotedPrice: '',
      dueTime: '',
      isShow: true,
      inquiryCode: '',
      inquiryId: '',
      carAmount: '',
      carInfo: '',
      inquiryTimeDesc: '',
      receiveCityName: '',
      sendCityName: '', // 发车城市
      sendTimeDesc: '', // 发车时间
      dueTimeDesc: '', //有效期
      homeDelivery: '0', //送车上门 0否 1是
      homeDeliveryDesc: '', //含送
      storePickup: '0',
      storePickupDesc: '',
      totalPriceDesc: '',
      quotedPriceDesc: '',
      quotedTimeDesc: '',
      statusDesc: '',
      orderCode: '',
      usedType: '1',
      status: '10',
      statusDescs: [],
    };
    this.backPress = new BackPressComponent({
      backPress: () => this.onBackPress(),
    });
    this.pageParams = {};
    this.mobile = '';
    this.toastRef = React.createRef();
  }

  componentDidMount() {
    const {navigation} = this.props;
    const {state} = navigation;
    const {params} = state;
    console.log('params', params);
    this.pageParams = params || {};
    this.initData();
    this.backPress.componentDidMount();
  }

  componentWillUnmount() {
    this.backPress.componentWillUnmount();
  }

  onBackPress() {
    const {navigation} = this.props;
    navigation.goBack();
    return true;
  }
  initData() {
    this.getOfferDetails();
    this.setState({
      status: this.pageParams.status || 10,
    });
  }
  getOfferDetails() {
    if (
      this.pageParams &&
      !this.pageParams.objectId &&
      !this.pageParams.inquiryCode
    ) {
      this.toastRef.current.show('缺少objectId或inquiryCode');
      return;
    }
    if (this.pageParams.inquiryCode) {
      let sendData = {
        inquiryCode: this.pageParams.inquiryCode,
      };
      api.offer.getOfferDetailByCode(sendData, this).then(res => {
        if (!res.data) {
          return;
        }
        this.handleReturnData(res.data);
      });
    } else if (this.pageParams.objectId) {
      let sendData = {
        inquiryId: this.pageParams.objectId,
      };
      api.offer.getOfferDetailById(sendData, this).then(res => {
        if (!res.data) {
          return;
        }
        this.handleReturnData(res.data);
      });
    }
  }
  /**
   * 处理返回的数据
   * @param {Type} res 返回值
   * @return void
   */
  handleReturnData(res) {
    this.setState(res);
    this.mobile = res.mobile;
    this.pageParams.inquiry_code = res.inquiryCode;
  }
  /**
   * 输入报价
   * @param {String} value 输入框内容
   * @return void
   */
  offerText(value) {
    value = handleMoney(value);
    let {carAmount} = this.state;
    this.setState({
      quotedPrice: value,
      totalPriceDesc: value * carAmount,
    });
  }
  call() {
    const tel = `tel:${this.mobile}`;
    Linking.canOpenURL(tel)
      .then(supported => {
        if (!supported) {
          console.log('Can not handle tel:' + tel);
        } else {
          return Linking.openURL(tel);
        }
      })
      .catch(error => console.log('tel error', error));
  }
  quote() {
    let {inquiryCode, inquiryId, quotedPrice, dueTime} = this.state;
    // if (+this.props.userInfo.realNameAuthStatus < 1) {
    //   this.setState({
    //     isShow: true,
    //   });
    //   return;
    // }
    if (!Number(quotedPrice)) {
      this.toastRef.current.show('请输入正确的金额格式');
      return;
    }
    if (!quotedPrice) {
      this.toastRef.current.show('报价金额不能为空');
      return;
    }
    if (quotedPrice <= 0) {
      this.toastRef.current.show('报价金额不能小于或等于0');
      return;
    }
    if (!dueTime) {
      this.toastRef.current.show('请选择报价有效期');
      return;
    }
    let sendData = {
      inquiryCode,
      inquiryId,
      quotedPrice: quotedPrice * 100,
      dueTime,
    };
    console.log('sendData', sendData);
    api.offer.submitOfferData(sendData, this).then(res => {
      if (!res) {
        return;
      }
      this.toastRef.current.show('提交成功');
      this.getOfferDetails();
    });
  }
  handleShowDate() {
    this.setState({
      datePickerShow: true,
    });
  }
  dateConfirm(time) {
    this.setState({
      dueTime: time && time.split(' ')[0],
    });
    this.dateCancel();
  }
  dateCancel() {
    this.setState({
      datePickerShow: false,
    });
  }
  /**
   * 查看订单详情
   * @return void
   */
  navigateToOrder() {
    NavigationUtil.goPage(
      {orderCode: this.state.orderCode},
      'OrderDetailsPage',
    );
  }
  render() {
    const {theme, navigation} = this.props;
    let {
      carAmount,
      carInfo,
      inquiryTimeDesc,
      receiveCityName,
      sendCityName,
      homeDelivery,
      homeDeliveryDesc,
      storePickup,
      storePickupDesc,
      sendTimeDesc,
      dueTime,
      dueTimeDesc,
      totalPriceDesc,
      quotedPriceDesc,
      quotedPrice,
      statusDesc,
      quotedTimeDesc,
      usedType,
      status,
      datePickerShow,
      statusDescs,
      isShow,
    } = this.state;
    let statusClassName = [DetailsStyle.contentText];
    if (status === 10) {
      statusClassName.push(DetailsStyle.noOffer);
    } else if (status === 20) {
      statusClassName.push(DetailsStyle.hasOffer);
    }
    const offerWrapperClassName = [DetailsStyle.card, {marginTop: 16}];
    let btnStyle = [];
    if (status === 10) {
      btnStyle = [DetailsStyle.btnLeft];
    }
    return (
      <SafeAreaViewPlus topColor={theme.themeColor}>
        <View style={styles.pageWrapper}>
          <NavigationBar
            navigation={navigation}
            leftViewShow={true}
            title={'报价详情'}
          />
          {/* 实名认证弹框 */}
          {isShow ? <Authentication /> : null}
          <ScrollView>
            {statusDescs && statusDescs.length ? (
              <View style={styles.statusWrapper}>
                <View style={styles.statusStyle}>
                  <Text style={styles.statusIcon}>&#xe658;</Text>
                  <Text style={styles.statusText}>{statusDescs[0].name}</Text>
                </View>
                <TouchableOpacity onPress={this.navigateToOrder.bind(this)}>
                  <View style={styles.seeStyle}>
                    <Text style={styles.textStyle}>查看</Text>
                    <Text style={styles.iconStyle}>&#xe61d;</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ) : null}
            <View style={DetailsStyle.card}>
              {/* 报价状态 */}
              <View style={DetailsStyle.formItem}>
                <View style={DetailsStyle.formLabel}>
                  <Text style={DetailsStyle.labelText}>报价状态:</Text>
                </View>
                <View style={DetailsStyle.formContent}>
                  <Text style={statusClassName}>{statusDesc || ''}</Text>
                </View>
              </View>
              {/* 报价 */}
              {status === 20 && (
                <View style={DetailsStyle.formItem}>
                  <View style={DetailsStyle.formLabel}>
                    <Text style={DetailsStyle.labelText}>报价:</Text>
                  </View>
                  <View style={DetailsStyle.formContent}>
                    <Text style={DetailsStyle.contentText}>
                      {quotedPriceDesc || ''} 元/台
                    </Text>
                  </View>
                </View>
              )}
              {/* 总价 */}
              {status === 20 && (
                <View style={DetailsStyle.formItem}>
                  <View style={DetailsStyle.formLabel}>
                    <Text style={DetailsStyle.labelText}>总价:</Text>
                  </View>
                  <View style={DetailsStyle.formContent}>
                    <Text style={DetailsStyle.contentText}>
                      ￥{totalPriceDesc || ''}
                    </Text>
                  </View>
                </View>
              )}
              {/* 报价时间 */}
              {status === 20 && (
                <View style={DetailsStyle.formItem}>
                  <View style={DetailsStyle.formLabel}>
                    <Text style={DetailsStyle.labelText}>报价时间:</Text>
                  </View>
                  <View style={DetailsStyle.formContent}>
                    <Text style={DetailsStyle.contentText}>
                      {quotedTimeDesc || ''}
                    </Text>
                  </View>
                </View>
              )}
              {/* 有效期至 */}
              {status === 20 && (
                <View style={DetailsStyle.formItem}>
                  <View style={DetailsStyle.formLabel}>
                    <Text style={DetailsStyle.labelText}>有效期至:</Text>
                  </View>
                  <View style={DetailsStyle.formContent}>
                    <Text style={DetailsStyle.contentText}>
                      {dueTimeDesc || ''}
                    </Text>
                  </View>
                </View>
              )}
              {/* 发车时间 */}
              <View style={DetailsStyle.formItem}>
                <View style={DetailsStyle.formLabel}>
                  <Text style={DetailsStyle.labelText}>预计发车时间:</Text>
                </View>
                <View style={DetailsStyle.formContent}>
                  <Text style={DetailsStyle.contentText}>
                    {sendTimeDesc || ''}
                  </Text>
                </View>
              </View>
              {/* 发车城市 */}
              <View style={DetailsStyle.formItem}>
                <View style={DetailsStyle.formLabel}>
                  <Text style={DetailsStyle.labelText}>发车城市:</Text>
                </View>
                <View style={DetailsStyle.formContent}>
                  <Text style={DetailsStyle.contentText}>
                    {sendCityName || ''}
                  </Text>
                </View>
              </View>
              {/* 收车城市 */}
              <View style={DetailsStyle.formItem}>
                <View style={DetailsStyle.formLabel}>
                  <Text style={DetailsStyle.labelText}>收车城市:</Text>
                </View>
                <View style={DetailsStyle.formContent}>
                  <Text style={DetailsStyle.contentText}>
                    {receiveCityName || ''}
                  </Text>
                </View>
              </View>
              {/* 服务 */}
              {storePickup || homeDelivery ? (
                <View style={DetailsStyle.formItem}>
                  <View style={DetailsStyle.formLabel}>
                    <Text style={DetailsStyle.labelText}>服务:</Text>
                  </View>
                  <View style={DetailsStyle.formContent}>
                    <Text style={DetailsStyle.contentText}>
                      {storePickup ? storePickupDesc : ''}
                      {storePickup && homeDelivery ? '，' : ''}
                      {homeDelivery ? homeDeliveryDesc : ''}
                    </Text>
                  </View>
                </View>
              ) : null}
              {/* 车辆信息 */}
              <View
                style={[DetailsStyle.formItem, DetailsStyle.moreTextFormItem]}>
                <View style={DetailsStyle.formLabel}>
                  <Text style={DetailsStyle.labelText}>车辆信息:</Text>
                </View>
                <View style={DetailsStyle.formContent}>
                  <Text style={DetailsStyle.contentText}>{carInfo || ''}</Text>
                </View>
              </View>
              {/* 车辆类型 */}
              <View style={DetailsStyle.formItem}>
                <View style={DetailsStyle.formLabel}>
                  <Text style={DetailsStyle.labelText}>车辆类型:</Text>
                </View>
                <View style={DetailsStyle.formContent}>
                  <Text style={DetailsStyle.contentText}>
                    {usedType === 1 ? '新车' : '二手车'}
                  </Text>
                </View>
              </View>
              {/* 台数信息 */}
              <View style={DetailsStyle.formItem}>
                <View style={DetailsStyle.formLabel}>
                  <Text style={DetailsStyle.labelText}>台数:</Text>
                </View>
                <View style={DetailsStyle.formContent}>
                  <Text style={DetailsStyle.contentText}>
                    {carAmount || ''}台
                  </Text>
                </View>
              </View>
              {/* 台数信息 */}
              <View style={DetailsStyle.formItem}>
                <View style={DetailsStyle.formLabel}>
                  <Text style={DetailsStyle.labelText}>询价时间:</Text>
                </View>
                <View style={DetailsStyle.formContent}>
                  <Text style={DetailsStyle.contentText}>
                    {inquiryTimeDesc || ''}
                  </Text>
                </View>
              </View>
            </View>
            {status === 10 && (
              <View style={offerWrapperClassName}>
                {/* 报价 */}
                <View style={DetailsStyle.formItem}>
                  <View style={DetailsStyle.formLabel}>
                    <Text style={DetailsStyle.labelText}>报价:</Text>
                  </View>
                  <View style={DetailsStyle.formContent}>
                    <TextInput
                      style={styles.offerInput}
                      maxLength={8}
                      value={quotedPrice}
                      keyboardType={'numeric'}
                      onChangeText={this.offerText.bind(this)}
                    />
                    <Text style={DetailsStyle.contentText}>元/台</Text>
                  </View>
                </View>
                {/* 有效期 */}
                <View style={DetailsStyle.formItem}>
                  <View style={DetailsStyle.formLabel}>
                    <Text style={DetailsStyle.labelText}>有效期至:</Text>
                  </View>
                  <TouchableOpacity
                    style={DetailsStyle.formContent}
                    onPress={() => this.handleShowDate()}>
                    {dueTime ? (
                      <Text style={DetailsStyle.contentText}>
                        {dueTime}
                        <Text style={DetailsStyle.iconRight}>&#xe61d;</Text>
                      </Text>
                    ) : (
                      <Text
                        style={[
                          DetailsStyle.contentText,
                          DetailsStyle.waitColor,
                        ]}>
                        请选择
                        <Text style={DetailsStyle.iconRight}>&#xe61d;</Text>
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
                {/* 总价 */}
                {quotedPrice > 0 && (
                  <View style={DetailsStyle.formItem}>
                    <View style={DetailsStyle.formLabel}>
                      <Text style={DetailsStyle.labelText}>总价:</Text>
                    </View>
                    <View style={DetailsStyle.formContent}>
                      <Text
                        style={[
                          DetailsStyle.contentText,
                          DetailsStyle.hasOffer,
                        ]}>
                        ￥{totalPriceDesc || ''}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            )}
            <DatePicker
              isShow={datePickerShow}
              chooseBeforeTime={false}
              onConfirm={this.dateConfirm.bind(this)}
              onCancel={this.dateCancel.bind(this)}
            />
            <View style={DetailsStyle.btnWrapper}>
              <Button
                type={'plain'}
                btnStyle={btnStyle}
                text={'电话联系'}
                onClick={this.call.bind(this)}
              />
              {status === 10 && (
                <Button
                  btnStyle={[DetailsStyle.btnRight]}
                  text={'报价'}
                  type={'round'}
                  onClick={this.quote.bind(this)}
                />
              )}
            </View>
          </ScrollView>
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
    backgroundColor: '#f5f5f5',
  },
  offerInput: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#f5f5f5',
    borderRadius: 4,
    minWidth: 75,
    padding: 0,
    paddingHorizontal: 8,
    height: 30,
    marginRight: 6,
    textAlign: 'center',
    color: GlobalStyles.themeFontColor,
    fontSize: 15,
  },
  statusWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 28,
    paddingTop: 18,
  },
  statusStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  statusIcon: {
    fontFamily: 'iconfont',
    fontSize: 20,
    color: GlobalStyles.themeSubColor,
    marginRight: 4,
  },
  statusText: {
    fontSize: 18,
    fontWeight: '700',
    color: GlobalStyles.themeFontColor,
  },
  seeStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  textStyle: {
    fontSize: 14,
    color: GlobalStyles.themeSubColor,
  },
  iconStyle: {
    fontFamily: 'iconfont',
    fontSize: 12,
    color: GlobalStyles.themeSubColor,
  },
});
// 如果需要引入store
const mapStateToProps = state => {
  return {
    userInfo: state.user_info.userInfo,
    theme: state.theme.theme,
  };
};
export default connect(mapStateToProps)(OfferDetails);
