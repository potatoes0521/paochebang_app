/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2019-12-20 16:38:16
 * @LastEditors  : liuYang
 * @LastEditTime : 2019-12-27 10:56:06
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import GlobalStyles from '../../../assets/css/GlobalStyles';
import NavigationUtil from '../../../navigator/NavigationUtils.js';
import DetailsStyles from '../../../assets/css/DetailsStyles';
import CardListItemStyles from '../../../assets/css/CardListItemStyle';
export default class OrderItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}
  navigatorTo() {
    let {item} = this.props.item;
    let {type} = this.props;
    if (type === 'offer') {
      let pageUrl = 'OfferDetailsPage';
      if (item.orderCode) {
        pageUrl = 'OrderDetailsPage';
      }
      NavigationUtil.goPage(item, pageUrl);
    }
  }
  render() {
    let {item} = this.props.item;
    let {type} = this.props;
    let time = '';
    let statusClassNames = [styles.status];
    let itemTextClassNames = [styles.itemText];
    let cityTextClassNames = [styles.cityText];
    let iconClassName = [GlobalStyles.icon, styles.icon];
    let timeClassName = [styles.time];
    if (type === 'offer') {
      time = item.inquiryTimeDesc;
      if (item.status === 10 || item.takeStatus === 10) {
        statusClassNames.push(styles.themeSubColor);
      } else if (item.status === 20 || item.takeStatus === 20) {
        statusClassNames.push(styles.themeColor);
      }
    } else if (type === 'order') {
      time = item.inquiryTimeDesc;
    }
    if (
      item.status === 30 ||
      item.status === 40 ||
      item.takeStatus === 30 ||
      item.takeStatus === 40
    ) {
      statusClassNames.push(DetailsStyles.textThemeDisabled);
      itemTextClassNames.push(DetailsStyles.textThemeDisabled);
      cityTextClassNames.push(DetailsStyles.textThemeDisabled);
      iconClassName.push(DetailsStyles.textThemeDisabled);
      timeClassName.push(DetailsStyles.textThemeDisabled);
    }
    return (
      <View style={styles.itemWrapper}>
        <TouchableOpacity onPress={this.navigatorTo.bind(this)}>
          <View style={styles.title}>
            <Text style={timeClassName}>{time || ''}</Text>
            <Text style={statusClassNames}>{item.statusDesc || ''}</Text>
          </View>
          <View style={styles.main}>
            <View style={styles.city}>
              <Text style={cityTextClassNames}>{item.sendCityName || ''}</Text>
              <Text style={iconClassName}>&#xe60f;</Text>
              <Text style={cityTextClassNames}>
                {item.receiveCityName || ''}
              </Text>
            </View>
            <View style={styles.item}>
              <Text style={itemTextClassNames}>
                车辆信息:{item.carInfo || ''}
              </Text>
            </View>
            {!item.storePickup && !item.homeDelivery ? null : (
              <View style={styles.item}>
                <Text style={itemTextClassNames}>
                  服务：
                  {item.storePickup ? item.storePickupDesc : ''}
                  {item.storePickup && item.homeDelivery ? '，' : ''}
                  {item.homeDelivery ? item.homeDeliveryDesc : ''}
                </Text>
              </View>
            )}
            {item.transferSettlePriceDesc ? (
              <View style={styles.item}>
                <Text style={itemTextClassNames}>
                  报价(元)：￥{item.transferSettlePriceDesc || ''}元
                </Text>
              </View>
            ) : null}
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create(CardListItemStyles);

OrderItem.defaultProps = {
  item: {},
  type: 'offer',
  onClick: () => {},
};

OrderItem.propTypes = {
  item: PropTypes.object,
  onClick: PropTypes.func.isRequired,
};
