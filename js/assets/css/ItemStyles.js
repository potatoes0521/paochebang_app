/*
 * @Author: liuYang
 * @description: 详情通用css
 * @Date: 2019-12-04 11:36:02
 * @LastEditors  : guorui
 * @LastEditTime : 2019-12-25 16:05:52
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
