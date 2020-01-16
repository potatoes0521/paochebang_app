/*
 * @Author: liuYang
 * @description: 步进器
 * @path: 引入路径
 * @Date: 2019-12-30 14:00:52
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-01-16 21:29:22
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

export default class NumberInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: '1',
    };
  }

  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.timer = setTimeout(() => {
      this.setState({
        number: this.props.initNumber + '' || '1',
      });
    }, 50);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }
  input(value) {
    if (value && isNaN(value)) {
      value = parseInt(value, 10) + '';
    } else {
      value = '';
    }
    this.setState({
      number: value,
    });
    this.props.onInputTextChange(value);
  }
  handleClick(type) {
    let {number} = this.state;
    number = +number || '';
    if (type === 'sub') {
      if (number < 1) {
        number = '';
      } else {
        number -= 1;
      }
    } else {
      number += 1;
    }
    this.setState({
      number: number + '',
    });
    this.props.onInputTextChange(number);
  }
  render() {
    let {number} = this.state;
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
