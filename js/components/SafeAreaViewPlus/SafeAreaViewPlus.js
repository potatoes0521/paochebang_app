/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-11-29 11:21:26
 * @LastEditors: liuYang
 * @LastEditTime: 2019-11-29 16:28:39
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {
  DeviceInfo,
  SafeAreaView,
  StyleSheet,
  View,
  ViewPropTypes,
} from 'react-native';
import {PropTypes} from 'prop-types';
import {connectableObservableDescriptor} from 'rxjs/internal/observable/ConnectableObservable';

export default class SafeAreaViewPlus extends Component {
  static propTypes = {
    ...ViewPropTypes,
    topColor: PropTypes.string,
    bottomColor: PropTypes.string,
    enablePlus: PropTypes.bool,
    topInset: PropTypes.bool,
    bottomInset: PropTypes.bool,
  };
  static defaultProps = {
    topColor: '#ffffff',
    bottomColor: '#f8f8f8',
    enablePlus: true,
    topInset: true,
    bottomInset: false,
  };

  genSafeAreaViewPlus() {
    const {children, bottomColor, topInset, bottomInset} = this.props;
    const topColor = '#ffffff';
    return (
      <View style={[styles.container, this.props.style]}>
        {this.getTopArea(topColor, topInset)}
        {children}
        {this.getBottomArea(bottomColor, bottomInset)}
      </View>
    );
  }

  genSafeAreaView() {
    return (
      <SafeAreaView
        style={[styles.container, this.props.style]}
        {...this.props}>
        {this.props.children}
      </SafeAreaView>
    );
  }

  getTopArea(topColor, topInset) {
    return !DeviceInfo.isIPhoneX_deprecated || !topInset ? null : (
      <View
        style={[
          styles.topArea,
          {
            backgroundColor: topColor,
          },
        ]}
      />
    );
  }

  getBottomArea(bottomColor, bottomInset) {
    return !DeviceInfo.isIPhoneX_deprecated || !bottomInset ? null : (
      <View
        style={[
          styles.bottomArea,
          {
            backgroundColor: bottomColor,
          },
        ]}
      />
    );
  }

  render() {
    const {enablePlus} = this.props;
    return enablePlus ? this.genSafeAreaViewPlus() : this.genSafeAreaView();
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topArea: {
    height: 44,
  },
  bottomArea: {
    height: 34,
  },
});
