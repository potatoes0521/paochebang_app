/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-11-24 11:12:40
 * @LastEditors: liuYang
 * @LastEditTime: 2019-11-24 11:15:45
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Types from './types';

export default function onThemeChange(theme) {
  return {type: Types.THEME_CHANGE, theme: theme};
}
