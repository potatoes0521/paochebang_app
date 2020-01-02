/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2019-12-31 15:24:51
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-01-02 10:08:43
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import GlobalStyles from '../../assets/css/GlobalStyles';
import LinearGradient from 'react-native-linear-gradient';
import NavigationUtils from '../../navigator/NavigationUtils';
export default class FloatPushBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}
  navigatorTo() {
    let {type} = this.props;
    if (type === 'selling') {
      NavigationUtils.goPage({}, 'SellingPublishPage');
    } else {
      NavigationUtils.goPage({}, 'VacancyPublishPage');
    }
  }
  showNavigatorTo() {}
  render() {
    let {type} = this.props;
    console.log('type', type);
    return (
      <>
        <LinearGradient
          style={styles.publishBtn}
          colors={['#FAD961', '#F76B1C']}>
          <TouchableOpacity
            onPress={this.showNavigatorTo.bind(this)}
            style={styles.btn}>
            <Text style={[GlobalStyles.icon, styles.icon]}>&#xe61c;</Text>
            <Text style={styles.tabTitle}>发布</Text>
          </TouchableOpacity>
        </LinearGradient>

        <LinearGradient
          style={[styles.smallPublishBtn, styles.selling]}
          colors={['#FAD961', '#F76B1C']}>
          <TouchableOpacity
            onPress={this.navigatorTo.bind(this)}
            style={styles.btn}>
            <Text style={styles.tabTitle}>卖板</Text>
          </TouchableOpacity>
        </LinearGradient>
        <LinearGradient
          style={[styles.smallPublishBtn, styles.vacancy]}
          colors={['#FAD961', '#F76B1C']}>
          <TouchableOpacity
            onPress={this.navigatorTo.bind(this)}
            style={styles.btn}>
            <Text style={styles.tabTitle}>空位</Text>
          </TouchableOpacity>
        </LinearGradient>
        <View style={styles.btnBg} />
      </>
    );
  }
}

const styles = StyleSheet.create({
  publishBtn: {
    width: 59,
    height: 59,
    position: 'absolute',
    right: 12,
    bottom: 62,
    borderRadius: 33,
    alignItems: 'center',
  },
  smallPublishBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selling: {
    right: 36,
    bottom: 129,
  },
  vacancy: {
    right: 88,
    bottom: 85,
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 24,
    color: '#fff',
  },
  tabTitle: {
    fontSize: 12,
    color: '#ffffff',
  },
});

FloatPushBtn.defaultProps = {
  type: 'selling',
};

FloatPushBtn.propTypes = {
  type: PropTypes.string.isRequired,
};
