/*
 * @Author: guorui
 * @description: 编辑、添加司机信息
 * @Date: 2019-12-26 10:36:06
 * @LastEditors  : guorui
 * @LastEditTime : 2019-12-26 11:44:52
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import NavigationBar from '../../components/NavigatorBar/NavigationBar';
import DetailsStyles from '../../assets/css/DetailsStyles';
import GlobalStyles from '../../assets/css/GlobalStyles';
import ItemStyles from '../../assets/css/ItemStyles';
import Button from '../../components/Button/Button.js';
import api from '../../api';

class DriverEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      remarkName: '',
      mobile: '',
      idCard: '',
      carType: '',
      merchantName: '',
      carNum: '',
      carTypeDesc: '',
    };
    this.carTypeList = [];
  }

  componentDidMount() {
    this.getDriverInfoDetails();
    this.chooseCarType();
  }
  componentWillUnmount() {}
  /**
   * 获取司机信息详情
   * @return void
   */
  getDriverInfoDetails() {}
  /**
   * 获取车辆信息类型
   * @return void
   */
  chooseCarType() {}
  /**
   * 输入司机姓名
   * @param {Type} value 参数描述
   * @return void
   */
  inputRemarkName(value) {
    this.setState({
      remarkName: value,
    });
  }
  /**
   * 输入司机联系方式
   * @param {Type} value 参数描述
   * @return void
   */
  inputMobile(value) {
    this.setState({
      mobile: value,
    });
  }
  /**
   * 输入司机身份证号
   * @param {Type} value 参数描述
   * @return void
   */
  inputIdCard(value) {
    this.setState({
      idCard: value,
    });
  }
  /**
   * 输入车牌号
   * @return void
   */
  inputCarNum(value) {
    this.setState({
      carNum: value,
    });
  }
  /**
   * 输入所属物流公司
   * @return void
   */
  inputMerchantName(value) {
    this.setState({
      merchantName: value,
    });
  }
  render() {
    let {
      remarkName,
      mobile,
      idCard,
      merchantName,
      carNum,
      carTypeDesc,
    } = this.state;
    const {navigation} = this.props;
    return (
      <View style={styles.pageWrapper}>
        <NavigationBar
          navigation={navigation}
          leftViewShow={true}
          title={'添加司机'}
        />
        <View style={ItemStyles.itemWrapper}>
          <View style={[ItemStyles.itemStyle, ItemStyles.line]}>
            <Text style={styles.iconStyle}>*</Text>
            <Text style={ItemStyles.titleStyle}>姓名</Text>
            <TextInput
              style={styles.input}
              placeholder="请输入司机姓名"
              maxLength="8"
              onChangeText={this.inputRemarkName.bind(this)}
              value={remarkName}
            />
          </View>
          <View style={[ItemStyles.itemStyle, ItemStyles.line]}>
            <Text style={styles.iconStyle}>*</Text>
            <Text style={ItemStyles.titleStyle}>联系方式</Text>
            <TextInput
              style={styles.input}
              placeholder="请输入司机联系方式"
              maxLength="11"
              onChangeText={this.inputMobile.bind(this)}
              value={mobile}
            />
          </View>
          <View style={[ItemStyles.itemStyle, ItemStyles.line]}>
            <Text style={styles.iconStyle}>*</Text>
            <Text style={ItemStyles.titleStyle}>身份证号</Text>
            <TextInput
              style={styles.input}
              placeholder="请输入司机身份证号"
              maxLength="20"
              onChangeText={this.inputIdCard.bind(this)}
              value={idCard}
            />
          </View>
          <View style={[ItemStyles.itemStyle, ItemStyles.line]}>
            <Text style={styles.iconStyle} />
            <Text style={ItemStyles.titleStyle}>车牌号</Text>
            <TextInput
              style={styles.input}
              placeholder="请输入车牌号"
              maxLength="20"
              onChangeText={this.inputCarNum.bind(this)}
              value={carNum}
            />
          </View>
          <View style={[ItemStyles.itemStyle, ItemStyles.line]}>
            <Text style={styles.iconStyle} />
            <Text style={ItemStyles.titleStyle}>所属物流公司</Text>
            <TextInput
              style={styles.input}
              placeholder="请输入所属物流公司"
              maxLength="20"
              onChangeText={this.inputMerchantName.bind(this)}
              value={merchantName}
            />
          </View>
          <TouchableOpacity onPress={this.chooseCarType.bind(this)}>
            <View style={ItemStyles.itemStyle}>
              <Text style={styles.iconStyle} />
              <Text style={ItemStyles.titleStyle}>车辆信息</Text>
              {carTypeDesc ? (
                <Text style={ItemStyles.textStyle}>{carTypeDesc}</Text>
              ) : (
                <Text style={ItemStyles.textStyle}>请选择车辆类型</Text>
              )}
            </View>
          </TouchableOpacity>
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
  iconStyle: {
    width: 9,
    color: GlobalStyles.themeColor,
    marginRight: 4,
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
export default connect(mapStateToProps)(DriverEdit);
