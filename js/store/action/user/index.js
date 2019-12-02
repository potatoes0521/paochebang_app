/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-08-15 15:29:19
 * @LastEditors: liuYang
 * @LastEditTime: 2019-12-02 12:03:13
 */
import Types from '../../type';

/**
 * 修改用户信息
 * @param {Object} data 参数描述
 * @return void
 */
export const changeUserInfo = data => {
  return {
    type: Types.CHANGE_USER_INFO,
    data,
  };
};
/**
 * 刷新login
 * @param {Object} data 参数描述
 * @return void
 */
// export const handleLogin = data => {
//   return {
//     type: 'REFRESHTOKEN',
//     data,
//   };
// };
