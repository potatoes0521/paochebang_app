/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2019-12-26 09:24:29
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-01-20 09:31:52
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  DeviceEventEmitter,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import GlobalStyles from '../../assets/css/GlobalStyles';
import NavigationUtil from '../../navigator/NavigationUtils';
import BackPressComponent from '../../components/BackPressComponent/BackPressComponent';
import NavigationBar from '../../components/NavigatorBar/NavigationBar';
import SafeAreaViewPlus from '../../components/SafeAreaViewPlus/SafeAreaViewPlus';
// import Indexes from '../../components/Indexes/Indexes';
import _flattenDeep from 'lodash/flattenDeep';
import api from '../../api/index';
import Storage from '../../utils/Storage.js';
import HotCity from './components/HotCity';
import Button from '../../components/Button/Button.js';
import CityChooseTitle from './components/CityChooseTitle';
import Toast from 'react-native-easy-toast';

// 热门城市样式修改这个也要改
const HOT_ITEM_HEIGHT = 38; // 热门每个item高
const TITLE_HEIGHT = 35; // 标题高
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
      cityList: [{locationName: '请选择', locationId: 1}],
      areaList: [{locationName: '请选择', locationId: 1}],
      fixedTitle: false,
      pageType: '',
      throughCityNameList: [],
      wrapperHeight: 0,
      hotCityHeight: 0,
      btnWrapperHeight: 0,
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
    this.toastRef = React.createRef();
    this.scrollViewRef = React.createRef();
    this.lastChoose = {};
  }

  componentDidMount() {
    const {navigation} = this.props;
    const {state} = navigation;
    const {params} = state;
    console.log('params', params);
    this.pageParams = params;
    this.handleData(params);
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
  /**
   * 初始化数据
   * @param {object} params 页面参数
   * @return void
   */
  handleData(params) {
    this.setState({
      pageType: params.type,
      fixedTitle: params.type === 'throughCity',
    });
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
   * 获取城市信息
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
  /**
   * 获取省市区信息
   * @return void
   */
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
    this.setState({
      provinceList: cities,
    });
    if (updateStorage) {
      Storage.setStorage('allCityMsg', cities);
    }
  }
  /**
   * 选择省份
   * @param {Object} city 选中的省份
   * @return void
   */
  chooseProvince(city) {
    console.log('city', city.checked);
    let {provinceList} = this.state;
    provinceList = this.handleDataChooseData(city, provinceList);
    // this.backGoFirstLine();
    this.setState({
      provinceList,
      cityList: city.children,
      areaList: [],
    });
    this.lastChoose = city;
  }
  /**
   * 选择城市
   * @param {Object} city 选中的城市
   * @return void
   */
  chooseCity(city) {
    console.log('city', city);
    if (city.locationId === 1) {
      return;
    }
    let {cityList, provinceList} = this.state;
    this.handleFatherCity(city, provinceList);
    cityList = this.handleDataChooseData(city, cityList);
    // this.backGoFirstLine();
    this.setState({
      cityList,
      areaList: city.children || [],
    });
    city.type = 'city';
    this.lastChoose = city;
  }
  /**
   * 选择区\县
   * @param {Object} city 选中的区\县
   * @return void
   */
  chooseArea(city) {
    console.log('city', city);
    if (city.locationId === 1) {
      return;
    }
    let {areaList, cityList} = this.state;
    // 找到当前区\县所在的城市  并判断这个城市是不是在现在的列表内
    this.handleFatherCity(city, cityList);
    areaList = this.handleDataChooseData(city, areaList, this.lastChoose);
    // this.backGoFirstLine();
    this.setState({
      areaList,
    });
    this.lastChoose = city;
  }
  /**
   * 每次选中就滚动到顶部
   *    选择途径城市的时候直接返回到0
   *    如果不是因为有热门城市需要计算需要滚动的位置
   * @return void
   */
  backGoFirstLine() {
    let num = 0;
    if (this.state.pageType === 'throughCity') {
      num = 0;
    } else {
      num = this.needScrollNumber + 40;
    }
    this.scrollViewRef.current.scrollTo({
      y: num,
    });
  }
  /**
   * 判断是不是途经城市 并且处理数据
   * @return void
   */
  handleDataChooseData(city, data) {
    if (
      this.pageParams.type === 'throughCity' &&
      this.throughCityNameList.length >= 3 &&
      !city.checked
    ) {
      this.toastRef.current.show('最多支持选择三个哦');
      return data;
    }
    this.judgeThroughData(city);
    data.forEach(item => {
      if (item.locationId === city.locationId) {
        // 如果子集有选中的 他就不是取消
        if (item.children && item.children.some(ite => ite.checked)) {
          item.checked = true;
        } else {
          item.checked = !item.checked;
        }
      } else if (this.pageParams.type !== 'throughCity') {
        item.checked = false;
      }
    });
    return data;
  }
  /**
   * 判断是选中还是取消选中
   * @param {Object} city 城市信息
   * @return void
   */
  judgeThroughData(city) {
    if (this.pageParams.type === 'throughCity') {
      if (city.checked) {
        console.log('clear');
        this.clearList(city);
      } else {
        console.log('append');
        this.throughCityNameList.push(city.locationName);
        this.throughCityIdList.push(city.locationId);
        this.setState({
          throughCityNameList: this.throughCityNameList,
        });
      }
    }
    console.log('object', this.throughCityNameList);
  }
  handleFatherCity(city, FatherCityList, onlyFind) {
    let fatherCity = FatherCityList.filter(item => {
      return item.children
        ? item.children.some(ite => ite.locationId === city.locationId)
        : item.locationId === city.locationId;
    })[0];
    if (onlyFind) {
      return fatherCity;
    }
    if (
      this.throughCityNameList.some(item => item === fatherCity.locationName)
    ) {
      this.clearList(fatherCity);
    }
  }
  /**
   * 清除当前选中列表内的这一项
   * @param {Object} city 城市信息
   * @return void
   */
  clearList(city) {
    if (city.from === 'delete') {
      city.locationId = this.throughCityIdList[city.index];
      console.log(city);
      let {provinceList} = this.state;
      // 删除标准数据的时候要清除滚动列表里的选中状态
      this.diff(provinceList, [city]);
      let fatherCity = [];
      provinceList.forEach(item => {
        if (item.children) {
          item.children.forEach(ite => {
            if (ite.children) {
              let arr = ite.children.some(
                it => it.locationId === city.locationId,
              );
              if (arr) {
                // 找到父级判断子级是否全部选中如果都没选中那就把父级添加进去
                let allChecked = ite.children.some(it => it.checked);
                if (!allChecked) {
                  this.throughCityNameList.push(ite.locationName);
                  this.throughCityIdList.push(ite.locationId);
                  this.setState({
                    throughCityNameList: this.throughCityNameList,
                  });
                }
              }
            }
            if (ite.locationId === city.locationId) {
              let allChecked = item.children.some(it => it.checked);
              if (!allChecked) {
                this.throughCityNameList.push(item.locationName);
                this.throughCityIdList.push(item.locationId);
                this.setState({
                  throughCityNameList: this.throughCityNameList,
                });
              }
            }
          });
        }
      });
      console.log('fatherCity', fatherCity);
      this.setState({
        provinceList,
      });
    }
    this.throughCityNameList = this.throughCityNameList.filter(item => {
      return item !== city.locationName;
    });
    this.throughCityIdList = this.throughCityIdList.filter(item => {
      return item !== city.locationId;
    });
    this.setState({
      throughCityNameList: this.throughCityNameList,
    });
  }
  diff(needCleanData, standardData) {
    const map = standardData.reduce(
      (res, item) => ({
        ...res,
        [item.locationId]: item,
      }),
      {},
    );
    this.dfs(needCleanData, map);
  }
  dfs(arr, map) {
    // eslint-disable-next-line no-unused-vars
    for (const item of arr) {
      if (item.children) {
        this.dfs(item.children, map);
      }
      if (item.locationId in map) {
        item.checked = false;
      }
    }
  }
  chooseSearchCity(city) {
    city.type = this.pageParams.type;
    if (this.pageParams.from) {
      DeviceEventEmitter.emit(`chooseCity_${this.pageParams.from}`, city);
    } else {
      DeviceEventEmitter.emit('chooseCity', city);
    }
    NavigationUtil.goBack(this.props.navigation);
  }
  /**
   * 提交选中的城市
   * @return void
   */
  submitChooseCity() {
    if (JSON.stringify(this.lastChoose) === '{}') {
      this.toastRef.current.show('至少选择一个省/市');
      return;
    }
    if (this.pageParams.type !== 'throughCity') {
      if (this.lastChoose.type !== 'city') {
        this.toastRef.current.show('至少精确到市哦~');
        return;
      }
      this.chooseSearchCity({
        cityId: this.lastChoose.locationId,
        cityName: this.lastChoose.locationName,
      });
    } else {
      this.chooseSearchCity({
        cityId: this.throughCityIdList,
        cityName: this.throughCityNameList.toString(),
      });
    }
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
    }, 1000);
  }
  onScroll(event) {
    // console.log(event.nativeEvent.contentOffset.x); //水平滚动距离
    const scrollNow = event.nativeEvent.contentOffset.y;
    if (this.state.pageType === 'throughCity') {
      return;
    }
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
  computeScrollViewHeight() {
    let {wrapperHeight, hotCityHeight} = this.state;
    let scrollHeight = wrapperHeight - hotCityHeight - 70 - 50;
    return scrollHeight;
  }
  onWrapperLayout(event) {
    this.setState({
      wrapperHeight: event.nativeEvent.layout.height,
    });
  }
  onHotCityLayout(event) {
    this.setState({
      hotCityHeight: event.nativeEvent.layout.height,
    });
  }
  render() {
    const {theme, navigation} = this.props;
    const {
      hotCity,
      filterCityList,
      provinceList,
      cityList,
      // areaList,
      fixedTitle,
      pageType,
      throughCityNameList,
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
    const provinceListRender = provinceList.map(city => {
      const key = city.locationId;
      const textClassName = [styles.locationNameText];
      if (city.checked) {
        textClassName.push(styles.textHeighLight);
      }
      return (
        <TouchableOpacity
          onPress={this.chooseProvince.bind(this, city)}
          style={styles.allCityItem}
          key={key}>
          {city.checked ? (
            <Text style={[GlobalStyles.icon, styles.chooseIcon]}>&#xe61e;</Text>
          ) : (
            <Text style={styles.chooseIcon} />
          )}
          <Text style={textClassName}>
            {city.locationName && city.locationName.length > 5
              ? city.locationName.substr(0, 5) + '...'
              : city.locationName}
          </Text>
        </TouchableOpacity>
      );
    });
    const cityListRender = cityList.map(city => {
      const key = city.locationId;
      const textClassName = [styles.locationNameText];
      if (city.checked) {
        textClassName.push(styles.textHeighLight);
      }
      return (
        <TouchableOpacity
          onPress={this.chooseCity.bind(this, city)}
          style={styles.allCityItem}
          key={key}>
          {city.checked ? (
            <Text style={[GlobalStyles.icon, styles.chooseIcon]}>&#xe61e;</Text>
          ) : (
            <Text style={styles.chooseIcon} />
          )}
          <Text style={textClassName}>
            {city.locationName && city.locationName.length > 5
              ? city.locationName.substr(0, 5) + '...'
              : city.locationName}
          </Text>
        </TouchableOpacity>
      );
    });
    // const areaListRender = areaList.map(city => {
    //   const key = city.locationId;
    //   const textClassName = [styles.locationNameText];
    //   if (city.checked) {
    //     textClassName.push(styles.textHeighLight);
    //   }
    //   return (
    //     <TouchableOpacity
    //       onPress={this.chooseArea.bind(this, city)}
    //       style={styles.allCityItem}
    //       key={key}>
    //       {city.checked && (
    //         <Text style={[GlobalStyles.icon, styles.chooseIcon]}>&#xe61e;</Text>
    //       )}
    //       <Text style={textClassName}>
    //         {city.locationName && city.locationName.length > 5
    //           ? city.locationName.substr(0, 5) + '...'
    //           : city.locationName}
    //       </Text>
    //     </TouchableOpacity>
    //   );
    // });
    const nowChooseListRender = throughCityNameList.map((city, index) => {
      return (
        <TouchableOpacity
          onPress={this.clearList.bind(this, {
            locationName: city,
            from: 'delete',
            index,
          })}
          style={styles.nowChooseItem}
          key={city}>
          <Text style={styles.text}>{city}</Text>
          <Text style={[styles.text, GlobalStyles.icon]}>&#xe666;</Text>
        </TouchableOpacity>
      );
    });
    const scrollHeight =
      this.computeScrollViewHeight() < 0 ? 999 : this.computeScrollViewHeight();
    return (
      <SafeAreaViewPlus topColor={theme.themeColor}>
        <View
          style={styles.pageWrapper}
          onLayout={this.onWrapperLayout.bind(this)}>
          <NavigationBar
            navigation={navigation}
            leftViewShow={true}
            title={'选择城市'}
          />
          <View onLayout={this.onHotCityLayout.bind(this)}>
            {/* 途径城市不用出现搜索框 */}
            {pageType === 'throughCity' ? null : (
              <>
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
              </>
            )}
            {/* 显示的吸顶的title */}
            {/* 多选选中的省市区 */}
            {throughCityNameList.length ? (
              <View style={styles.nowChooseWrapper}>{nowChooseListRender}</View>
            ) : null}
            {fixedTitle && <CityChooseTitle fixed={true} />}
            {filterCityList.length ? (
              <ScrollView
                ref={this.scrollViewRef}
                // onScroll={this.onScroll.bind(this)}
              >
                <View className="search-wrapper">{filterList}</View>
              </ScrollView>
            ) : null}
            {/* <Indexes data={allCity} onClick={this.chooseCity.bind(this)} /> */}
            {/* 途径城市不出现热门城市 */}
            {pageType === 'throughCity' ? null : (
              <>
                <HotCity
                  onChooseCity={this.chooseSearchCity.bind(this)}
                  hotCity={hotCity}
                />
                <View style={styles.wrapperLine} />
                <CityChooseTitle />
              </>
            )}
          </View>
          {!filterCityList.length ? (
            <>
              <View
                style={[
                  styles.allCity,
                  {
                    height: scrollHeight,
                  },
                ]}>
                <View style={styles.public}>
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    indicatorStyle={'white'}>
                    {provinceListRender}
                  </ScrollView>
                </View>
                <View style={styles.public}>
                  <ScrollView>{cityListRender}</ScrollView>
                </View>
                {/* <View style={styles.public}><ScrollView>{areaListRender} </ScrollView></View>*/}
              </View>
              <View style={styles.btnWrapper}>
                <Button
                  text={'确定'}
                  type={'round'}
                  onClick={this.submitChooseCity.bind(this)}
                />
              </View>
            </>
          ) : null}
          <Toast
            ref={this.toastRef}
            position={'center'}
            defaultCloseDelay={3000}
          />
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
    overflow: 'hidden',
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
    height: 70,
    paddingVertical: 15,
    paddingHorizontal: 28,
  },
  chooseIcon: {
    color: GlobalStyles.themeColor,
    fontSize: 14,
    marginRight: 5,
  },
  locationNameText: {
    color: GlobalStyles.themeHColor,
  },
  textHeighLight: {
    color: GlobalStyles.themeColor,
  },
  nowChooseWrapper: {
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 9,
  },
  nowChooseItem: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: '#F7F7F7',
    borderRadius: 4,
    marginRight: 10,
    marginTop: 9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 22,
  },
  text: {
    fontSize: 16,
    color: GlobalStyles.themeColor,
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
