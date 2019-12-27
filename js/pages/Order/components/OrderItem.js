/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2019-12-27 10:51:34
 * @LastEditors  : liuYang
 * @LastEditTime : 2019-12-27 10:51:47
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
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
    return (
      <View style={styles.pageWrapper}>
        <Text>OrderItem</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
  },
});

OrderItem.defaultProps = {
  onClick: () => {},
};

OrderItem.propTypes = {
  onClick: PropTypes.func.isRequired,
};
