/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-09-17 13:48:36
 * @LastEditors  : liuYang
 * @LastEditTime : 2019-12-24 15:14:45
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

export const showModalText = '是否登录'; // 登录弹窗文案
export const showModalTextContent = '登录后即可发布信息,查看信息详情'; // 登录弹窗文案  content

export const indexTabsList = [
  // 选择车辆性质
  {
    id: 0,
    label: '卖板信息',
  },
  {
    id: 1,
    label: '空位信息',
  },
];

export const carNatureList = [
  // 选择车辆性质
  {
    id: 1,
    label: '新车',
  },
  {
    id: 2,
    label: '二手车',
  },
];

export const offerTabList = [
  {
    label: '报价',
    id: 0,
  },
  {
    label: '接单',
    id: 1,
  },
];

export const waitOfferTabList = [
  {
    status: 0,
    label: '全部',
  },
  {
    status: 1,
    label: '待报价',
  },
  {
    status: 2,
    label: '已报价',
  },
];

export const waitOrdersTabList = [
  {
    status: 0,
    label: '全部',
  },
  {
    status: 1,
    label: '待接单',
  },
  {
    status: 2,
    label: '已接单',
  },
  {
    status: 3,
    label: '已放弃',
  },
  {
    status: 4,
    label: '已失效',
  },
];

export const orderTabList = [
  {
    label: '待提车',
    id: 0,
  },
  {
    label: '待交车',
    id: 1,
  },
  {
    label: '全部',
    id: 2,
  },
];

export const payWey = [
  {
    id: 1,
    name: '车到付款（现金）',
  },
  {
    id: 2,
    name: '回单付款（现金）',
  },
  {
    id: 3,
    name: '预付油卡+回单现金',
  },
  {
    id: 4,
    name: '预付油卡+落地现金',
  },
];
