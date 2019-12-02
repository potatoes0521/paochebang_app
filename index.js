/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-11-22 13:51:52
 * @LastEditors: liuYang
 * @LastEditTime: 2019-11-29 14:55:30
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './js/App';
GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
AppRegistry.registerComponent(appName, () => App);
