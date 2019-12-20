/*
 * @Author: liuYang
 * @description: 时间选择器
 * @path: components/DatePicker/datePicker.js
 * @Date: 2019-12-19 15:49:52
 * @LastEditors  : liuYang
 * @LastEditTime : 2019-12-19 15:52:38
 * @mustParam: 必传参数
 *  isShow 是否展示
 *  onConfirm 当提交的时候
 *  onCancel 当退出的时候
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {getDateTime} from '../../utils/timerHandle.js';
export default class DatePicker extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  handleDatePicked = date => {
    const time = getDateTime(new Date(date).getTime());
    this.props.onConfirm(time);
  };
  hideDateTimePicker = () => {
    this.props.onCancel();
  };
  render() {
    return (
      <DateTimePicker
        mode="date"
        titleIOS="选择时间"
        isVisible={this.props.isShow}
        onConfirm={this.handleDatePicked}
        onCancel={this.hideDateTimePicker}
        cancelTextIOS={'取消'}
        confirmTextIOS={'确定'}
      />
    );
  }
}

DatePicker.defaultProps = {
  isShow: false,
  onConfirm: () => {},
  onCancel: () => {},
};

DatePicker.propTypes = {
  isShow: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
