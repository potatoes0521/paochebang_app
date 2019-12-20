/* eslint-disable consistent-this */
/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-12-02 10:21:17
 * @LastEditors  : liuYang
 * @LastEditTime : 2019-12-20 16:32:50
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import axios from 'axios';
import {defaultApiURL} from '../config/requestConfig.js';
import createSignData from './secret.js';

const sign_id = 'wxb633da0aa161b42c';
const contentType = 'application/json;charset=UTF-8';
export const appVersion = '0.9.2';

class HttpRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }
  request(options) {
    const instance = axios.create();
    options = Object.assign(this.getInsideConfig(options), options);
    this.interceptors(instance, options.url);
    return instance(options);
  }
  getInsideConfig(options) {
    let {url, data, that, method} = options;
    const sign = createSignData(data, sign_id)[1];
    // let loadingTimer = null;
    console.log(JSON.stringify(data), 'sign=' + sign, url);
    const {userInfo} = that.props || {};
    const headerUserLogin = JSON.stringify({
      token: userInfo.token || '',
      mobile: userInfo.mobile || '',
      openId: userInfo.openId || '',
      userId: userInfo.userId || '', // 常用请求全部放在请求头上
      unionId: userInfo.unionId || '',
      userType: userInfo.userType || '', // 0 驿站人员  1 自主注册   2 驿站人员添加客户 3 运力  4 司机
    });
    if (url.indexOf('file/read') !== -1) {
      this.baseUrl = url;
    }
    console.log(this.baseUrl);
    let config = {
      method,
      headers: {
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
      baseURL: this.baseUrl,
    };
    // get方式传参
    if (method === 'get') {
      config = Object.assign({}, config, {
        params: options.data,
      });
    }
    return config;
  }
  interceptors(instance, url) {
    // 请求拦截
    instance.interceptors.request.use(
      config => {
        // 添加全局的loading...
        return config;
      },
      error => {
        return Promise.reject(error);
      },
    );
    // 响应拦截
    instance.interceptors.response.use(
      res => {
        const {data} = res;
        if (!+data.code || +data.code === 200002 || +data.code === 200) {
          console.log('data', data);
          return data;
        } else if (+data.code === 200003) {
          console.log('token shixiao');
          return data;
        } else {
          console.error('error 接口错误');
          return Promise.reject('error 接口错误');
        }
      },
      error => {
        console.log(error);
        // addErrorLog(errorInfo);
        return Promise.reject(error);
      },
    );
  }
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
  }
}
const newAxios = new HttpRequest(defaultApiURL);

export default {
  /**
   * 获取网络数据
   * @param url
   * @param flag
   * @returns {Promise}
   */
  get(url, data, that, loadingTitle = '加载中...') {
    return newAxios.request({
      url,
      data,
      that,
      loadingTitle,
      method: 'get',
    });
  },
  post(url, data, that, loadingTitle = '提交中...') {
    return newAxios.request({
      url,
      data,
      that,
      loadingTitle,
      method: 'post',
    });
  },
};
