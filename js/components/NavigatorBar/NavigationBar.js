/*
 * @Author: liuYang
 * @description: 公共导航
 * @Date: 2019-11-25 10:58:56
 * @LastEditors: liuYang
 * @LastEditTime: 2019-12-04 11:56:42
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {
  ViewPropTypes,
  Text,
  StatusBar,
  StyleSheet,
  View,
  Platform,
  DeviceInfo,
} from 'react-native';
import PropTypes from 'prop-types';
import GlobalStyle from '../../assets/css/GlobalStyles.js';

const NAV_BAR_HEIGHT_IOS = 50; //导航栏在iOS中的高度
const NAV_BAR_HEIGHT_ANDROID = 50; //导航栏在Android中的高度
const NAV_BAR_HEIGHT =
  Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID;
const STATUS_BAR_HEIGHT =
  Platform.OS !== 'ios' || DeviceInfo.isIPhoneX_deprecated ? 0 : 20; //状态栏的高度
const StatusBarShape = {
  //设置状态栏所接受的属性
  barStyle: PropTypes.oneOf(['light-content', 'default']),
  hidden: PropTypes.bool,
  backgroundColor: PropTypes.string,
};

export default class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    let titleView = this.props.titleView ? (
      this.props.titleView
    ) : (
      <Text ellipsizeMode="head" numberOfLines={1} style={styles.title}>
        {this.props.title}
      </Text>
    );

    let content = this.props.hide ? null : (
      <View style={styles.navBar}>
        {this.getButtonElement(this.props.leftButton)}
        <View
          style={[styles.navBarTitleContainer, this.props.titleLayoutStyle]}>
          {titleView}
        </View>
        {this.getButtonElement(this.props.rightButton)}
      </View>
    );
    return (
      <View style={[styles.container, this.props.style]}>
        {!this.props.statusBar.hidden ? (
          <View style={styles.statusBar}>
            <StatusBar {...this.props.statusBar} />
          </View>
        ) : null}
        {content}
      </View>
    );
  }
  getButtonElement(data) {
    return <View style={styles.navBarButton}>{data ? data : null}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderBottomColor: '#e9e9e9',
    borderBottomWidth: 1,
    borderStyle: 'solid',
  },
  navBarButton: {
    alignItems: 'center',
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: NAV_BAR_HEIGHT,
  },
  navBarTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 40,
    right: 40,
    top: 0,
    bottom: 0,
  },
  title: {
    fontSize: 18,
    fontWeight: '900',
    color: GlobalStyle.themeFontColor,
  },
  statusBar: {
    height: STATUS_BAR_HEIGHT,
  },
});

//设置默认属性
NavigationBar.defaultProps = {
  statusBar: {
    barStyle: 'light-content',
    hidden: false,
  },
  onClick: () => {},
};
//提供属性的类型检查
NavigationBar.propTypes = {
  style: ViewPropTypes.style,
  title: PropTypes.string,
  titleView: PropTypes.element,
  titleLayoutStyle: ViewPropTypes.style,
  hide: PropTypes.bool,
  statusBar: PropTypes.shape(StatusBarShape),
  rightButton: PropTypes.element,
  leftButton: PropTypes.element,
  onClick: PropTypes.func.isRequired,
};
