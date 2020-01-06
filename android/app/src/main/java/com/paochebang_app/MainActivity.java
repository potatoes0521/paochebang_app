/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-11-22 13:51:52
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-01-06 14:05:45
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
package com.paoche56.help;

import android.os.Bundle; // here

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
import com.facebook.react.ReactActivity;

// react-native-splash-screen >= 0.3.1
import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {
  
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "paochebang_app";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    SplashScreen.show(this); // here
    super.onCreate(savedInstanceState);
  }

  /**
   * 已知兼容问题，react-navigation4x在"react-native": "0.61.0-rc.0"版本上存在createMaterialTopTabNavigator上左右滑动无效的兼容问题
   * 该问题由"react-native": "0.61.0-rc.0" 的ReactActivityDelegate的改动引起，导致createRootView不回调
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {//适配react-navigation4x
    return new ReactActivityDelegate(this, getMainComponentName()) {
      @Override
      protected ReactRootView createRootView() {
        return new RNGestureHandlerEnabledRootView(MainActivity.this);
      }
    };
  }
}
