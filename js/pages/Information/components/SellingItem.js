/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-12-02 14:14:44
 * @LastEditors  : liuYang
 * @LastEditTime : 2019-12-27 12:04:52
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Linking} from 'react-native';
import GlobalStyles from '../../../assets/css/GlobalStyles';
import NavigationUtil from '../../../navigator/NavigationUtils';
import PropTypes from 'prop-types';

export default class SellingItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}

  navigatorDetails(item) {
    console.log(item, 'itemData');
    if ((item.isActive === 2 || item.isActive === 3) && !item.isEdit) {
      return;
    }
    let pageUrl = 'SellingDetailsPage';
    if (item.saleToPalletsType === 2) {
      pageUrl = 'OfferDetailsPage';
    }
    NavigationUtil.goPage(item, pageUrl);
  }
  /**
   * 打电话
   * @param {Object} item 订单信息
   * @return void
   */
  callBtn(item, e) {
    e.stopPropagation();
    const tel = `tel:${item.mobile}`;
    if (item.isActive !== 1) {
      return;
    }
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
  render() {
    let {itemData} = this.props;
    let cityClassName = [styles.cityText];
    let iconClassName = [styles.icon];
    let carInfoClassName = [styles.carInfo];
    let carNumberClassName = [styles.carNumber];
    let iconPhoneClassName = [styles.iconPhone];
    let priceClassName = [styles.price];
    let quoteBtnClassName = [styles.quoteBtn];
    let quoteBtnWrapperClassName = [styles.quoteBtnWrapper];
    if (itemData.isActive !== 1) {
      cityClassName.push(styles.disabledFontColor);
      iconClassName.push(styles.disabledFontColor);
      carInfoClassName.push(styles.disabledFontColor);
      carNumberClassName.push(styles.disabledFontColor);
      iconPhoneClassName.push(styles.disabledFontColor);
      priceClassName.push(styles.disabledFontColor);
      quoteBtnClassName.push(styles.disabledFontColor);
      quoteBtnWrapperClassName.push(styles.disabledQuoteBtnWrapper);
    }
    return (
      <View style={styles.itemWrapper}>
        <TouchableOpacity onPress={this.navigatorDetails.bind(this, itemData)}>
          <View style={styles.item}>
            <View style={styles.itemMsg}>
              <View style={styles.city}>
                <Text style={cityClassName}>
                  {itemData.sendCityName && itemData.sendCityName.length > 5
                    ? itemData.sendCityName.substr(0, 5) + '...'
                    : itemData.sendCityName || ''}
                </Text>
                <Text style={iconClassName}>&#xe60f;</Text>
                <Text style={cityClassName}>
                  {itemData.receiveCityName &&
                  itemData.receiveCityName.length > 5
                    ? itemData.receiveCityName.substr(0, 5) + '...'
                    : itemData.receiveCityName || ''}
                </Text>
              </View>
              <View style={styles.itemInfo}>
                <Text style={carNumberClassName}>
                  {itemData.carAmount || ''}
                </Text>
                <Text style={carInfoClassName}>
                  {itemData.carInfo && itemData.carInfo.length > 12
                    ? itemData.carInfo.substr(0, 12) + '...'
                    : itemData.carInfo || ''}
                  待发
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={this.callBtn.bind(this, itemData)}>
              <View style={styles.itemBtn}>
                {itemData.isActive === 1 ? (
                  itemData.price ? (
                    <View style={styles.price}>
                      <Text style={priceClassName}>
                        {'¥' + itemData.returnPrice}
                      </Text>
                      <Text style={iconPhoneClassName}>&#xe62d;</Text>
                    </View>
                  ) : (
                    <View style={styles.quoteBtnWrapper}>
                      <Text style={styles.quoteBtn}>报价</Text>
                    </View>
                  )
                ) : (
                  <View style={quoteBtnWrapperClassName}>
                    <Text style={quoteBtnClassName}>
                      {itemData.statusOfSaleToPalletList}
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.line} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemWrapper: {
    flex: 1,
    paddingHorizontal: 10,
  },
  item: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
    marginHorizontal: 2,
    color: GlobalStyles.themeFontColor,
    fontFamily: 'iconfont',
  },
  itemMsg: {
    flex: 1,
  },
  city: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    lineHeight: 22,
    // flexWrap: 'wrap',
  },
  cityText: {
    fontSize: 18,
    fontWeight: '700',
    color: GlobalStyles.themeFontColor,
  },
  itemInfo: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  carInfo: {
    fontSize: 15,
    color: GlobalStyles.themeTipColor,
  },
  carNumber: {
    fontWeight: '700',
    fontSize: 18,
    color: GlobalStyles.themeColor,
    marginRight: 2,
  },
  itemBtn: {
    width: 100,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  quoteBtnWrapper: {
    width: 80,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: GlobalStyles.themeColor,
    borderRadius: 4,
  },
  disabledQuoteBtnWrapper: {
    borderColor: GlobalStyles.themeDisabled,
  },
  quoteBtn: {
    fontSize: 16,
    color: GlobalStyles.themeColor,
    fontWeight: '700',
  },
  price: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 15,
    color: GlobalStyles.themeColor,
  },
  iconPhone: {
    fontSize: 22,
    marginLeft: 3,
    fontFamily: 'iconfont',
    color: GlobalStyles.themeColor,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#f5f5f5',
  },
  disabledFontColor: {
    color: GlobalStyles.themeDisabled,
  },
});

SellingItem.defaultProps = {
  itemData: {},
};

SellingItem.propTypes = {
  itemData: PropTypes.object,
};
