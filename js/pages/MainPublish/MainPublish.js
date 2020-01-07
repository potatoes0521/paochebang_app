/*
 * @Author: guorui
 * @description: 我发布的卖板和空位
 * @Date: 2019-12-27 11:21:19
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-01-02 16:13:44
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, FlatList, View, RefreshControl} from 'react-native';
import {connect} from 'react-redux';
import NavigationBar from '../../components/NavigatorBar/NavigationBar';
import GlobalStyles from '../../assets/css/GlobalStyles';
import BottomLoading from '../../components/BottomLoading/BottomLoading.js';
import EmptyList from '../../components/EmptyList/EmptyList.js';
import SafeAreaViewPlus from '../../components/SafeAreaViewPlus/SafeAreaViewPlus';
import ListItem from './components/ListItem';
import PropTypes from 'prop-types';
import api from '../../api/index';
class MainPublish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sellingData: [],
      vacancyData: [],
      isLoading: false,
    };
    this.sellingPage = 1;
    this.sellingFlag = false;
    this.vacancyPage = 1;
    this.vacancyFlag = false;
    this.pageParams = {};
  }

  componentDidMount() {
    const {navigation} = this.props;
    const {state} = navigation;
    const {params} = state;
    console.log('params', params);
    this.pageParams = params || {};
    if (this.pageParams.pageType === 'selling') {
      this.getSellingList({});
    } else {
      this.getVacancyList({});
    }
  }

  componentWillUnmount() {}
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
  sellingGenIndicator() {
    let {sellingData} = this.state;
    return sellingData && sellingData.length > 10 && !this.sellingFlag ? (
      <BottomLoading />
    ) : null;
  }
  /**
   * 获取空位列表
   * @param {Type} {pageNum=this.vacancyPage 参数描述
   * @param {Type} pageSize=10 参数描述
   * @param {Type} refresh=false} 参数描述
   * @return void
   */
  getVacancyList({pageNum = this.vacancyPage, pageSize = 10, refresh = false}) {
    if (refresh) {
      this.vacancyFlag = false;
      this.vacancyPage = 1;
      pageNum = 1;
      this.setState({
        isLoading: true,
      });
    }
    if (this.vacancyFlag && !refresh) {
      return;
    }
    let sendData = {
      pageNum,
      pageSize,
    };
    api.vacancy.getMineVacancyList(sendData, this).then(res => {
      this.setState({
        isLoading: false,
      });
      if (!res.data) {
        return;
      }
      const data = res.data;
      if (data && data.length < pageSize) {
        this.vacancyFlag = true;
      }
      this.vacancyPage += 1;
      if (pageNum === 1) {
        this.setState({
          vacancyData: data,
        });
      } else {
        let {vacancyData} = this.state;
        this.setState({
          vacancyData: [...vacancyData, ...data],
        });
      }
    });
  }
  vacancyGenIndicator() {
    let {vacancyData} = this.state;
    return vacancyData && vacancyData.length > 10 && !this.vacancyFlag ? (
      <BottomLoading />
    ) : null;
  }
  render() {
    const {theme, navigation} = this.props;
    return (
      <SafeAreaViewPlus topColor={theme.themeColor}>
        <View style={styles.pageWrapper}>
          {this.pageParams.pageType === 'selling' ? (
            <NavigationBar
              navigation={navigation}
              leftViewShow={true}
              title={'卖板信息'}
            />
          ) : (
            <NavigationBar
              navigation={navigation}
              leftViewShow={true}
              title={'空位信息'}
            />
          )}
          {this.pageParams.pageType === 'selling' ? (
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
              ListFooterComponent={() => this.sellingGenIndicator()}
              onEndReached={() => {
                this.getSellingList.bind(this, {});
              }}
              ListEmptyComponent={() => {
                return <EmptyList {...this.props} pageType={'selling'} />;
              }}
              keyExtractor={data => {
                return data.saleToPalletId + 'selling';
              }}
            />
          ) : (
            <View style={styles.listWrapper}>
              <FlatList
                data={this.state.vacancyData}
                renderItem={data => <ListItem type={'vacancy'} item={data} />}
                refreshControl={
                  <RefreshControl
                    title="Loading..."
                    colors={[GlobalStyles.themeColor]}
                    refreshing={this.state.isLoading}
                    onRefresh={() => this.getVacancyList({refresh: true})}
                    tintColor={GlobalStyles.themeColor}
                  />
                }
                ListFooterComponent={() => this.vacancyGenIndicator()}
                onEndReached={() => {
                  this.getVacancyList.bind(this, {});
                }}
                ListEmptyComponent={() => {
                  return <EmptyList {...this.props} pageType={'vacancy'} />;
                }}
                keyExtractor={data => {
                  return data.vacantPalletId + 'vacancy';
                }}
              />
            </View>
          )}
        </View>
      </SafeAreaViewPlus>
    );
  }
}
const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

MainPublish.defaultProps = {
  onClick: () => {},
};

MainPublish.propTypes = {
  onClick: PropTypes.func.isRequired,
};
// 如果需要引入store
const mapStateToProps = state => {
  return {
    userInfo: state.user_info.userInfo,
    theme: state.theme.theme,
  };
};
export default connect(mapStateToProps)(MainPublish);
