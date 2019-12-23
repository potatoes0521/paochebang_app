/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2019-12-22 16:58:23
 * @LastEditors  : liuYang
 * @LastEditTime : 2019-12-23 15:24:53
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, View, FlatList, RefreshControl} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import OrderItem from '../../../components/OrderItem/OrderItem';
import BottomLoading from '../../../components/BottomLoading/BottomLoading.js';
import EmptyList from '../../../components/EmptyList/EmptyList.js';
import GlobalStyles from '../../../assets/css/GlobalStyles';
import api from '../../../api/index';

class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderData: [],
      isLoading: false,
    };
    this.orderPage = 1;
    this.orderFlag = false;
    this.sendCityId = '';
    this.receiveCityId = '';
  }
  componentDidMount() {
    this.getOrderList({refresh: true});
  }
  getOrderList({
    pageNum = this.orderPage,
    pageSize = 10,
    sendCityId = this.sendCityId,
    receiveCityId = this.receiveCityId,
    refresh = false,
  }) {
    if (refresh) {
      this.orderFlag = false;
      this.orderPage = 1;
      pageNum = 1;
      this.setState({
        isLoading: true,
      });
    }
    if (this.orderFlag && !refresh) {
      return;
    }
    let sendData = {
      pageNum,
      pageSize,
      sendCityId,
      receiveCityId,
    };
    api.order.getReceiptOrderList(sendData, this).then(res => {
      this.setState({
        isLoading: false,
      });
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
      if (data && data.length < pageSize) {
        this.orderFlag = true;
      }
      this.orderPage += 1;
      if (pageNum === 1) {
        this.setState({
          orderData: data,
        });
      } else {
        let {orderData} = this.state;
        this.setState({
          orderData: [...orderData, ...data],
        });
      }
    });
  }
  genIndicator() {
    let {orderData} = this.state;
    return orderData && orderData.length > 10 ? <BottomLoading /> : null;
  }
  render() {
    return (
      <View style={styles.listWrapper}>
        <FlatList
          data={this.state.orderData}
          renderItem={data => <OrderItem type={'offer'} item={data} />}
          refreshControl={
            <RefreshControl
              title="Loading..."
              colors={[GlobalStyles.themeColor]}
              refreshing={this.state.isLoading}
              onRefresh={() => this.getOrderList({refresh: true})}
              tintColor={GlobalStyles.themeColor}
            />
          }
          ListFooterComponent={() => this.genIndicator()}
          onEndReached={() => {
            this.getOrderList.bind(this, {});
          }}
          ListEmptyComponent={() => {
            return <EmptyList />;
          }}
          keyExtractor={data => {
            return data.inquiryId + 'order';
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listWrapper: {
    flex: 1,
  },
});

OrderList.defaultProps = {
  onClick: () => {},
};

OrderList.propTypes = {
  onClick: PropTypes.func.isRequired,
};

// 如果需要引入store
const mapStateToProps = state => {
  return {
    userInfo: state.user_info.userInfo,
  };
};
export default connect(mapStateToProps)(OrderList);
