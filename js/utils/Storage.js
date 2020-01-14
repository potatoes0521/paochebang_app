/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2019-12-30 15:38:59
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-01-14 13:03:50
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import AsyncStorage from '@react-native-community/async-storage';

export default {
  /**
   * 保存数据
   * @param {String} key 存储的key
   * @param {Object || String} data 要存储的数据
   * @param {Function} callback 回调函数
   * @return void
   */
  setStorage(key, data, callback) {
    if (!data || !key) {
      return;
    }
    AsyncStorage.setItem(
      'pao-che-' + key,
      JSON.stringify(this.wrapData(data)),
      callback,
    );
  },
  /**
   * 获取本地数据
   * @param {String} key 要获取的数据的key
   * @returns {Promise}
   */
  getStorage(key) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('pao-che-' + key, (error, result) => {
        if (!error) {
          try {
            resolve(JSON.parse(result));
          } catch (e) {
            reject(e);
            console.error(e);
          }
        } else {
          reject(error);
          console.error(error);
        }
      });
    });
  },
  /**
   * 添加时间戳方便对比数据
   * @param {Object || String} data 参数描述
   * @return void
   */
  wrapData(data) {
    return {
      data: data,
      timestamp: new Date().getTime(),
    };
  },
};
