/*
 * @Author: liuYang
 * @description: 加载组件
 * @path: 引入路径
 * @Date: 2020-01-16 16:47:11
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-01-16 16:56:44
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {PureComponent} from 'react';
import {View, Text, StyleSheet, ActivityIndicator, Modal} from 'react-native';
import PropTypes from 'prop-types';

export default class Loading extends PureComponent {
  render() {
    const {LoadingText = '加载中...'} = this.props;

    return (
      <Modal transparent={true} onRequestClose={() => {}}>
        <View style={styles.loading}>
          <ActivityIndicator
            style={styles.animation}
            animating={true}
            color={'#fff'}
            size={'large'}
          />
          <Text style={styles.loadingText}>{LoadingText}</Text>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    marginBottom: 10,
  },
  loadingText: {
    color: '#fff',
  },
});
Loading.defaultProps = {
  onClick: () => {},
};

Loading.propTypes = {
  onClick: PropTypes.func.isRequired,
};
