/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-11-24 11:12:40
 * @LastEditors: liuYang
 * @LastEditTime: 2019-11-29 11:17:56
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Types from '../../type';
import ThemeDao from '../../../storage/ThemeStorage';

/**
 * 主题变更
 * @param theme
 * @returns {{type: string, theme: *}}
 */
export function onThemeChange(theme) {
  return {
    type: Types.THEME_CHANGE,
    theme: theme,
  };
}
/**
 * 初始化主题
 * @returns {Function}
 */
export function onThemeInit() {
  return dispatch => {
    new ThemeDao().getTheme().then(data => {
      dispatch(onThemeChange(data));
    });
  };
}
/**
 * 显示自定义主题浮层
 * @param show
 * @returns {{type: *, customThemeViewVisible: *}}
 */
export function onShowCustomThemeView(show) {
  return {
    type: Types.SHOW_THEME_VIEW,
    customThemeViewVisible: show,
  };
}
