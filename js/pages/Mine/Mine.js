/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-11-22 16:47:53
 * @LastEditors  : guorui
 * @LastEditTime : 2020-01-16 20:46:20
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {appVersion} from '../../api/requestHandle.js';
import {connect} from 'react-redux';
import NavigationUtil from '../../navigator/NavigationUtils';
import NavigationBar from '../../components/NavigatorBar/NavigationBar';
import MineStyles from '../../assets/css/MineStyles';
import GlobalStyles from '../../assets/css/GlobalStyles';
import accountImage from '../../assets/image/mine/account.png';
import lineImage from '../../assets/image/mine/line.png';
import driverImage from '../../assets/image/mine/driver.png';
import realNameImage from '../../assets/image/mine/real_name.png';
import sellingImage from '../../assets/image/mine/selling_new.png';
import vacancyImage from '../../assets/image/mine/vacancy_new.png';
import defaultImage from '../../assets/image/mine/default_icon.png';
import {defaultResourceImgURL} from '../../config/requestConfig';

class Mine extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}

  /**
   * 跳转注册页
   * @return void
   */
  navigatorRegister(e) {
    e.stopPropagation();
    NavigationUtil.goPage({}, 'RegisterPage');
  }
  /**
   * 跳转页面
   * @return void
   */
  navigatorPage(pageName) {
    let {userInfo} = this.props;
    if (!userInfo || !userInfo.userId || !userInfo.token) {
      NavigationUtil.goPage({}, 'RegisterPage');
      return;
    }
    if (!pageName) {
      return;
    }
    switch (pageName) {
      case 'account':
        NavigationUtil.goPage({}, 'AccountPage');
        break;
      case 'driver':
        NavigationUtil.goPage({}, 'DriverPage');
        break;
      case 'mine':
        NavigationUtil.goPage({}, 'MineDetailsPage');
        break;
      case 'name':
        NavigationUtil.goPage({}, 'AuthenticationPage');
        break;
      case 'selling':
        NavigationUtil.goPage({pageType: pageName}, 'MainPublishPage');
        break;
      case 'vacancy':
        NavigationUtil.goPage({pageType: pageName}, 'MainPublishPage');
        break;
      case 'line':
        NavigationUtil.goPage({}, 'LinePage');
        break;
      default:
        return;
    }
  }
  /**
   * 联系客服
   * @return void
   */
  callService() {
    const tel = 'tel:400-9698-256';
    Linking.canOpenURL(tel)
      .then(supported => {
        if (!supported) {
          console.log('Can not handle tel:' + tel);
        } else {
          return Linking.openURL(tel);
        }
      })
      .catch(error => console.log('tel error', error));
  }

  render() {
    let {userInfo} = this.props;
    let userName = decodeURIComponent(userInfo.nickName);
    return (
      <View style={styles.pageWrapper}>
        <NavigationBar title={'我的'} />
        <TouchableOpacity onPress={() => this.navigatorPage('mine')}>
          <View style={styles.userWrapper}>
            <View style={styles.left}>
              {userInfo.userPhoto ? (
                <View style={styles.userImage}>
                  <Image
                    style={styles.imageStyle}
                    source={{uri: userInfo.userPhoto}}
                  />
                </View>
              ) : (
                <View style={styles.userImage}>
                  <Image style={styles.imageStyle} source={defaultImage} />
                </View>
              )}
              {userInfo.userId ? (
                <View style={styles.userInfo}>
                  <View style={styles.userName}>
                    {userInfo.nickName ? (
                      <Text style={MineStyles.labelText}>{userName}</Text>
                    ) : (
                      <Text style={MineStyles.labelText}>
                        {userInfo.mobile}
                      </Text>
                    )}
                  </View>
                  <View style={styles.certification}>
                    {userInfo.realNameAuthStatus ? (
                      <Image
                        style={styles.certificationImage}
                        source={{
                          uri: `${defaultResourceImgURL}mine/already.png`,
                        }}
                      />
                    ) : (
                      <Image
                        style={styles.certificationImage}
                        source={{
                          uri: `${defaultResourceImgURL}mine/never.png`,
                        }}
                      />
                    )}
                  </View>
                </View>
              ) : (
                <TouchableOpacity onPress={this.navigatorRegister.bind(this)}>
                  <View style={styles.userInfo}>
                    <Text style={MineStyles.labelText}>注册/登录</Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.right}>
              <Text style={styles.icon}>&#xe61d;</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.menuWrapper}>
          <View style={[styles.menuList, styles.menuLine]}>
            <TouchableOpacity onPress={() => this.navigatorPage('account')}>
              <View style={styles.menuItem}>
                <View style={styles.menuImage}>
                  <Image style={styles.itemImage} source={accountImage} />
                </View>
                <View style={styles.menuText}>
                  <Text style={MineStyles.contentText}>账户体系</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.navigatorPage('line')}>
              <View style={styles.menuItem}>
                <View style={styles.menuImage}>
                  <Image style={styles.itemImage} source={lineImage} />
                </View>
                <View style={styles.menuText}>
                  <Text style={MineStyles.contentText}>常跑路线</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.navigatorPage('driver')}>
              <View style={styles.menuItem}>
                <View style={styles.menuImage}>
                  <Image style={styles.itemImage} source={driverImage} />
                </View>
                <View style={styles.menuText}>
                  <Text style={MineStyles.contentText}>司机管理</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.menuList}>
            <TouchableOpacity onPress={() => this.navigatorPage('selling')}>
              <View style={styles.menuItem}>
                <View style={styles.menuImage}>
                  <Image style={styles.itemImage} source={sellingImage} />
                </View>
                <View style={styles.menuText}>
                  <Text style={MineStyles.contentText}>已发卖板</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.navigatorPage('vacancy')}>
              <View style={styles.menuItem}>
                <View style={styles.menuImage}>
                  <Image style={styles.itemImage} source={vacancyImage} />
                </View>
                <View style={styles.menuText}>
                  <Text style={MineStyles.contentText}>已发空位</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.navigatorPage('name')}>
              <View style={styles.menuItem}>
                <View style={styles.menuImage}>
                  <Image style={styles.itemImage} source={realNameImage} />
                </View>
                <View style={styles.menuText}>
                  <Text style={MineStyles.contentText}>实名认证</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.versionWrapper}>
          <View style={[styles.versionList, styles.versionLine]}>
            <Text style={MineStyles.contentText}>版本</Text>
            <Text style={styles.versionNum}>{appVersion}</Text>
          </View>
          <View style={styles.versionList}>
            <Text style={MineStyles.contentText}>联系跑车</Text>
            <TouchableOpacity onPress={() => this.callService()}>
              <Text style={styles.versionNum}>400-9698-256</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  userWrapper: {
    paddingHorizontal: 22,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageStyle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  certificationImage: {
    width: 68,
    height: 24,
    marginTop: 1,
  },
  icon: {
    fontSize: 16,
    fontFamily: 'iconfont',
    color: GlobalStyles.themeDisabled,
  },
  menuWrapper: {
    marginHorizontal: 12,
    marginTop: 10,
    borderRadius: 4,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  menuList: {
    paddingHorizontal: 17,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  menuItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemImage: {
    width: 24,
    height: 24,
    marginBottom: 6,
  },
  versionWrapper: {
    marginHorizontal: 12,
    marginTop: 10,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  versionList: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 17,
    paddingHorizontal: 12,
  },
  versionLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  versionNum: {
    fontSize: 15,
    color: GlobalStyles.themeHColor,
  },
});
// 如果需要引入store
const mapStateToProps = state => {
  return {
    userInfo: state.user_info.userInfo,
  };
};
export default connect(mapStateToProps)(Mine);
