/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-11-29 11:50:46
 * @LastEditors  : liuYang
 * @LastEditTime : 2019-12-19 10:57:42
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
/**
 * 全局样式
 */

import {Dimensions} from 'react-native';

const BACKGROUND_COLOR = '#ffffff';
const {height, width} = Dimensions.get('window');
export default {
  line: {
    height: 0.5,
    opacity: 0.5,
    backgroundColor: 'darkgray',
  },
  root_container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  nav_bar_height_ios: 44,
  nav_bar_height_android: 50,
  backgroundColor: BACKGROUND_COLOR,
  window_width: width,
  window_height: height,
  themeColor: '#FF9C00',
  themeFontColor: '#333333',
  themeTipColor: '#666666',
  themeDisabled: '#d2d2d2',
  themeHColor: '#999999',
  themeSubColor: '#4E97EF',
};
