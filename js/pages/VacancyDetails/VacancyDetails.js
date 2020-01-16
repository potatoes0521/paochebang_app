/*
 * @Author: liuYang
 * @description: 空位详情
 * @path: 引入路径
 * @Date: 2019-12-24 11:48:37
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-01-16 18:11:42
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Linking,
  DeviceEventEmitter,
} from 'react-native';
import {connect} from 'react-redux';
// import GlobalStyles from '../../assets/css/GlobalStyles';
import DetailsStyle from '../../assets/css/DetailsStyle';
import NavigationUtil from '../../navigator/NavigationUtils';
import BackPressComponent from '../../components/BackPressComponent/BackPressComponent';
import NavigationBar from '../../components/NavigatorBar/NavigationBar';
import SafeAreaViewPlus from '../../components/SafeAreaViewPlus/SafeAreaViewPlus';
import api from '../../api/index.js';
import Button from '../../components/Button/Button.js';
import Toast from 'react-native-easy-toast';

class VacancyDetsils extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vacantAmount: '', // 空位数
      dueTime: '', // 有效期
      isActive: 1, // 订单状态
      price: '', // 价格
      returnPrice: '',
      pubTime: '', // 发布时间
      receiveCityName: '', // 收车城市
      remarks: '', // 备注
      sendCityName: '', // 发车城市
      throughCitys: '', // 途经城市
      startTime: '', // 发车时间
      vacantPalletId: '', // 空位信息ID
      isEdit: '', // 是否可编辑
      usedType: '', // 车辆性质
    };
    this.backPress = new BackPressComponent({
      backPress: () => this.onBackPress(),
    });
    this.toastRef = React.createRef();
  }

  componentDidMount() {
    const {navigation} = this.props;
    const {state} = navigation;
    const {params} = state;
    console.log('params', params);
    this.pageParams = params || {};
    this.getVacancyDetail();
    this.handleEmit();
    this.backPress.componentDidMount();
  }

  componentWillUnmount() {
    this.emitRefresh.remove();
    this.backPress.componentWillUnmount();
  }
  handleEmit() {
    this.emitRefresh = DeviceEventEmitter.addListener(
      'refreshVacancyDetails',
      () => {
        this.getVacancyDetail();
      },
    );
  }
  onBackPress() {
    NavigationUtil.goBack(this.props.navigation);
    return true;
  }
  /**
   * 获取空位详情
   * @return void
   */
  getVacancyDetail() {
    if (!this.pageParams.vacantPalletId) {
      this.toastRef.current.show('缺少vacantPalletId或vacantPalletCode');
      return;
    }
    let sendData = {
      id: this.pageParams.vacantPalletId,
    };
    api.vacancy.getVacancyDetail(sendData, this).then(res => {
      if (!res.data) {
        return;
      }
      let data = Object.assign({}, res.data, {
        throughCitys: {
          cityName: res.throughCitiesName || '',
          cityId: res.throughCitys,
        },
      });
      this.setState(data);
    });
  }
  /**
   * 立即联系
   * @return void
   */
  callHim() {
    const tel = `tel:${this.state.mobile}`;
    if (this.state.isActive !== 1) {
      return;
    }
    Linking.canOpenURL(tel)
      .then(supported => {
        if (!supported) {
          console.log('Can not handle tel:' + tel);
        } else {
          return Linking.openURL(tel);
        }
      })
      .catch(error => console.log('tel error', error));
  }
  /**
   * 下架
   * @return void
   */
  pullOff() {
    if (this.state.isActive !== 1) {
      return;
    }
    let sendData = {
      vacantPalletId: this.state.vacantPalletId,
    };
    api.vacancy.vacancyDataPullOff(sendData, this).then(() => {
      this.toastRef.current.show('下架成功');
      DeviceEventEmitter.emit('refreshVacancy');
      setTimeout(() => {
        NavigationUtil.goBack(this.props.navigation);
      }, 1800);
    });
  }
  navigatorEdit() {
    let params = Object.assign({}, this.pageParams, {pageType: 'edit'});
    NavigationUtil.goPage(params, 'VacancyPublishPage');
  }
  render() {
    const {theme, navigation} = this.props;
    let {
      vacantAmount,
      dueTime,
      isActive,
      returnPrice,
      throughCitys,
      receiveCityName,
      remarks,
      sendCityName,
      startTime,
      isEdit,
    } = this.state;
    let textClassName = [DetailsStyle.contentText];
    if (isActive !== 1) {
      textClassName.push(DetailsStyle.textThemeDisabled);
    }
    let labelTextClassName = [DetailsStyle.contentText];
    if (isActive !== 1) {
      labelTextClassName.push(DetailsStyle.textThemeDisabled);
    }
    let pullOffClassName = [DetailsStyle.btnRight];
    if (isActive !== 1) {
      pullOffClassName.push(DetailsStyle.borderDisabled);
    }
    let pullOffBtnTextClassName = [];
    if (isActive !== 1) {
      pullOffBtnTextClassName.push(DetailsStyle.textThemeDisabled);
    }
    return (
      <SafeAreaViewPlus topColor={theme.themeColor}>
        <View style={styles.pageWrapper}>
          <NavigationBar
            navigation={navigation}
            leftViewShow={true}
            rightViewShow={true}
            title={'空位详情'}
          />
          <ScrollView>
            <View style={DetailsStyle.card}>
              {/* 发车城市 */}
              <View style={DetailsStyle.formItem}>
                <View style={DetailsStyle.formLabel}>
                  <Text style={labelTextClassName}>发车城市:</Text>
                </View>
                <View style={DetailsStyle.formContent}>
                  <Text style={textClassName}>{sendCityName || ''}</Text>
                </View>
              </View>
              {/* 收车城市 */}
              <View style={DetailsStyle.formItem}>
                <View style={DetailsStyle.formLabel}>
                  <Text style={labelTextClassName}>收车城市:</Text>
                </View>
                <View style={DetailsStyle.formContent}>
                  <Text style={textClassName}>{receiveCityName || ''}</Text>
                </View>
              </View>
              {/* 途经城市 */}
              {throughCitys && throughCitys.cityName ? (
                <View style={DetailsStyle.formItem}>
                  <View style={DetailsStyle.formLabel}>
                    <Text style={labelTextClassName}>途经城市:</Text>
                  </View>
                  <View style={DetailsStyle.formContent}>
                    <Text style={textClassName}>
                      {throughCitys.cityName || ''}
                    </Text>
                  </View>
                </View>
              ) : null}
              {/* 出发时间 */}
              <View style={DetailsStyle.formItem}>
                <View style={DetailsStyle.formLabel}>
                  <Text style={labelTextClassName}>出发时间:</Text>
                </View>
                <View style={DetailsStyle.formContent}>
                  <Text style={textClassName}>
                    {startTime.split('T')[0] || ''}
                  </Text>
                </View>
              </View>
              {/* 余位 */}
              <View style={DetailsStyle.formItem}>
                <View style={DetailsStyle.formLabel}>
                  <Text style={labelTextClassName}>余位:</Text>
                </View>
                <View style={DetailsStyle.formContent}>
                  <Text style={textClassName}>{vacantAmount || '0'}</Text>
                </View>
              </View>
              {/* 有效期至 */}
              <View style={DetailsStyle.formItem}>
                <View style={DetailsStyle.formLabel}>
                  <Text style={labelTextClassName}>有效期至:</Text>
                </View>
                <View style={DetailsStyle.formContent}>
                  <Text style={textClassName}>
                    {dueTime.split('T')[0] || ''}
                  </Text>
                </View>
              </View>
              {/* 报价 */}
              <View style={DetailsStyle.formItem}>
                <View style={DetailsStyle.formLabel}>
                  <Text style={labelTextClassName}>报价:</Text>
                </View>
                <View style={DetailsStyle.formContent}>
                  <Text style={textClassName}>{returnPrice || '价格私聊'}</Text>
                </View>
              </View>
              {/* 备注 */}
              {remarks ? (
                <View style={DetailsStyle.formItem}>
                  <View style={DetailsStyle.formLabel}>
                    <Text style={labelTextClassName}>备注:</Text>
                  </View>
                  <View
                    style={[
                      DetailsStyle.formContent,
                      DetailsStyle.moreTextFormItem,
                    ]}>
                    <Text style={textClassName}>{remarks || ''}</Text>
                  </View>
                </View>
              ) : null}
            </View>
            <View style={DetailsStyle.btnWrapper}>
              {isEdit !== '' && isEdit ? (
                <>
                  <Button
                    type={'plain'}
                    btnStyle={[DetailsStyle.btnLeft]}
                    text={'编辑'}
                    onClick={this.navigatorEdit.bind(this)}
                  />
                  <Button
                    btnStyle={pullOffClassName}
                    text={'下架'}
                    type={'plain'}
                    fontStyles={pullOffBtnTextClassName}
                    onClick={this.pullOff.bind(this)}
                  />
                </>
              ) : (
                <Button
                  btnStyle={[DetailsStyle.btnRight]}
                  text={'立即联系'}
                  type={'round'}
                  onClick={this.callHim.bind(this)}
                />
              )}
            </View>
          </ScrollView>
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
});
// 如果需要引入store
const mapStateToProps = state => {
  return {
    userInfo: state.user_info.userInfo,
    theme: state.theme.theme,
  };
};
export default connect(mapStateToProps)(VacancyDetsils);
