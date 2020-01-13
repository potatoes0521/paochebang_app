/*
 * @Author: guorui
 * @description: 司机列表页面
 * @Date: 2019-12-23 18:09:23
 * @LastEditors  : guorui
 * @LastEditTime : 2020-01-13 19:06:20
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  DeviceEventEmitter,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import NavigationBar from '../../components/NavigatorBar/NavigationBar';
import NavigationUtil from '../../navigator/NavigationUtils';
import BackPressComponent from '../../components/BackPressComponent/BackPressComponent';
import GlobalStyles from '../../assets/css/GlobalStyles';
import MineStyles from '../../assets/css/MineStyles';
import DriverItem from './components/DriverItem.js';
import EmptyList from '../../components/EmptyList/EmptyList.js';
import api from '../../api/index';
import BottomLoading from '../../components/BottomLoading/BottomLoading.js';
import AddDriverImage from '../../assets/image/driver/add_driver.png';
import SafeAreaViewPlus from '../../components/SafeAreaViewPlus/SafeAreaViewPlus';
import Toast from 'react-native-easy-toast';

class Driver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectParam: '',
      totalCount: 0,
      driverListData: [],
      isLoading: false,
      mineData: {},
    };
    this.pageParams = {};
    this.driverPage = 1;
    this.driverFlag = false;
    this.toastRef = React.createRef();
    this.backPress = new BackPressComponent({
      backPress: () => this.onBackPress(),
    });
  }

  componentDidMount() {
    const {navigation} = this.props;
    const {state} = navigation;
    const {params} = state;
    console.log('params', params);
    this.pageParams = params || {};
    this.handleEmit();
    this.getAllDriverList({});
    this.backPress.componentDidMount();
  }

  componentWillUnmount() {
    this.emitMineDetails.remove();
    this.emitEditDriver.remove();
    this.backPress.componentWillUnmount();
  }
  onBackPress() {
    NavigationUtil.goBack(this.props.navigation);
    return true;
  }
  /**
   * 处理事件通知
   * @return void
   */
  handleEmit() {
    this.emitMineDetails = DeviceEventEmitter.addListener(
      'mineDetails',
      data => {
        DeviceEventEmitter.emit('mineInfo', data);
        NavigationUtil.goBack(this.props.navigation);
      },
    );
    this.emitEditDriver = DeviceEventEmitter.addListener('editDriver', () => {
      this.getAllDriverList({
        refresh: true,
      });
    });
  }
  /**
   * 获取司机列表
   * @param {String} selectParam 根据什么查询
   * @param {Number} pageNum 页数
   * @param {Number} pageSize 条数
   * @return void
   */
  getAllDriverList({
    selectParam = this.state.selectParam,
    pageNum = 1,
    pageSize = 10,
    refresh = false,
  }) {
    if (refresh) {
      this.driverFlag = false;
      this.driverPage = 1;
      pageNum = 1;
      this.setState({
        isLoading: true,
      });
    }
    if (this.driverFlag && !refresh) {
      return;
    }
    let sendData = {
      userId: this.props.userInfo.userId,
      selectParam,
      pageNum,
      pageSize,
    };
    let {driverListData} = this.state;
    api.driver.getDriverList(sendData, this).then(res => {
      this.setState({
        isLoading: false,
      });
      const data = res.data;
      if (!data) {
        return;
      }
      if (!data && this.state.selectParam) {
        this.toastRef.current.show('没搜索到结果');
        return;
      }
      if (data && data.length < pageSize) {
        this.driverFlag = true;
      }
      this.driverPage += 1;
      if (pageNum === 1) {
        this.setState({
          driverListData: [...data],
          totalCount: res.totalCount,
        });
      } else {
        this.setState({
          driverListData: [...driverListData, ...data],
        });
      }
    });
  }
  /**
   * 搜索框
   * @param {Type} e 输入的值
   * @return void
   */
  searchInput(value) {
    this.setState({
      selectParam: value,
    });
  }
  /**
   * 提交搜索
   * @return void
   */
  submitSearch() {
    this.driverPage = 1;
    this.driverFlag = false;
    this.getAllDriverList({selectParam: this.state.selectParam});
  }
  /**
   * 清除输入框内容
   * @return void
   */
  clearSearchInput() {
    this.setState({
      selectParam: '',
    });
    this.driverPage = 1;
    this.driverFlag = false;
    this.getAllDriverList({selectParam: ''});
  }
  genIndicator() {
    let {driverListData} = this.state;
    return driverListData && driverListData.length >= 10 && !this.driverFlag ? (
      <BottomLoading />
    ) : null;
  }
  /**
   * 跳转我的基本信息页面
   * @return void
   */
  navigationToMine() {
    if (this.pageParams.pageType === 'choose') {
      NavigationUtil.goPage(
        {pageType: this.pageParams.pageType},
        'MineDetailsPage',
      );
    } else {
      NavigationUtil.goPage({}, 'MineDetailsPage');
    }
  }
  /**
   * 添加司机
   * @return void
   */
  addDriver() {
    NavigationUtil.goPage({}, 'DriverEditPage');
  }

  render() {
    const {theme, navigation} = this.props;
    let {selectParam, totalCount, driverListData} = this.state;
    return (
      <SafeAreaViewPlus topColor={theme.themeColor}>
        <View style={styles.pageWrapper}>
          <NavigationBar
            navigation={navigation}
            leftViewShow={true}
            title={'司机信息列表'}
          />
          <View style={styles.topWrapper}>
            <View style={styles.searchWrapper}>
              <View style={styles.searchIcon}>
                <Text style={styles.iconStyle}>&#xe604;</Text>
              </View>
              <View style={styles.searchInput}>
                <TextInput
                  style={styles.input}
                  placeholder="输入姓名/联系方式进行搜索"
                  onChangeText={this.searchInput.bind(this)}
                  onSubmitEditing={this.submitSearch.bind(this)}
                  value={selectParam}
                />
              </View>
              {selectParam ? (
                <TouchableOpacity onPress={() => this.clearSearchInput()}>
                  <View style={styles.closeIcon}>
                    <Text style={styles.closeStyle}>&#xe614;</Text>
                  </View>
                </TouchableOpacity>
              ) : null}
            </View>
            <View style={styles.numWrapper}>
              <Text style={styles.fontStyle}>共</Text>
              <Text style={styles.numStyle}>{totalCount}</Text>
              <Text style={styles.fontStyle}>个司机</Text>
            </View>
            <TouchableOpacity onPress={this.navigationToMine.bind(this)}>
              <View style={styles.mineWrapper}>
                <Text style={MineStyles.labelText}>我的名片</Text>
                <Text style={styles.icon}>&#xe61d;</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomWrapper}>
            <FlatList
              data={this.state.driverListData}
              renderItem={data => (
                <DriverItem
                  type={this.pageParams.pageType}
                  itemData={data.item}
                />
              )}
              refreshControl={
                <RefreshControl
                  title="Loading..."
                  colors={[GlobalStyles.themeColor]}
                  refreshing={this.state.isLoading}
                  onRefresh={() => this.getAllDriverList({refresh: true})}
                  tintColor={GlobalStyles.themeColor}
                />
              }
              ListFooterComponent={() => this.genIndicator()}
              onEndReached={() => {
                this.getAllDriverList(this, {});
              }}
              ListEmptyComponent={() => (
                <EmptyList {...this.props} pageType={'driver'} />
              )}
              keyExtractor={data => {
                return data.userId + 'driver';
              }}
            />
          </View>
          {driverListData.length > 0 ? (
            <View style={styles.imageWrapper}>
              <TouchableOpacity onPress={this.addDriver.bind(this)}>
                <Image style={styles.imageStyle} source={AddDriverImage} />
              </TouchableOpacity>
            </View>
          ) : null}
          <Toast
            ref={this.toastRef}
            position={'center'}
            defaultCloseDelay={3000}
          />
        </View>
      </SafeAreaViewPlus>
    );
  }
}

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
    backgroundColor: '#F5F5F5',
    marginHorizontal: 12,
    marginVertical: 8,
    borderRadius: 4,
    paddingLeft: 12,
  },
  searchIcon: {
    width: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    fontSize: 14,
    fontFamily: 'iconfont',
    color: GlobalStyles.themeHColor,
  },
  closeIcon: {
    width: 16,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'right',
    marginRight: 12,
  },
  closeStyle: {
    fontSize: 20,
    fontFamily: 'iconfont',
    color: GlobalStyles.themeHColor,
  },
  searchInput: {
    flex: 1,
    textAlign: 'left',
  },
  input: {
    flex: 1,
  },
  placeholderStyle: {
    fontSize: 14,
    color: GlobalStyles.themeDisabled,
  },
  numWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
    paddingTop: 4,
    paddingBottom: 10,
  },
  fontStyle: {
    fontSize: 16,
    color: GlobalStyles.themeFontColor,
  },
  numStyle: {
    fontSize: 20,
    color: GlobalStyles.themeColor,
  },
  mineWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 10,
    borderBottomColor: '#F5F5F5',
  },
  icon: {
    fontSize: 16,
    fontFamily: 'iconfont',
    color: GlobalStyles.themeHColor,
  },
  imageWrapper: {
    position: 'absolute',
    right: 12,
    bottom: 59,
    zIndex: 5,
  },
  imageStyle: {
    width: 54,
    height: 54,
  },
});

Driver.defaultProps = {
  onClick: () => {},
};

Driver.propTypes = {
  onClick: PropTypes.func.isRequired,
};

// 如果需要引入store
const mapStateToProps = state => {
  return {
    userInfo: state.user_info.userInfo,
    theme: state.theme.theme,
  };
};
export default connect(mapStateToProps)(Driver);
