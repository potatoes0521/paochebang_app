/* eslint-disable consistent-this */
/*
 * @Author: guorui
 * @description: 订单相关
 * @Date: 2019-10-30 18:18:55
 * @LastEditors  : liuYang
 * @LastEditTime : 2019-12-20 17:56:08
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import requestHandle from '../requestHandle.js';

export default {
  //放弃订单
  abandonOrderData(data, that) {
    return requestHandle.post(
      `order/abandon/${data.orderCode}`,
      data,
      that,
      '提交中...',
    );
  },
  //获取订单/接单详情
  getOrderDetail(data, that) {
    return requestHandle.get('order/detail', data, that);
  },
  //获取订单列表
  getOrdersList(data, that) {
    return requestHandle.get('order/list', data, that);
  },
  //获取报价列表
  getOfferList(data, that) {
    return requestHandle.get('order/suspenselist', data, that);
  },
  //获取接单列表
  getReceiptOrderList(data, that) {
    return requestHandle.get('order/takelist', data, that);
  },
  //订单接单
  receiptOrderData(data, that) {
    return requestHandle.post(
      `order/take/${data.orderCode}`,
      data,
      that,
      '提交中...',
    );
  },
  //上传订单文件信息  不是上传图片  是把图片路径保存
  editOrderFiles(data, that) {
    return requestHandle.post('orderfile/add', data, that, '提交中...');
  },
  // 查看提车单
  seePickUpCarFilesDetails(data, that) {
    return requestHandle.get('orderfile/pickupdetail', data, that);
  },
  // 查看交车单
  seeDeliveryCarFilesDetails(data, that) {
    return requestHandle.get('orderfile/deliverdetail', data, that);
  },
  // 确认司机信息
  confirmDriver(data, that) {
    return requestHandle.post('order/confirmdriver', data, that);
  },
  // 根据订单id查询运输司机信息
  getOrderDriver(data, that) {
    return requestHandle.get('order/carriagedriver', data, that);
  },
};
