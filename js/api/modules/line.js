/*
 * @Author: guorui
 * @description: 线路相关接口
 * @Date: 2019-12-27 17:10:00
 * @LastEditors  : guorui
 * @LastEditTime : 2019-12-27 17:11:06
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
/* eslint-disable consistent-this */
import requestHandle from '../requestHandle.js';

export default {
  //获取线路列表
  getLineList(data, that) {
    return requestHandle.get('transferuser/getline', data, that);
  },
  //添加线路
  addLine(data, that) {
    return requestHandle.post(
      'transferuser/addtransferline',
      data,
      that,
      '添加中...',
    );
  },
  //删除线路
  deleteList(data, that) {
    return requestHandle.get('transferuser/deleteline', data, that);
  },
};
