/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-01-04 10:52:39
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-01-17 16:17:09
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import PropTypes from 'prop-types';
import GlobalStyles from '../../assets/css/GlobalStyles';
import Swiper from 'react-native-swiper';

export default class PreviewImage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}
  close() {
    this.props.onClose();
  }
  render() {
    let {image} = this.props;
    console.log('image', image);
    return image && image.length ? (
      <TouchableOpacity onPress={this.close.bind(this)} style={styles.wrapper}>
        <Image
          resizeMode={'contain'}
          style={styles.swiperItemImage}
          source={{
            uri: image,
          }}
        />
      </TouchableOpacity>
    ) : null;
  }
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 99,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  swiperItemImage: {
    width: GlobalStyles.window_width,
    height: GlobalStyles.window_height,
    // height: (GlobalStyles.window_width / 5) * 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

PreviewImage.defaultProps = {
  visible: true,
  imageListData: [],
  activeIndex: 0,
  onClose: () => {},
};

PreviewImage.propTypes = {
  visible: PropTypes.bool.isRequired,
  imageListData: PropTypes.array.isRequired,
  activeIndex: PropTypes.number,
  onClose: PropTypes.func.isRequired,
};
