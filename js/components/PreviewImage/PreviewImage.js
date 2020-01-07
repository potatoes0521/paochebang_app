/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-01-04 10:52:39
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-01-04 11:54:34
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

  render() {
    let {visible, imageListData} = this.props;
    const imageList =
      imageListData &&
      imageListData.map(item => {
        return (
          <TouchableOpacity style={styles.swiperItem} key={item}>
            <Image
              // resizeMode={'contain'}
              style={styles.swiperItemImage}
              source={{
                uri: item,
              }}
            />
          </TouchableOpacity>
        );
      });
    console.log('imageList', imageListData);
    return (
      <>
        {visible ? (
          <View style={styles.wrapper}>
            {imageListData ? (
              <Swiper
                style={styles.swiperWrapper}
                key={item => item}
                autoplay={true}>
                {imageList}
              </Swiper>
            ) : null}
          </View>
        ) : null}
      </>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  swiperWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  swiperItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  swiperItemImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

PreviewImage.defaultProps = {
  visible: true,
  imageListData: [],
  activeIndex: 0,
  onClick: () => {},
};

PreviewImage.propTypes = {
  visible: PropTypes.bool.isRequired,
  imageListData: PropTypes.array.isRequired,
  activeIndex: PropTypes.number,
  onClick: PropTypes.func.isRequired,
};
