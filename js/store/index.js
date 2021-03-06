/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-11-24 10:39:58
 * @LastEditors: liuYang
 * @LastEditTime: 2019-12-10 17:55:16
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducer';

/**
 * 自定义log中间件
 * https://cn.redux.js.org/docs/advanced/Middleware.html
 * @param store
 */
const logger = store => next => action => {
  if (typeof action === 'function') {
    console.log('dispatching a function');
  } else {
    console.log('dispatching ', action);
  }
  const result = next(action);
  console.log('nextState ', store.getState());
  return result;
};

const middlewares = [logger, thunk];

/**
 * 创建store
 */
export default createStore(reducers, applyMiddleware(...middlewares));
