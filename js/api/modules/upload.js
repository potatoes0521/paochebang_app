/* eslint-disable consistent-this */
/*
 * @Author: guorui
 * @description: 上传图片、文件
 * @Date: 2019-12-19 10:28:14
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-01-02 15:33:20
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import requestHandle from '../requestHandle.js';

export default {
  //文件上传
  fileUpload(data, that) {
    return requestHandle.post('file/upload', data, that);
  },
  //文件读取
  getFileData(data, that) {
    return requestHandle.get('file/read', data, that);
  },
};
