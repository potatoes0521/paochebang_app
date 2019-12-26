/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2019-12-26 09:24:29
 * @LastEditors  : liuYang
 * @LastEditTime : 2019-12-26 12:00:23
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
          <Indexes data={allCity} onClick={this.chooseCity.bind(this)} />
        </View>
      </SafeAreaViewPlus>
    );
  }
}

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
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
