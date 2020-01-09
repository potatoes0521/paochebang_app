/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-01-09 18:01:59
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-01-09 18:31:36
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import PropTypes from 'prop-types';
import GlobalStyles from '../../assets/css/GlobalStyles';
import Button from '../Button/Button';
import NavigationUtil from '../../navigator/NavigationUtils';
import defaultIcon from '../../assets/image/mine/default_icon.png';

export default class BottomLoginTips extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}
  navigatorToLogin() {
    NavigationUtil.goPage({}, 'RegisterPage');
  }
  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.left}>
          <View style={styles.icon}>
            <Image style={styles.userIcon} source={defaultIcon} />
          </View>
          <View style={styles.tips}>
            <Text style={styles.tipsText}>欢迎来到跑车帮～</Text>
            <Text style={styles.tipsText}>登录打开新世界～</Text>
          </View>
        </View>
        <View style={styles.rightBtn}>
          <Button
            onClick={this.navigatorToLogin.bind(this)}
            text={'马上登录'}
            fontStyles={[styles.btn]}
            type={'round'}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    width: GlobalStyles.window_width,
    paddingHorizontal: 24,
    bottom: 0,
    height: 50,
    backgroundColor: 'rgba(0,0,0,0.62)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 36,
    height: 36,
    marginRight: 8,
  },
  userIcon: {
    width: 36,
    height: 36,
  },
  tipsText: {
    color: '#fff',
    fontSize: 12,
    lineHeight: 17,
  },
  rightBtn: {
    width: 80,
    height: 28,
  },
  btn: {
    fontSize: 13,
  },
});

BottomLoginTips.defaultProps = {
  onClick: () => {},
};

BottomLoginTips.propTypes = {
  onClick: PropTypes.func.isRequired,
};
