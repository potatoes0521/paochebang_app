/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-03-25 15:12:32
 * @LastEditors: liuYang
 * @LastEditTime: 2020-03-25 17:26:59
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import GlobalStyles from '../../assets/css/GlobalStyles';
import NavigationUtil from '../../navigator/NavigationUtils';
import BackPressComponent from '../../components/BackPressComponent/BackPressComponent';
import NavigationBar from '../../components/NavigatorBar/NavigationBar';
import SafeAreaViewPlus from '../../components/SafeAreaViewPlus/SafeAreaViewPlus';
import api from '../../api';

class Agreement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agreementsParagraphList: [], //协议内容，weight:0  字体加粗， weight:1 字体不加错
      agreementsMainList: [],
      pageTitle: '注册服务协议',
    };
    this.backPress = new BackPressComponent({
      backPress: () => this.onBackPress(),
    });
  }

  componentDidMount() {
    const {navigation} = this.props;
    const {state} = navigation;
    const {params} = state;
    console.log('params', params);
    this.handleShow(params);
    this.backPress.componentDidMount();
  }

  componentWillUnmount() {
    this.backPress.componentWillUnmount();
  }

  onBackPress() {
    NavigationUtil.goBack(this.props.navigation);
    return true;
  }
  handleShow(params) {
    if (params.type === 'register') {
      this.getAgreementFile();
    } else {
      this.setState({
        pageTitle: '隐私协议',
      });
      this.getPrivacyProtocolFile();
    }
  }
  /**
   * 获取注册协议
   * @return void
   */
  getAgreementFile() {
    api.user.getAgreementFile({}, this).then(res => {
      if (!res) {
        return;
      }
      this.setState({
        agreementsMainList: res.main,
        agreementsParagraphList: res.paragraph,
      });
    });
  }
  /**
   * 获取注册协议
   * @return void
   */
  getPrivacyProtocolFile() {
    api.user.getPrivacyProtocolFile({}, this).then(res => {
      if (!res) {
        return;
      }
      this.setState({
        agreementsMainList: res.main,
        agreementsParagraphList: res.paragraph,
      });
    });
  }
  render() {
    const {theme, navigation} = this.props;
    let {agreementsMainList, agreementsParagraphList, pageTitle} = this.state;
    const agreementsParagraphListR =
      agreementsParagraphList &&
      agreementsParagraphList.map(item => (
        <Text style={[styles.paragraph, styles.agreementsFont]} key={item}>
          {item.text}
        </Text>
      ));
    const agreementsList =
      agreementsMainList &&
      agreementsMainList.map((item, index) => {
        const textClassName = [styles.agreementsFont];
        if (item.weight === '1') {
          textClassName.push(styles.agreementsFontBold);
        }
        return (
          <Text style={textClassName} key={index}>
            {item.text}
          </Text>
        );
      });
    return (
      <SafeAreaViewPlus topColor={theme.themeColor}>
        <View style={styles.pageWrapper}>
          <NavigationBar
            navigation={navigation}
            leftViewShow={true}
            title={pageTitle}
          />
          <ScrollView>
            <View style={styles.mainWrapper}>
              <Text style={styles.agreementsTitle}>跑车帮用户{pageTitle}</Text>
              <View style={styles.agreementsContent}>
                {agreementsParagraphListR}
                {agreementsList}
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaViewPlus>
    );
  }
}

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
  },
  mainWrapper: {
    paddingHorizontal: 20,
  },
  agreementsTitle: {
    fontSize: 18,
    lineHeight: 40,
    fontWeight: '700',
    color: GlobalStyles.themeFontColor,
    textAlign: 'center',
  },
  line: {
    height: 1,
    marginVertical: 14,
    backgroundColor: '#F5F5F5',
  },
  agreementsContent: {
    flex: 1,
  },
  agreementBtn: {
    height: 40,
    marginTop: 16,
  },
  agreementsButton: {
    flex: 1,
  },
  paragraph: {
    marginBottom: 10,
    lineHeight: 22,
  },
  agreementsFont: {
    color: GlobalStyles.themeTipColor,
    textAlign: 'justify',
    lineHeight: 22,
  },
  agreementsFontBold: {
    fontWeight: '700',
    color: GlobalStyles.themeFontColor,
  },
});
// 如果需要引入store
const mapStateToProps = state => {
  return {
    userInfo: state.user_info.userInfo,
    theme: state.theme.theme,
  };
};
export default connect(mapStateToProps)(Agreement);
