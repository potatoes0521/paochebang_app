/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2019-12-31 15:24:51
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-01-02 10:47:43
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import GlobalStyles from '../../assets/css/GlobalStyles';
import LinearGradient from 'react-native-linear-gradient';
import NavigationUtils from '../../navigator/NavigationUtils';
export default class FloatPublishBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPublishMain: false,
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}
  navigatorTo(type) {
    if (type === 'selling') {
      NavigationUtils.goPage({}, 'SellingPublishPage');
    } else {
      NavigationUtils.goPage({}, 'VacancyPublishPage');
    }
    this.setState({
      showPublishMain: false,
    });
  }
  showNavigatorTo() {
    let {showPublishMain} = this.state;
    this.setState({
      showPublishMain: !showPublishMain,
    });
  }
  wrapperClick(e) {
    e.stopPropagation();
    this.setState({
      showPublishMain: false,
    });
  }
  render() {
    let {showPublishMain} = this.state;
    return (
      <>
        {!showPublishMain ? (
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
        ) : (
          <>
            <View style={[styles.publishBtn, styles.closeWrapper]}>
              <TouchableOpacity
                onPress={this.showNavigatorTo.bind(this)}
                style={styles.btn}>
                <Text
                  style={[GlobalStyles.icon, styles.icon, styles.iconClose]}>
                  &#xe666;
                </Text>
              </TouchableOpacity>
            </View>
            <LinearGradient
              style={[styles.smallPublishBtn, styles.selling]}
              colors={['#FAD961', '#F76B1C']}>
              <TouchableOpacity
                onPress={this.navigatorTo.bind(this, 'selling')}
                style={styles.btn}>
                <Text style={styles.tabTitle}>卖板</Text>
              </TouchableOpacity>
            </LinearGradient>
            <LinearGradient
              style={[styles.smallPublishBtn, styles.vacancy]}
              colors={['#FAD961', '#F76B1C']}>
              <TouchableOpacity
                onPress={this.navigatorTo.bind(this, 'vacancy')}
                style={styles.btn}>
                <Text style={styles.tabTitle}>空位</Text>
              </TouchableOpacity>
            </LinearGradient>
            <TouchableOpacity
              onPress={this.wrapperClick.bind(this)}
              style={styles.btnBg}
            />
          </>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  btnBg: {
    flex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.87)',
    zIndex: 5,
  },
  publishBtn: {
    width: 59,
    height: 59,
    position: 'absolute',
    right: 12,
    bottom: 59,
    borderRadius: 33,
    alignItems: 'center',
    zIndex: 6,
  },
  closeWrapper: {
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  smallPublishBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 6,
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
  iconClose: {
    fontSize: 26,
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

FloatPublishBtn.defaultProps = {
  type: 'selling',
};

FloatPublishBtn.propTypes = {
  type: PropTypes.string.isRequired,
};
