/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-11-29 11:09:58
 * @LastEditors: liuYang
 * @LastEditTime: 2019-11-29 11:10:28
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
/**
 * 主题
 */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import {StyleSheet} from 'react-native';

export const ThemeFlags = {
  Default: '#2196F3',
  Red: '#F44336',
  Pink: '#E91E63',
  Purple: '#9C27B0',
  DeepPurple: '#673AB7',
  Indigo: '#3F51B5',
  Blue: '#2196F3',
  LightBlue: '#03A9F4',
  Cyan: '#00BCD4',
  Teal: '#009688',
  Green: '#4CAF50',
  LightGreen: '#8BC34A',
  Lime: '#CDDC39',
  Yellow: '#FFEB3B',
  Amber: '#FFC107',
  Orange: '#FF9800',
  DeepOrange: '#FF5722',
  Brown: '#795548',
  Grey: '#9E9E9E',
  BlueGrey: '#607D8B',
  Black: '#000000',
};

export default class ThemeFactory {
  /**
   * 创建一个主题样式
   * @param themeFlag 主题标识
   * @returns {{themeColor: *, styles: *}}
   */
  static createTheme(themeFlag) {
    return {
      themeColor: themeFlag,
      styles: StyleSheet.create({
        selectedTitleStyle: {
          color: themeFlag,
        },
        tabBarSelectedIcon: {
          tintColor: themeFlag,
        },
        navBar: {
          backgroundColor: themeFlag,
        },
      }),
    };
  }
}
