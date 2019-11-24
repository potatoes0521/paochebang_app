/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-11-24 10:41:38
 * @LastEditors: liuYang
 * @LastEditTime: 2019-11-24 10:47:28
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import {combineReducers} from 'redux';
import theme from './theme';
const index = combineReducers({
  theme,
});
export default index;
