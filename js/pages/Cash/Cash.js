/*
 * @Author: guorui
 * @description: 提现页面
 * @Date: 2019-12-26 17:05:08
 * @LastEditors  : guorui
 * @LastEditTime : 2020-01-07 15:19:00
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
  DeviceEventEmitter,
} from 'react-native';
import {connect} from 'react-redux';
import NavigationBar from '../../components/NavigatorBar/NavigationBar';
import MineStyles from '../../assets/css/MineStyles';
import GlobalStyles from '../../assets/css/GlobalStyles';
import NavigationUtil from '../../navigator/NavigationUtils';
import {handleMoney, realNamePatter} from '../../utils/patter';
import BackPressComponent from '../../components/BackPressComponent/BackPressComponent';
import Button from '../../components/Button/Button.js';
import SafeAreaViewPlus from '../../components/SafeAreaViewPlus/SafeAreaViewPlus';
import Toast from 'react-native-easy-toast';
import api from '../../api';

class CashDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      withdrawAmountDesc: 0, //账户余额
      amount: '', //提现金额
      otherSideAccountName: '', //收款人
      otherSideBank: '', //银行类型
      otherSideBranchBank: '', //支行名称
      otherSideAccount: '', //银行卡号
    };
    this.pageParams = {};
    this.toastRef = React.createRef();
    this.backPress = new BackPressComponent({
      backPress: () => this.onBackPress(),
    });
  }

  componentDidMount() {
    const {navigation} = this.props;
    const {state} = navigation;
    const {params} = state;
    console.log('params', params);
    this.pageParams = params || {};
    this.getAccountAmount();
    this.getAccountInfo();
    this.backPress.componentDidMount();
  }
  componentWillUnmount() {
    this.backPress.componentWillUnmount();
  }
  onBackPress() {
    NavigationUtil.goBack(this.props.navigation);
    return true;
  }
  /**
   * 获取账户余额
   * @return void
   */
  getAccountAmount() {
    if (!this.pageParams.accountId) {
      return;
    }
    let sendData = {
      accountId: this.pageParams.accountId,
    };
    api.account.getAccountAmount(sendData, this).then(res => {
      if (!res.data) {
        return;
      }
      this.setState({
        withdrawAmountDesc: res.data.withdrawAmountDesc,
      });
    });
  }
  /**
   * 获取账户信息
   * @return void
   */
  getAccountInfo() {
    api.account.getAccountInfo({}, this).then(res => {
      if (!res.data) {
        return;
      }
      this.setState({
        otherSideAccountName: res.data.accountHolder || '', //收款人
        otherSideAccount: res.data.accountNum || '', //银行卡号
        otherSideBank: res.data.bankName || '', //银行类型
        otherSideBranchBank: res.data.openingBank || '', //支行名称
      });
    });
  }
  /**
   * 提现金额
   * @param {Type} e 参数描述
   * @return void
   */
  cashAmountInput(value) {
    value = handleMoney(value);
    this.setState({
      amount: value,
    });
  }
  /**
   * 收款人姓名
   * @param {Type} e 参数描述
   * @return void
   */
  accountNameInput(value) {
    this.setState({
      otherSideAccountName: value,
    });
  }
  /**
   * 银行类型
   * @param {Type} e 参数描述
   * @return void
   */
  bankNameInput(value) {
    this.setState({
      otherSideBank: value,
    });
  }
  /**
   * 支行名称
   * @param {Type} e 参数描述
   * @return void
   */
  branchBankNameInput(value) {
    this.setState({
      otherSideBranchBank: value,
    });
  }
  /**
   * 银行卡号
   * @param {Type} e 参数描述
   * @return void
   */
  bankCardInput(value) {
    this.setState({
      otherSideAccount: value,
    });
  }
  /**
   * 全部提现
   * @return void
   */
  cashAccountAmount() {
    this.setState({
      amount: this.state.withdrawAmountDesc,
    });
  }

  /**
   * 提交
   * @return void
   */
  cashSubmit() {
    let {
      amount,
      otherSideAccountName,
      otherSideBank,
      otherSideAccount,
      otherSideBranchBank,
    } = this.state;
    if (!Number(amount)) {
      this.toastRef.current.show('请输入正确的金额格式');
      return;
    }
    if (!amount) {
      this.toastRef.current.show('提现金额不能为空');
      return;
    }
    if (+amount <= 0) {
      this.toastRef.current.show('提现金额不能小于或等于0');
      return;
    }
    if (+amount > +this.state.withdrawAmountDesc) {
      this.toastRef.current.show('提现金额不能大于账户余额');
      return;
    }
    if (!realNamePatter.test(otherSideAccountName)) {
      this.toastRef.current.show('收款人姓名格式不对');
      return;
    }
    if (!otherSideBank) {
      this.toastRef.current.show('银行卡类型不能为空');
      return;
    }
    if (!otherSideAccount) {
      this.toastRef.current.show('银行卡号不能为空');
      return;
    }
    let sendData = {
      accountId: this.pageParams.accountId,
      amount: amount * 100,
      otherSideAccountName,
      otherSideBank,
      otherSideAccount,
      otherSideBranchBank,
    };
    api.account.getWithdrawData(sendData, this).then(res => {
      this.toastRef.current.show('提现申请成功');
      DeviceEventEmitter.emit('cashInfo', sendData);
      setTimeout(() => {
        NavigationUtil.goBack(this.props.navigation);
      }, 1800);
    });
  }
  render() {
    let {
      withdrawAmountDesc,
      amount,
      otherSideAccountName,
      otherSideBank,
      otherSideBranchBank,
      otherSideAccount,
    } = this.state;
    const {theme, navigation} = this.props;
    return (
      <SafeAreaViewPlus topColor={theme.themeColor}>
        <View style={styles.pageWrapper}>
          <NavigationBar
            navigation={navigation}
            leftViewShow={true}
            title={'提现'}
          />
          <View style={styles.cashWrapper}>
            <View style={styles.cashDetails}>
              <Text style={styles.iconStyle}>*</Text>
              <Text style={MineStyles.contentText}>提现金额</Text>
              <TextInput
                style={styles.input}
                placeholder="请输入提现金额"
                keyboardType={'numeric'}
                onChangeText={this.cashAmountInput.bind(this)}
                value={amount}
              />
              <Text style={MineStyles.contentText}>元</Text>
            </View>
            <View style={styles.tipsWrapper}>
              <Text style={styles.tipsText}>
                账户余额{withdrawAmountDesc || 0}元
              </Text>
              <TouchableOpacity onPress={this.cashAccountAmount.bind(this)}>
                <Text style={styles.tipsBtn}>全部提现</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.bankWrapper}>
            <View style={styles.cashDetails}>
              <Text style={styles.iconStyle}>*</Text>
              <Text style={MineStyles.contentText}>收款人姓名</Text>
              <TextInput
                style={styles.input}
                placeholder="请输入收款人姓名"
                maxLength={8}
                onChangeText={this.accountNameInput.bind(this)}
                value={otherSideAccountName}
              />
            </View>
            <View style={styles.cashDetails}>
              <Text style={styles.iconStyle}>*</Text>
              <Text style={MineStyles.contentText}>银行卡号</Text>
              <TextInput
                style={styles.input}
                placeholder="请输入银行卡号"
                maxLength={20}
                onChangeText={this.bankCardInput.bind(this)}
                value={otherSideAccount}
              />
            </View>
            <View style={styles.cashDetails}>
              <Text style={styles.iconStyle}>*</Text>
              <Text style={MineStyles.contentText}>银行类型</Text>
              <TextInput
                style={styles.input}
                placeholder="请输入银行类型"
                maxLength={20}
                onChangeText={this.bankNameInput.bind(this)}
                value={otherSideBank}
              />
            </View>
            <View style={styles.cashDetails}>
              <Text style={styles.iconStyle} />
              <Text style={MineStyles.contentText}>支行名称</Text>
              <TextInput
                style={styles.input}
                placeholder="请输入支行名称"
                maxLength={20}
                onChangeText={this.branchBankNameInput.bind(this)}
                value={otherSideBranchBank}
              />
            </View>
          </View>
          <View style={styles.btnWrapper}>
            <Button
              btnStyle={[styles.btnStyle]}
              text={'提交'}
              type={'round'}
              onClick={this.cashSubmit.bind(this)}
            />
          </View>
          <Toast
            ref={this.toastRef}
            position={'center'}
            defaultCloseDelay={3000}
          />
        </View>
      </SafeAreaViewPlus>
    );
  }
}

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  cashWrapper: {
    marginVertical: 10,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  cashDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  tipsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  tipsText: {
    fontSize: 13,
    color: GlobalStyles.themeDisabled,
  },
  tipsBtn: {
    fontSize: 13,
    color: GlobalStyles.themeColor,
  },
  bankWrapper: {
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 12,
    marginTop: 35,
    height: 40,
  },
  btnStyle: {
    // height: 40,
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
export default connect(mapStateToProps)(CashDetails);
