/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-11-24 10:39:58
 * @LastEditors: liuYang
 * @LastEditTime: 2019-11-24 10:44:46
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducer';

const middlewares = [thunk];

export default createStore(reducers, applyMiddleware(...middlewares));
