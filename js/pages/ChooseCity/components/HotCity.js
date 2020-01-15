/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-01-14 16:33:57
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-01-14 18:29:33
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import GlobalStyles from '../../../assets/css/GlobalStyles';

// 热门城市样式修改这个也要改
const LINE_NUMBER = 4; //每行几个  改动这个值 父组件也要改

export default class HotCity extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}
  choose(city) {
    this.props.onChooseCity(city);
  }
  render() {
    let {hotCity} = this.props;
    const hotCityList = hotCity.map(city => {
      const key = city.cityId;
      return (
        <TouchableOpacity
          onPress={this.choose.bind(this, city)}
          style={styles.hotCityItem}
          key={key}>
          <Text style={styles.hotCityItemText}>
            {city.cityName.substr(0, 4)}
          </Text>
        </TouchableOpacity>
      );
    });
    return (
      <View style={styles.hotCityListWrapper}>
        <View style={styles.hotCityListTitle}>
          <Text style={styles.hotCityListTitleText}>热门城市</Text>
        </View>
        <View style={styles.hotCityList}>{hotCityList}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  hotCityListWrapper: {
    // flex: 1,
    padding: 12,
  },
  hotCityList: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  hotCityListTitle: {
    paddingVertical: 8,
    paddingLeft: 12,
    lineHeight: 24,
  },
  hotCityListTitleText: {
    fontSize: 17,
    color: GlobalStyles.themeFontColor,
    fontWeight: '700',
  },
  hotCityItem: {
    paddingVertical: 8,
    // 加0.5是为了防止溢出
    width: GlobalStyles.window_width / (LINE_NUMBER + 0.5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 22,
  },
  hotCityItemText: {
    fontSize: 16,
    color: GlobalStyles.themeFontColor,
  },
});

HotCity.defaultProps = {
  hotCity: {},
  onChooseCity: () => {},
};

HotCity.propTypes = {
  hotCity: PropTypes.array.isRequired,
  onChooseCity: PropTypes.func.isRequired,
};
