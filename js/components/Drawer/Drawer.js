/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2019-12-25 16:42:43
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-01-16 10:29:44
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, SafeAreaView, View} from 'react-native';
import PropTypes from 'prop-types';
import GlobalStyles from '../../assets/css/GlobalStyles';

export default class Drawer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}
  stopPropagation(e) {
    e.stopPropagation();
  }
  handleClickModel() {
    this.props.onClickModel();
  }
  render() {
    console.log('this.prop.visible', this.props.visible);
    return this.props.visible ? (
      <SafeAreaView style={styles.drawerWrapperPosition}>
        <View style={styles.drawerWrapper}>
          <TouchableOpacity
            style={styles.drawerModelLeft}
            activeOpacity={1}
            onPress={this.handleClickModel.bind(this)}>
            <View style={styles.drawerModelLeft} />
          </TouchableOpacity>
          <SafeAreaView style={styles.drawerMain}>
            <View
              style={[styles.drawerMain, styles.drawerMainLine]}
              onPress={this.stopPropagation.bind(this)}>
              {this.props.children}
            </View>
          </SafeAreaView>
        </View>
      </SafeAreaView>
    ) : null;
  }
}

const styles = StyleSheet.create({
  drawerWrapperPosition: {
    width: GlobalStyles.window_width,
    height: GlobalStyles.window_height - 50,
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
  },
  drawerWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  drawerModelLeft: {
    flex: 1,
  },
  drawerMain: {
    width: 300,
    zIndex: 3,
    backgroundColor: '#fff',
  },
  drawerMainLine: {
    borderTopColor: '#f5f5f5',
    borderTopWidth: 1,
    flex: 1,
  },
});

Drawer.defaultProps = {
  visible: false,
  onClickModel: () => {},
};

Drawer.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClickModel: PropTypes.func,
};
