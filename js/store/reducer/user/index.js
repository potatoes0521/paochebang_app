/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-08-15 15:26:09
 * @LastEditors: liuYang
 * @LastEditTime: 2019-12-02 12:01:18
 */

import Types from '../../type';

// import api from '@api/index.js'

const defaultState = {
  userInfo: {},
};

// const env = process.env.NODE_ENV;

// if (env === 'development') {
//   INITIAL_STATE['userInfo'] = {
//     appVersion: null,
//     createTime: "2019-10-17T12:53:22.000+0000",
//     dueTime: "2019-10-25T09:29:44.000+0000",
//     isActive: 1,
//     loginId: 451,
//     loginType: 2,
//     systemId: 0,
//     terminalIp: "192.168.3.191",
//     realNameAuthStatus: null,
//     terminalType: 0,
//     mobile: "13121850481",
//     // mobile: "13312345678",
//     // openId: "11akshahsdgjhasgk", // 测试环境被添加的客户的openid   手机号是  13312345678
//     // userId: 177,
//     // userType: 2,
//     userType: 3, // 13121850481
//     openId: "oLgd75alq00UELpPQBHfad8h6mb0", // 测试环境刘洋的openId
//     userId: 146, // 测试环境刘洋的userId
//     token: "ef406db92c63829fd095bbc9b4c1db4f",
//     updateTime: "2019-10-18T09:29:44.000+0000",
//     userAgent: "",
//   }
// }

export default function onAction(state = defaultState, action) {
  switch (action.type) {
    case Types.CHANG_USER_INFO: // 修改用户信息
      if (!action.data) {
        return;
      }
      // if (env === 'development') {
      //   let newUserInfoData = Object.assign({}, state.userInfo)
      //   if (action.data.token) {
      //     newUserInfoData = Object.assign({}, state.userInfo, {
      //       token: action.data.token
      //     })
      //   }
      //   return {
      //     ...state,
      //     userInfo: newUserInfoData
      //   }
      // }
      const newUserInfoData = Object.assign({}, state.userInfo, action.data);
      return {
        ...state,
        userInfo: newUserInfoData,
      };
    default:
      return state;
  }
}
