/*
 * @Author: liuYang
 * @description: 详情通用css
 * @Date: 2019-12-04 11:36:02
 * @LastEditors  : liuYang
 * @LastEditTime : 2019-12-30 14:51:52
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
    paddingVertical: 8,
    backgroundColor: '#ffffff',
  },
  formItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 8,
    lineHeight: 21,
  },
  moreTextFormItem: {
    alignItems: 'stretch',
  },
  formLabel: {
    width: 110,
  },
  labelText: {
    color: GlobalStyles.themeFontColor,
    fontSize: 16,
    fontWeight: '700',
  },
  formContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  unit: {
    color: GlobalStyles.themeFontColor,
    fontSize: 15,
    marginLeft: 10,
  },
  waitColor: {
    color: GlobalStyles.themeDisabled,
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
  noOffer: {
    color: GlobalStyles.themeSubColor,
  },
  hasOffer: {
    color: GlobalStyles.themeColor,
  },
  btnWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    marginTop: 28,
  },
  btnLeft: {
    marginRight: 9,
  },
  btnRight: {
    marginLeft: 9,
  },
  textThemeDisabled: {
    color: GlobalStyles.themeDisabled,
  },
  textInput: {
    height: 20,
    textAlign: 'right',
    flex: 1,
    padding: 0,
    margin: 0,
    color: GlobalStyles.themeFontColor,
    fontSize: 15,
  },
};
