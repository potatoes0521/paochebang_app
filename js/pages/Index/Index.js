/*
 * @Author: liuYang
 * @description: 首页
 * @Date: 2019-11-29 15:28:01
 * @LastEditors  : liuYang
 * @LastEditTime : 2019-12-18 17:00:09
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import NavigationUtil from '../../navigator/NavigationUtils';
import BackPressComponent from '../../components/BackPressComponent/BackPressComponent';
import NavigationBar from '../../components/NavigatorBar/NavigationBar';
import SellingItem from './components/SellingItem';
import api from '../../api';
import recommendBG from '../../assets/image/index/recommend_bg.png';
import recommendLeftImg from '../../assets/image/index/left.png';
import recommendRightImg from '../../assets/image/index/right.png';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sellingData: [],
    };
    this.backPress = new BackPressComponent({
      backPress: () => this.onBackPress(),
    });
  }

  componentDidMount() {
    // this.login();
    this.getSellingList({});
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
  /**
   * 获取卖板详情
   * @param {Number} pageNum=1 页数
   * @param {Number} pageSize=10 条数
   * @return void
   */
  getSellingList({
    pageNum = 1,
    pageSize = 10,
    sendCityId = '',
    receiveCityId = '',
  }) {
    let sendData = {
      pageNum,
      pageSize,
      sendCityId,
      receiveCityId,
    };
    api.selling.getSellingList(sendData, this).then(res => {
      this.setState({
        sellingData: res.data,
      });
    });
  }

  render() {
    let {sellingData} = this.state;
    const sellingList = sellingData.map(item => {
      return <SellingItem key={item.saleToPalletId} itemData={item} />;
    });
    return (
      <View style={styles.pageWrapper}>
        <NavigationBar title={'跑车帮'} />
        <ScrollView>
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
          <ImageBackground style={styles.recommend} source={recommendBG}>
            <Image style={styles.recommendIcon} source={recommendLeftImg} />
            <Text style={styles.recommendText}>精选推荐</Text>
            <Image style={styles.recommendIcon} source={recommendRightImg} />
          </ImageBackground>
          <View style={styles.recommendList}>{sellingList}</View>
        </ScrollView>
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
    backgroundColor: '#F9F9F9',
  },
  recommendIcon: {
    width: 18,
    height: 14,
  },
  recommendText: {
    fontSize: 20,
    fontWeight: '700',
    marginHorizontal: 7,
  },
  recommendList: {
    // padding: 10,
  },
});
// 如果需要引入store
const mapStateToProps = state => {
  return {
    userInfo: state.user_info.userInfo,
  };
};
export default connect(mapStateToProps)(Index);
