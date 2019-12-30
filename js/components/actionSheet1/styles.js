/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2019-12-30 10:43:33
 * @LastEditors  : liuYang
 * @LastEditTime : 2019-12-30 11:29:23
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import GlobalStyles from '../../assets/css/GlobalStyles.js';
import {StyleSheet} from 'react-native';
// 这一常量始终是一个整数的像素值（线看起来会像头发丝一样细），并会尽量符合当前平台最细的线的标准。
// 可以用作边框或是两个元素间的分隔线。然而，你不能把它“视为一个常量”，因为不同的平台和不同的屏幕像素密度会导致不同的结果。
export const hairlineWidth = StyleSheet.hairlineWidth;
export default {
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    opacity: 0.4,
    backgroundColor: '#000',
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  body: {
    flex: 1,
    alignSelf: 'flex-end',
    backgroundColor: '#e5e5e5',
  },
  titleBox: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  titleText: {
    color: GlobalStyles.themeTipColor,
    fontSize: 14,
  },
  messageBox: {
    height: 30,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  messageText: {
    color: GlobalStyles.themeFontColor,
    fontSize: 12,
  },
  buttonBox: {
    height: 50,
    marginTop: hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  buttonText: {
    fontSize: 16,
  },
  cancelButtonBox: {
    height: 50,
    marginTop: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
};
