/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-11-29 11:08:30
 * @LastEditors: liuYang
 * @LastEditTime: 2019-11-29 11:10:42
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import AsyncStorage from '@react-native-community/async-storage';
import {ThemeFlags} from '../assets/css/ThemeFactory';
import ThemeFactory from '../assets/css/ThemeFactory';

const THEME_KEY = 'theme_key';
export default class ThemeDao {
  /**
   * 获取当前主题
   * @returns {Promise<any> | Promise}
   */
  getTheme() {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(THEME_KEY, (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        if (!result) {
          this.save(ThemeFlags.Default);
          result = ThemeFlags.Default;
        }
        resolve(ThemeFactory.createTheme(result));
      });
    });
  }

  /**
   * 保存主题标识
   * @param themeFlag
   */
  save(themeFlag) {
    AsyncStorage.setItem(THEME_KEY, themeFlag, error => {});
  }
}
