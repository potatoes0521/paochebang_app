/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-01-14 16:50:46
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-01-14 16:55:05
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import GlobalStyles from '../../../assets/css/GlobalStyles';

export default class CityChooseTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    let {fixed} = this.props;
    let wrapperClassName = [styles.titleWrapper];
    if (fixed) {
      wrapperClassName.push(styles.fixedTitle);
    }
    return (
      <View style={wrapperClassName}>
        <View style={styles.public}>
          <View style={[styles.title, styles.allCityItem]}>
            <Text style={styles.text}>省份</Text>
          </View>
        </View>
        <View style={styles.public}>
          <View style={[styles.title, styles.allCityItem]}>
            <Text style={styles.text}>城市</Text>
          </View>
        </View>
        <View style={styles.public}>
          <View style={[styles.title, styles.allCityItem]}>
            <Text style={styles.text}>区县</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  public: {
    flex: 1,
    alignItems: 'stretch',
  },
  titleWrapper: {
    flexDirection: 'row',
  },
  allCity: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  title: {
    borderBottomColor: '#f5f5f5',
    borderBottomWidth: 1,
  },
  allCityItem: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fixedTitle: {
    backgroundColor: '#FFF',
  },
  text: {
    fontWeight: '700',
  },
});

CityChooseTitle.defaultProps = {
  CityChooseTitle: false,
  onClick: () => {},
};

CityChooseTitle.propTypes = {
  CityChooseTitle: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};
