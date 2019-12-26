/*
 * @Author: guorui
 * @description: 收支明细
 * @Date: 2019-12-26 14:56:56
 * @LastEditors  : guorui
 * @LastEditTime : 2019-12-26 16:28:26
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
// import PropTypes from 'prop-types';
import GlobalStyles from '../../../assets/css/GlobalStyles';
// import NavigationUtil from '../../navigator/NavigationUtils.js';
import DetailsStyles from '../../../assets/css/DetailsStyles';
export default class OrderItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}
  render() {
    return (
      <View style={styles.itemWrapper}>
        <View style={styles.cashWrapper}>
          <View style={styles.cashStyle}>
            <Text style={DetailsStyles.contentText}>提现</Text>
          </View>
          <View style={styles.cashInfo}>
            {/* <View style={styles.cashAmount}>
              <Text style={styles.cashNum}>-</Text>
              <Text style={styles.cashNum}>110.00</Text>
            </View> */}
            <View style={styles.cashAmount}>
              <Text style={styles.incomeNum}>+</Text>
              <Text style={styles.incomeNum}>110.00</Text>
            </View>
            <View style={styles.cashDate}>
              <Text style={styles.cashTime}>2019-12-26</Text>
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
    backgroundColor: '#ffffff',
  },
  cashWrapper: {
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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

// OrderItem.defaultProps = {
//   item: {},
//   type: 'offer',
//   onClick: () => {},
// };

// OrderItem.propTypes = {
//   item: PropTypes.object,
//   onClick: PropTypes.func.isRequired,
// };
