/*
 * @Author: liuYang
 * @description: 公共导航方法
 * @Date: 2019-11-22 17:00:17
 * @LastEditors  : liuYang
 * @LastEditTime : 2019-12-25 10:18:33
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
export default class NavigationUtil {
  /**
   * 函数功能描述
   * @param {Object} params 要传递的参数
   * @param {String} page 要跳转的页面名
   * @return void
   */
  static goPage(params, page) {
    const navigation = NavigationUtil.navigation || params.navigation;
    if (!navigation) {
      console.log('NavigationUtil.navigation can not be null');
      return;
    }
    navigation.navigate(page, {
      ...params,
    });
  }

  /**
   * 返回上一页
   * @param navigation
   */
  static goBack(navigation) {
    navigation.goBack();
  }

  /**
   * 重置到首页
   * @param navigation
   */
  static resetToHomPage(params) {
    const {navigation} = params;
    navigation.navigate('Main');
  }
}
