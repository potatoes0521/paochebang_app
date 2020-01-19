/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2019-12-27 10:51:34
 * @LastEditors  : guorui
 * @LastEditTime : 2020-01-16 16:51:11
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import GlobalStyles from '../../../assets/css/GlobalStyles';
import ButtonItem from '../../OrderDetails/components/Buttons';
import {handleOrderButtons} from '../../../config/button_config.js';
import NavigationUtil from '../../../navigator/NavigationUtils';
export default class OrderItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}
  /**
   * 跳转到订单详情
   * @param {Object} item 订单数据
   * @return void
   */
  navigatorToDetails(item) {
    NavigationUtil.goPage(item, 'OrderDetailsPage');
  }
  /**
   * 按钮事件
   * @param {Type} e 参数描述
   * @return void
   */
  buttonsHandle(key) {
    let orderData = this.props.itemData.item;
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
            orderCode: orderData.orderCode,
          },
          'UploadImagePage',
        );
        break;
      case 'pickUpListSee': //查看提车单
        NavigationUtil.goPage(
          {
            type: 'see',
            pageType: 'pickUp',
            orderCode: orderData.orderCode,
          },
          'UploadImagePage',
        );
        break;
      case 'deliveryListEdit': //上传交车单
        NavigationUtil.goPage(
          {
            type: 'upload',
            pageType: 'delivery',
            orderCode: orderData.orderCode,
          },
          'UploadImagePage',
        );
        break;
      case 'deliveryListSee': //查看交车单
        NavigationUtil.goPage(
          {
            type: 'see',
            pageType: 'delivery',
            orderCode: orderData.orderCode,
          },
          'UploadImagePage',
        );
        break;
      case 'confirmDriverInfo': //确认司机信息
        NavigationUtil.goPage(
          {
            type: 'edit',
            orderCode: orderData.orderCode,
          },
          'DriverConfirmPage',
        );
        break;
      case 'seeDriverInfo': //查看司机信息
        NavigationUtil.goPage(
          {
            type: 'see',
            orderCode: orderData.orderCode,
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
  render() {
    let {
      itemData: {item},
    } = this.props;
    let {inquiryOrder} = item || {};
    let statusStyle = [styles.statusText];
    let priceStyle = [styles.priceText];
    if (item.isActive !== 1) {
      statusStyle.push(styles.disabledStyle);
      priceStyle.push(styles.textStyle);
    }
    const buttons = handleOrderButtons(item.buttons);
    const buttonsList =
      buttons &&
      buttons.map(btn => {
        return (
          <ButtonItem
            onClick={this.buttonsHandle.bind(this)}
            key={btn.key + this.props.uniq}
            item={btn}
          />
        );
      });
    return (
      <TouchableOpacity
        onPress={this.navigatorToDetails.bind(this, item)}
        style={styles.pageWrapper}>
        <View style={styles.main}>
          <View style={styles.item}>
            <View style={styles.city}>
              <Text style={styles.cityText}>
                {inquiryOrder.sendCityName &&
                inquiryOrder.sendCityName.length > 5
                  ? inquiryOrder.sendCityName.substr(0, 5) + '...'
                  : inquiryOrder.sendCityName || ''}
              </Text>
              <Text style={[GlobalStyles.icon, styles.icon]}>&#xe60f;</Text>
              <Text style={styles.cityText}>
                {inquiryOrder.receiveCityName &&
                inquiryOrder.receiveCityName.length > 5
                  ? inquiryOrder.receiveCityName.substr(0, 5) + '...'
                  : inquiryOrder.receiveCityName || ''}
              </Text>
            </View>
            <View style={styles.statusWrapper}>
              <Text style={statusStyle}>{item.statusDesc || ''}</Text>
            </View>
          </View>
          <View style={styles.item}>
            <View style={styles.carInfo}>
              <Text style={styles.carInfoText}>
                {inquiryOrder.carInfo || ''}
              </Text>
              <Text style={styles.carInfoText}>{inquiryOrder.carAmount}台</Text>
            </View>
            <View style={styles.priceWrapper}>
              <Text style={priceStyle}>¥{item.transferSettlePriceDesc}</Text>
            </View>
          </View>
          {!inquiryOrder.storePickup && !inquiryOrder.homeDelivery ? null : (
            <View style={styles.item}>
              <Text style={styles.carInfoText}>
                服务：
                {inquiryOrder.storePickup
                  ? inquiryOrder.storePickupDesc || '含提'
                  : ''}
                {inquiryOrder.storePickup && inquiryOrder.homeDelivery
                  ? '，'
                  : ''}
                {inquiryOrder.homeDelivery
                  ? inquiryOrder.homeDeliveryDesc || '含送'
                  : ''}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.btnWrapper}>{buttonsList}</View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
    paddingHorizontal: 12,
    backgroundColor: '#ffffff',
  },
  main: {
    flex: 1,
    borderBottomColor: '#f5f5f5',
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 3,
  },
  city: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cityText: {
    fontSize: 16,
    fontWeight: '700',
  },
  icon: {
    fontSize: 20,
    marginHorizontal: 2,
    color: GlobalStyles.themeFontColor,
  },
  statusWrapper: {
    width: 50,
    textAlign: 'right',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  statusText: {
    fontWeight: '700',
    fontSize: 16,
    color: GlobalStyles.themeColor,
  },
  carInfo: {
    flex: 1,
    lineHeight: 21,
    flexDirection: 'row',
    alignItems: 'center',
  },
  carInfoText: {
    fontSize: 15,
    color: GlobalStyles.themeFontColor,
    marginRight: 5,
  },
  priceWrapper: {
    width: 130,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  priceText: {
    color: GlobalStyles.themeColor,
    fontWeight: '700',
    fontSize: 15,
  },
  disabledStyle: {
    color: GlobalStyles.themeDisabled,
  },
  textStyle: {
    color: GlobalStyles.themeFontColor,
  },
  btnWrapper: {
    paddingVertical: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

OrderItem.defaultProps = {
  itemData: {},
  uniq: '10',
  onClick: () => {},
};

OrderItem.propTypes = {
  itemData: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};
