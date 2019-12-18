/*
 * @Author: liuYang
 * @description: 详情通用css
 * @Date: 2019-12-04 11:36:02
 * @LastEditors: liuYang
 * @LastEditTime: 2019-12-04 12:03:06
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import GlobalStyles from './GlobalStyles';
export default {
  card: {
    marginHorizontal: 12,
    marginTop: 8,
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  formItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  formLabel: {
    width: 100,
  },
  labelText: {
    color: GlobalStyles.themeFontColor,
    fontSize: 15,
    fontWeight: '700',
  },
  formContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  contentText: {
    fontSize: 15,
    color: GlobalStyles.themeFontColor,
  },
  iconRight: {
    fontSize: 12,
    color: GlobalStyles.themeDisabled,
    fontFamily: 'iconfont',
    marginLeft: 4,
  },
};
