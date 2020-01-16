/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2019-12-22 16:58:23
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-01-16 11:28:20
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  DeviceEventEmitter,
} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ListItem from './ListItem';
import BottomLoading from '../../../components/BottomLoading/BottomLoading.js';
import GlobalStyles from '../../../assets/css/GlobalStyles';
import EmptyList from '../../../components/EmptyList/EmptyList.js';
import api from '../../../api/index';

class OfferList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offerData: [],
      isLoading: false,
    };
    this.offerPage = 1;
    this.offerFlag = false;
    this.sendCityId = '';
    this.receiveCityId = '';
  }
  componentDidMount() {
    this.handleEmit();
    this.getOfferList({});
  }
  componentWillUnmount() {
    this.emitSelectMsg.remove();
  }
  /**
   * 处理事件通知
   * @return void
   */
  handleEmit() {
    // 选择城市时候的通知
    this.emitSelectMsg = DeviceEventEmitter.addListener(
      'selectMsgLikeCity',
      data => {
        this.sendCityId = data.sendCityId;
        this.receiveCityId = data.receiveCityId;
        this.getOfferList({
          sendCityId: this.sendCityId,
          receiveCityId: this.receiveCityId,
          refresh: true,
        });
      },
    );
  }
  getOfferList({
    pageNum = this.offerPage,
    pageSize = 10,
    sendCityId = this.sendCityId,
    receiveCityId = this.receiveCityId,
    refresh = false,
  }) {
    if (refresh) {
      this.offerFlag = false;
      this.offerPage = 1;
      pageNum = 1;
      this.setState({
        isLoading: true,
      });
    }
    if (this.offerFlag && !refresh) {
      return;
    }
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
      let data = res.data;
      if (!res.data) {
        return;
      }
      if (data && data.length < pageSize) {
        this.offerFlag = true;
      }
      this.offerPage += 1;
      if (pageNum === 1) {
        this.setState({
          offerData: data,
        });
      } else {
        let {offerData} = this.state;
        this.setState({
          offerData: [...offerData, ...data],
        });
      }
    });
  }
  genIndicator() {
    let {offerData} = this.state;
    return offerData && offerData.length > 10 && !this.offerFlag ? (
      <BottomLoading />
    ) : null;
  }
  render() {
    return (
      <View style={styles.listWrapper}>
        <FlatList
          data={this.state.offerData}
          renderItem={data => <ListItem type={'offer'} item={data} />}
          refreshControl={
            <RefreshControl
              title="Loading..."
              colors={[GlobalStyles.themeColor]}
              refreshing={this.state.isLoading}
              onRefresh={() => this.getOfferList({refresh: true})}
              tintColor={GlobalStyles.themeColor}
              titleColor={GlobalStyles.themeTipColor}
            />
          }
          ListFooterComponent={() => this.genIndicator()}
          onEndReached={() => {
            this.getOfferList(this, {});
          }}
          ListEmptyComponent={() => (
            <EmptyList {...this.props} pageType={'offer'} />
          )}
          keyExtractor={data => {
            return data.inquiryId + 'offer';
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
