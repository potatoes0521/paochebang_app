/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2019-12-26 09:24:29
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-01-02 10:55:22
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

class ChooseCity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allCity: [],
      hotCity: [],
      filterCityList: [],
    };
    this.backPress = new BackPressComponent({
      backPress: () => this.onBackPress(),
    });
    this.allCityList = [];
    this.timer = null;
    this.throughCityNameList = [];
    this.throughCityIdList = [];
    this.pageParams = {};
  }

  componentDidMount() {
    const {navigation} = this.props;
    const {state} = navigation;
    const {params} = state;
    console.log('params', params);
    this.pageParams = params;
    this.getCityList();
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
   * 获取位置信息
   * @return void
   */
  getCityList() {
    api.user.getCityList({}, this).then(res => {
      let data = res.data;
      if (!data) {
        return;
      }
      let hotCity = data.hotCities || [];
      let allCity =
        data.all.filter(item => {
          return item.list && item.list.length;
        }) || [];
      this.allCityList = allCity.map(item => {
        return item.list;
      });
      this.allCityList = _flattenDeep(this.allCityList);
      allCity = allCity.map(item => {
        return {data: item.list, initial: item.initial};
      });
      this.setState({
        hotCity,
        allCity,
      });
    });
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
  render() {
    const {theme, navigation} = this.props;
    const {hotCity, allCity, filterCityList} = this.state;
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
                placeholder={'请输入城市名称进行搜索'}
                onChangeText={this.searchInput.bind(this)}
              />
            </View>
          </View>
          <View style={styles.wrapperLine} />
          <ScrollView>
            {filterCityList.length ? (
              <View className="search-wrapper">{filterList}</View>
            ) : null}
          </ScrollView>
          {/* <Indexes data={allCity} onClick={this.chooseCity.bind(this)} /> */}
        </View>
      </SafeAreaViewPlus>
    );
  }
}

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
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
});
// 如果需要引入store
const mapStateToProps = state => {
  return {
    userInfo: state.user_info.userInfo,
    theme: state.theme.theme,
  };
};
export default connect(mapStateToProps)(ChooseCity);
