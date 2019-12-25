/*
 * @Author: guorui
 * @description: 请填写描述信息
 * @Date: 2019-12-25 11:00:24
 * @LastEditors  : guorui
 * @LastEditTime : 2019-12-25 11:23:25
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';

export default class DriverItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}
  render() {
    return (
      <View style={styles.itemWrapper}>
        <Text>司机</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemWrapper: {
    flex: 1,
    paddingHorizontal: 10,
  },
});

DriverItem.defaultProps = {
  itemData: {},
};

DriverItem.propTypes = {
  itemData: PropTypes.object,
};
