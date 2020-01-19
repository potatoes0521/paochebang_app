package com.paoche56.help.utils;

import com.google.gson.Gson;

import org.apache.commons.lang3.StringUtils;

/**
 * json 帮助类
 */
public class JsonHelper {

    /**
     * 序列化为json
     * @param instance
     * @param <T>
     * @return
     */
    public static <T> String toJsonString(T instance) {
        String str = "";
        if (instance == null) {
            return str;
        }
        Gson gson = new Gson();
        str = gson.toJson(instance);
        return str;
    }

    /**
     * 反序列化
     * @param jsonString
     * @param tClass
     * @param <T>
     * @return
     */
    public static <T> T toObject(String jsonString,Class<T> tClass) {
        if (StringUtils.isBlank(jsonString)) {
            return null;
        }
        Gson gson = new Gson();
        return gson.fromJson(jsonString, tClass);
    }

}
