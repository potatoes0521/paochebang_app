/*
 * @Author: guorui
 * @description: 司机列表页面
 * @Date: 2019-12-23 18:09:23
 * @LastEditors  : guorui
<<<<<<< Updated upstream
 * @LastEditTime : 2019-12-25 13:17:48
=======
 * @LastEditTime : 2019-12-25 11:52:31
>>>>>>> Stashed changes
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
} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import NavigationBar from '../../components/NavigatorBar/NavigationBar';
import GlobalStyles from '../../assets/css/GlobalStyles';
import DetailsStyles from '../../assets/css/DetailsStyles';
// import DriverItem from './components/DriverItem.js';
import api from '../../api/index';
import BottomLoading from '../../components/BottomLoading/BottomLoading.js';
import Toast from 'react-native-easy-toast';

class Driver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectParam: '',
      totalCount: 0,
      driverListData: [],
      isLoading: false,
    };
    this.driverPage = 1;
    this.driverFlag = false;
    this.toastRef = React.createRef();
  }

  componentDidMount() {
    this.getAllDriverList();
  }

  componentWillUnmount() {}
  /**
   * 获取司机列表
   * @param {String} selectParam 根据什么查询
   * @param {Number} pageNum 页数
   * @param {Number} pageSize 条数
   * @return void
   */
  getAllDriverList(selectParam = '', pageNum = 1, pageSize = 10) {
    let sendData = {
      userId: this.props.userInfo.userId,
      selectParam,
      pageNum,
      pageSize,
    };
    let {driverListData} = this.state;
    api.driver.getDriverList(sendData, this).then(res => {
      console.log(res, 'driver');
      // const data = res.data;
      // if (!data) {
      //   return;
      // }
      // if (!data && selectParam) {
      //   this.toastRef.current.show('没搜索到结果');
      //   return;
      // }
      // if (data && data.length < pageSize) {
      //   this.driverFlag = true;
      // }
      // this.driverPage += 1;
      // if (pageNum === 1) {
      //   this.setState({
      //     driverListData: [...data],
      //     totalCount: res.totalCount,
      //   });
      // } else {
      //   this.setState({
      //     driverListData: [...driverListData, ...data],
      //   });
      // }
    });
  }
  /**
   * 搜索框
   * @param {Type} e 输入的值
   * @return void
   */
  searchInput(e) {
    console.log(e);
  }
  // genIndicator() {
  //   let {driverListData} = this.state;
  //   return driverListData && driverListData.length >= 10 && !this.driverFlag ? (
  //     <BottomLoading />
  //   ) : null;
  // }

  render() {
    const {navigation} = this.props;
    let {selectParam, totalCount} = this.state;
    return (
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
            <View>
              <TextInput
                style={styles.input}
                placeholder="输入姓名/联系方式进行搜索"
                // placeholderTextColor={styles.placeholderStyle}
                // inlineImageLeft
                onChangeText={this.searchInput.bind(this)}
                value={selectParam}
              />
            </View>
            <View style={styles.closeIcon}>
              <Text style={styles.closeStyle}>&#xe614;</Text>
            </View>
          </View>
          <View style={styles.numWrapper}>
            <Text style={styles.fontStyle}>共</Text>
            <Text style={styles.numStyle}>{totalCount}</Text>
            <Text style={styles.fontStyle}>个司机</Text>
          </View>
          <View style={styles.mineWrapper}>
            <Text style={DetailsStyles.labelText}>我的名片</Text>
            <Text style={styles.icon}>&#xe61d;</Text>
          </View>
        </View>
        {/* <View style={styles.bottomWrapper}>
          <FlatList
            data={this.state.driverListData}
            renderItem={data => <DriverItem itemData={data.item} />}
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
            // keyExtractor={data => {
            //   return data.saleToPalletId + 'driver';
            // }}
          />
        </View> */}
        <Toast
          ref={this.toastRef}
          position={'center'}
          defaultCloseDelay={3000}
        />
      </View>
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
    height: 40,
    backgroundColor: '#F5F5F5',
    marginHorizontal: 12,
    marginVertical: 8,
    borderRadius: 4,
    paddingLeft: 13,
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
  },
  closeStyle: {
    fontSize: 20,
    fontFamily: 'iconfont',
    color: GlobalStyles.themeHColor,
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
});

// Driver.defaultProps = {
//   onClick: () => {},
// };

// Driver.propTypes = {
//   onClick: PropTypes.func.isRequired,
// };
// 如果需要引入store
const mapStateToProps = state => {
  return {
    userInfo: state.user_info.userInfo,
  };
};
export default connect(mapStateToProps)(Driver);
