/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2019-12-23 14:38:28
 * @LastEditors  : guorui
 * @LastEditTime : 2019-12-25 15:09:03
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import api from '../../api';
import Button from '../../components/Button/Button.js';
import GlobalStyles from '../../assets/css/GlobalStyles';
import DetailsStyles from '../../assets/css/DetailsStyles';
import NavigationUtil from '../../navigator/NavigationUtils';
import BackPressComponent from '../../components/BackPressComponent/BackPressComponent';
import NavigationBar from '../../components/NavigatorBar/NavigationBar';
import SafeAreaViewPlus from '../../components/SafeAreaViewPlus/SafeAreaViewPlus';
import Toast from 'react-native-easy-toast';

class OrderDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderCode: 0, //订单号
      abandonTimeDesc: '', //放弃时间
      sendCityName: '', //发车城市名称
      sendAddress: '', //发车城市详细地址
      sendPerson: '', //发车城市联系人
      sendMobile: '', //发车城市联系方式
      sendCardNo: '', //发车城市联系人身份证号
      receiveCityName: '', //收车城市名称
      receiveAddress: '', //收车城市详细地址
      receivePerson: '', //收车城市联系人
      receiveMobile: '', //收车城市联系方式
      receiveCardNo: '', //收车城市联系人身份证号
      homeDelivery: 0, //送车上门 0否 1是
      homeDeliveryDesc: '',
      storePickup: 1, //上门提车 0否 1是
      storePickupDesc: '',
      sendTimeDesc: '', //发车时间
      carInfo: '', //车辆信息
      usedType: 1, //车辆类型  1新车 2二手车
      carAmount: 1, //车辆台数
      vins: '', // 车架号
      transferSettlePriceDesc: 0, // 报价
      isActive: 1, //有效状态 0无效 1有效 2删除
      buttons: [],
      statusDescs: [],
      isShow: false,
    };
    this.backPress = new BackPressComponent({
      backPress: () => this.onBackPress(),
    });
    this.pageParams = {};
    this.toastRef = React.createRef();
  }

  componentDidMount() {
    // const {navigation} = this.props;
    // const {state} = navigation;
    // const {params} = state;
    // this.pageParams = params;
    // this.initData();
    this.backPress.componentDidMount();
  }

  componentWillUnmount() {
    this.backPress.componentWillUnmount();
  }

  onBackPress() {
    NavigationUtil.goBack(this.props.navigation);
    return true;
  }

  initData() {
    // this.getOrderDetail();
  }
  /**
   * 获取订单详情
   * @return void
   */
  getOrderDetail() {
    if (!this.pageParams.orderCode) {
      return;
    }
    if (this.pageParams.orderCode) {
      let sendData = {
        orderCode: this.pageParams.orderCode,
      };
      api.order.getOrderDetail(sendData, this).then(res => {
        if (!res.data) {
          return;
        }
        this.setState({
          orderCode: res.orderCode,
          abandonTimeDesc: res.abandonTimeDesc,
          sendCityName: res.inquiryOrder.sendCityName,
          sendAddress: res.inquiryOrder.sendAddress,
          sendPerson: res.orderCarriagePerson.sendPerson,
          sendMobile: res.orderCarriagePerson.sendMobile,
          sendCardNo: res.orderCarriagePerson.sendCardNo,
          receiveCityName: res.inquiryOrder.receiveCityName,
          receiveAddress: res.inquiryOrder.receiveAddress,
          receivePerson: res.orderCarriagePerson.receivePerson,
          receiveMobile: res.orderCarriagePerson.receiveMobile,
          receiveCardNo: res.orderCarriagePerson.receiveCardNo,
          homeDelivery: res.inquiryOrder.homeDelivery,
          homeDeliveryDesc: res.inquiryOrder.homeDeliveryDesc,
          storePickup: res.inquiryOrder.storePickup,
          storePickupDesc: res.inquiryOrder.storePickupDesc,
          sendTimeDesc: res.inquiryOrder.sendTimeDesc,
          carInfo: res.inquiryOrder.carInfo,
          carAmount: res.inquiryOrder.carAmount,
          usedType: res.inquiryOrder.usedType,
          vins: res.vins,
          transferSettlePriceDesc: res.transferSettlePriceDesc,
          isActive: res.isActive,
          buttons: res.buttons,
          statusDescs: res.statusDescs,
        });
      });
    }
  }

  /**
   * 接单
   * @return void
   */
  receiptOrder() {
    if (this.state.isActive !== 1) {
      return;
    }
    if (+this.props.userInfo.realNameAuthStatus < 2) {
      this.setState({
        isShow: true,
      });
      return;
    }
    let sendData = {
      orderCode: this.state.orderCode,
    };
    api.order.receiptOrderData(sendData, this).then(() => {
      this.toastRef.current.show('接单成功');
      setTimeout(() => {
        this.getOrderDetails();
      }, 1800);
    });
  }
  /**
   * 放弃接单
   * @return void
   */
  cancelOrder() {
    if (this.state.isActive !== 1) {
      return;
    }
    let sendData = {
      orderCode: this.state.orderCode,
    };
    api.order.abandonOrderData(sendData, this).then(() => {
      this.toastRef.current.show('放弃接单成功');
      setTimeout(() => {
        this.getOrderDetails();
      }, 1800);
    });
  }
  /**
   * 按钮事件
   * @param {Type} e 参数描述
   * @return void
   */
  buttonsFun(e) {
    switch (e) {
      case 'receiptOrder':
        this.receiptOrder();
        break;
      case 'abandonReceiptOrder':
        this.cancelOrder();
        break;
      case 'pickUpListEdit': //上传提车单
        // Taro.navigateTo({
        //   url: `/pages/upload_img/index?pageType=pickUp&order_code=${this.state.orderCode}&type=edit`
        // })
        break;
      case 'pickUpListSee': //查看提车单
        // Taro.navigateTo({
        //   url: `/pages/upload_img/index?pageType=pickUp&order_code=${this.state.orderCode}&type=see`
        // })
        break;
      case 'deliveryListEdit': //上传交车单
        // Taro.navigateTo({
        //   url: `/pages/upload_img/index?pageType=delivery&order_code=${this.state.orderCode}&type=edit`
        // })
        break;
      case 'deliveryListSee': //查看交车单
        // Taro.navigateTo({
        //   url: `/pages/upload_img/index?pageType=delivery&order_code=${this.state.orderCode}&type=see`
        // })
        break;
      case 'confirmDriverInfo': //确认司机信息
        // Taro.navigateTo({
        //   url: `/pages/confirm_driver/index?order_code=${this.state.orderCode}&type=edit`
        // })
        break;
      case 'seeDriverInfo': //查看司机信息
        // Taro.navigateTo({
        //   url: `/pages/confirm_driver/index?order_code=${this.state.orderCode}&type=see`
        // })
        break;
      default:
        return;
    }
  }

  render() {
    const {theme, navigation} = this.props;
    let {
      sendCityName,
      sendAddress,
      sendPerson,
      sendMobile,
      sendCardNo,
      receiveCityName,
      receiveAddress,
      receivePerson,
      receiveMobile,
      receiveCardNo,
      homeDelivery,
      homeDeliveryDesc,
      storePickup,
      storePickupDesc,
      sendTimeDesc,
      carInfo,
      carAmount,
      usedType,
      vins,
      transferSettlePriceDesc,
      buttons,
      // isShow,
      // statusDescs,
    } = this.state;
    const buttonsList =
      buttons &&
      buttons.map(item => {
        const key = item.key;
        return (
          <Button
            key={key}
            btnStyle={[styles.btnStyle, styles.btnLeft]}
            fontStyles={[styles.fontStyle]}
            type={'plain'}
            text={item.name}
            // onClick={this.buttonsFun(item.key)}
          />
        );
      });
    return (
      <SafeAreaViewPlus topColor={theme.themeColor}>
        <View style={styles.pageWrapper}>
          <NavigationBar
            navigation={navigation}
            leftViewShow={true}
            title={'订单详情'}
          />
          <ScrollView>
            <View style={[DetailsStyles.card, styles.marginBottom]}>
              {/* 发车城市 */}
              <View style={styles.line}>
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
                <View style={DetailsStyles.formItem}>
                  <View style={DetailsStyles.formLabel}>
                    <Text style={DetailsStyles.labelText}>详细地址:</Text>
                  </View>
                  <View style={DetailsStyles.formContent}>
                    <Text style={DetailsStyles.contentText}>
                      {sendAddress || ''}
                    </Text>
                  </View>
                </View>
                <View style={DetailsStyles.formItem}>
                  <View style={DetailsStyles.formLabel}>
                    <Text style={DetailsStyles.labelText}>联系人:</Text>
                  </View>
                  <View style={DetailsStyles.formContent}>
                    <Text style={DetailsStyles.contentText}>
                      {sendPerson || ''}
                    </Text>
                  </View>
                </View>
                <View style={DetailsStyles.formItem}>
                  <View style={DetailsStyles.formLabel}>
                    <Text style={DetailsStyles.labelText}>联系方式:</Text>
                  </View>
                  <View style={DetailsStyles.formContent}>
                    <Text style={DetailsStyles.contentText}>
                      {sendMobile || ''}
                    </Text>
                  </View>
                </View>
                <View style={DetailsStyles.formItem}>
                  <View style={DetailsStyles.formLabel}>
                    <Text style={DetailsStyles.labelText}>身份证号:</Text>
                  </View>
                  <View style={DetailsStyles.formContent}>
                    <Text style={DetailsStyles.contentText}>
                      {sendCardNo || ''}
                    </Text>
                  </View>
                </View>
              </View>
              {/* 收车城市 */}
              <View style={[styles.line, styles.paddingTop]}>
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
                <View style={DetailsStyles.formItem}>
                  <View style={DetailsStyles.formLabel}>
                    <Text style={DetailsStyles.labelText}>详细地址:</Text>
                  </View>
                  <View style={DetailsStyles.formContent}>
                    <Text style={DetailsStyles.contentText}>
                      {receiveAddress || ''}
                    </Text>
                  </View>
                </View>
                <View style={DetailsStyles.formItem}>
                  <View style={DetailsStyles.formLabel}>
                    <Text style={DetailsStyles.labelText}>联系人:</Text>
                  </View>
                  <View style={DetailsStyles.formContent}>
                    <Text style={DetailsStyles.contentText}>
                      {receivePerson || ''}
                    </Text>
                  </View>
                </View>
                <View style={DetailsStyles.formItem}>
                  <View style={DetailsStyles.formLabel}>
                    <Text style={DetailsStyles.labelText}>联系方式:</Text>
                  </View>
                  <View style={DetailsStyles.formContent}>
                    <Text style={DetailsStyles.contentText}>
                      {receiveMobile || ''}
                    </Text>
                  </View>
                </View>
                <View style={DetailsStyles.formItem}>
                  <View style={DetailsStyles.formLabel}>
                    <Text style={DetailsStyles.labelText}>身份证号:</Text>
                  </View>
                  <View style={DetailsStyles.formContent}>
                    <Text style={DetailsStyles.contentText}>
                      {receiveCardNo || ''}
                    </Text>
                  </View>
                </View>
              </View>
              {/* 服务信息 */}
              <View style={[styles.line, styles.paddingTop]}>
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
                <View style={DetailsStyles.formItem}>
                  <View style={DetailsStyles.formLabel}>
                    <Text style={DetailsStyles.labelText}>发车时间:</Text>
                  </View>
                  <View style={DetailsStyles.formContent}>
                    <Text style={DetailsStyles.contentText}>
                      {sendTimeDesc || ''}
                    </Text>
                  </View>
                </View>
                <View style={DetailsStyles.formItem}>
                  <View style={DetailsStyles.formLabel}>
                    <Text style={DetailsStyles.labelText}>车辆信息:</Text>
                  </View>
                  <View style={DetailsStyles.formContent}>
                    <Text style={DetailsStyles.contentText}>
                      {carInfo || ''}
                    </Text>
                  </View>
                </View>
                <View style={DetailsStyles.formItem}>
                  <View style={DetailsStyles.formLabel}>
                    <Text style={DetailsStyles.labelText}>车辆类型:</Text>
                  </View>
                  <View style={DetailsStyles.formContent}>
                    <Text style={DetailsStyles.contentText}>
                      {usedType === 1 ? '新车' : '二手车'}
                    </Text>
                  </View>
                </View>
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
                <View style={DetailsStyles.formItem}>
                  <View style={DetailsStyles.formLabel}>
                    <Text style={DetailsStyles.labelText}>车架号:</Text>
                  </View>
                  <View style={DetailsStyles.formContent}>
                    <Text style={DetailsStyles.contentText}>{vins || ''}</Text>
                  </View>
                </View>
              </View>
              <View style={[DetailsStyles.formItem, styles.paddingTop]}>
                <View style={DetailsStyles.formLabel}>
                  <Text style={DetailsStyles.labelText}>报价:</Text>
                </View>
                <View style={DetailsStyles.formContent}>
                  <Text style={DetailsStyles.contentText}>
                    {transferSettlePriceDesc || ''}
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
          {buttons && buttons.length ? (
            <View style={styles.btnWrapper}>
              {buttonsList}
              {/* <Button
                  btnStyle={[styles.btnStyle]}
                  fontStyles={[styles.fontStyle]}
                  type={'plain'}
                  text={'上传交车单'}
                  // onClick={this.submitRegister.bind(this)}
                />
                <Button
                  btnStyle={[styles.btnStyle, styles.btnLeft]}
                  fontStyles={[styles.fontStyle]}
                  type={'plain'}
                  text={'上传提车单'}
                  // onClick={this.submitRegister.bind(this)}
                />
                <Button
                  btnStyle={[styles.btnStyle, styles.btnLeft]}
                  fontStyles={[styles.fontStyle]}
                  type={'plain'}
                  text={'确认司机信息'}
                  // onClick={this.submitRegister.bind(this)}
                /> */}
            </View>
          ) : null}
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
  line: {
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: GlobalStyles.themeDisabled,
  },
  marginBottom: {
    marginBottom: 16,
  },
  paddingTop: {
    paddingTop: 16,
  },
  btnWrapper: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
    backgroundColor: GlobalStyles.backgroundColor,
    paddingHorizontal: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  btnStyle: {
    width: 100,
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: GlobalStyles.themeDisabled,
  },
  fontStyle: {
    color: GlobalStyles.themeFontColor,
  },
  btnLeft: {
    marginLeft: 16,
  },
});
// 如果需要引入store
const mapStateToProps = state => {
  return {
    userInfo: state.user_info.userInfo,
    theme: state.theme.theme,
  };
};
export default connect(mapStateToProps)(OrderDetails);
