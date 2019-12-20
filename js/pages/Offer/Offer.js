/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-11-22 16:46:56
 * @LastEditors  : liuYang
 * @LastEditTime : 2019-12-20 18:13:52
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {connect} from 'react-redux';
// import GlobalStyles from '../../assets/css/GlobalStyles';
import NavigationBar from '../../components/NavigatorBar/NavigationBar';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import GlobalStyles from '../../assets/css/GlobalStyles';
import api from '../../api/index';
import OrderItem from '../../components/OrderItem/OrderItem';
class Offer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    let {userInfo} = this.props;
    const NavigatorTab = createAppContainer(
      createMaterialTopTabNavigator(
        {
          SellingTab: {
            screen: props => <Selling {...props} userInfo={userInfo} />,
            navigationOptions: {
              title: '报价',
            },
          },
          VacancyTab: {
            screen: props => <Vacancy {...props} userInfo={userInfo} />,
            navigationOptions: {
              title: '接单',
            },
          },
        },
        {
          tabBarOptions: {
            tabStyle: styles.tabStyle,
            activeTintColor: '#45C018',
            style: {
              backgroundColor: '#fff', //TabBar 的背景颜色
              height: 44,
              borderRightWidth: 0,
              borderBottomWidth: 0,
              marginBottom: 10,
            },
            indicatorStyle: styles.indicatorStyle, //标签指示器的样式
            labelStyle: styles.labelStyle, //文字的样式
            lazy: true,
          },
        },
      ),
    );
    return (
      <View style={styles.pageWrapper}>
        <NavigationBar title={'报价/接单'} />
        <View style={styles.tabWrapper}>
          <NavigatorTab />
          <View style={styles.select}>
            <View style={styles.line} />
            <View style={styles.selectMain}>
              <Text>筛选</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  tabWrapper: {
    flex: 1,
  },
  select: {
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 2,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    height: 44,
    flexDirection: 'row',
  },
  line: {
    width: 1,
    height: 26,
    backgroundColor: '#f5f5f5',
  },
  selectMain: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabStyle: {
    borderBottomColor: GlobalStyles.themeColor,
    borderBottomWidth: 2,
    width: 150,
    height: 44,
  },
  labelStyle: {
    color: GlobalStyles.themeFontColor,
    fontSize: 16,
    fontWeight: '700',
  },
  indicatorStyle: {
    height: 3,
    width: 60,
    marginLeft: 45,
    backgroundColor: GlobalStyles.themeColor,
  },
});
// 如果需要引入store
const mapStateToProps = state => {
  return {
    userInfo: state.user_info.userInfo,
  };
};
export default connect(mapStateToProps)(Offer);

class Selling extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offerData: [],
    };
    this.offerPage = 1;
    this.offerFlag = false;
    this.sendCityId = '';
    this.receiveCityId = '';
  }
  componentDidMount() {
    this.getOfferList({});
  }
  getOfferList({
    pageNum = this.offerPage,
    pageSize = 10,
    sendCityId = this.sendCityId,
    receiveCityId = this.receiveCityId,
  }) {
    let sendData = {
      pageNum,
      pageSize,
      sendCityId,
      receiveCityId,
    };
    console.log('this.props', this);
    api.offer.getOfferList(sendData, this).then(res => {
      if (!res.data) {
        return;
      }
      this.setState({
        offerData: res.data,
      });
    });
    // } else {
    //   api.order.getReceiptOrderList(sendData, this).then(res => {
    //     if (!res) {
    //       return;
    //     }
    //     const data = this.handleOrdersData(res);
    //     this.handleReturnData({res: data, pageSize, pageNum});
    //   });
    // }
  }
  render() {
    return (
      <View style={styles.viewBox}>
        <FlatList
          data={this.state.offerData}
          renderItem={data => <OrderItem type={'offer'} item={data} />}
        />
      </View>
    );
  }
}
class Vacancy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderData: [],
    };
    this.orderPage = 1;
    this.orderFlag = false;
    this.sendCityId = '';
    this.receiveCityId = '';
  }
  componentDidMount() {
    this.getOrderList({});
  }
  getOrderList({
    pageNum = this.orderPage,
    pageSize = 10,
    sendCityId = this.sendCityId,
    receiveCityId = this.receiveCityId,
  }) {
    let sendData = {
      pageNum,
      pageSize,
      sendCityId,
      receiveCityId,
    };
    api.order.getReceiptOrderList(sendData, this).then(res => {
      if (!res.data) {
        return;
      }
      const data = res.data.map(item => {
        const obj = Object.assign({}, item, item.inquiryOrder);
        delete obj.inquiryOrder;
        const itemData = {
          orderCode: obj.orderCode,
          statusDesc: obj.statusDesc,
          status: obj.status,
          inquiryTimeDesc: obj.inquiryTimeDesc,
          sendCityId: obj.sendCityId,
          sendCityName: obj.sendCityName,
          receiveCityId: obj.receiveCityId,
          receiveCityName: obj.receiveCityName,
          carInfo: obj.carInfo,
          homeDelivery: obj.homeDelivery,
          storePickup: obj.storePickup,
          storePickupDesc: obj.storePickupDesc,
          homeDeliveryDesc: obj.homeDeliveryDesc,
          quotedPriceDesc: obj.quotedPriceDesc,
          transferSettlePriceDesc: obj.transferSettlePriceDesc,
        };
        return itemData;
      });
      this.setState({
        orderData: data,
      });
    });
  }
  render() {
    return (
      <View style={styles.viewBox}>
        <FlatList
          data={this.state.orderData}
          renderItem={data => <OrderItem type={'offer'} item={data} />}
        />
      </View>
    );
  }
}
