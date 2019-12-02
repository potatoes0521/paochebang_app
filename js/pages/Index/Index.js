/*
 * @Author: liuYang
 * @description: 首页
 * @Date: 2019-11-29 15:28:01
 * @LastEditors: liuYang
 * @LastEditTime: 2019-12-02 12:07:21
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import NavigationUtil from '../../navigator/NavigationUtils';
import BackPressComponent from '../../components/BackPressComponent/BackPressComponent';
import NavigationBar from '../../components/NavigatorBar/NavigationBar';
import api from '../../api';
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.backPress = new BackPressComponent({
      backPress: () => this.onBackPress(),
    });
  }

  componentDidMount() {
    this.login();
    this.backPress.componentDidMount();
  }

  componentWillUnmount() {
    this.backPress.componentWillUnmount();
  }

  onBackPress() {
    NavigationUtil.goBack(this.props.navigation);
    return true;
  }
  login() {
    api.user.loginUseOpenID({}, this).then(res => {
      console.log(res);
    });
  }
  _keyExtractor = (item, index) => item.id;

  _onPressItem(id) {
    // updater functions are preferred for transactional updates
    console.log('xxxxx');
  }

  _renderItem({item}) {
    console.log('点击事件');
  }
  // <MyListItem
  //   id={item.id}
  //   onPressItem={this._onPressItem}
  //   selected={!!this.state.selected.get(item.id)}
  //   title={item.title}
  // />

  render() {
    return (
      <View style={styles.pageWrapper}>
        <NavigationBar title={'跑车帮'} />
        <View style={styles.swiperWrapper}>
          <View style={styles.swiper}>
            <Text> 这里是swiper </Text>
          </View>
        </View>
        <View style={styles.tabs}>
          <View style={styles.tabWrapper}>
            <View style={styles.tabItem}>
              <Text style={styles.tabTitle}>卖板</Text>
            </View>
            <View style={styles.tabItem}>
              <Text style={styles.tabTitle}>空位</Text>
            </View>
          </View>
        </View>
        <View style={styles.recommend}>
          <Text style={styles.recommendText}>精选推荐</Text>
        </View>
        <FlatList
          data={this.state.data}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
  },
  viewBox: {
    flex: 1,
  },
  swiperWrapper: {
    padding: 12,
  },
  swiper: {
    backgroundColor: '#f5f5f5',
    height: 150,
  },
  tabs: {
    padding: 12,
    paddingTop: 5,
  },
  tabWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f8f8f8',
  },
  tabItem: {
    flex: 1,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  tabTitle: {
    fontSize: 16,
  },
  recommend: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
    height: 44,
    backgroundColor: '#F9F9F9',
  },
  recommendText: {
    fontSize: 18,
  },
});
// 如果需要引入store
const mapStateToProps = state => {
  return {
    userInfo: state.user_info.userInfo,
  };
};
export default connect(mapStateToProps)(Index);
