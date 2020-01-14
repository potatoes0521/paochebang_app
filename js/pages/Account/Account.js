/*
 * @Author: guorui
 * @description: 账户体系
 * @Date: 2019-12-25 15:25:16
 * @LastEditors  : guorui
 * @LastEditTime : 2020-01-14 19:38:14
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native';
import {connect} from 'react-redux';
import AccountItem from './components/AccountItem';
import NavigationBar from '../../components/NavigatorBar/NavigationBar';
import GlobalStyles from '../../assets/css/GlobalStyles';
import EmptyList from '../../components/EmptyList/EmptyList.js';
import BottomLoading from '../../components/BottomLoading/BottomLoading.js';
import NavigationUtil from '../../navigator/NavigationUtils';
import SafeAreaViewPlus from '../../components/SafeAreaViewPlus/SafeAreaViewPlus';
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
    this.handleEmit();
    this.getAccountList({});
    this.getAccountAmount();
    this.backPress.componentDidMount();
  }

  componentWillUnmount() {
    this.emitCashInfo.remove();
    this.backPress.componentWillUnmount();
  }
  onBackPress() {
    NavigationUtil.goBack(this.props.navigation);
    return true;
  }
  /**
   * 处理事件通知
   * @return void
   */
  handleEmit() {
    this.emitCashInfo = DeviceEventEmitter.addListener('cashInfo', () => {
      this.getAccountList({
        refresh: true,
      });
      this.getAccountAmount();
    });
  }
  /**
   * 获取账户余额
   * @return void
   */
  getAccountAmount() {
    api.account.getAccountAmount({}, this).then(res => {
      if (!res.data) {
        return;
      }
      this.setState({
        accountId: res.data.accountId,
        totalIncomeDesc: res.data.totalIncomeDesc,
        withdrawAmountDesc: res.data.withdrawAmountDesc,
        blockedAmountDesc: res.data.blockedAmountDesc,
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
    NavigationUtil.goPage({accountId: this.state.accountId}, 'CashPage');
  }
  /**
   * 获取收支明细列表
   * @return void
   */
  getAccountList({pageNum = this.accountPage, pageSize = 10, refresh = false}) {
    if (refresh) {
      this.accountFlag = false;
      this.accountPage = 1;
      pageNum = 1;
      this.setState({
        isLoading: true,
      });
    }
    if (this.accountFlag && !refresh) {
      return;
    }
    let sendData = {
      pageNum,
      pageSize,
    };
    let {accountList} = this.state;
    api.account.getAccountList(sendData, this).then(res => {
      this.setState({
        isLoading: false,
      });
      let data = res.data;
      if (!data) {
        return;
      }
      if (data && data.length < pageSize) {
        this.accountFlag = true;
      }
      this.accountPage += 1;
      if (pageNum === 1) {
        this.setState({
          accountList: [...data],
        });
      } else {
        this.setState({
          accountList: [...accountList, ...data],
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
  /**
   * item之间的分割线
   * @return void
   */
  dividingLine() {
    return <View style={styles.line} />;
  }
  render() {
    const {theme, navigation} = this.props;
    let {totalIncomeDesc, withdrawAmountDesc, blockedAmountDesc} = this.state;
    return (
      <SafeAreaViewPlus topColor={theme.themeColor}>
        <View style={styles.pageWrapper}>
          <NavigationBar
            navigation={navigation}
            leftViewShow={true}
            title={'账户体系'}
          />
          <View style={styles.accountCard}>
            <View style={styles.cardTitle}>
              <Text style={styles.titleStyle}>总收入</Text>
              <TouchableOpacity onPress={this.applyCash.bind(this)}>
                <Text style={styles.titleStyle}>申请提现</Text>
              </TouchableOpacity>
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
          <FlatList
            data={this.state.accountList}
            renderItem={data => (
              <AccountItem type={'account'} item={data.item} />
            )}
            ItemSeparatorComponent={() => this.dividingLine()}
            refreshControl={
              <RefreshControl
                title="Loading..."
                colors={[GlobalStyles.themeColor]}
                refreshing={this.state.isLoading}
                onRefresh={() => this.getAccountList({refresh: true})}
                tintColor={GlobalStyles.themeColor}
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
              return data.billId + 'account';
            }}
          />
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
    color: '#fff',
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
    color: '#fff',
    marginRight: 6,
  },
  moneyStyle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
  },
  cardTips: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  tipsStyle: {
    fontSize: 14,
    color: '#fff',
  },
  marginRight: {
    marginRight: 10,
  },
  accountTitle: {
    height: 54,
    backgroundColor: '#fff',
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
  line: {
    height: 1,
    backgroundColor: '#f5f5f5',
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
