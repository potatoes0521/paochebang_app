/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-11-22 17:47:09
 * @LastEditors: liuYang
 * @LastEditTime: 2019-11-22 18:17:09
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import createIconSet from 'react-native-vector-icons/lib/create-icon-set';
import glyphMap from './iconfont.json.js';
let obj = {};
glyphMap.forEach(item => {
  obj[item.font_class] = item.unicode_decimal;
});
console.log(obj);
const iconSet = createIconSet(obj, 'CXIcon', 'iconfont.ttf');

export default iconSet;
