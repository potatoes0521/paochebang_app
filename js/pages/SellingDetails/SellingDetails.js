/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2019-12-24 11:45:16
 * @LastEditors  : liuYang
 * @LastEditTime : 2019-12-24 17:07:56
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
import {payWey} from '../../config/text_config.js';
import api from '../../api/index.js';
import Button from '../../components/Button/Button.js';
import Toast from 'react-native-easy-toast';

class SellingDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carAmount: '', // 空位数
      carInfo: '', // 车辆信息
      dueTime: '', // 有效期
      isActive: 1, // 订单状态
      payType: '', // 支付方式
      returnPrice: '',
      pubTime: '', // 发布时间
      receiveCityName: '', // 收车城市
      remarks: '', // 备注
      sendCityName: '', // 发车城市
      sendTime: '', // 发车时间
      saleToPalletId: '', // 卖板信息ID
      isEdit: '', // 是否可编辑
      usedType: '', // 车辆性质
    };
    this.backPress = new BackPressComponent({
      backPress: () => this.onBackPress(),
    });
    this.pageParams = {};
    this.toastRef = React.createRef();
  }

  componentDidMount() {
    const {navigation} = this.props;
    const {state} = navigation;
    const {params} = state;
    console.log('params', params);
    this.pageParams = params || {};
    this.getSellingDetail();
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
   * 获取详情
   * @return void
   */
  getSellingDetail() {
    if (!this.pageParams.saleToPalletId) {
      this.toastRef.current.show('缺少saleToPalletId或saleToPalletCode');
      return;
    }
    let sendData = {
      id: this.pageParams.saleToPalletId,
    };
    api.selling.getSellingDetail(sendData, this).then(res => {
      if (!res.data) {
        return;
      }
      console.log('res.data', res.data);
      this.setState(res.data);
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
    api.selling.sellingDataPullOff(sendData, this).then(() => {
      this.toastRef.current.show('下架成功');
      setTimeout(() => {
        NavigationUtil.goBack(this.props.navigation);
      }, 1800);
    });
  }
  navigatorEdit() {
    NavigationUtil.goPage(this.pageParams, 'EditSellingPage');
  }

  render() {
    const {theme, navigation} = this.props;
    let {
      carAmount,
      carInfo,
      dueTime,
      isActive,
      payType,
      returnPrice,
      pubTime,
      receiveCityName,
      remarks,
      sendCityName,
      sendTime,
      usedType,
      isEdit,
    } = this.state;
    const payWeyText = payWey.filter(item => {
      return +item.id === +payType;
    })[0];
    let textClassName = [DetailsStyles.contentText];
    if (isActive !== 1) {
      textClassName.push(DetailsStyles.textThemeDisabled);
    }
    return (
      <SafeAreaViewPlus topColor={theme.themeColor}>
        <View style={styles.pageWrapper}>
          <NavigationBar
            navigation={navigation}
            leftViewShow={true}
            title={'卖板详情'}
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
              {/* 预计发车时间 */}
              <View style={DetailsStyles.formItem}>
                <View style={DetailsStyles.formLabel}>
                  <Text style={DetailsStyles.labelText}>预计发车时间:</Text>
                </View>
                <View style={DetailsStyles.formContent}>
                  <Text style={DetailsStyles.contentText}>
                    {sendTime.split('T')[0] || ''}
                  </Text>
                </View>
              </View>
              {/* 车辆信息 */}
              <View style={DetailsStyles.formItem}>
                <View style={DetailsStyles.formLabel}>
                  <Text style={DetailsStyles.labelText}>车辆信息:</Text>
                </View>
                <View
                  style={[
                    DetailsStyles.formContent,
                    DetailsStyles.moreTextFormItem,
                  ]}>
                  <Text style={DetailsStyles.contentText}>{carInfo || ''}</Text>
                </View>
              </View>
              {/* 车辆性质 */}
              <View style={DetailsStyles.formItem}>
                <View style={DetailsStyles.formLabel}>
                  <Text style={DetailsStyles.labelText}>车辆性质:</Text>
                </View>
                <View style={DetailsStyles.formContent}>
                  <Text style={DetailsStyles.contentText}>
                    {usedType === 1 ? '新车' : '二手车'}
                  </Text>
                </View>
              </View>
              {/* 台数 */}
              <View style={DetailsStyles.formItem}>
                <View style={DetailsStyles.formLabel}>
                  <Text style={DetailsStyles.labelText}>台数:</Text>
                </View>
                <View style={DetailsStyles.formContent}>
                  <Text style={DetailsStyles.contentText}>
                    {carAmount || '0'}
                  </Text>
                </View>
              </View>
              {/* 结算方式 */}
              <View style={DetailsStyles.formItem}>
                <View style={DetailsStyles.formLabel}>
                  <Text style={DetailsStyles.labelText}>结算方式:</Text>
                </View>
                <View style={DetailsStyles.formContent}>
                  <Text style={DetailsStyles.contentText}>
                    {payWeyText ? payWeyText.name : ''}
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
              {/* 发布时间 */}
              <View style={DetailsStyles.formItem}>
                <View style={DetailsStyles.formLabel}>
                  <Text style={DetailsStyles.labelText}>发布时间:</Text>
                </View>
                <View style={DetailsStyles.formContent}>
                  <Text style={DetailsStyles.contentText}>
                    {pubTime.split('T')[0] || ''}
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
export default connect(mapStateToProps)(SellingDetails);
