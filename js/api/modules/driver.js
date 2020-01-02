/* eslint-disable consistent-this */
/*
 * @Author: guorui
 * @description: 司机相关接口
 * @Date: 2019-12-25 11:32:56
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-01-02 09:34:42
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
  // 获取车辆类型信息
  getCarInfoList(that) {
    return requestHandle.getJson('driver_car_info.json', that);
  },
};
