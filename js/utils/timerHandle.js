/*
 * @Author: liuYang
 * @description: 各种时间处理方法
 * @Date: 2019-10-08 14:45:15
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-01-02 11:09:11
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */

/**
 * 时间操作 有参数时，时间转换成时间戳 | 无参数就是，获取现在的时间戳
 */
export const getTimeDate = times => {
  if (times) {
    return new Date(times).getTime();
  } else {
    return new Date().getTime();
  }
};
// 时间戳转换成时间
export const getDateTime = times => {
  let date = new Date(times); // 13位时间戳
  let Y = date.getFullYear() + '-';
  let M = toDou(date.getMonth() + 1) + '-';
  let D = toDou(date.getDate()) + ' ';
  let h = toDou(date.getHours()) + ':';
  let m = toDou(date.getMinutes()) + ':';
  let s = toDou(date.getSeconds());
  return Y + M + D + h + m + s;
};

// 判断两个时间戳之间，相差天数
export const VerificationTime = (opt1, opt2, num) => {
  let timever = (opt2 - opt1) / (1000 * 60 * 60 * 24);

  // 判断是否小于标准值
  if (num >= timever) {
    return true;
  } else {
    return false;
  }
};
//秒转换成分钟和小时格式
export const getVideoLength = time => {
  time = Math.round(time);
  let t;
  if (time > -1) {
    let hour = Math.floor(time / 3600);
    let min = Math.floor(time / 60) % 60;
    let sec = time % 60;
    if (hour === 0) {
      t = '';
    } else {
      if (hour < 10) {
        t = '0' + hour + ':';
      } else {
        t = hour + ':';
      }
    }
    if (min < 10) {
      t += '0';
    }
    t += min + ':';
    if (sec < 10) {
      t += '0';
    }
    t += sec;
  }
  return t;
};

// 计算两个时间戳之间相差几天 d1 不能大于d2
export const dateTimeInterval = (d1, d2) => {
  if (!d1 || !d2) {
    console.log('Error:传入参数不正确');
    return;
  }

  if (d2 < d1) {
    console.log('Error:第二个时间不能小于第一个时间');
    return;
  }

  //如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
  let dateBegin = new Date(d1); //将-转化为/，使用new Date
  let dateEnd = d2; //获取当前时间
  let dateDiff = dateEnd - dateBegin.getTime(); //时间差的毫秒数
  // let dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)); //计算出相差天数
  let leave1 = dateDiff % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
  let hours = Math.floor(leave1 / (3600 * 1000)); //计算出小时数
  //计算相差分钟数
  let leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
  let minutes = Math.floor(leave2 / (60 * 1000)); //计算相差分钟数
  //计算相差秒数
  let leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
  let seconds = Math.round(leave3 / 1000);
  let str = '';
  if (hours < 10) {
    str += '0' + hours + ':';
  } else {
    str += hours + ':';
  }

  if (minutes < 10) {
    str += '0' + minutes + ':';
  } else {
    str += minutes + ':';
  }

  if (seconds < 10) {
    str += '0' + seconds;
  } else {
    str += seconds;
  }

  return str;
};
/**
  * 获取当天时分秒的时间戳
  * @param {Number} hours 时
  * @param {Number} minutes 分
  * @param {Number} seconds 秒
  * @param {Number} milliseconds 毫秒
  * @return Number  时间戳 精确到毫秒
  *
  *
  * new Date(new Date(new Date().toLocaleDateString()).getTime());
    全世界的手机里面 就华为执行这个方法是 给个英文时间 别的全都是 2019 - 10 - 08
  *
  */
export const timestampOfDay = (
  hours = 0,
  minutes = 0,
  seconds = 0,
  milliseconds = 0,
) => {
  return new Date(
    new Date().setHours(hours, minutes, seconds, milliseconds),
  ).getTime();
};
/**
 * 函数功能描述
 * @param {Number} targetTimeStamp 目标时间戳
 * @param {Number} nowTimeStamp 第二个时间戳
 * @return {
 * day       天
 * hour      时
 * minute    分
 * second    秒
 * }
 */
export const countDown = (targetTimeStamp, nowTimeStamp) => {
  if (!targetTimeStamp || !nowTimeStamp) {
    console.log('Error:传入参数不正确');
    return;
  }

  //获取时间差
  let timeDiff = Math.round((targetTimeStamp - nowTimeStamp) / 1000);
  //获取还剩多少天
  // eslint-disable-next-line radix
  let day = parseInt(timeDiff / 3600 / 24);
  //获取还剩多少小时
  // eslint-disable-next-line radix
  let hour = toDou(parseInt((timeDiff / 3600) % 24));
  //获取还剩多少分钟
  // eslint-disable-next-line radix
  let minute = toDou(parseInt((timeDiff / 60) % 60));
  //获取还剩多少秒
  let second = toDou(timeDiff % 60);
  //输出还剩多少时间
  if (timeDiff <= 0) {
    return 0;
  } else {
    return {
      day,
      hour,
      minute,
      second,
    };
  }
};
/**
 * 转换 小于10的为 0X
 * @param {Number} time 参数描述
 * @return time
 */
const toDou = time => {
  return time > 9 ? time : '0' + time;
};
/**
 * 倒计时
 * 对象形式传参
 * 引入的地方必须定义一个 this.timer
 * 在 卸载页面的时候清除定时器
 * 如果没有开始时间那么将没有  progress  返回
 * componentWillUnmount() {
 *   clearInterval(this.timer)
 * }
 * @param {Number} targetTimeStamp 结束时间
 * @param {Number} startTimeStamp 开始时间
 * @param {Object} that this主要用来清除定时器
 * @return {
 * day       天
 * hour      时
 * minute    分
 * second    秒
 * progress  两个时间戳进行的百分比
 * }
 */
export const interValCountDown = ({targetTimeStamp, startTimeStamp, that}) => {
  if (!targetTimeStamp) {
    console.log('Error:传入参数不正确');
    return false;
  }
  clearInterval(that.timer);
  that.timer = setInterval(() => {
    let nowTime = new Date().getTime(); // 当前时间
    let num = countDown(targetTimeStamp, nowTime); // 计算时间相差多久
    let progress = 0;
    let state = {};
    if (startTimeStamp) {
      progress = timerPercent(targetTimeStamp, startTimeStamp);
      progress = progress > 100 ? 0 : progress;
      state = Object.assign({}, {progress}, state);
    }
    if (!num) {
      clearInterval(that.timer);
      state = Object.assign(
        {},
        {
          day: 0,
          hour: 0,
          minute: 0,
          second: 0,
        },
        state,
      );
    } else {
      let {day, hour, minute, second} = num;
      state = Object.assign(
        {},
        {
          day,
          hour,
          minute,
          second,
          showTips: true,
        },
        state,
      );
    }
    that.setState(state);
  }, 1000);
};

/**
 * 计算两个时间 之间的百分比
 * @param {Number || String} targetTime 目标时间 如果时间是时间戳就是Number
 * @param {Number || String} beginTime 开始时间
 * @return void
 */
export const timerPercent = (targetTime, beginTime) => {
  // (当前时间-开始时间) / (目标时间-开始时间) * 100
  let now = new Date().getTime() - new Date(beginTime).getTime();
  let target = new Date(targetTime).getTime() - new Date(beginTime).getTime();
  let percent = (now / target) * 100;
  return percent;
};
