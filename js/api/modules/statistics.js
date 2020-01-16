/* eslint-disable consistent-this */
/*
 * @Author: liuYang
 * @description: 统计相关
 * @path: 引入路径
 * @Date: 2020-01-16 20:28:33
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-01-16 20:29:51
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import requestHandle from '../requestHandle';

export default {
  //获取线路列表
  callPhone(data, that) {
    return requestHandle.post('callhistory/add', data, that);
  },
};
