/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-11-22 17:00:17
 * @LastEditors: liuYang
 * @LastEditTime: 2019-11-22 17:23:40
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
export default class NavigationUtil {
  /**
   * 重置到首页
   * @param navigation
   */
  static resetToHomPage(params) {
    const {navigation} = params;
    navigation.navigate('Main');
  }
}
