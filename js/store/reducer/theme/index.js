/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-11-24 10:45:58
 * @LastEditors: liuYang
 * @LastEditTime: 2019-11-29 11:19:10
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Types from '../../type';
import ThemeFactory, {ThemeFlags} from '../../../res/styles/ThemeFactory';

const defaultState = {
  theme: ThemeFactory.createTheme(ThemeFlags.Default),
  onShowCustomThemeView: false,
};
export default function onAction(state = defaultState, action) {
  switch (action.type) {
    case Types.THEME_CHANGE:
      return {
        ...state,
        theme: action.theme,
      };
    case Types.SHOW_THEME_VIEW:
      return {
        ...state,
        customThemeViewVisible: action.customThemeViewVisible,
      };
    default:
      return state;
  }
}
