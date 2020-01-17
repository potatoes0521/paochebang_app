/*
 * @Author: liuYang
 * @description: 步进器
 * @path: 引入路径
 * @Date: 2019-12-30 14:00:52
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-01-17 11:13:33
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import GlobalStyles from '../../assets/css/GlobalStyles';
import _toString from 'lodash/toString';

// 格式化数字，处理01变成1,并且不处理1. 这种情况
function parseValue(num) {
  if (num === '') {
    return '';
  }

  const numStr = _toString(num);
  if (numStr.indexOf('0') === 0 && numStr.indexOf('.') === -1) {
    // 处理01变成1,并且不处理1.
    return _toString(parseFloat(num, 10));
  }
  return _toString(num);
}

export default class NumberInput extends Component {
  constructor(props) {
    super(props);
  }
  input(value) {
    if (value && !isNaN(value)) {
      value = parseInt(value, 10) + '';
    } else {
      value = '';
    }
    let newNumber = this.handleValue(value);
    this.props.onInputTextChange(newNumber);
  }
  handleClick(type) {
    let {initNumber} = this.props;
    initNumber = +initNumber || '';
    if (type === 'sub') {
      if (initNumber < 1) {
        initNumber = '';
      } else {
        initNumber -= 1;
      }
    } else {
      initNumber += 1;
    }
    let newNumber = this.handleValue(initNumber);
    this.props.onInputTextChange(newNumber);
  }
  handleValue(value) {
    const {max, min} = this.props;
    let resultValue = value === '' ? min : value;
    // 此处不能使用 Math.max，会是字符串变数字，并丢失 .
    if (resultValue > max) {
      resultValue = max;
      this.handleError({
        type: 'OVER',
        errorValue: resultValue,
      });
    }
    if (resultValue < min) {
      resultValue = min;
      this.handleError({
        type: 'LOW',
        errorValue: resultValue,
      });
    }
    resultValue = parseValue(resultValue);
    return resultValue;
  }
  render() {
    const {initNumber} = this.props;
    const number = this.handleValue(initNumber);
    let subClassName = [styles.btnText];
    if (number <= 0 || !number) {
      subClassName = [styles.disabledText];
    }
    return (
      <View style={styles.pageWrapper}>
        <TouchableOpacity
          onPress={this.handleClick.bind(this, 'sub')}
          style={[styles.btn, styles.subscribe]}>
          <Text style={subClassName}>-</Text>
        </TouchableOpacity>
        <TextInput
          maxLength={5}
          keyboardType={'number-pad'}
          style={styles.input}
          value={number}
          onChangeText={this.input.bind(this)}
        />
        <TouchableOpacity
          onPress={this.handleClick.bind(this, 'add')}
          style={[styles.btn, styles.add]}>
          <Text style={styles.btnText}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pageWrapper: {
    width: 90,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 22,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: GlobalStyles.themeDisabled,
  },
  btn: {
    width: 20,
    height: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  subscribe: {
    borderRightColor: GlobalStyles.themeDisabled,
    borderRightWidth: 1,
  },
  add: {
    borderLeftColor: GlobalStyles.themeDisabled,
    borderLeftWidth: 1,
  },
  btnText: {
    fontSize: 12,
    color: GlobalStyles.themeTipColor,
  },
  disabledText: {
    color: GlobalStyles.themeDisabled,
  },
  input: {
    flex: 1,
    padding: 0,
    margin: 0,
    textAlign: 'center',
    color: GlobalStyles.themeTipColor,
    fontSize: 14,
  },
});

NumberInput.defaultProps = {
  initNumber: '',
  onInputTextChange: () => {},
};

NumberInput.propTypes = {
  onInputTextChange: PropTypes.func.isRequired,
};
