/* eslint-disable consistent-this */
/*
 * @Author: guorui
 * @description: 司机相关接口
 * @Date: 2019-12-25 11:32:56
 * @LastEditors  : guorui
 * @LastEditTime : 2019-12-25 11:36:45
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import requestHandle from '../requestHandle.js';

export default {
  //添加、编辑司机
  updateDriverData(data, that) {
    return requestHandle.post('transferuser/edit', data, that, '添加中...');
  },
  //获取司机信息详情
  getDriverDetail(data, that) {
    return requestHandle.get('transferuser/detail', data, that);
  },
  //获取司机信息列表
  getDriverList(data, that) {
    return requestHandle.get('transferuser/list', data, that);
  },
};
