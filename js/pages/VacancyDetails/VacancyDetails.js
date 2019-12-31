/*
 * @Author: liuYang
 * @description: 空位详情
 * @path: 引入路径
 * @Date: 2019-12-24 11:48:37
 * @LastEditors  : liuYang
 * @LastEditTime : 2019-12-24 17:13:53
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, Linking} from 'react-native';
import {connect} from 'react-redux';
// import GlobalStyles from '../../assets/css/GlobalStyles';
import DetailsStyles from '../../assets/css/detailsStyles1';
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
      this.setState(data, () => {
        console.log('this.state', this.state);
      });
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
      saleToPalletId: this.state.saleToPalletId,
    };
    api.vacancy.sellingDataPullOff(sendData, this).then(() => {
      this.toastRef.current.show('下架成功');
      setTimeout(() => {
        NavigationUtil.goBack(this.props.navigation);
      }, 1800);
    });
  }
  navigatorEdit() {
    NavigationUtil.goPage(this.pageParams, 'EditVacancyPage');
  }
  render() {
    const {theme, navigation} = this.props;
    let {
      vacantAmount,
      dueTime,
      // isActive,
      returnPrice,
      throughCitys,
      receiveCityName,
      remarks,
      sendCityName,
      startTime,
      isEdit,
    } = this.state;
    return (
      <SafeAreaViewPlus topColor={theme.themeColor}>
        <View style={styles.pageWrapper}>
          <NavigationBar
            navigation={navigation}
            leftViewShow={true}
            title={'空位详情'}
          />
          <ScrollView>
            <View style={DetailsStyles.card}>
              {/* 发车城市 */}
              <View style={DetailsStyles.formItem}>
                <View style={DetailsStyles.formLabel}>
                  <Text style={DetailsStyles.labelText}>发车城市:</Text>
                </View>
                <View style={DetailsStyles.formContent}>
                  <Text style={DetailsStyles.contentText}>
                    {sendCityName || ''}
                  </Text>
                </View>
              </View>
              {/* 收车城市 */}
              <View style={DetailsStyles.formItem}>
                <View style={DetailsStyles.formLabel}>
                  <Text style={DetailsStyles.labelText}>收车城市:</Text>
                </View>
                <View style={DetailsStyles.formContent}>
                  <Text style={DetailsStyles.contentText}>
                    {receiveCityName || ''}
                  </Text>
                </View>
              </View>
              {/* 途经城市 */}
              {throughCitys && throughCitys.cityName ? (
                <View style={DetailsStyles.formItem}>
                  <View style={DetailsStyles.formLabel}>
                    <Text style={DetailsStyles.labelText}>途经城市:</Text>
                  </View>
                  <View style={DetailsStyles.formContent}>
                    <Text style={DetailsStyles.contentText}>
                      {throughCitys.cityName || ''}
                    </Text>
                  </View>
                </View>
              ) : null}
              {/* 出发时间 */}
              <View style={DetailsStyles.formItem}>
                <View style={DetailsStyles.formLabel}>
                  <Text style={DetailsStyles.labelText}>出发时间:</Text>
                </View>
                <View style={DetailsStyles.formContent}>
                  <Text style={DetailsStyles.contentText}>
                    {startTime.split('T')[0] || ''}
                  </Text>
                </View>
              </View>
              {/* 余位 */}
              <View style={DetailsStyles.formItem}>
                <View style={DetailsStyles.formLabel}>
                  <Text style={DetailsStyles.labelText}>余位:</Text>
                </View>
                <View style={DetailsStyles.formContent}>
                  <Text style={DetailsStyles.contentText}>
                    {vacantAmount || '0'}
                  </Text>
                </View>
              </View>
              {/* 有效期至 */}
              <View style={DetailsStyles.formItem}>
                <View style={DetailsStyles.formLabel}>
                  <Text style={DetailsStyles.labelText}>有效期至:</Text>
                </View>
                <View style={DetailsStyles.formContent}>
                  <Text style={DetailsStyles.contentText}>
                    {dueTime.split('T')[0] || ''}
                  </Text>
                </View>
              </View>
              {/* 报价 */}
              <View style={DetailsStyles.formItem}>
                <View style={DetailsStyles.formLabel}>
                  <Text style={DetailsStyles.labelText}>报价:</Text>
                </View>
                <View style={DetailsStyles.formContent}>
                  <Text style={DetailsStyles.contentText}>
                    {returnPrice || ''}
                  </Text>
                </View>
              </View>
              {/* 备注 */}
              {remarks ? (
                <View style={DetailsStyles.formItem}>
                  <View style={DetailsStyles.formLabel}>
                    <Text style={DetailsStyles.labelText}>备注:</Text>
                  </View>
                  <View
                    style={[
                      DetailsStyles.formContent,
                      DetailsStyles.moreTextFormItem,
                    ]}>
                    <Text style={DetailsStyles.contentText}>
                      {remarks || ''}
                    </Text>
                  </View>
                </View>
              ) : null}
            </View>
            <View style={DetailsStyles.btnWrapper}>
              {isEdit !== '' && isEdit ? (
                <>
                  <Button
                    type={'plain'}
                    btnStyle={[DetailsStyles.btnLeft]}
                    text={'编辑'}
                    onClick={this.navigatorEdit.bind(this)}
                  />
                  <Button
                    btnStyle={[DetailsStyles.btnRight]}
                    text={'下架'}
                    type={'round'}
                    onClick={this.pullOffer.bind(this)}
                  />
                </>
              ) : (
                <Button
                  btnStyle={[DetailsStyles.btnRight]}
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
