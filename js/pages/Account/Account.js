/*
 * @Author: guorui
 * @description: 账户体系
 * @Date: 2019-12-25 15:25:16
 * @LastEditors  : guorui
 * @LastEditTime : 2019-12-26 17:03:42
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, RefreshControl} from 'react-native';
import {connect} from 'react-redux';
import AccountItem from './components/AccountItem';
import NavigationBar from '../../components/NavigatorBar/NavigationBar';
import GlobalStyles from '../../assets/css/GlobalStyles';
import EmptyList from '../../components/EmptyList/EmptyList.js';
import BottomLoading from '../../components/BottomLoading/BottomLoading.js';
import NavigationUtil from '../../navigator/NavigationUtils';
import BackPressComponent from '../../components/BackPressComponent/BackPressComponent';
import api from '../../api';
import Toast from 'react-native-easy-toast';

class AccountDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountId: '', //账户id
      totalIncomeDesc: 0, //总收入
      withdrawAmountDesc: 0, //账户余额
      blockedAmountDesc: 0, //冻结金额
      accountList: [], //账单收支列表
      isLoading: false,
    };
    this.accountPage = 1;
    this.accountFlag = false;
    this.toastRef = React.createRef();
    this.backPress = new BackPressComponent({
      backPress: () => this.onBackPress(),
    });
  }

  componentDidMount() {
    // this.getAccountList();
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
    api.account.getAccountAmount({}, this).then(res => {
      this.setState({
        accountId: res.accountId,
        totalIncomeDesc: res.totalIncomeDesc,
        withdrawAmountDesc: res.withdrawAmountDesc,
        blockedAmountDesc: res.blockedAmountDesc,
      });
    });
  }
  /**
   * 提现
   * @return void
   */
  applyCash() {
    if (this.state.withdrawAmountDesc <= 0) {
      this.toastRef.current.show('亲,您没有可提现余额哦~');
      return;
    }
    NavigationUtil.goPage(this.state.accountId, 'CashPage');
  }
  /**
   * 获取收支明细列表
   * @return void
   */
  /**
   * 获取账户明细列表
   * @return void
   */
  getAccountList(pageNum = 1, pageSize = 10) {
    let sendData = {
      pageNum,
      pageSize,
    };
    let {accountList} = this.state;
    api.account.getAccountList(sendData, this).then(res => {
      if (res && res.length < pageSize) {
        this.accountFlag = true;
      }
      this.accountPage += 1;
      if (pageNum === 1) {
        this.setState({
          accountList: [...res],
        });
      } else {
        this.setState({
          accountList: [...accountList, ...res],
        });
      }
    });
  }
  genIndicator() {
    let {accountList} = this.state;
    return accountList && accountList.length > 10 && !this.accountFlag ? (
      <BottomLoading />
    ) : null;
  }
  render() {
    const {navigation} = this.props;
    let {totalIncomeDesc, withdrawAmountDesc, blockedAmountDesc} = this.state;
    return (
      <View style={styles.pageWrapper}>
        <NavigationBar
          navigation={navigation}
          leftViewShow={true}
          title={'账户体系'}
        />
        <View style={styles.accountWrapper}>
          <View style={styles.accountCard}>
            <View style={styles.cardTitle}>
              <Text style={styles.titleStyle}>总收入</Text>
              <Text
                style={styles.titleStyle}
                onPress={this.applyCash.bind(this)}>
                申请提现
              </Text>
            </View>
            <View style={styles.cardMoney}>
              <Text style={styles.iconStyle}>￥</Text>
              <Text style={styles.moneyStyle}>{totalIncomeDesc}</Text>
            </View>
            <View style={styles.cardTips}>
              <Text style={[styles.tipsStyle, styles.marginRight]}>余额</Text>
              <Text style={styles.tipsStyle}>￥</Text>
              <Text style={[styles.tipsStyle, styles.marginRight]}>
                {withdrawAmountDesc}
              </Text>
              <Text style={[styles.tipsStyle, styles.marginRight]}>
                其中冻结金额
              </Text>
              <Text style={styles.tipsStyle}>￥</Text>
              <Text style={styles.tipsStyle}>{blockedAmountDesc}</Text>
            </View>
          </View>
          <View style={styles.accountTitle}>
            <Text style={styles.detailsTitle}>收支明细</Text>
          </View>
          <View style={styles.cashDetails}>
            <FlatList
              data={this.state.accountList}
              renderItem={data => <AccountItem type={'account'} item={data} />}
              refreshControl={
                <RefreshControl
                  title="Loading..."
                  colors={[GlobalStyles.themeColor]}
                  refreshing={this.state.isLoading}
                  onRefresh={() => this.getAccountList({refresh: true})}
                  tintColor={GlobalStyles.themeColor}
                  titleColor={GlobalStyles.themeTipColor}
                />
              }
              ListFooterComponent={() => this.genIndicator()}
              onEndReached={() => {
                this.getAccountList.bind(this, {});
              }}
              ListEmptyComponent={() => (
                <EmptyList {...this.props} pageType={'account'} />
              )}
              keyExtractor={data => {
                return data.accountId + 'account';
              }}
            />
          </View>
        </View>
        <Toast
          ref={this.toastRef}
          position={'center'}
          defaultCloseDelay={3000}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  accountCard: {
    marginHorizontal: 12,
    marginVertical: 10,
    backgroundColor: GlobalStyles.themeColor,
    height: 128,
    borderRadius: 4,
    paddingTop: 10,
    paddingHorizontal: 12,
  },
  cardTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleStyle: {
    fontSize: 15,
    fontWeight: '700',
    color: GlobalStyles.backgroundColor,
  },
  cardMoney: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 5,
    marginBottom: 10,
  },
  iconStyle: {
    fontSize: 18,
    color: GlobalStyles.backgroundColor,
    marginRight: 6,
  },
  moneyStyle: {
    fontSize: 28,
    fontWeight: '700',
    color: GlobalStyles.backgroundColor,
  },
  cardTips: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  tipsStyle: {
    fontSize: 14,
    color: GlobalStyles.backgroundColor,
  },
  marginRight: {
    marginRight: 10,
  },
  accountTitle: {
    height: 54,
    backgroundColor: GlobalStyles.backgroundColor,
    paddingVertical: 16,
    paddingLeft: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  detailsTitle: {
    fontSize: 15,
    color: GlobalStyles.themeFontColor,
    fontWeight: '700',
  },
  cashDetails: {
    paddingHorizontal: 24,
  },
});

// 如果需要引入store
const mapStateToProps = state => {
  return {
    userInfo: state.user_info.userInfo,
    theme: state.theme.theme,
  };
};
export default connect(mapStateToProps)(AccountDetails);