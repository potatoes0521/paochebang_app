/* eslint-disable consistent-this */
/*
 * @Author: guorui
 * @description: 空位相关
 * @Date: 2019-10-30 18:18:27
 * @LastEditors  : liuYang
 * @LastEditTime : 2019-12-23 15:52:02
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import requestHandle from '../requestHandle.js';

export default {
  // 获取空位列表
  getVacancyList(data, that) {
    return requestHandle.get('vacantpallet/list', data, that);
  },
  // 空位详情
  getVacancyDetail(data, that) {
    return requestHandle.get('vacantpallet/detail', data, that);
  },
  // 发布空位信息
  addVacancyData(data, that) {
    return requestHandle.post('vacantpallet/add', data, that, '提交中...');
  },
  // 空位信息下架
  vacancyDataPullOff(data, that) {
    return requestHandle.post('vacantpallet/pulloff', data, that, '提交中...');
  },
  // 更新/编辑一个卖板信息
  updateOneVacancyData(data, that) {
    return requestHandle.post('vacantpallet/modify', data, that, '提交中...');
  },
  // 获取我自己发布的空位
  getMineVacancyList(data, that) {
    return requestHandle.get('vacantpallet/myvacantPallet', data, that);
  },
};
