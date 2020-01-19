/* eslint-disable consistent-this */
/*
 * @Author: guorui
 * @description: 报价相关
 * @Date: 2019-10-30 18:17:18
 * @LastEditors  : liuYang
 * @LastEditTime : 2019-12-20 16:22:26
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import requestHandle from '../requestHandle.js';

export default {
  //报价
  submitOfferData(data, that) {
    return requestHandle.post('price/quoted', data, that, '报价中...');
  },
  //根据inquiryId获取报价单详情
  getOfferDetailById(data, that) {
    return requestHandle.get('price/detailbyid', data, that);
  },
  //根据inquiryCode获取报价单详情
  getOfferDetailByCode(data, that) {
    return requestHandle.get('price/detail', data, that);
  },
  //获取待报价列表
  getOfferList(data, that) {
    return requestHandle.get('order/suspenselist', data, that);
  },
};
