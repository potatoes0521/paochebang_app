/*
 * @Author: liuYang
 * @description: 订单列表
 * @path: 引入路径
 * @Date: 2019-12-23 11:30:10
 * @LastEditors  : liuYang
 * @LastEditTime : 2019-12-24 17:22:47
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, View, FlatList, RefreshControl} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import GlobalStyles from '../../../assets/css/GlobalStyles';
import OrderItem from '../../../components/OrderItem/OrderItem';
import BottomLoading from '../../../components/BottomLoading/BottomLoading.js';
import EmptyList from '../../../components/EmptyList/EmptyList.js';
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
  }

  componentDidMount() {
    this.getOrderList({refresh: true});
  }

  componentWillUnmount() {}

  /**
   * 函数功能描述
   * @param {String} status 状态
   * @param {Number} pageNum 页数
   * @param {Number} pageSize 条数
   * @return void
   */
  getOrderList({
    status = this.props.status,
    pageNum = this.orderPage,
    pageSize = 10,
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
      status,
      pageNum,
      pageSize,
    };
    api.order.getOrdersList(sendData, this).then(res => {
      this.setState({
        isLoading: false,
      });
      let data = res.data;
      if (!data) {
        return;
      }
      if (data && data.length < pageSize) {
        this.orderFlag = true;
      }
      let {orderData} = this.state;
      this.orderPage += 1;
      if (pageNum === 1) {
        this.setState({
          orderData: [...data],
        });
      } else {
        this.setState({
          orderData: [...orderData, ...data],
        });
      }
    });
  }
  genIndicator() {
    let {orderData} = this.state;
    return orderData && orderData.length > 10 && !this.orderFlag ? (
      <BottomLoading />
    ) : null;
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
          ListEmptyComponent={() => <EmptyList pageType={'order'} />}
          keyExtractor={data => {
            return data.orderCode + 'order';
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
  status: '',
  onClick: () => {},
};

OrderList.propTypes = {
  status: PropTypes.any,
  onClick: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    userInfo: state.user_info.userInfo,
  };
};
export default connect(mapStateToProps)(OrderList);
