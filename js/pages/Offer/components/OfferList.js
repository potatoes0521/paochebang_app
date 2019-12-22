/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2019-12-22 16:58:23
 * @LastEditors  : liuYang
 * @LastEditTime : 2019-12-22 17:09:21
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import OrderItem from '../../../components/OrderItem/OrderItem';
import GlobalStyles from '../../../assets/css/GlobalStyles';
import api from '../../../api/index';

class OfferList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offerData: [],
      s: false,
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
    console.log('object');
    this.setState({
      isLoading: true,
    });
    let sendData = {
      pageNum,
      pageSize,
      sendCityId,
      receiveCityId,
    };
    api.offer.getOfferList(sendData, this).then(res => {
      this.setState({
        isLoading: false,
      });
      if (!res.data) {
        return;
      }
      this.setState({
        offerData: res.data,
      });
    });
  }
  genIndicator() {
    return (
      <View style={styles.indicatorContainer}>
        {/* <ActivityIndicator
          style={styles.indicator}
          size="large"
          animating={true}
        /> */}
        <Text>正在加载更多</Text>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.listWrapper}>
        <FlatList
          data={this.state.offerData}
          renderItem={data => <OrderItem type={'offer'} item={data} />}
          refreshControl={
            <RefreshControl
              title="Loading..."
              colors={['red']}
              refreshing={this.state.isLoading}
              onRefresh={() => this.getOfferList(this, {})}
              tintColor={'orange'}
            />
          }
          ListFooterComponent={() => this.genIndicator()}
          onEndReached={() => {
            this.getOfferList.bind(this, {});
          }}
          keyExtractor={data => {
            return data.inquiryId;
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

OfferList.defaultProps = {
  onClick: () => {},
};

OfferList.propTypes = {
  onClick: PropTypes.func.isRequired,
};

// 如果需要引入store
const mapStateToProps = state => {
  return {
    userInfo: state.user_info.userInfo,
  };
};
export default connect(mapStateToProps)(OfferList);
