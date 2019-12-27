/*
 * @Author: guorui
 * @description: 我的基本信息
 * @Date: 2019-12-25 15:10:15
 * @LastEditors  : guorui
 * @LastEditTime : 2019-12-26 15:38:16
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {connect} from 'react-redux';
import NavigationBar from '../../components/NavigatorBar/NavigationBar';
import DetailsStyles from '../../assets/css/DetailsStyles';
import ItemStyles from '../../assets/css/ItemStyles';
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
    const {navigation} = this.props;
    return (
      <View style={styles.pageWrapper}>
        <NavigationBar
          navigation={navigation}
          leftViewShow={true}
          title={'我的基本信息'}
        />
        <View style={ItemStyles.itemWrapper}>
          <View style={[ItemStyles.itemStyle, ItemStyles.line]}>
            <Text style={ItemStyles.titleStyle}>姓名</Text>
            <Text style={ItemStyles.textStyle}>{realName || ''}</Text>
          </View>
          <View style={[ItemStyles.itemStyle, ItemStyles.line]}>
            <Text style={ItemStyles.titleStyle}>联系方式</Text>
            <Text style={ItemStyles.textStyle}>{mobile || ''}</Text>
          </View>
          <View style={[ItemStyles.itemStyle, ItemStyles.line]}>
            <Text style={ItemStyles.titleStyle}>身份证号</Text>
            <Text style={ItemStyles.textStyle}>{idCard || ''}</Text>
          </View>
          <View style={[ItemStyles.itemStyle, ItemStyles.line]}>
            <Text style={ItemStyles.titleStyle}>车牌号</Text>
            <TextInput
              style={styles.input}
              placeholder="请输入车牌号"
              onChangeText={this.inputCarNum.bind(this)}
              value={carNum}
            />
          </View>
          <View style={ItemStyles.itemStyle}>
            <Text style={ItemStyles.titleStyle}>车辆信息</Text>
            <Text style={ItemStyles.textStyle}>
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
