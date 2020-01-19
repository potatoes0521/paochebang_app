/* eslint-disable consistent-this */
/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-12-02 14:09:39
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-01-19 12:18:10
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import requestHandle from '../requestHandle';

export default {
  // 获取卖板信息列表
  getSellingList(data, that) {
    return requestHandle.get('saletopallet/list', data, that);
  },
  // 卖板详情
  getSellingDetail(data, that) {
    return requestHandle.get('saletopallet/detail', data, that);
  },
  // 发布卖板信息
  addSellingData(data, that) {
    return requestHandle.post('saletopallet/add', data, that, '发布中...');
  },
  // 卖板信息下架
  sellingDataPullOff(data, that) {
    return requestHandle.post('saletopallet/pulloff', data, that, '提交中...');
  },
  // 更新/编辑一个卖板信息
  updateOneSellingData(data, that) {
    return requestHandle.post('saletopallet/modify', data, that, '提交中...');
  },
  // 获取我自己发布的卖板
  getMineSellingList(data, that) {
    return requestHandle.get('saletopallet/mysaletopallet', data, that);
  },
  getRecommendSellingList(data, that) {
    return requestHandle.get('saletopallet/recommend', data, that, false);
  },
};
