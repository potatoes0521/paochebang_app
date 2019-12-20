/*
 * @Author: liuYang
 * @description: 公共api接口
 * @Date: 2019-12-02 11:49:37
 * @LastEditors  : liuYang
 * @LastEditTime : 2019-12-20 17:56:25
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import user from './modules/user.js'; // 用户接口
import index from './modules/index.js'; // 首页接口
import offer from './modules/offer.js'; // 询价接口
import order from './modules/order.js'; // 订单接口
import selling from './modules/selling.js'; // 卖板接口
// import vacancy from './modules/vacancy.js'; // 空位接口
// import driver from './modules/driver.js'; // 司机接口
// import account from './modules/account.js'; // 账户接口

export default {
  user,
  index,
  offer,
  order,
  selling,
  // vacancy,
  // driver,
  // account,
};
