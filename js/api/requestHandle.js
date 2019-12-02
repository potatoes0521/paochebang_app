/* eslint-disable consistent-this */
/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-12-02 10:21:17
 * @LastEditors: liuYang
 * @LastEditTime: 2019-12-02 11:54:50
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import {defaultApiURL} from '../config/requestConfig.js';
import createSignData from './secret.js';

const sign_id = 'wxb633da0aa161b42c';
const contentType = 'application/json;charset=UTF-8';
export const appVersion = '0.9.2';

export default {
  /**
   * 获取网络数据
   * @param url
   * @param flag
   * @returns {Promise}
   */
  get(url, data, that, loadingTitle = '加载中...') {
    return this.fetchData({
      url,
      data,
      that,
      loadingTitle,
      method: 'GET',
    });
  },
  post(url, data, that, loadingTitle = '提交中...') {
    return this.fetchData({
      url,
      data,
      that,
      loadingTitle,
      method: 'POST',
    });
  },
  fetchData({url, data, that, method = 'GET', loadingTitle}) {
    const config = Object.assign(this.baseOptions(url, data, that, method));
    return new Promise((resolve, reject) => {
      fetch(config.requestURL, config)
        .then(response => {
          console.log(response, 'xxxxxxx');
          if (response.ok) {
            return response.json();
          }
          throw new Error('Network response was not ok.');
        })
        .then(responseData => {
          this.saveData(url, responseData);
          console.log(responseData, 'xxxxxxxxxxxxxxxxxxxx');
          resolve(responseData);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  baseOptions(url, data, that, method) {
    const sign = createSignData(data, sign_id)[1];
    // let loadingTimer = null;
    console.log(JSON.stringify(data), 'sign=' + sign, url);
    let requestURL = defaultApiURL + url;
    if (url.indexOf('file/read') !== -1) {
      requestURL = url;
    }
    const {userInfo} = that.props || {};
    const headerUserLogin = JSON.stringify({
      token: userInfo.token || '',
      mobile: userInfo.mobile || '',
      openId: userInfo.openId || '',
      userId: userInfo.userId || '', // 常用请求全部放在请求头上
      unionId: userInfo.unionId || '',
      userType: userInfo.userType || '', // 0 驿站人员  1 自主注册   2 驿站人员添加客户 3 运力  4 司机
    });

    let config = {
      method,
      header: {
        'content-type': contentType,
        'user-login': headerUserLogin,
        sign: sign || '',
        'terminal-type': 1, // 终端类型  1 小程序   2 H5  3 APP 4 运营后台
        'source-id': 1, // 1 跑车帮小程序 2 跑车帮app 3 跑车物流小程序 4 跑车物流运营平台
        'system-info': userInfo.userAgent || '', // 系统信息
        'app-version': appVersion, // 版本号
        'app-type': 1, // 1 微信小程序 2 支付宝小程序  3 PC运营后台
        'system-id': 1, // 1 跑车帮   2 跑车物流  3 运营后台
      },
      requestURL,
    };
    // 如果不是post模式传body会报错
    if (method === 'POST') {
      config = Object.assign({}, {body: data}, config);
    } else {
      // get方式传参
      let paramsArray = [];
      for (var objKey in data) {
        if (data.hasOwnProperty(objKey)) {
          var value = data[objKey];
          var item = {};
          item.objKey = objKey;
          item.value = value;
          paramsArray.push(objKey);
        }
      }
      // 如果请求接口里有?就直接拼接 没有问号就加?拼接到url上
      if (requestURL.search(/\?/) === -1) {
        url += '?' + paramsArray.join('&');
      } else {
        url += '&' + paramsArray.join('&');
      }
    }
    return config;
  },
  /**
   * 检查timestamp是否在有效期内
   * @param timestamp 项目更新时间
   * @return {boolean} true 不需要更新,false需要更新
   */
  checkTimestampValid(timestamp) {
    const currentDate = new Date();
    const targetDate = new Date();
    targetDate.setTime(timestamp);
    if (currentDate.getMonth() !== targetDate.getMonth()) {
      return false;
    }
    if (currentDate.getDate() !== targetDate.getDate()) {
      return false;
    }
    if (currentDate.getHours() - targetDate.getHours() > 4) {
      return false;
    } //有效期4个小时
    // if (currentDate.getMinutes() - targetDate.getMinutes() > 1)return false;
    return true;
  },
};
