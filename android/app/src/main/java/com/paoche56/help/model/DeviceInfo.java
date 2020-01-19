package com.paoche56.help.model;

import java.io.PipedReader;
import java.io.Serializable;

import lombok.Data;

/**
 * 设备信息
 *
 * @author sunyueqiao
 */
@Data
public class DeviceInfo implements Serializable {
    /**
     * 应用包名
     */
    private String packageName;

    /**
     * 设备消息推送码
     */
    private String pushToken;

    /**
     * 推送消息sdk版本号
     */
    private String msgSdkVersion;

    /**
     * app版本号 code码
     */
    private String appVersionCode;

    /**
     * app版本号
     */
    private String appVersionName;

}
