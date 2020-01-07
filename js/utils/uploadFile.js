/* eslint-disable consistent-this */
/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-01-02 15:39:43
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-01-06 15:09:40
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
/**
 * 函数功能描述
 * @param {Type} {multiple=false 是否开启多选
 * @param {Type} openType='album' // 相册 'camera' 照相机
 * @param {Type} that this参数
 * @param {Type} businessType=1 文件类型
 * @return void
 */
// import React from 'react';
import ImagePicker from 'react-native-image-crop-picker';
// import ImagePicker from 'react-native-image-picker';
import api from '../api/index';
// import {defaultFileUrl} from '../config/requestConfig';
export const uploadFile = ({
  multiple = false,
  openType = 'album',
  that,
  businessType = 1,
}) => {
  return new Promise(resolve => {
    let imageArray = [];
    if (openType === 'album') {
      ImagePicker.openPicker({
        multiple,
        compressImageQuality: 0.3,
        // includeBase64: true,
      })
        .then(images => {
          imageArray = images;
          uploadMultipleFiles(imageArray, that, businessType)
            .then(filePathArray => {
              resolve(filePathArray);
            })
            .catch(err => {
              console.log('error', err);
            });
        })
        .catch(error => {
          console.log('error', error);
        });
    } else if (openType === 'camera') {
      ImagePicker.openCamera({
        compressImageQuality: 0.4,
      })
        .then(images => {
          console.log(images);
          imageArray = images;
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
    //   title: '正在上传第' + count + '张图片',
    // });
  }
  let fd = new FormData();
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
      const url = await splicingURL(sendData, that);
      completeFilePathsArray.push(url.data);
      if (count === filePathsArray.length) {
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
