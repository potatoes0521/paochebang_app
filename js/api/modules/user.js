/* eslint-disable consistent-this */
/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-12-02 11:52:12
 * @LastEditors  : liuYang
 * @LastEditTime : 2019-12-26 09:56:20
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import requestHandle from '../requestHandle';

export default {
  // code换openID
  codeExchangeOpenID(data, that) {
    return requestHandle.get('user/getwechatopenid', data, that, false);
  },
  // openID登录
  loginUseOpenID(data, that) {
    return requestHandle.post('user/login', data, that, false);
  },
  // 注册
  register(data, that) {
    return requestHandle.post('user/expresslogin', data, that);
  },
  // 换手机号
  codeExchangePhone(data, that) {
    return requestHandle.get('user/getwechatuserinfo', data, that);
  },
  // 刷新token
  refreshToken(data, that) {
    return requestHandle.post('user/refreshtoken', data, that);
  },
  // 获取城市信息
  getCityList(data, that) {
    return requestHandle.get('location/cities', data, that);
  },
  // 获取手机验证码
  getVerificationCode(data, that) {
    return requestHandle.post(
      'code/sendverificationcode',
      data,
      that,
      '短信发送中...',
    );
  },
  // 获取用户信息
  getUserInfo(data, that) {
    return requestHandle.get('user/getuserinfo', data, that);
  },
  // 编辑用户信息
  editUserInfo(data, that) {
    return requestHandle.post('user/edituser', data, that, '提交中...');
  },
  OCR(data, that) {
    return requestHandle.get('user/wechatocr', data, that, '识别中...');
  },
  // 实名认证
  realNameAuthentication(data, that) {
    return requestHandle.post('user/addIdCard', data, that, '实名认证中...');
  },
  // 获取实名信息
  getUserAuthorizeMsg(data, that) {
    return requestHandle.get('user/idcard', data, that);
  },
};
