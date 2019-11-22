/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-11-22 13:51:52
 * @LastEditors: liuYang
 * @LastEditTime: 2019-11-22 17:00:13
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import AppNavigators from './js/navigator/AppNavigators';

AppRegistry.registerComponent(appName, () => AppNavigators);
