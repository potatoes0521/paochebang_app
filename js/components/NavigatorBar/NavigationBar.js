/*
 * @Author: liuYang
 * @description: 公共导航
 * @Date: 2019-11-25 10:58:56
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-01-16 18:04:42
 * @mustParam: 必传参数
 * title: PropTypes.string,
 *  导航栏标题
 * leftViewShow: PropTypes.bool, //
 *  是否显示左边的按钮组 显示就true不显示就false
 * rightViewShow: PropTypes.bool,
 *  是否显示右边的按钮组 显示就true不显示就false
 * statusBar: PropTypes.shape(StatusBarShape),
 *  一般不传不改变
 * onClick: PropTypes.func,
 * onBackClick: PropTypes.func,
 *  如果左边返回按钮需要特殊处理就需要必传onBackClick
 *  如果没有传就会执行默认事件  主要是针对webview做的特殊处理
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Platform,
  DeviceInfo,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import GlobalStyles from '../../assets/css/GlobalStyles.js';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NavigationUtil from '../../navigator/NavigationUtils';
import ShareUtil from '../../../native/ShareUtil';

const NAV_BAR_HEIGHT_IOS = 50; //导航栏在iOS中的高度
const NAV_BAR_HEIGHT_ANDROID = 50; //导航栏在Android中的高度
const NAV_BAR_HEIGHT =
  Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID;
const STATUS_BAR_HEIGHT =
  Platform.OS !== 'ios' || DeviceInfo.isIPhoneX_deprecated ? 0 : 20; //状态栏的高度
const StatusBarShape = {
  //设置状态栏所接受的属性
  barStyle: PropTypes.oneOf(['light-content', 'default', 'dark-content']),
  hidden: PropTypes.bool,
  backgroundColor: PropTypes.string,
};

export default class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // this.params = this.props.navigation.state.params;
  }

  componentDidMount() {}

  componentWillUnmount() {}
  onBack() {
    if (this.props && this.props.onBackClick) {
      this.props.onBackClick();
    } else {
      NavigationUtil.goBack(this.props.navigation);
    }
  }
  share() {
    ShareUtil.share(
      'sssss',
      'http://dev.umeng.com/images/tab2_1.png',
      'http://www.umeng.com/',
      'title',
      2,
      (code, message) => {
        this.setState({
          result: message,
        });
      },
    );
  }
  render() {
    let {leftViewShow, rightViewShow, title} = this.props;
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.navBar}>
          <View style={styles.leftBackBtn}>
            {leftViewShow && (
              <TouchableOpacity onPress={this.onBack.bind(this)}>
                <Ionicons
                  name={'ios-arrow-back'}
                  size={26}
                  style={styles.iconLeft}
                />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.navBarTitleContainer}>
            <Text ellipsizeMode="head" numberOfLines={1} style={styles.title}>
              {title}
            </Text>
          </View>
          <View style={styles.rightBtnView}>
            {rightViewShow && (
              <TouchableOpacity
                underlayColor={'transparent'}
                onPress={this.share.bind(this)}>
                <Text style={[GlobalStyles.icon, styles.shareIcon]}>
                  &#xe699;
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderBottomColor: '#e9e9e9',
    borderBottomWidth: 1,
    borderStyle: 'solid',
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
    fontWeight: '700',
    color: GlobalStyles.themeFontColor,
  },
  statusBar: {
    height: STATUS_BAR_HEIGHT,
  },
  leftBackBtn: {
    paddingLeft: 12,
    width: 50,
  },
  iconLeft: {
    color: GlobalStyles.themeFontColor,
  },
  rightBtnView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 12,
    // backgroundColor: 'red',
  },
  shareIcon: {
    fontSize: 20,
    color: GlobalStyles.themeFontColor,
  },
});

//设置默认属性
NavigationBar.defaultProps = {
  title: '',
  leftViewShow: false,
  rightViewShow: false,
  statusBar: {
    barStyle: 'dark-content',
    hidden: false,
    backgroundColor: '#ffffff',
    // translucent: true,
  },
  navigation: {},
  onClick: () => {},
};
//提供属性的类型检查
NavigationBar.propTypes = {
  title: PropTypes.string,
  navigation: PropTypes.object,
  leftViewShow: PropTypes.bool,
  rightViewShow: PropTypes.bool,
  statusBar: PropTypes.shape(StatusBarShape),
  onClick: PropTypes.func,
  onBackClick: PropTypes.func,
};
