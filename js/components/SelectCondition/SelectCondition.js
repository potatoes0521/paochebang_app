/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-01-16 13:25:56
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-01-16 19:02:30
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import GlobalStyles from '../../assets/css/GlobalStyles';
import DetailsStyle from '../../assets/css/DetailsStyle.js';
import NavigationUtils from '../../navigator/NavigationUtils';
import Button from '../../components/Button/Button';

export default class SelectCondition extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}
  navigatorTo(type) {
    console.log('type', type);
    let {from} = this.props;
    NavigationUtils.goPage(
      {
        type,
        from,
      },
      'ChooseCityPage',
    );
  }
  onCancel() {
    this.props.onCancel();
  }
  onSubmit() {
    this.props.onSubmit();
  }
  render() {
    let {sendCityName, receiveCityName} = this.props;
    const sendCityTextClassName = [DetailsStyle.contentText];
    const receiveCityTextClassName = [DetailsStyle.contentText];
    if (!sendCityName) {
      sendCityTextClassName.push(styles.disabledText);
    }
    if (!receiveCityName) {
      receiveCityTextClassName.push(styles.disabledText);
    }
    return (
      <>
        <View style={styles.drawerList}>
          <View style={[styles.drawerItem, DetailsStyle.formItem]}>
            <View style={DetailsStyle.formLabel}>
              <Text style={DetailsStyle.labelText}>发车城市:</Text>
            </View>
            <TouchableOpacity
              onPress={this.navigatorTo.bind(this, 'sendCity')}
              style={DetailsStyle.formContent}>
              <Text style={sendCityTextClassName}>
                {sendCityName || '请选择收车城市'}
              </Text>
              <Text style={DetailsStyle.iconRight}>&#xe61d;</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.drawerItem, DetailsStyle.formItem]}>
            <View style={DetailsStyle.formLabel}>
              <Text style={DetailsStyle.labelText}>收车城市:</Text>
            </View>
            <TouchableOpacity
              onPress={this.navigatorTo.bind(this, 'receiveCity')}
              style={DetailsStyle.formContent}>
              <Text style={receiveCityTextClassName}>
                {receiveCityName || '请选择收车城市'}
              </Text>
              <Text style={DetailsStyle.iconRight}>&#xe61d;</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.drawerBtn}>
          <Button
            text={'重置'}
            btnStyle={[styles.btn, styles.btnReset]}
            fontStyles={[styles.btnResetText]}
            onClick={this.onCancel.bind(this)}
            type={'plain'}
          />
          <Button
            text={'提交'}
            btnStyle={[styles.btn]}
            type={'round'}
            onClick={this.onSubmit.bind(this)}
          />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  drawerList: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  drawerItem: {
    paddingVertical: 8,
  },
  drawerBtn: {
    height: 40,
    flexDirection: 'row',
    overflow: 'hidden',
    alignItems: 'center',
  },
  btn: {
    borderRadius: 0,
    height: 40,
  },
  btnReset: {
    borderColor: '#f5f5f5',
  },
  btnResetText: {
    color: GlobalStyles.themeHColor,
  },
  disabledText: {
    color: GlobalStyles.themeDisabled,
  },
});

SelectCondition.defaultProps = {
  sendCityName: '',
  receiveCityName: '',
  from: '', // 从哪个抽屉来的
  onCancel: () => {}, // 点击了重置的时候
  onSubmit: () => {}, // 点击了提交的时候
};

SelectCondition.propTypes = {
  from: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
