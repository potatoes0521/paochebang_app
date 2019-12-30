/*
 * @Author: guorui
 * @description: 请填写描述信息
 * @Date: 2019-12-26 16:32:40
 * @LastEditors  : guorui
 * @LastEditTime : 2019-12-27 10:57:51
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

import GlobalStyles from './GlobalStyles';
export default {
  itemWrapper: {
    paddingLeft: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  itemStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 24,
    paddingVertical: 16,
  },
  titleStyle: {
    width: 110,
    fontSize: 16,
    color: GlobalStyles.themeFontColor,
  },
  textStyle: {
    flex: 1,
    fontSize: 15,
    textAlign: 'right',
    color: GlobalStyles.themeHColor,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
};
