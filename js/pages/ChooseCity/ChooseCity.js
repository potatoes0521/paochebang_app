/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2019-12-26 09:24:29
 * @LastEditors  : liuYang
 * @LastEditTime : 2019-12-26 18:59:59
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import GlobalStyles from '../../assets/css/GlobalStyles';
import NavigationUtil from '../../navigator/NavigationUtils';
import BackPressComponent from '../../components/BackPressComponent/BackPressComponent';
import NavigationBar from '../../components/NavigatorBar/NavigationBar';
import SafeAreaViewPlus from '../../components/SafeAreaViewPlus/SafeAreaViewPlus';
import Indexes from '../../components/Indexes/Indexes';
import _flattenDeep from 'lodash/flattenDeep';
import api from '../../api/index';
import {TextInput} from 'react-native-gesture-handler';

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
    this.searchValue = '';
  }

  componentDidMount() {
    const {navigation} = this.props;
    const {state} = navigation;
    const {params} = state;
    console.log('params', params);
    this.getCityList();
    this.backPress.componentDidMount();
  }

  componentWillUnmount() {
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
      allCity = allCity.map(item => {
        return {data: item.list, initial: item.initial};
      });
      this.allCityList = allCity.map(item => {
        return item.list;
      });
      this.allCityList = _flattenDeep(this.allCityList);
      this.setState({
        hotCity,
        allCity,
      });
    });
  }
  chooseCity(city) {
    console.log('city', city);
  }
  searchInput(value) {
    console.log('value', value);
    this.searchValue = value;
  }
  render() {
    const {theme, navigation} = this.props;
    const {allCity} = this.state;
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
});
// 如果需要引入store
const mapStateToProps = state => {
  return {
    userInfo: state.user_info.userInfo,
    theme: state.theme.theme,
  };
};
export default connect(mapStateToProps)(ChooseCity);
