/* eslint-disable consistent-this */
/*
 * @Author: guorui
 * @description: 账户相关接口
 * @Date: 2019-12-25 11:32:56
 * @LastEditors  : guorui
 * @LastEditTime : 2019-12-26 17:03:09
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import requestHandle from '../requestHandle.js';

export default {
  //获取账户余额
  getAccountAmount(data, that) {
    return requestHandle.get('account/balance', data, that);
  },
  //获取账户信息
  getAccountInfo(data, that) {
    return requestHandle.get('user/bank', data, that);
  },
  //获取账户明细列表
  getAccountList(data, that) {
    return requestHandle.get('account/billlist', data, that);
  },
  //账户提现
  getWithdrawData(data, that) {
    return requestHandle.post('account/withdraw', data, that, '提现中...');
  },
};
