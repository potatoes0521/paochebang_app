/*
 * @Author: liuYang
 * @description: offer页面和我发布的卖板空位item公共样式
 * @path: 引入路径
 * @Date: 2019-12-27 10:52:36
 * @LastEditors  : guorui
 * @LastEditTime : 2020-01-02 15:35:34
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import GlobalStyles from './GlobalStyles';

export default {
  itemWrapper: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingBottom: 7,
    marginBottom: 10,
  },
  title: {
    paddingHorizontal: 12,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#f5f5f5',
    borderBottomWidth: 1,
  },
  time: {
    color: GlobalStyles.themeFontColor,
    fontSize: 14,
  },
  status: {
    color: GlobalStyles.themeFontColor,
    fontSize: 16,
    fontWeight: '700',
  },
  statusDesc: {
    color: GlobalStyles.themeSubColor,
    fontSize: 16,
    fontWeight: '700',
  },
  main: {
    paddingHorizontal: 10,
  },
  city: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 3,
  },
  cityText: {
    color: GlobalStyles.themeFontColor,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '700',
  },
  icon: {
    fontSize: 20,
    marginHorizontal: 2,
    color: GlobalStyles.themeFontColor,
  },
  item: {
    paddingVertical: 2,
  },
  itemText: {
    fontSize: 14,
    color: GlobalStyles.themeFontColor,
  },
  themeColor: {
    color: GlobalStyles.themeColor,
  },
  themeSubColor: {
    color: GlobalStyles.themeSubColor,
  },
};
