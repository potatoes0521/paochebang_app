/*
 * @Author: guorui
 * @description: 我发布的卖板列表
 * @Date: 2020-01-02 16:58:06
 * @LastEditors  : guorui
 * @LastEditTime : 2020-01-07 14:24:16
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

class SellingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sellingData: [],
      isLoading: false,
    };
    this.sellingPage = 1;
    this.sellingFlag = false;
  }
  componentDidMount() {
    this.getSellingList({});
    this.handleEmit();
  }
  componentWillUnmount() {
    this.emitRefresh.remove();
  }
  handleEmit() {
    this.emitRefresh = DeviceEventEmitter.addListener('refreshSelling', () => {
      this.getSellingList({
        refresh: true,
      });
    });
  }
  /**
   * 获取卖板列表
   * @param {Type} {pageNum=this.sellingPage 参数描述
   * @param {Type} pageSize=10 参数描述
   * @param {Type} refresh=false} 参数描述
   * @return void
   */
  getSellingList({pageNum = this.sellingPage, pageSize = 10, refresh = false}) {
    if (refresh) {
      this.sellingFlag = false;
      this.sellingPage = 1;
      pageNum = 1;
      this.setState({
        isLoading: true,
      });
    }
    if (this.sellingFlag && !refresh) {
      return;
    }
    let sendData = {
      pageNum,
      pageSize,
    };
    api.selling.getMineSellingList(sendData, this).then(res => {
      this.setState({
        isLoading: false,
      });
      if (!res.data) {
        return;
      }
      const data = res.data;
      if (data && data.length < pageSize) {
        this.sellingFlag = true;
      }
      this.sellingPage += 1;
      if (pageNum === 1) {
        this.setState({
          sellingData: data,
        });
      } else {
        let {sellingData} = this.state;
        this.setState({
          sellingData: [...sellingData, ...data],
        });
      }
    });
  }
  genIndicator() {
    let {sellingData} = this.state;
    return sellingData && sellingData.length > 10 && !this.sellingFlag ? (
      <BottomLoading />
    ) : null;
  }
  render() {
    return (
      <View style={styles.listWrapper}>
        <FlatList
          data={this.state.sellingData}
          renderItem={data => <ListItem type={'selling'} item={data} />}
          refreshControl={
            <RefreshControl
              title="Loading..."
              colors={[GlobalStyles.themeColor]}
              refreshing={this.state.isLoading}
              onRefresh={() => this.getSellingList({refresh: true})}
              tintColor={GlobalStyles.themeColor}
            />
          }
          ListFooterComponent={() => this.genIndicator()}
          onEndReached={() => {
            this.getSellingList.bind(this, {});
          }}
          ListEmptyComponent={() => (
            <EmptyList {...this.props} pageType={'selling'} />
          )}
          keyExtractor={data => {
            return data.saleToPalletId + 'selling';
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

SellingList.defaultProps = {
  onClick: () => {},
};

SellingList.propTypes = {
  onClick: PropTypes.func.isRequired,
};

// 如果需要引入store
const mapStateToProps = state => {
  return {
    userInfo: state.user_info.userInfo,
  };
};
export default connect(mapStateToProps)(SellingList);
