/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2019-12-23 14:38:28
 * @LastEditors: liuYang
 * @LastEditTime: 2020-02-27 14:30:09
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  DeviceEventEmitter,
} from 'react-native';
import {connect} from 'react-redux';
import api from '../../api';
// import GlobalStyles from '../../assets/css/GlobalStyles';
import DetailsStyle from '../../assets/css/DetailsStyle';
import NavigationUtil from '../../navigator/NavigationUtils';
import BackPressComponent from '../../components/BackPressComponent/BackPressComponent';
import NavigationBar from '../../components/NavigatorBar/NavigationBar';
import SafeAreaViewPlus from '../../components/SafeAreaViewPlus/SafeAreaViewPlus';
import Authentication from '../../components/Authentication/Authentication';
import Toast from 'react-native-easy-toast';
import {handleOrderButtons} from '../../config/button_config.js';
import ButtonItem from './components/Buttons';
import GlobalStyles from '../../assets/css/GlobalStyles';
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
    const {navigation} = this.props;
    const {state} = navigation;
    const {params} = state;
    this.pageParams = params || {};
    console.log('this.props', this.props.userInfo);
    this.getOrderDetail();
    this.handleEmit();
    this.backPress.componentDidMount();
  }

  componentWillUnmount() {
    this.emitRefreshOrderDetails.remove();
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
    this.emitRefreshOrderDetails = DeviceEventEmitter.addListener(
      'refreshOrderDetails',
      () => {
        this.getOrderDetail();
      },
    );
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
        let data = res.data;
        if (!data) {
          return;
        }
        this.setState({
          orderCode: data.orderCode,
          abandonTimeDesc: data.abandonTimeDesc,
          sendCityName: data.inquiryOrder.sendCityName,
          sendAddress: data.inquiryOrder.sendAddress,
          sendPerson: data.orderCarriagePerson.sendPerson,
          sendMobile: data.orderCarriagePerson.sendMobile,
          sendCardNo: data.orderCarriagePerson.sendCardNo,
          receiveCityName: data.inquiryOrder.receiveCityName,
          receiveAddress: data.inquiryOrder.receiveAddress,
          receivePerson: data.orderCarriagePerson.receivePerson,
          receiveMobile: data.orderCarriagePerson.receiveMobile,
          receiveCardNo: data.orderCarriagePerson.receiveCardNo,
          homeDelivery: data.inquiryOrder.homeDelivery,
          homeDeliveryDesc: data.inquiryOrder.homeDeliveryDesc,
          storePickup: data.inquiryOrder.storePickup,
          storePickupDesc: data.inquiryOrder.storePickupDesc,
          sendTimeDesc: data.inquiryOrder.sendTimeDesc,
          carInfo: data.inquiryOrder.carInfo,
          carAmount: data.inquiryOrder.carAmount,
          usedType: data.inquiryOrder.usedType,
          vins: data.vins,
          transferSettlePriceDesc: data.transferSettlePriceDesc,
          isActive: data.isActive,
          buttons: handleOrderButtons(res.data.buttons),
          statusDescs: data.statusDescs,
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
    if (this.props.userInfo.realNameAuthStatus < 2) {
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
      this.getOrderDetail();
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
      this.getOrderDetail();
    });
  }
  /**
   * 按钮事件
   * @param {Type} e 参数描述
   * @return void
   */
  buttonsHandle(key) {
    console.log('key', key);
    let {orderCode} = this.state;
    switch (key) {
      case 'receiptOrder': // 接单
        this.receiptOrder();
        break;
      case 'abandonReceiptOrder': // 放弃接单
        this.cancelOrder();
        break;
      case 'pickUpListEdit': //上传提车单
        NavigationUtil.goPage(
          {
            type: 'upload',
            pageType: 'pickUp',
            orderCode,
          },
          'UploadImagePage',
        );
        break;
      case 'pickUpListSee': //查看提车单
        NavigationUtil.goPage(
          {
            type: 'see',
            pageType: 'pickUp',
            orderCode,
          },
          'UploadImagePage',
        );
        break;
      case 'deliveryListEdit': //上传交车单
        NavigationUtil.goPage(
          {
            type: 'upload',
            pageType: 'delivery',
            orderCode,
          },
          'UploadImagePage',
        );
        break;
      case 'deliveryListSee': //查看交车单
        NavigationUtil.goPage(
          {
            type: 'see',
            pageType: 'delivery',
            orderCode,
          },
          'UploadImagePage',
        );
        break;
      case 'confirmDriverInfo': //确认司机信息
        NavigationUtil.goPage(
          {
            type: 'edit',
            orderCode,
          },
          'DriverConfirmPage',
        );
        break;
      case 'seeDriverInfo': //查看司机信息
        NavigationUtil.goPage(
          {
            type: 'see',
            orderCode,
          },
          'DriverConfirmPage',
        );
        break;
      case 'confirmLocation':
        break;
      default:
        return;
    }
  }
  /**
   * 关闭认证弹框
   * @return void
   */
  changeCertification() {
    let {isShow} = this.state;
    this.setState({
      isShow: !isShow,
    });
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
      abandonTimeDesc,
      buttons,
      isShow,
      statusDescs,
    } = this.state;
    const buttonsList =
      buttons &&
      buttons.map(item => {
        const key = item.key;
        return (
          <ButtonItem
            onClick={this.buttonsHandle.bind(this)}
            key={key}
            item={item}
          />
        );
      });
    const giveUp =
      statusDescs && statusDescs.some(item => item.key === 'abandonOrder');
    const pending =
      statusDescs && statusDescs.some(item => item.key === 'pendingCar');
    const waiting =
      statusDescs && statusDescs.some(item => item.key === 'waitingPickUp');
    return (
      <SafeAreaViewPlus topColor={theme.themeColor}>
        <View style={styles.pageWrapper}>
          <NavigationBar
            navigation={navigation}
            leftViewShow={true}
            title={'订单详情'}
          />
          <ScrollView>
            {statusDescs.length ? (
              <View style={styles.statusWrapper}>
                <View style={styles.statusInfo}>
                  {pending || waiting ? (
                    <Text style={styles.iconStyle}>&#xe65c;</Text>
                  ) : null}
                  {giveUp ? (
                    <Text style={styles.iconStyle}>&#xe66d;</Text>
                  ) : null}
                  <Text style={styles.statusTitle}>
                    {/* {statusDescs && statusDescs[0].name} */}
                    待交车
                  </Text>
                </View>
                {giveUp ? (
                  <View style={styles.timeWrapper}>
                    <Text style={styles.statusTime}>
                      放弃时间：{abandonTimeDesc}
                    </Text>
                  </View>
                ) : null}
              </View>
            ) : null}
            <View style={[DetailsStyle.card, styles.marginBottom]}>
              {/* 发车城市 */}
              <View style={styles.line}>
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
                {sendAddress ? (
                  <View
                    style={[
                      DetailsStyle.formItem,
                      DetailsStyle.moreTextFormItem,
                    ]}>
                    <View style={DetailsStyle.formLabel}>
                      <Text style={DetailsStyle.labelText}>详细地址:</Text>
                    </View>
                    <View style={DetailsStyle.formContent}>
                      <Text style={DetailsStyle.contentText}>
                        {sendAddress || ''}
                      </Text>
                    </View>
                  </View>
                ) : null}
                <View style={DetailsStyle.formItem}>
                  <View style={DetailsStyle.formLabel}>
                    <Text style={DetailsStyle.labelText}>联系人:</Text>
                  </View>
                  <View style={DetailsStyle.formContent}>
                    <Text style={DetailsStyle.contentText}>
                      {sendPerson || ''}
                    </Text>
                  </View>
                </View>
                <View style={DetailsStyle.formItem}>
                  <View style={DetailsStyle.formLabel}>
                    <Text style={DetailsStyle.labelText}>联系方式:</Text>
                  </View>
                  <View style={DetailsStyle.formContent}>
                    <Text style={DetailsStyle.contentText}>
                      {sendMobile || ''}
                    </Text>
                  </View>
                </View>
                {sendCardNo ? (
                  <View style={DetailsStyle.formItem}>
                    <View style={DetailsStyle.formLabel}>
                      <Text style={DetailsStyle.labelText}>身份证号:</Text>
                    </View>
                    <View style={DetailsStyle.formContent}>
                      <Text style={DetailsStyle.contentText}>
                        {sendCardNo || ''}
                      </Text>
                    </View>
                  </View>
                ) : null}
              </View>
              {/* 收车城市 */}
              <View style={[styles.line, styles.paddingTop]}>
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
                {receiveAddress ? (
                  <View
                    style={[
                      DetailsStyle.formItem,
                      DetailsStyle.moreTextFormItem,
                    ]}>
                    <View style={DetailsStyle.formLabel}>
                      <Text style={DetailsStyle.labelText}>详细地址:</Text>
                    </View>
                    <View style={DetailsStyle.formContent}>
                      <Text style={DetailsStyle.contentText}>
                        {receiveAddress || ''}
                      </Text>
                    </View>
                  </View>
                ) : null}
                <View style={DetailsStyle.formItem}>
                  <View style={DetailsStyle.formLabel}>
                    <Text style={DetailsStyle.labelText}>联系人:</Text>
                  </View>
                  <View style={DetailsStyle.formContent}>
                    <Text style={DetailsStyle.contentText}>
                      {receivePerson || ''}
                    </Text>
                  </View>
                </View>
                <View style={DetailsStyle.formItem}>
                  <View style={DetailsStyle.formLabel}>
                    <Text style={DetailsStyle.labelText}>联系方式:</Text>
                  </View>
                  <View style={DetailsStyle.formContent}>
                    <Text style={DetailsStyle.contentText}>
                      {receiveMobile || ''}
                    </Text>
                  </View>
                </View>
                {receiveCardNo ? (
                  <View style={DetailsStyle.formItem}>
                    <View style={DetailsStyle.formLabel}>
                      <Text style={DetailsStyle.labelText}>身份证号:</Text>
                    </View>
                    <View style={DetailsStyle.formContent}>
                      <Text style={DetailsStyle.contentText}>
                        {receiveCardNo || ''}
                      </Text>
                    </View>
                  </View>
                ) : null}
              </View>
              {/* 服务信息 */}
              <View style={[styles.line, styles.paddingTop]}>
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
                <View style={DetailsStyle.formItem}>
                  <View style={DetailsStyle.formLabel}>
                    <Text style={DetailsStyle.labelText}>发车时间:</Text>
                  </View>
                  <View style={DetailsStyle.formContent}>
                    <Text style={DetailsStyle.contentText}>
                      {sendTimeDesc || ''}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    DetailsStyle.formItem,
                    DetailsStyle.moreTextFormItem,
                  ]}>
                  <View style={DetailsStyle.formLabel}>
                    <Text style={DetailsStyle.labelText}>车辆信息:</Text>
                  </View>
                  <View style={DetailsStyle.formContent}>
                    <Text style={DetailsStyle.contentText}>
                      {carInfo || ''}
                    </Text>
                  </View>
                </View>
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
                <View style={DetailsStyle.formItem}>
                  <View style={DetailsStyle.formLabel}>
                    <Text style={DetailsStyle.labelText}>车架号:</Text>
                  </View>
                  <View style={DetailsStyle.formContent}>
                    <Text style={DetailsStyle.contentText}>{vins || ''}</Text>
                  </View>
                </View>
              </View>
              <View style={[DetailsStyle.formItem, styles.paddingTop]}>
                <View style={DetailsStyle.formLabel}>
                  <Text style={DetailsStyle.labelText}>报价:</Text>
                </View>
                <View style={DetailsStyle.formContent}>
                  <Text style={DetailsStyle.contentText}>
                    {transferSettlePriceDesc || ''}
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
          {buttons && buttons.length ? (
            <View style={styles.btnWrapper}>{buttonsList}</View>
          ) : null}
          <Toast
            ref={this.toastRef}
            position={'center'}
            defaultCloseDelay={3000}
          />
          {/* 实名认证弹框 */}
          <Authentication
            visible={isShow}
            onClick={this.changeCertification.bind(this)}
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
  statusWrapper: {
    paddingTop: 20,
    paddingLeft: 28,
  },
  statusInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  iconStyle: {
    fontFamily: 'iconfont',
    fontSize: 20,
    color: GlobalStyles.themeSubColor,
    marginRight: 8,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: GlobalStyles.themeFontColor,
  },
  timeWrapper: {
    marginTop: 2,
  },
  statusTime: {
    fontSize: 15,
    paddingLeft: 30,
    color: GlobalStyles.themeHColor,
  },
  line: {
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  marginBottom: {
    marginBottom: 16,
  },
  paddingTop: {
    paddingTop: 16,
  },
  btnWrapper: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 16,
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
export default connect(mapStateToProps)(OrderDetails);
