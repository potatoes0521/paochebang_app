/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2019-12-25 16:42:43
 * @LastEditors  : liuYang
 * @LastEditTime : 2019-12-25 18:44:52
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import GlobalStyles from '../../assets/css/GlobalStyles';
// import GlobalStyles from '../../assets/css/GlobalStyles';

export default class Drawer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}
  stopPropagation(e) {
    console.log('22222222', 22222222);
    e.stopPropagation();
  }
  handleClickModel() {
    console.log('11111111', 11111111);
    this.props.onClickModel();
  }
  render() {
    console.log('this.prop.visible', this.props.visible);
    return (
      <Modal
        hardwareAccelerated={true}
        transparent={true}
        animationType={'fade'}
        visible={this.props.visible}>
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
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
  },
  drawerWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.5)',
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
