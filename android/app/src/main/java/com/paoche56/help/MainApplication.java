/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2019-12-31 09:16:47
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-01-17 15:29:31
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
package com.paoche56.help;

import android.app.Application;
import android.app.Notification;
import android.content.Context;
import android.os.Handler;
import android.widget.RemoteViews;
import android.widget.Toast;

import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import java.lang.reflect.InvocationTargetException;
import java.util.List;

import com.umeng.commonsdk.UMConfigure;
import com.umeng.message.IUmengRegisterCallback;
import com.umeng.message.MsgConstant;
import com.umeng.message.PushAgent;
import com.umeng.message.UTrack;
import com.umeng.message.UmengMessageHandler;
import com.umeng.socialize.PlatformConfig;
import com.umeng.message.UmengNotificationClickHandler;
// import com.umeng.message.common.UmLog;
import com.paoche56.help.DplusReactPackage;
import com.paoche56.help.RNUMConfigure;
import com.umeng.message.entity.UMessage;


public class MainApplication extends Application implements ReactApplication {
  
  private Handler handler;

  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // packages.add(new MyReactNativePackage());
          packages.add(new DplusReactPackage());
          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }
      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    initializeFlipper(this); // Remove this line if you don't want Flipper enabled
    RNUMConfigure.init(
        this, 
        "5e12cd72570df3ca7e0001bb", 
        "Umeng",
        UMConfigure.DEVICE_TYPE_PHONE,
        "777abbd3b2d0fb269801aa579d96f08f"
    );
    PushAgent.getInstance(this).register(new IUmengRegisterCallback() {
      @Override
      public void onSuccess(String deviceToken) {
        // UmLog.i(TAG, "device token: " + deviceToken);
        android.util.Log.e("xxxxxx", "onPause=");
      }

      @Override
      public void onFailure(String s, String s1) {
        android.util.Log.e("xxxxxx", "onPause2=");
      }
    });
    // initUpush();
  }
  
  /**
   * Loads Flipper in React Native templates.
   *
   * @param context
   */
  private static void initializeFlipper(Context context) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         * We use reflection here to pick up the class that initializes Flipper, since
         * Flipper library is not available in release mode
         */
        Class<?> aClass = Class.forName("com.facebook.flipper.ReactNativeFlipper");
        aClass.getMethod("initializeFlipper", Context.class).invoke(null, context);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }

  private void initUpush() {
    android.util.Log.e("xxxxxx","11111=");
    PushAgent mPushAgent = PushAgent.getInstance(this);
    handler = new Handler(getMainLooper());

    // sdk开启通知声音
    mPushAgent.setNotificationPlaySound(MsgConstant.NOTIFICATION_PLAY_SDK_ENABLE);
    // sdk关闭通知声音
    // mPushAgent.setNotificationPlaySound(MsgConstant.NOTIFICATION_PLAY_SDK_DISABLE);
    // 通知声音由服务端控制
    // mPushAgent.setNotificationPlaySound(MsgConstant.NOTIFICATION_PLAY_SERVER);
    // mPushAgent.setNotificationPlayLights(MsgConstant.NOTIFICATION_PLAY_SDK_DISABLE);
    // mPushAgent.setNotificationPlayVibrate(MsgConstant.NOTIFICATION_PLAY_SDK_DISABLE);

    UmengMessageHandler messageHandler = new UmengMessageHandler() {
      /**
       * 自定义消息的回调方法
       */
      @Override
      public void dealWithCustomMessage(final Context context, final UMessage msg) {

        handler.post(new Runnable() {

          @Override
          public void run() {
            // TODO Auto-generated method stub
            // 对自定义消息的处理方式，点击或者忽略
            boolean isClickOrDismissed = true;
            if (isClickOrDismissed) {
              // 自定义消息的点击统计
              UTrack.getInstance(getApplicationContext()).trackMsgClick(msg);
            } else {
              // 自定义消息的忽略统计
              UTrack.getInstance(getApplicationContext()).trackMsgDismissed(msg);
            }
            Toast.makeText(context, msg.custom, Toast.LENGTH_LONG).show();
          }
        });
      }

      /**
       * 自定义通知栏样式的回调方法
       */
      // @Override
      // public Notification getNotification(Context context, UMessage msg) {
      //   switch (msg.builder_id) {
      //   case 1:
      //     Notification.Builder builder = new Notification.Builder(context);
      //     RemoteViews myNotificationView = new RemoteViews(context.getPackageName(), R.layout.notification_view);
      //     myNotificationView.setTextViewText(R.id.notification_title, msg.title);
      //     myNotificationView.setTextViewText(R.id.notification_text, msg.text);
      //     myNotificationView.setImageViewBitmap(R.id.notification_large_icon, getLargeIcon(context, msg));
      //     myNotificationView.setImageViewResource(R.id.notification_small_icon, getSmallIconId(context, msg));
      //     builder.setContent(myNotificationView).setSmallIcon(getSmallIconId(context, msg)).setTicker(msg.ticker)
      //         .setAutoCancel(true);

      //     return builder.getNotification();
      //   default:
      //     // 默认为0，若填写的builder_id并不存在，也使用默认。
      //     return super.getNotification(context, msg);
      //   }
      // }
    };
    mPushAgent.setMessageHandler(messageHandler);

    /**
     * 自定义行为的回调处理，参考文档：高级功能-通知的展示及提醒-自定义通知打开动作
     * UmengNotificationClickHandler是在BroadcastReceiver中被调用，故
     * 如果需启动Activity，需添加Intent.FLAG_ACTIVITY_NEW_TASK
     */
    UmengNotificationClickHandler notificationClickHandler = new UmengNotificationClickHandler() {
      @Override
      public void dealWithCustomAction(Context context, UMessage msg) {
        Toast.makeText(context, msg.custom, Toast.LENGTH_LONG).show();
      }
    };
    // 使用自定义的NotificationHandler，来结合友盟统计处理消息通知，参考http://bbs.umeng.com/thread-11112-1-1.html
    // CustomNotificationHandler notificationClickHandler = new
    // CustomNotificationHandler();
    mPushAgent.setNotificationClickHandler(notificationClickHandler);

    // 注册推送服务 每次调用register都会回调该接口
    mPushAgent.register(new IUmengRegisterCallback() {
      @Override
      public void onSuccess(String deviceToken) {
        // UmLog.i(TAG, "device token: " + deviceToken);
        android.util.Log.e("xxxxxx","onPause=");
      }

      @Override
      public void onFailure(String s, String s1) {
        android.util.Log.e("xxxxxx","onPause2=");
      }
    });
    
    // PushAgent.getInstance(this).onAppStart();
  }
  
  {
    PlatformConfig.setWeixin("wx13cce845934fd75d", "c34d75cd89954c72d783930609eb5fcf");
  }
}
