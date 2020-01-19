/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-11-24 10:41:38
 * @LastEditors  : liuYang
 * @LastEditTime: 2019-12-10 17:52:39
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import {combineReducers} from 'redux';
import theme from './theme';
import user_info from './user';
const index = combineReducers({
  theme,
  user_info,
});
export default index;
