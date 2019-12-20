/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2019-12-20 16:38:16
 * @LastEditors  : liuYang
 * @LastEditTime : 2019-12-20 18:11:50
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import GlobalStyles from '../../assets/css/GlobalStyles';

export default class OrderItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    let {item} = this.props.item;
    let {type} = this.props;
    let time = '';
    if (type === 'offer') {
      time = item.inquiryTimeDesc;
    } else if (type === 'order') {
      time = item.inquiryTimeDesc;
    }
    console.log('type', type);
    console.log('this.props', this.props);
    return (
      <View style={styles.pageWrapper}>
        <View style={styles.title}>
          <Text style={styles.time}>{time || ''}</Text>
          <Text style={styles.status}>{item.statusDesc || ''}</Text>
        </View>
        <View style={styles.main}>
          <View style={styles.city}>
            <Text style={styles.cityText}>{item.sendCityName || ''}</Text>
            <Text style={[GlobalStyles.icon, styles.icon]}>&#xe60f;</Text>
            <Text style={styles.cityText}>{item.receiveCityName || ''}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemText}>车辆信息:{item.carInfo || ''}</Text>
          </View>
          {!item.storePickup && !item.homeDelivery ? null : (
            <View style={styles.item}>
              <Text style={styles.itemText}>
                服务：
                {item.storePickup ? item.storePickupDesc : ''}
                {item.storePickup && item.homeDelivery ? '，' : ''}
                {item.homeDelivery ? item.homeDeliveryDesc : ''}
              </Text>
            </View>
          )}
          {item.transferSettlePriceDesc ? (
            <View style={styles.item}>
              <Text style={styles.itemText}>
                报价(元)：￥{item.transferSettlePriceDesc || ''}元
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingBottom: 7,
  },
  title: {
    paddingHorizontal: 12,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#f5f5f5',
    borderBottomWidth: 1,
  },
  time: {
    color: GlobalStyles.themeFontColor,
    fontSize: 14,
  },
  main: {
    paddingHorizontal: 12,
  },
  city: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 3,
  },
  cityText: {
    color: GlobalStyles.themeFontColor,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '700',
  },
  icon: {
    fontSize: 20,
    marginHorizontal: 2,
  },
  item: {
    paddingVertical: 3,
  },
  itemText: {
    fontSize: 14,
    color: GlobalStyles.themeFontColor,
  },
});

OrderItem.defaultProps = {
  item: {},
  type: 'offer',
  onClick: () => {},
};

OrderItem.propTypes = {
  item: PropTypes.object,
  onClick: PropTypes.func.isRequired,
};
