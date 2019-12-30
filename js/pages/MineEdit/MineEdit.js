/*
 * @Author: guorui
 * @description: 我的基本信息
 * @Date: 2019-12-25 15:10:15
 * @LastEditors  : guorui
 * @LastEditTime : 2019-12-30 14:51:56
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {connect} from 'react-redux';
import NavigationBar from '../../components/NavigatorBar/NavigationBar';
import SafeAreaViewPlus from '../../components/SafeAreaViewPlus/SafeAreaViewPlus';
import DetailsStyles from '../../assets/css/DetailsStyles';
import MainStyles from '../../assets/css/MainStyles';
import Button from '../../components/Button/Button.js';
import api from '../../api';

class MineEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      realName: '',
      mobile: '',
      idCard: '',
      carType: '',
      carNum: '',
      carTypeDesc: '',
    };
    this.carTypeList = [];
  }

  componentDidMount() {
    this.getMineInfoDetails();
    this.getCarInfoType();
  }
  componentWillUnmount() {}
  /**
   * 获取用户信息详情
   * @return void
   */
  getMineInfoDetails() {}
  /**
   * 获取车辆信息类型
   * @return void
   */
  getCarInfoType() {}
  /**
   * 输入车牌号
   * @return void
   */
  inputCarNum(value) {
    this.setState({
      carNum: value,
    });
  }
  render() {
    let {realName, mobile, idCard, carNum, carTypeDesc} = this.state;
    const {theme, navigation} = this.props;
    return (
      <SafeAreaViewPlus topColor={theme.themeColor}>
        <View style={styles.pageWrapper}>
          <NavigationBar
            navigation={navigation}
            leftViewShow={true}
            title={'我的基本信息'}
          />
          <View style={MainStyles.itemWrapper}>
            <View style={[MainStyles.itemStyle, MainStyles.line]}>
              <Text style={MainStyles.titleStyle}>姓名</Text>
              <Text style={MainStyles.textStyle}>{realName || ''}</Text>
            </View>
            <View style={[MainStyles.itemStyle, MainStyles.line]}>
              <Text style={MainStyles.titleStyle}>联系方式</Text>
              <Text style={MainStyles.textStyle}>{mobile || ''}</Text>
            </View>
            <View style={[MainStyles.itemStyle, MainStyles.line]}>
              <Text style={MainStyles.titleStyle}>身份证号</Text>
              <Text style={MainStyles.textStyle}>{idCard || ''}</Text>
            </View>
            <View style={[MainStyles.itemStyle, MainStyles.line]}>
              <Text style={MainStyles.titleStyle}>车牌号</Text>
              <TextInput
                style={styles.input}
                placeholder="请输入车牌号"
                maxLength={20}
                onChangeText={this.inputCarNum.bind(this)}
                value={carNum}
              />
            </View>
            <View style={MainStyles.itemStyle}>
              <Text style={MainStyles.titleStyle}>车辆信息</Text>
              <Text style={MainStyles.textStyle}>
                {carTypeDesc || '请选择车辆类型'}
              </Text>
            </View>
          </View>
          <View style={styles.btnWrapper}>
            <Button
              btnStyle={[styles.btnStyle, DetailsStyles.btnLeft]}
              text={'取消'}
              type={'plain'}
            />
            <Button btnStyle={[styles.btnStyle]} text={'保存'} type={'round'} />
          </View>
        </View>
      </SafeAreaViewPlus>
    );
  }
}

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
  },
  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 12,
    marginTop: 35,
    height: 40,
  },
  btnStyle: {
    height: 40,
  },
  input: {
    flex: 1,
    textAlign: 'right',
    padding: 0,
  },
});

// 如果需要引入store
const mapStateToProps = state => {
  return {
    userInfo: state.user_info.userInfo,
    theme: state.theme.theme,
  };
};
export default connect(mapStateToProps)(MineEdit);
