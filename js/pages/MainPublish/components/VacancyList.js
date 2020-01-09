/*
 * @Author: guorui
 * @description: 我发布的空位列表
 * @Date: 2020-01-02 16:58:17
 * @LastEditors  : guorui
 * @LastEditTime : 2020-01-07 14:22:26
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

class VacancyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vacancyData: [],
      isLoading: false,
    };
    this.vacancyPage = 1;
    this.vacancyFlag = false;
  }
  componentDidMount() {
    this.getVacancyList({});
    this.handleEmit();
  }
  componentWillUnmount() {
    this.emitRefresh.remove();
  }
  handleEmit() {
    this.emitRefresh = DeviceEventEmitter.addListener('refreshVacancy', () => {
      this.getVacancyList({
        refresh: true,
      });
    });
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
  genIndicator() {
    let {vacancyData} = this.state;
    return vacancyData && vacancyData.length > 10 && !this.vacancyFlag ? (
      <BottomLoading />
    ) : null;
  }
  render() {
    return (
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
          ListFooterComponent={() => this.genIndicator()}
          onEndReached={() => {
            this.getVacancyList.bind(this, {});
          }}
          ListEmptyComponent={() => (
            <EmptyList {...this.props} pageType={'vacancy'} />
          )}
          keyExtractor={data => {
            return data.vacantPalletId + 'vacancy';
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
