/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2019-12-23 14:53:33
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-01-16 13:57:04
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
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import GlobalStyles from '../../../assets/css/GlobalStyles';
import api from '../../../api/index';
import BottomLoading from '../../../components/BottomLoading/BottomLoading.js';
import VacancyItem from './VacancyItem.js';

class VacancyList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state = {
      listData: [],
      isLoading: false,
    };
    this.pageNum = 1;
    this.loadingFlag = false;
  }

  componentDidMount() {
    this.getVacancyList({});
    this.handleEmit();
  }

  componentWillUnmount() {
    this.emitRefresh.remove();
    this.emitSelectMsg.remove();
  }
  handleEmit() {
    this.emitRefresh = DeviceEventEmitter.addListener('refreshVacancy', () => {
      this.getVacancyList({
        refresh: true,
      });
    });
    this.emitSelectMsg = DeviceEventEmitter.addListener(
      'selectMsgLikeCity_information',
      data => {
        this.sendCityId = data.sendCityId;
        this.receiveCityId = data.receiveCityId;
        this.getSellingList({
          sendCityId: this.sendCityId,
          receiveCityId: this.receiveCityId,
          refresh: true,
        });
      },
    );
  }
  /**
   * 获取卖板详情
   * @param {Number} pageNum=1 页数
   * @param {Number} pageSize=10 条数
   * @return void
   */
  getVacancyList({
    pageNum = this.pageNum,
    pageSize = 10,
    sendCityId = this.sendCityId,
    receiveCityId = this.receiveCityId,
    refresh = false,
  }) {
    if (refresh) {
      this.loadingFlag = false;
      this.pageNum = 1;
      pageNum = 1;
      this.setState({
        isLoading: true,
      });
    }
    if (this.loadingFlag && !refresh) {
      return;
    }
    let sendData = {
      pageNum,
      pageSize,
      sendCityId,
      receiveCityId,
    };
    let {listData} = this.state;
    api.vacancy.getVacancyList(sendData, this).then(res => {
      this.setState({
        isLoading: false,
      });
      let data = res.data;
      if (!data) {
        return;
      }
      if (data && data.length < pageSize) {
        this.loadingFlag = true;
      }
      this.pageNum += 1;
      if (pageNum === 1) {
        this.setState({
          listData: data,
        });
      } else {
        this.setState({
          listData: [...listData, ...data],
        });
      }
    });
  }
  genIndicator() {
    let {listData} = this.state;
    return listData && listData.length >= 10 && !this.loadingFlag ? (
      <BottomLoading />
    ) : null;
  }
  render() {
    return (
      <View style={styles.pageWrapper}>
        <FlatList
          data={this.state.listData}
          renderItem={data => <VacancyItem itemData={data.item} />}
          refreshControl={
            <RefreshControl
              title="Loading..."
              colors={[GlobalStyles.themeColor]}
              refreshing={this.state.isLoading}
              onRefresh={() => this.getVacancyList({refresh: true})}
              tintColor={GlobalStyles.themeColor}
            />
          }
          ListFooterComponent={() => this.genIndicator()}
          onEndReached={() => {
            this.getVacancyList(this, {});
          }}
          keyExtractor={data => {
            return data.vacantPalletId + 'vacancy';
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
  },
});

VacancyList.defaultProps = {
  onClick: () => {},
};

VacancyList.propTypes = {
  onClick: PropTypes.func.isRequired,
};

// 如果需要引入store
const mapStateToProps = state => {
  return {
    userInfo: state.user_info.userInfo,
  };
};
export default connect(mapStateToProps)(VacancyList);
