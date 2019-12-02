/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-08-13 14:43:19
 * @LastEditors: liuYang
 * @LastEditTime: 2019-12-02 10:45:10
 */

import hex_md5 from '../utils/md5.js';

export default function createSignData(data, appKey) {
  var sortList = [];
  for (var objKey in data) {
    if (data.hasOwnProperty(objKey)) {
      var value = data[objKey];
      var item = {};
      item.objKey = objKey;
      item.value = value;
      sortList.push(objKey);
    }
  }

  sortList.sort();
  var strToJiaMi = '';

  sortList.forEach(function(arrayKey) {
    if (arrayKey !== 'sign') {
      strToJiaMi += arrayKey + '=' + data[arrayKey] + '&';
    }
  }, this);

  strToJiaMi = strToJiaMi + 'appKey=' + appKey;
  var noJiaMi = strToJiaMi;
  strToJiaMi = hex_md5(strToJiaMi);
  return [data, strToJiaMi, noJiaMi];
}
