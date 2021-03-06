/* eslint-disable consistent-this */
/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-01-02 15:39:43
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-01-16 17:04:40
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

/**
 * 文件类型  businessType
 * 1 身份证照片
 * 2 提车单照片
 * 3 验车照片
 * 4 交车单照片
 * 5 行驶证照片
 * 6 货车车辆照片
 * 7 询价单表格
 * 8 客户表格
 * 9 banner位图片
 */
// import React from 'react';
import ImagePicker from 'react-native-image-crop-picker';
// import ImagePicker from 'react-native-image-picker';
import api from '../api/index';
// import {defaultFileUrl} from '../config/requestConfig';

/**
 * 函数功能描述
 * @param {Boolean} multiple=false 是否多选
 * @param {String} openType='album' 是否从相册选择 camera
 * @param {Object} that this
 * @param {Number} businessType=1 文件类型
 * @return void
 */
export const uploadFile = ({
  multiple = false,
  openType = 'album',
  that,
  businessType = 1,
}) => {
  return new Promise(resolve => {
    let imageArray = [];
    that.businessType = businessType;
    if (openType === 'album') {
      ImagePicker.openPicker({
        multiple,
        compressImageQuality: 0.3,
        // includeBase64: true,
      })
        .then(images => {
          if (multiple) {
            imageArray = images;
          } else {
            imageArray[0] = images;
          }
          uploadMultipleFiles(imageArray, that, businessType)
            .then(filePathArray => {
              resolve(filePathArray);
            })
            .catch(err => {
              this.toastRef.current.show('上传图片失败');
              console.log('error', err);
            });
        })
        .catch(error => {
          console.log('error', error);
        });
    } else if (openType === 'camera') {
      ImagePicker.openCamera({
        compressImageQuality: 0.3,
      })
        .then(images => {
          imageArray[0] = images;
          uploadMultipleFiles(imageArray, that, businessType).then(
            filePathArray => {
              resolve(filePathArray);
            },
          );
        })
        .catch(error => {
          console.log('error', error);
        });
    }
  });
};
/**
 * 上传多个文件
 * @param {Array} filePathsArray 图片临时路径的数组  里面是 字符串  ['1.png','2.png']
 * @param {Object} that this
 * @return void
 */
function uploadMultipleFiles(filePathsArray, that, businessType = 1) {
  return new Promise(resolve => {
    let count = 0;
    let completeFilePathsArray = [];
    uploadHandle({
      filePathsArray,
      count,
      resolve,
      completeFilePathsArray,
      that,
      businessType,
    });
  });
}
/**
 * 递归处理上传图片 对象方式传参
 * @param {Array} {filePathsArray 图片临时路径的数组  里面是 字符串  ['1.png','2.png']
 * @param {Number} count 现在是第几张
 * @param {Array} completeFilePathsArray 将来存返回值的地方
 * @param {Function} resolve promise
 * @param {Object} that} this
 * @return void
 */
function uploadHandle({
  filePathsArray,
  count,
  completeFilePathsArray,
  resolve,
  that,
  businessType = 1,
}) {
  if (filePathsArray.length > 1) {
    // Taro.showLoading({
    //   title: ,
    // });
    that.setState({
      uploadLoading: true,
      showText: `正在上传第${count}张图片`,
    });
  }
  let fd = new FormData();
  console.log('filePathsArray', filePathsArray);
  fd.append('file', {
    uri: filePathsArray[count].path,
    type: 'multipart/form-data',
    name: 'image.png',
  });
  fd.append('businessType', businessType);
  api.upload
    .fileUpload(fd, that)
    .then(async res => {
      count++; //下一张
      const filePath = res.data.fileVirtualPath;
      let sendData = {
        virthPath: filePath,
      };
      console.log('res', res);
      const url = await splicingURL(sendData, that);
      completeFilePathsArray.push(url.data);
      if (count === filePathsArray.length) {
        that.setState({
          uploadLoading: false,
          showText: '',
        });
        that.toastRef.current.show('上传成功');
        resolve(completeFilePathsArray);
      } else {
        uploadHandle({
          filePathsArray,
          count,
          completeFilePathsArray,
          resolve,
          that,
        });
        console.log('正在上传第' + count + '张');
      }
    })
    .catch(err => {
      console.log('第' + count + '张失败', err);
      count--; // 上一张
    });
}
/**
 * 请求获取全部路径
 * @param {Object} data 请求的参数
 * @param {Object} that this
 * @return void
 */
function splicingURL(data, that) {
  return api.upload.getFileData(data, that);
}
