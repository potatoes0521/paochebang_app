/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-12-02 14:14:44
 * @LastEditors  : liuYang
 * @LastEditTime : 2019-12-20 16:51:28
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
    let pageUrl = 'SellingDetailPage';
    if (item.saleToPalletsType === 2) {
      pageUrl = 'OfferDetailPage';
    }
    NavigationUtil.goPage(item, pageUrl);
  }
  callBtn(item, e) {
    e.stopPropagation();
    const tel = `tel:${item.mobile}`;
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
    // let {item} = itemData;
    return (
      <View style={styles.itemWrapper}>
        <TouchableOpacity onPress={this.navigatorDetails.bind(this, itemData)}>
          <View style={styles.item}>
            <View style={styles.itemMsg}>
              <View style={styles.city}>
                <Text style={styles.cityText}>
                  {itemData.sendCityName.length > 5
                    ? itemData.sendCityName.substr(0, 5) + '...'
                    : itemData.sendCityName || ''}
                </Text>
                <Text style={styles.icon}>&#xe60f;</Text>
                <Text style={styles.cityText}>
                  {itemData.receiveCityName.length > 5
                    ? itemData.receiveCityName.substr(0, 5) + '...'
                    : itemData.receiveCityName || ''}
                </Text>
              </View>
              <View style={styles.itemInfo}>
                <Text style={styles.carNumber}>{itemData.carAmount || ''}</Text>
                <Text style={styles.carInfo}>
                  {itemData.carInfo.length > 10
                    ? itemData.carInfo.substr(0, 10) + '...'
                    : itemData.carInfo || ''}
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={this.callBtn.bind(this, itemData)}>
              <View style={styles.itemBtn}>
                {itemData.isActive === 1 ? (
                  itemData.price ? (
                    <View style={styles.price}>
                      <Text style={styles.price}>
                        {'¥' + itemData.returnPrice}
                      </Text>
                      <Text style={styles.iconPhone}>&#xe62d;</Text>
                    </View>
                  ) : (
                    <View style={styles.quoteBtnWrapper}>
                      <Text style={styles.quoteBtn}>报价</Text>
                    </View>
                  )
                ) : (
                  <View style={styles.quoteBtnWrapper}>
                    <Text style={styles.quoteBtn}>
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
});

SellingItem.defaultProps = {
  itemData: {},
};

SellingItem.propTypes = {
  itemData: PropTypes.object,
};
