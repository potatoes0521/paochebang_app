/*
 * @Author: guorui
 * @description: 收支明细
 * @Date: 2019-12-26 14:56:56
 * @LastEditors  : guorui
 * @LastEditTime : 2020-01-14 16:51:43
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import GlobalStyles from '../../../assets/css/GlobalStyles';
export default class AccountItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}
  render() {
    let {item} = this.props;
    let itemTextClassName = [styles.incomeNum];
    if (item.incomeType !== 1) {
      itemTextClassName.push(styles.cashNum);
    }
    return (
      <View style={styles.itemWrapper}>
        <View style={styles.cashWrapper}>
          <View style={styles.cashStyle}>
            <Text style={styles.contentText}>
              {item.incomeType === 1 ? '收入' : '提现'}
            </Text>
          </View>
          <View style={styles.cashInfo}>
            <View style={styles.cashAmount}>
              {item.incomeType === 1 ? (
                <Text style={styles.incomeNum}>+</Text>
              ) : (
                <Text style={styles.cashNum}>-</Text>
              )}
              <Text style={itemTextClassName}>{item.amountDesc || ''}</Text>
            </View>
            <View style={styles.cashDate}>
              <Text style={styles.cashTime}>{item.createTimeDesc || ''}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemWrapper: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: '#ffffff',
  },
  cashWrapper: {
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contentText: {
    fontSize: 15,
    color: GlobalStyles.themeFontColor,
  },
  cashInfo: {
    width: 80,
  },
  cashAmount: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  cashNum: {
    color: GlobalStyles.themeFontColor,
    fontSize: 15,
    fontWeight: '700',
  },
  incomeNum: {
    color: GlobalStyles.themeColor,
    fontSize: 15,
    fontWeight: '700',
  },
  cashTime: {
    textAlign: 'right',
    color: GlobalStyles.themeHColor,
    fontSize: 12,
  },
});
AccountItem.defaultProps = {
  item: {},
};

AccountItem.propTypes = {
  item: PropTypes.object,
};
