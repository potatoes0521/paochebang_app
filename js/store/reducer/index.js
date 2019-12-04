/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-11-24 10:41:38
 * @LastEditors: liuYang
 * @LastEditTime: 2019-12-03 17:57:22
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import {combineReducers} from 'redux';
import theme from './theme';
import user_info from './user';
import {rootCom, RootNavigator} from '../../navigator/AppNavigators';

const navState = RootNavigator.router.getStateForAction(
  RootNavigator.router.getActionForPathAndParams(rootCom),
);

const navReducer = (state = navState, action) => {
  const nextState = RootNavigator.router.getStateForAction(action, state);
  return nextState || state;
};

const index = combineReducers({
  nav: navReducer,
  theme,
  user_info,
});
export default index;
