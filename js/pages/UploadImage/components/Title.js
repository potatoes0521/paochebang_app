/*
 * @Author: liuYang
 * @description: 标题栏
 * @path: 引入路径
 * @Date: 2020-01-04 09:29:12
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-01-04 09:43:15
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import GlobalStyles from '../../../assets/css/GlobalStyles';

export default class Title extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    let {title} = this.props;
    return (
      <View style={styles.wrapper}>
        <View style={styles.leftLine} />
        <View style={styles.title}>
          <Text style={styles.titleText}>{title}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    height: 36,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    overflow: 'hidden',
  },
  leftLine: {
    width: 4,
    height: 36,
    backgroundColor: GlobalStyles.themeColor,
    marginRight: 16,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 15,
    color: GlobalStyles.themeFontColor,
  },
});

Title.defaultProps = {
  title: '',
  onClick: () => {},
};

Title.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
