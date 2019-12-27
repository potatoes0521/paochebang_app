/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2019-12-27 10:51:34
 * @LastEditors  : liuYang
 * @LastEditTime : 2019-12-27 12:05:02
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import GlobalStyles from '../../../assets/css/GlobalStyles';

export default class OrderItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    let {
      itemData: {item},
    } = this.props;
    let {inquiryOrder} = item || {};
    return (
      <TouchableOpacity style={styles.pageWrapper}>
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
            <View>
              <Text>{item.statusDesc || ''}</Text>
            </View>
          </View>
          <View style={styles.item}>
            <View style={styles.carInfo}>
              <Text style={styles.carInfoText}>
                {inquiryOrder.carInfo || ''}
                {inquiryOrder.carAmount}台
              </Text>
            </View>
            <View>
              <Text>{item.transferSettlePriceDesc}</Text>
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
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
  },
  main: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderBottomColor: '#f5f5f5',
    borderBottomWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  city: {
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
});

OrderItem.defaultProps = {
  itemData: {},
  onClick: () => {},
};

OrderItem.propTypes = {
  itemData: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};
