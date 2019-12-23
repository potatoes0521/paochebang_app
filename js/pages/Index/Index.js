/*
 * @Author: liuYang
 * @description: 首页
 * @Date: 2019-11-29 15:28:01
 * @LastEditors  : liuYang
 * @LastEditTime : 2019-12-23 14:47:32
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
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper';
import {connect} from 'react-redux';
import NavigationUtil from '../../navigator/NavigationUtils';
import BackPressComponent from '../../components/BackPressComponent/BackPressComponent';
import NavigationBar from '../../components/NavigatorBar/NavigationBar';
import SellingItem from './components/SellingItem';
import api from '../../api';
import recommendBG from '../../assets/image/index/recommend_bg.png';
import recommendLeftImg from '../../assets/image/index/left.png';
import recommendRightImg from '../../assets/image/index/right.png';
import loadingImg from '../../assets/image/index/loading.png';
import GlobalStyles from '../../assets/css/GlobalStyles';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bannerListData: [],
      recommendData: [],
      failLoading: false, // 是否加载失败
    };
    this.backPress = new BackPressComponent({
      backPress: () => this.onBackPress(),
    });
  }

  componentDidMount() {
    // this.login();
    this.getBannerList();
    this.getRecommendList();
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
   * 获取banner数据
   * @return void
   */
  getBannerList() {
    let sendData = {};
    api.index.getBannerList(sendData, this).then(res => {
      this.setState({
        bannerListData: res.data || [],
      });
    });
  }
  /**
   * 获取卖板详情
   * @param {Number} pageNum=1 页数
   * @param {Number} pageSize=10 条数
   * @return void
   */
  getRecommendList() {
    let sendData = {};
    api.selling
      .getRecommendSellingList(sendData, this)
      .then(res => {
        this.setState({
          recommendData: res.data,
        });
      })
      .catch(() => {
        this.setState({
          failLoading: true,
        });
      });
  }
  navigatorTo(type) {
    console.log('type', type);
    NavigationUtil.goPage(type, 'InformationPage');
  }
  render() {
    let {bannerListData, recommendData, failLoading} = this.state;
    const bannerList = bannerListData.map(item => {
      return (
        <TouchableOpacity style={styles.swiperItem} key={item.id}>
          <Image
            style={styles.swiperItemImage}
            source={{
              uri: item.img,
            }}
          />
        </TouchableOpacity>
      );
    });
    const recommendList = recommendData.map(item => {
      return <SellingItem key={item.saleToPalletId} itemData={item} />;
    });
    return (
      <View style={styles.pageWrapper}>
        <NavigationBar title={'跑车帮'} />
        <ScrollView>
          <Swiper
            style={styles.swiperWrapper}
            autoplay={true}
            autoplayTimeout={3}
            dot={<View style={styles.swiperDot} />}
            activeDot={
              <View style={[styles.swiperDot, styles.ActiveSwiperDot]} />
            }>
            {bannerListData && bannerListData.length ? (
              bannerList
            ) : (
              <View style={styles.swiperItem}>
                <ImageBackground
                  style={styles.swiperItemBg}
                  source={{
                    uri:
                      'https://resource.paoche56.com/paochebang/mp_img/index/banner_loading.png',
                  }}
                />
              </View>
            )}
          </Swiper>
          <View style={styles.tabs}>
            <View style={styles.tabWrapper}>
              <TouchableOpacity
                onPress={this.navigatorTo.bind(this, 'selling')}
                style={styles.tabItem}>
                <LinearGradient
                  style={styles.tab}
                  colors={['#FFAD33', '#FF9A03', '#FF7800']}>
                  <Text style={styles.icon}>&#xe67e;</Text>
                  <Text style={styles.tabTitle}>卖板信息</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.navigatorTo.bind(this, 'vacancy')}
                style={styles.tabItem}>
                <LinearGradient
                  style={styles.tab}
                  colors={['#92B5FF', '#73A0FF', '#437FFF']}>
                  <Text style={styles.icon}>&#xe67f;</Text>
                  <Text style={styles.tabTitle}>空位信息</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
          <ImageBackground style={styles.recommend} source={recommendBG}>
            <Image style={styles.recommendIcon} source={recommendLeftImg} />
            <Text style={styles.recommendText}>精选推荐</Text>
            <Image style={styles.recommendIcon} source={recommendRightImg} />
          </ImageBackground>
          <View style={styles.recommendList}>
            {recommendData && recommendData.length ? (
              recommendList
            ) : (
              <View style={styles.recommendNoData}>
                <Image style={styles.loadingImg} source={loadingImg} />
                <Text style={styles.loadingText}>
                  {failLoading ? '网络不给力' : '数据加载中...'}
                </Text>
              </View>
            )}
          </View>
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
    height: 150,
  },
  swiperItem: {
    backgroundColor: '#f5f5f5',
    height: 150,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  swiperItemBg: {
    width: 130,
    height: 58,
    marginTop: 20,
  },
  swiperItemImage: {
    flex: 1,
    height: 150,
  },
  swiperDot: {
    width: 8,
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 2,
    marginHorizontal: 3,
    marginBottom: -30,
  },
  ActiveSwiperDot: {
    width: 16,
    backgroundColor: '#ffffff',
  },
  tabs: {
    paddingHorizontal: 7,
    paddingVertical: 16,
  },
  tabWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tabItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  tab: {
    flex: 1,
    height: 64,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  icon: {
    fontSize: 34,
    fontFamily: 'iconfont',
    marginRight: 6,
    color: '#ffffff',
  },
  tabTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
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
  recommendNoData: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingImg: {
    width: 201,
    height: 115,
    marginTop: 56,
    marginBottom: 5,
  },
  loadingText: {
    fontSize: 14,
    lineHeight: 20,
    color: GlobalStyles.themeHColor,
  },
});
// 如果需要引入store
const mapStateToProps = state => {
  return {
    userInfo: state.user_info.userInfo,
  };
};
export default connect(mapStateToProps)(Index);
