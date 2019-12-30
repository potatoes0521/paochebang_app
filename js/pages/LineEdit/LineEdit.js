/*
 * @Author: guorui
 * @description: 添加编辑路线
 * @Date: 2019-12-30 09:35:08
 * @LastEditors  : guorui
 * @LastEditTime : 2019-12-30 11:04:10
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {connect} from 'react-redux';
import api from '../../api';
import Actions from '../../store/action/index.js';
import Button from '../../components/Button/Button.js';
import GlobalStyles from '../../assets/css/GlobalStyles';
import NavigationUtil from '../../navigator/NavigationUtils';
import BackPressComponent from '../../components/BackPressComponent/BackPressComponent';
import SafeAreaViewPlus from '../../components/SafeAreaViewPlus/SafeAreaViewPlus';
import NavigationBar from '../../components/NavigatorBar/NavigationBar';
import Toast from 'react-native-easy-toast';

class LineEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sendCityId: '',
      sendCityName: '北京', //发车城市
      receiveCityId: '',
      receiveCityName: '', //收车城市
    };
    this.pageParams = {};
    this.backPress = new BackPressComponent({
      backPress: () => this.onBackPress(),
    });
    this.toastRef = React.createRef();
  }

  componentDidMount() {
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
   * 添加线路
   * @return void
   */
  addNewLine() {
    let {sendCityId, receiveCityId} = this.state;
    if (!sendCityId) {
      this.toastRef.current.show('请选择始发城市');
      return;
    }
    if (!receiveCityId) {
      this.toastRef.current.show('请选择目的城市');
      return;
    }
    let sendData = {
      fromCityId: sendCityId,
      toCityId: receiveCityId,
      driverId: this.props.userInfo.userId,
    };
    if (this.pageParams.pageType === 'edit') {
      sendData.lineId = this.pageParams.lineId;
    }
    api.line.addLine(sendData, this).then(() => {
      if (this.pageParams.pageType === 'edit') {
        this.toastRef.current.show('编辑成功');
      }
      this.toastRef.current.show('添加成功');
    });
  }

  render() {
    const {theme, navigation} = this.props;
    let {sendCityName, receiveCityName} = this.state;
    return (
      <SafeAreaViewPlus topColor={theme.themeColor}>
        <View style={styles.pageWrapper}>
          <NavigationBar
            navigation={navigation}
            leftViewShow={true}
            title={'常跑线路'}
          />
          <View style={styles.contentWrapper}>
            <View style={styles.cityWrapper}>
              <View style={styles.chooseCity}>
                <Text style={styles.titleStyle}>始发地：</Text>
                {sendCityName ? (
                  <Text style={[styles.titleStyle, styles.chooseCityName]}>
                    {sendCityName}
                  </Text>
                ) : (
                  <Text style={styles.cityStyle}>请选择始发城市</Text>
                )}
                <Text style={styles.iconStyle}>&#xe61d;</Text>
              </View>
              <View style={styles.chooseCity}>
                <Text style={styles.titleStyle}>目的地：</Text>
                {receiveCityName ? (
                  <Text style={[styles.titleStyle, styles.chooseCityName]}>
                    {receiveCityName}
                  </Text>
                ) : (
                  <Text style={styles.cityStyle}>请选择目的城市</Text>
                )}
                <Text style={styles.iconStyle}>&#xe61d;</Text>
              </View>
            </View>
            <View style={styles.registerBtn}>
              <Button
                btnStyle={[styles.btnWrapper]}
                type={'round'}
                text={'完成'}
                onClick={this.addNewLine.bind(this)}
              />
            </View>
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
  },
  contentWrapper: {
    paddingHorizontal: 12,
  },
  chooseCity: {
    paddingHorizontal: 8,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chooseCityName: {
    flex: 1,
    textAlign: 'right',
  },
  titleStyle: {
    width: 60,
    fontSize: 15,
    fontWeight: '700',
    color: GlobalStyles.themeFontColor,
  },
  cityStyle: {
    flex: 1,
    fontSize: 15,
    textAlign: 'right',
    color: GlobalStyles.themeDisabled,
  },
  iconStyle: {
    width: 12,
    fontFamily: 'iconfont',
    marginLeft: 5,
    color: GlobalStyles.themeDisabled,
    fontSize: 12,
  },
  registerBtn: {
    paddingHorizontal: 8,
    height: 40,
    marginTop: 36,
  },
  btnWrapper: {
    height: 40,
    backgroundColor: GlobalStyles.themeColor,
    borderRadius: 4,
    fontSize: 16,
    fontWeight: '700',
    color: GlobalStyles.backgroundColor,
  },
});
// 如果需要引入store
const mapStateToProps = state => {
  return {
    userInfo: state.user_info.userInfo,
    theme: state.theme.theme,
  };
};
export default connect(mapStateToProps)(LineEdit);
