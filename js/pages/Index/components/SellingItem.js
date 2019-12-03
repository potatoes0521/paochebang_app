/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-12-02 14:14:44
 * @LastEditors: liuYang
 * @LastEditTime: 2019-12-03 16:40:04
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import GlobalStyles from '../../../assets/css/GlobalStyles';
import PropTypes from 'prop-types';

export default class SellingItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}

  handleOnPress(itemData) {
    console.log(itemData, '去详情');
  }
  callBtn(e) {
    e.stopPropagation();
    console.log('打电话');
  }
  render() {
    let {itemData} = this.props;
    // let {item} = itemData;
    return (
      <View style={styles.itemWrapper}>
        <TouchableOpacity onPress={this.handleOnPress.bind(this, itemData)}>
          <View style={styles.item}>
            <View style={styles.itemMsg}>
              <View style={styles.city}>
                <Text style={styles.cityText}>
                  {itemData.sendCityName || ''}
                </Text>
                <Text style={styles.icon}>&#xe60f;</Text>
                <Text style={styles.cityText}>
                  {itemData.receiveCityName || ''}
                </Text>
              </View>
              <View style={styles.itemInfo}>
                <Text style={styles.carNumber}>{itemData.carAmount || ''}</Text>
                <Text style={styles.carInfo}>{itemData.carInfo || ''}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={this.callBtn}>
              <View style={styles.itemBtn}>
                {itemData.isActive === 1 ? (
                  itemData.price ? (
                    <View style={styles.price}>
                      <Text>{'¥' + itemData.returnPrice}</Text>
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
    paddingLeft: 12,
    paddingRight: 12,
  },
  item: {
    flex: 1,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 16,
    paddingBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    fontSize: 16,
    marginRight: 3,
    marginLeft: 3,
    fontFamily: 'iconfont',
  },
  itemMsg: {
    flex: 1,
  },
  city: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 16,
    marginBottom: 6,
    lineHeight: 22,
  },
  cityText: {
    fontWeight: '700',
    color: GlobalStyles.themeFontColor,
  },
  itemInfo: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  carInfo: {
    fontSize: 14,
  },
  carNumber: {
    fontWeight: '700',
    fontSize: 18,
    color: GlobalStyles.themeColor,
    marginRight: 4,
  },
  itemBtn: {
    width: 100,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  quoteBtnWrapper: {
    width: 84,
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
  },
  iconPhone: {
    fontSize: 20,
    marginLeft: 7,
    fontFamily: 'iconfont',
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
