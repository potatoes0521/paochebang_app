/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-12-03 16:47:37
 * @LastEditors  : liuYang
 * @LastEditTime : 2019-12-19 11:30:05
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
  Button,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import GlobalStyles from '../../assets/css/GlobalStyles';
import DetailsStyles from '../../assets/css/detailsStyles';
import BackPressComponent from '../../components/BackPressComponent/BackPressComponent';
import NavigationBar from '../../components/NavigatorBar/NavigationBar';
import SafeAreaViewPlus from '../../components/SafeAreaViewPlus/SafeAreaViewPlus';
import api from '../../api';
import DatePicker from '../../components/DatePicker/datePicker.js';
class OfferDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datePickerShow: false,
    };
    this.backPress = new BackPressComponent({
      backPress: () => this.onBackPress(),
    });
    this.pageParams = {};
    this.quotePrice = '';
  }

  componentDidMount() {
    const {navigation} = this.props;
    const {state} = navigation;
    const {params} = state;
    console.log('params', params);
    this.pageParams = params;
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
    this.setState(
      {
        status: this.pageParams.offerStatus,
      },
      () => {
        this.getOfferDetails();
      },
    );
  }
  getOfferDetails() {
    if (!this.pageParams.objectId && !this.pageParams.inquiryCode) {
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
    this.setState(res, () => {
      console.log('state', this.state);
    });
    this.pageParams.inquiry_code = res.inquiryCode;
  }
  offerText(value) {
    console.log('text', value);
    this.quotePrice = value;
  }
  handleShowDate() {
    this.setState({
      datePickerShow: true,
    });
  }
  dateConfirm(time) {
    this.dateCancel();
  }
  dateCancel() {
    this.setState({
      datePickerShow: false,
    });
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
      dueTimerInit,
      dueTimeDesc,
      totalPriceDesc,
      quotedPriceDesc,
      quotedPrice,
      statusDesc,
      quotedTimeDesc,
      usedType,
      status,
      isShow,
      statusDescs,
      datePickerShow,
    } = this.state;
    let statusClassName = [DetailsStyles.contentText];
    if (status === 10) {
      statusClassName.push(DetailsStyles.noOffer);
    } else if (status === 20) {
      statusClassName.push(DetailsStyles.hasOffer);
    }
    const offerWrapperClassName = [DetailsStyles.card, {marginTop: 16}];
    return (
      <SafeAreaViewPlus topColor={theme.themeColor}>
        <View style={styles.pageWrapper}>
          <NavigationBar
            navigation={navigation}
            leftViewShow={true}
            title={'报价详情'}
          />
          <ScrollView>
            <View style={DetailsStyles.card}>
              {/* 报价状态 */}
              <View style={DetailsStyles.formItem}>
                <View style={DetailsStyles.formLabel}>
                  <Text style={DetailsStyles.labelText}>报价状态:</Text>
                </View>
                <View style={DetailsStyles.formContent}>
                  <Text style={statusClassName}>{statusDesc || ''}</Text>
                </View>
              </View>
              {/* 报价 */}
              {status === 20 && (
                <View style={DetailsStyles.formItem}>
                  <View style={DetailsStyles.formLabel}>
                    <Text style={DetailsStyles.labelText}>报价:</Text>
                  </View>
                  <View style={DetailsStyles.formContent}>
                    <Text style={DetailsStyles.contentText}>
                      {quotedPriceDesc || ''} 元/台
                    </Text>
                  </View>
                </View>
              )}
              {/* 总价 */}
              {status === 20 && (
                <View style={DetailsStyles.formItem}>
                  <View style={DetailsStyles.formLabel}>
                    <Text style={DetailsStyles.labelText}>总价:</Text>
                  </View>
                  <View style={DetailsStyles.formContent}>
                    <Text style={DetailsStyles.contentText}>
                      ￥{totalPriceDesc || ''}
                    </Text>
                  </View>
                </View>
              )}
              {/* 报价时间 */}
              {status === 20 && (
                <View style={DetailsStyles.formItem}>
                  <View style={DetailsStyles.formLabel}>
                    <Text style={DetailsStyles.labelText}>报价时间:</Text>
                  </View>
                  <View style={DetailsStyles.formContent}>
                    <Text style={DetailsStyles.contentText}>
                      {quotedTimeDesc || ''}
                    </Text>
                  </View>
                </View>
              )}
              {/* 有效期至 */}
              {status === 20 && (
                <View style={DetailsStyles.formItem}>
                  <View style={DetailsStyles.formLabel}>
                    <Text style={DetailsStyles.labelText}>有效期至:</Text>
                  </View>
                  <View style={DetailsStyles.formContent}>
                    <Text style={DetailsStyles.contentText}>
                      {dueTimeDesc || ''}
                    </Text>
                  </View>
                </View>
              )}
              {/* 发车时间 */}
              <View style={DetailsStyles.formItem}>
                <View style={DetailsStyles.formLabel}>
                  <Text style={DetailsStyles.labelText}>预计发车时间:</Text>
                </View>
                <View style={DetailsStyles.formContent}>
                  <Text style={DetailsStyles.contentText}>
                    {sendTimeDesc || ''}
                  </Text>
                </View>
              </View>
              {/* 发车城市 */}
              <View style={DetailsStyles.formItem}>
                <View style={DetailsStyles.formLabel}>
                  <Text style={DetailsStyles.labelText}>发车城市:</Text>
                </View>
                <View style={DetailsStyles.formContent}>
                  <Text style={DetailsStyles.contentText}>
                    {sendCityName || ''}
                  </Text>
                </View>
              </View>
              {/* 收车城市 */}
              <View style={DetailsStyles.formItem}>
                <View style={DetailsStyles.formLabel}>
                  <Text style={DetailsStyles.labelText}>收车城市:</Text>
                </View>
                <View style={DetailsStyles.formContent}>
                  <Text style={DetailsStyles.contentText}>
                    {receiveCityName || ''}
                  </Text>
                </View>
              </View>
              {/* 服务 */}
              {(storePickup || homeDelivery) && (
                <View style={DetailsStyles.formItem}>
                  <View style={DetailsStyles.formLabel}>
                    <Text style={DetailsStyles.labelText}>服务:</Text>
                  </View>
                  <View style={DetailsStyles.formContent}>
                    <Text style={DetailsStyles.contentText}>
                      {storePickup ? storePickupDesc : ''}
                      {storePickup && homeDelivery ? '，' : ''}
                      {homeDelivery ? homeDeliveryDesc : ''}
                    </Text>
                  </View>
                </View>
              )}
              {/* 车辆信息 */}
              <View style={DetailsStyles.formItem}>
                <View style={DetailsStyles.formLabel}>
                  <Text style={DetailsStyles.labelText}>车辆信息:</Text>
                </View>
                <View style={DetailsStyles.formContent}>
                  <Text style={DetailsStyles.contentText}>{carInfo || ''}</Text>
                </View>
              </View>
              {/* 台数信息 */}
              <View style={DetailsStyles.formItem}>
                <View style={DetailsStyles.formLabel}>
                  <Text style={DetailsStyles.labelText}>台数:</Text>
                </View>
                <View style={DetailsStyles.formContent}>
                  <Text style={DetailsStyles.contentText}>
                    {carAmount || ''}台
                  </Text>
                </View>
              </View>
              {/* 台数信息 */}
              <View style={DetailsStyles.formItem}>
                <View style={DetailsStyles.formLabel}>
                  <Text style={DetailsStyles.labelText}>询价时间:</Text>
                </View>
                <View style={DetailsStyles.formContent}>
                  <Text style={DetailsStyles.contentText}>
                    {inquiryTimeDesc || ''}
                  </Text>
                </View>
              </View>
            </View>
            <View style={offerWrapperClassName}>
              {/* 报价 */}
              <View style={DetailsStyles.formItem}>
                <View style={DetailsStyles.formLabel}>
                  <Text style={DetailsStyles.labelText}>报价:</Text>
                </View>
                <View style={DetailsStyles.formContent}>
                  <TextInput
                    style={styles.offerInput}
                    maxLength={8}
                    keyboardType={'number-pad'}
                    onChangeText={this.offerText}
                  />
                  <Text style={DetailsStyles.contentText}>元/台</Text>
                </View>
              </View>
              {/* 有效期 */}
              <View style={DetailsStyles.formItem}>
                <View style={DetailsStyles.formLabel}>
                  <Text style={DetailsStyles.labelText}>有效期至:</Text>
                </View>
                <TouchableOpacity
                  style={DetailsStyles.formContent}
                  onPress={() => this.handleShowDate()}>
                  <Text
                    style={[
                      DetailsStyles.contentText,
                      DetailsStyles.waitColor,
                    ]}>
                    请选择
                    <Text style={DetailsStyles.iconRight}>&#xe61d;</Text>
                  </Text>
                </TouchableOpacity>
              </View>
              {/* 总价 */}
              {quotedPrice > 0 && (
                <View style={DetailsStyles.formItem}>
                  <View style={DetailsStyles.formLabel}>
                    <Text style={DetailsStyles.labelText}>总价:</Text>
                  </View>
                  <View style={DetailsStyles.formContent}>
                    <Text
                      style={[
                        DetailsStyles.contentText,
                        DetailsStyles.hasOffer,
                      ]}>
                      ￥{totalPriceDesc || ''}
                    </Text>
                  </View>
                </View>
              )}
            </View>
            <DatePicker
              isShow={datePickerShow}
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
    lineHeight: 30,
    color: GlobalStyles.themeFontColor,
    fontSize: 15,
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
