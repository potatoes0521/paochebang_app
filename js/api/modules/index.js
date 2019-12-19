/* eslint-disable consistent-this */
/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-12-05 13:44:42
 * @LastEditors  : liuYang
 * @LastEditTime : 2019-12-19 09:44:21
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import requestHandle from '../requestHandle.js';

export default {
  // 获取banner数据
  getBannerList(data, that) {
    return requestHandle.get('banner/list', data, that, false);
  },
};
