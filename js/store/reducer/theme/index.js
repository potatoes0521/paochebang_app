/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-11-24 10:45:58
 * @LastEditors: liuYang
 * @LastEditTime: 2019-11-24 11:18:21
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import Types from '../../action/types';

const defaultState = {
  theme: 'blue',
};
export default function onAction(state = defaultState, action) {
  switch (action) {
    case Types.THEME_CHANGE:
      return {
        ...state,
        theme: action.theme,
      };
    default:
      return state;
  }
}
