/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2019-12-26 09:24:29
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-01-14 16:53:59
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View, DeviceEventEmitter} from 'react-native';
import {connect} from 'react-redux';
import GlobalStyles from '../../assets/css/GlobalStyles';
import NavigationUtil from '../../navigator/NavigationUtils';
import BackPressComponent from '../../components/BackPressComponent/BackPressComponent';
import NavigationBar from '../../components/NavigatorBar/NavigationBar';
import SafeAreaViewPlus from '../../components/SafeAreaViewPlus/SafeAreaViewPlus';
// import Indexes from '../../components/Indexes/Indexes';
import _flattenDeep from 'lodash/flattenDeep';
import api from '../../api/index';
import {
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native-gesture-handler';
import Storage from '../../utils/Storage.js';
import HotCity from './components/HotCity';
import Button from '../../components/Button/Button.js';
import CityChooseTitle from './components/CityChooseTitle';
// 热门城市样式修改这个也要改
const HOT_ITEM_HEIGHT = 38; // 热门每个item高
const TITLE_HEIGHT = 40; // 标题高
const WRAPPER_PADDING = 24; // 外包裹padding
const LINE_NUMBER = 4; //每行几个 改动这个值 子组件也要改
class ChooseCity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allCity: [],
      hotCity: [],
      filterCityList: [],
      provinceList: [],
      cityList: ['请选择'],
      areaList: ['请选择'],
      fixedTitle: false,
    };
    this.backPress = new BackPressComponent({
      backPress: () => this.onBackPress(),
    });
    this.allCityList = [];
    this.timer = null;
    this.throughCityNameList = [];
    this.throughCityIdList = [];
    this.pageParams = {};
    this.allCityMsg = {};
    this.needScrollNumber = 999;
  }

  componentDidMount() {
    const {navigation} = this.props;
    const {state} = navigation;
    const {params} = state;
    console.log('params', params);
    this.pageParams = params;
    this.handleData();
    this.backPress.componentDidMount();
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    this.backPress.componentWillUnmount();
  }

  onBackPress() {
    NavigationUtil.goBack(this.props.navigation);
    return true;
  }
  handleData() {
    Storage.getStorage('hotCity')
      .then(res => {
        this.handleHotCityData(res.data);
      })
      .catch(() => {
        this.getCityList();
      });
    Storage.getStorage('allCity')
      .then(res => {
        this.handleAllCityData(res.data);
      })
      .catch(() => {
        this.getCityList();
      });
    Storage.getStorage('allCityMsg')
      .then(res => {
        this.handleAllCityMsgData(res.data);
      })
      .catch(() => {
        this.getAllProvinceList();
      });
  }
  /**
   * 获取位置信息
   * @return void
   */
  getCityList() {
    api.user.getCityList({}, this).then(res => {
      let data = res.data;
      if (!data) {
        return;
      }
      this.handleHotCityData(data.hotCities);
      this.handleAllCityData(data.all);
    });
  }
  getAllProvinceList() {
    api.user.getAllProvinceList({}, this).then(res => {
      let data = res.data;
      if (!data) {
        return;
      }
      this.handleAllCityMsgData(data);
    });
  }
  /**
   * 处理热门城市数据
   * @param {Array} cities 城市数据
   * @param {Boolean} updateStorage=true 是否更新本地缓存
   * @return void
   */
  handleHotCityData(cities, updateStorage = true) {
    let hotCity = cities || [];
    // 个数除以每行的个数 + 余数如果大于0 + 1
    const hotCityLineNumber =
      Math.floor(hotCity.length / LINE_NUMBER) +
      (hotCity.length % LINE_NUMBER ? 1 : 0);
    this.needScrollNumber =
      hotCityLineNumber * HOT_ITEM_HEIGHT + TITLE_HEIGHT + WRAPPER_PADDING;
    console.log('hotCityHeight', this.needScrollNumber);
    this.setState({
      hotCity,
    });
    if (updateStorage) {
      Storage.setStorage('hotCity', hotCity);
    }
  }
  /**
   * 处理所有城市数据
   * @param {Array} cities 城市数据
   * @param {Boolean} updateStorage=true 是否更新本地缓存
   * @return void
   */
  handleAllCityData(cities, updateStorage = true) {
    let allCity =
      cities.filter(item => {
        return item.list && item.list.length;
      }) || [];
    this.allCityList = allCity.map(item => {
      return item.list;
    });
    this.allCityList = _flattenDeep(this.allCityList);
    // allCity = allCity.map(item => {
    //   return {
    //     data: item.list,
    //     initial: item.initial
    //   };
    // });
    this.setState({
      allCity,
    });
    if (updateStorage) {
      Storage.setStorage('allCity', allCity);
    }
  }
  /**
   * 处理所有地理位置数据
   * @param {Array} cities 城市数据
   * @param {Boolean} updateStorage=true 是否更新本地缓存
   * @return void
   */
  handleAllCityMsgData(cities, updateStorage = true) {
    this.allCityMsg = cities;
    let provinceList = cities.map(item => {
      return {
        locationId: item.locationId,
        locationName: item.locationName,
      };
    });
    this.setState({
      provinceList: provinceList,
    });
    if (updateStorage) {
      Storage.setStorage('allCityMsg', cities);
    }
  }
  chooseCity(city) {
    console.log('city', city);
  }
  chooseSearchCity(city) {
    city.type = this.pageParams.type;
    DeviceEventEmitter.emit('chooseCity', city);
    NavigationUtil.goBack(this.props.navigation);
  }
  searchInput(value) {
    if (value.length < 1) {
      return;
    }
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      let filterCityList = this.allCityList.filter(item => {
        return (
          (item && item.cityName && item.cityName.indexOf(value) !== -1) ||
          (item && item.spell && item.spell.indexOf(value) !== -1)
        );
      });
      this.setState({
        filterCityList,
      });
      console.log('filterCityList', filterCityList);
    }, 1000);
  }
  onScroll(event) {
    // console.log(event.nativeEvent.contentOffset.x); //水平滚动距离
    const scrollNow = event.nativeEvent.contentOffset.y;
    if (scrollNow >= this.needScrollNumber && !this.state.fixedTitle) {
      this.setState({
        fixedTitle: true,
      });
    } else if (scrollNow <= this.needScrollNumber && this.state.fixedTitle) {
      this.setState({
        fixedTitle: false,
      });
    }
  }
  render() {
    const {theme, navigation} = this.props;
    const {
      hotCity,
      filterCityList,
      provinceList,
      cityList,
      areaList,
      fixedTitle,
    } = this.state;
    const filterList = filterCityList.map(city => {
      const key = city.cityId;
      return (
        <TouchableOpacity
          style={styles.searchItem}
          onPress={this.chooseSearchCity.bind(this, city)}
          key={key}>
          <View style={styles.searchItemName}>
            <Text>{city.cityName}</Text>
          </View>
          <Text style={styles.iconRight}>&#xe61d;</Text>
        </TouchableOpacity>
      );
    });
    console.log('hotCity', hotCity);

    const provinceListRender = provinceList.map(city => {
      const key = city.locationId;
      return (
        <View style={styles.allCityItem} key={key}>
          <Text>{city.locationName}</Text>
        </View>
      );
    });
    const cityListRender = cityList.map(city => {
      const key = city.locationId;
      return (
        <View style={styles.allCityItem} key={key}>
          <Text>{city.locationName}</Text>
        </View>
      );
    });
    const areaListRender = areaList.map(city => {
      const key = city.locationId;
      return (
        <View style={styles.allCityItem} key={key}>
          <Text>{city.locationName}</Text>
        </View>
      );
    });
    return (
      <SafeAreaViewPlus topColor={theme.themeColor}>
        <View style={styles.pageWrapper}>
          <NavigationBar
            navigation={navigation}
            leftViewShow={true}
            title={'选择城市'}
          />
          <View style={styles.searchWrapper}>
            <View style={styles.searchIconWrapper}>
              <Text style={styles.searchIcon}>&#xe604;</Text>
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder={'请输入城市名称进行搜索 如:北京'}
                onChangeText={this.searchInput.bind(this)}
              />
            </View>
          </View>
          <View style={styles.line} />
          {fixedTitle && <CityChooseTitle fixed={true} />}
          <ScrollView
            style={styles.scrollWrapper}
            onScroll={this.onScroll.bind(this)}>
            {filterCityList.length ? (
              <View className="search-wrapper">{filterList}</View>
            ) : (
              <>
                <HotCity hotCity={hotCity} />
                <CityChooseTitle />
                <View style={styles.wrapperLine} />
                <View style={styles.allCity}>
                  <View style={styles.public}>{provinceListRender}</View>
                  <View style={styles.public}>{cityListRender}</View>
                  <View style={styles.public}>{areaListRender}</View>
                </View>
              </>
            )}
            {/* <Indexes data={allCity} onClick={this.chooseCity.bind(this)} /> */}
          </ScrollView>
          <View style={styles.btnWrapper}>
            <Button text={'确定'} type={'round'} />
          </View>
        </View>
      </SafeAreaViewPlus>
    );
  }
}

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
    position: 'relative',
  },
  searchWrapper: {
    marginVertical: 8,
    marginHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    height: 38,
    borderRadius: 4,
  },
  line: {
    height: 1,
    backgroundColor: '#f5f5f5',
  },
  searchIconWrapper: {
    width: 32,
    height: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchIcon: {
    fontSize: 20,
    color: GlobalStyles.themeHColor,
    fontFamily: 'iconfont',
  },
  inputWrapper: {
    flex: 1,
  },
  input: {
    padding: 0,
    margin: 0,
    color: GlobalStyles.themeFontColor,
    fontSize: 15,
  },
  wrapperLine: {
    height: 8,
    backgroundColor: '#f5f5f5',
  },
  searchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 48,
    paddingLeft: 24,
    paddingRight: 16,
    borderBottomColor: '#f5f5f5',
    borderBottomWidth: 1,
  },
  iconRight: {
    fontSize: 12,
    color: GlobalStyles.themeDisabled,
    fontFamily: 'iconfont',
    marginLeft: 4,
  },
  public: {
    flex: 1,
    alignItems: 'stretch',
  },
  allCity: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  allCityItem: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnWrapper: {
    height: 80,
    paddingVertical: 20,
    paddingHorizontal: 28,
  },
});
// 如果需要引入store
const mapStateToProps = state => {
  return {
    userInfo: state.user_info.userInfo,
    theme: state.theme.theme,
  };
};
export default connect(mapStateToProps)(ChooseCity);
