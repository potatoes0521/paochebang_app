/*
 * @Author: liuYang
 * @description: 按钮组的显示控制
 * @Date: 2019-12-13 15:43:26
 * @LastEditors  : liuYang
 * @LastEditTime : 2019-12-27 09:56:07
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import _differenceBy from 'lodash/differenceBy';

const orderButtons = [
  {
    key: 'pickUpListEdit',
    name: '上传提车单',
  },
  {
    key: 'pickUpListSee',
    name: '查看提车单',
  },
  {
    key: 'deliveryListEdit',
    name: '上传交车单',
  },
  {
    key: 'deliveryListSee',
    name: '查看交车单',
  },
  {
    key: 'receiptOrder',
    name: '接单',
  },
  {
    key: 'abandonReceiptOrder',
    name: '放弃接单',
  },
  {
    key: 'confirmDriverInfo',
    name: '确认司机信息',
  },
  {
    key: 'seeDriverInfo',
    name: '查看司机信息',
  },
  {
    key: 'confirmLocation',
    name: '位置打卡',
  },
];
/**
 * 处理订单的按钮组 本地没有的  不予显示
 * 1. 找到数据里有  本地没有的
 * 2. 数据里有除去没有的就是有的
 * @param {Array} buttons 后端返回的按钮组
 * @return data 处理后的数据
 */
export const handleOrderButtons = buttons => {
  const arrDiffData = _differenceBy(buttons, orderButtons, 'key');
  const data = _differenceBy(buttons, arrDiffData, 'key');
  return data;
};
