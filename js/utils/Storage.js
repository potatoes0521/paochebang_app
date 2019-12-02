import AsyncStorage from '@react-native-community/async-storage';

export default {
  /**
   * 保存数据
   * @param {String} key 存储的key
   * @param {Object || String} data 要存储的数据
   * @param {Function} callback 回调函数
   * @return void
   */
  saveData(key, data, callback) {
    if (!data || !key) {
      return;
    }
    AsyncStorage.setItem(key, JSON.stringify(this.wrapData(data)), callback);
  },
  /**
   * 获取本地数据
   * @param {String} key 要获取的数据的key
   * @returns {Promise}
   */
  fetchLocalData(key) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(key, (error, result) => {
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
