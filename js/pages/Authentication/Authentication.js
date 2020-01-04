/*
 * @Author: guorui
 * @description: 实名认证
 * @Date: 2019-12-26 18:17:17
 * @LastEditors  : guorui
 * @LastEditTime : 2020-01-04 13:40:42
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text, ImageBackground, TextInput} from 'react-native';
import {connect} from 'react-redux';
import NavigationBar from '../../components/NavigatorBar/NavigationBar';
import {validateIdCard, realNamePatter} from '../../utils/patter';
import NavigationUtil from '../../navigator/NavigationUtils';
import GlobalStyles from '../../assets/css/GlobalStyles';
import MineStyles from '../../assets/css/MineStyles';
import Actions from '../../store/action/index.js';
import Button from '../../components/Button/Button.js';
import SafeAreaViewPlus from '../../components/SafeAreaViewPlus/SafeAreaViewPlus';
import BackPressComponent from '../../components/BackPressComponent/BackPressComponent';
import Toast from 'react-native-easy-toast';
import api from '../../api/index';
class Authentication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      realName: '',
      idCard: '',
      accountHolder: '',
      accountNum: '',
      bankName: '',
      openingBank: '', // 开户行
      beforeImage: '',
      afterImage: '',
      licenseBeforeImage: '', // 驾驶证 1行驶本左面，2 右面
      licenseAfterImage: '', // 行驶证
      realFlag: false,
    };
    this.toastRef = React.createRef();
    this.backPress = new BackPressComponent({
      backPress: () => this.onBackPress(),
    });
  }
  componentDidMount() {
    let {userInfo} = this.props;
    if (userInfo.realNameAuthStatus) {
      this.handleAlreadyAuthorize();
    }
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
   * 处理已经授权的情况
   * @return void
   */
  handleAlreadyAuthorize() {
    api.user.getUserAuthorizeMsg({}, this).then(res => {
      if (!res) {
        return;
      }
      let licenseBeforeImage = '';
      let licenseAfterImage = '';
      if (res && res.imageList) {
        licenseBeforeImage =
          res.imageList
            .filter(item => +item.imgType === 1)
            .map(item => {
              return item.imageUrl;
            })[0] || '';
        licenseAfterImage =
          res.imageList
            .filter(item => +item.imgType === 2)
            .map(item => {
              return item.imageUrl;
            })[0] || '';
      }
      this.setState({
        beforeImage: res.idCardFace || '',
        afterImage: res.idCardBack || '',
        idCard: res.idCard || '',
        realName: res.realName || '',
        bankName: res.bankName || '', // 银行类型
        openingBank: res.openingBank || '', // 开户行
        accountNum: res.accountNum || '', // 银行卡号
        accountHolder: res.accountHolder || '', // 开户人
        licenseBeforeImage, // 驾驶证
        licenseAfterImage, // 行驶证
      });
    });
  }
  /**
   * 输入姓名
   * @param {Type} value 参数描述
   * @return void
   */
  realNameOnInput(value) {
    this.setState({
      realName: value,
    });
  }
  /**
   * 输入身份证号
   * @param {Type} value 参数描述
   * @return void
   */
  idCardOnInput(value) {
    this.setState({
      idCard: value,
    });
  }
  /**
   * 输入收款人
   * @param {Type} value 参数描述
   * @return void
   */
  accountHolderOnInput(value) {
    this.setState({
      accountHolder: value,
    });
  }
  /**
   * 输入银行卡号
   * @param {Type} value 参数描述
   * @return void
   */
  accountNumOnInput(value) {
    this.setState({
      accountNum: value,
    });
  }
  /**
   * 输入银行类型
   * @param {Type} value 参数描述
   * @return void
   */
  bankNameOnInput(value) {
    this.setState({
      bankName: value,
    });
  }
  /**
   * 提交去实名认证
   * @return void
   */
  submit() {
    let {
      beforeImage,
      afterImage,
      idCard,
      realName,
      realFlag,
      bankName,
      openingBank,
      accountNum,
      accountHolder,
      licenseBeforeImage, // 正面照片
      licenseAfterImage, // 背面照片
    } = this.state;

    let {userInfo} = this.props;
    let showEditIdCard = userInfo.realNameAuthStatus === 0;
    let showEditLicenseCard = userInfo.realNameAuthStatus === 1;
    if (showEditIdCard) {
      if (realFlag) {
        this.toastRef.current.show('您的身份证认证还没有通过哦');
        return;
      }
      if (!beforeImage) {
        this.toastRef.current.show('上传身份证正面照片');
        return;
      }
      if (!afterImage) {
        this.toastRef.current.show('上传身份证背面照片');
        return;
      }
      if (!realNamePatter.test(realName)) {
        this.toastRef.current.show('请填写真实姓名');
        return;
      }
      if (!validateIdCard(idCard)) {
        this.toastRef.current.show('身份号格式有误');
        return;
      }
    }
    let imageList = [];
    if (showEditLicenseCard) {
      if (!licenseBeforeImage) {
        this.toastRef.current.show('上传驾驶证左面照片');
        return;
      }
      if (!licenseAfterImage) {
        this.toastRef.current.show('上传驾驶证右面照片');
        return;
      }
      imageList.push({
        imgType: 1,
        imageUrl: licenseBeforeImage,
      });
      imageList.push({
        imgType: 2,
        imageUrl: licenseAfterImage,
      });
    }
    let sendData = {
      realName,
      idCard,
      idCardBack: afterImage,
      idCardFace: beforeImage,
      imageList,
      bankName,
      openingBank,
      accountNum,
      accountHolder,
    };
    api.user.realNameAuthentication(sendData, this).then(res => {
      if (!res) {
        return;
      }
      this.toastRef.current.show('实名认证成功');
      if (licenseBeforeImage) {
        Actions.changeUserInfo({
          realNameAuthStatus: 2,
        });
      } else {
        Actions.changeUserInfo({
          realNameAuthStatus: 1,
        });
      }
      this.handleAlreadyAuthorize();
      setTimeout(() => {
        NavigationUtil.goBack(this.props.navigation);
      }, 1800);
    });
  }
  render() {
    const {theme, navigation} = this.props;
    let {realName, idCard, accountHolder, accountNum, bankName} = this.state;
    return (
      <SafeAreaViewPlus topColor={theme.themeColor}>
        <View style={styles.pageWrapper}>
          <NavigationBar
            navigation={navigation}
            leftViewShow={true}
            title={'实名认证'}
          />
          <View style={styles.topWrapper}>
            <View style={styles.tipsWrapper}>
              <Text style={styles.tipsStyle}>
                拍摄二代身份证原件，请确保图片清晰，四角完整
              </Text>
            </View>
            <View style={styles.imageWrapper}>
              <View style={[styles.imageStyle, styles.marginRight]}>
                <View style={styles.bgStyle}>
                  <ImageBackground
                    style={styles.bgImgStyle}
                    source={{
                      uri:
                        'https://resource.paoche56.com/paochebang/mp_img/id_card/id_card_before.png',
                    }}
                  />
                </View>
                <View style={styles.bgWrapper}>
                  <View style={styles.bgIcon}>
                    <Text style={styles.iconStyle}>&#xe668;</Text>
                  </View>
                  <Text style={styles.textStyle}>拍摄人像页</Text>
                </View>
              </View>
              <View style={styles.imageStyle}>
                <View style={styles.bgStyle}>
                  <ImageBackground
                    style={styles.bgImgStyle}
                    source={{
                      uri:
                        'https://resource.paoche56.com/paochebang/mp_img/id_card/id_card_after.png',
                    }}
                  />
                </View>
                <View style={styles.bgWrapper}>
                  <View style={styles.bgIcon}>
                    <Text style={styles.iconStyle}>&#xe668;</Text>
                  </View>
                  <Text style={styles.textStyle}>拍摄国徽页</Text>
                </View>
              </View>
            </View>
            <View style={styles.idCardWrapper}>
              <View style={[styles.cardItem, styles.line]}>
                <Text style={MineStyles.contentText}>真实姓名</Text>
                <TextInput
                  style={[styles.input, MineStyles.contentText]}
                  placeholder="请输入真实姓名"
                  maxLength={8}
                  onChangeText={this.realNameOnInput.bind(this)}
                  value={realName}
                />
              </View>
              <View style={styles.cardItem}>
                <Text style={MineStyles.contentText}>身份证号</Text>
                <TextInput
                  style={[styles.input, MineStyles.contentText]}
                  placeholder="请输入身份证号"
                  maxLength={20}
                  onChangeText={this.idCardOnInput.bind(this)}
                  value={idCard}
                />
              </View>
            </View>
          </View>
          <View style={styles.middleWrapper}>
            <View style={styles.tipsWrapper}>
              <Text style={styles.tipsStyle}>
                拍摄驾驶证原件，请确保图片清晰，四角完整
              </Text>
            </View>
            <View style={styles.imageWrapper}>
              <View style={[styles.imageStyle, styles.marginRight]}>
                <View style={styles.bgStyle}>
                  <ImageBackground
                    style={styles.bgImgStyle}
                    source={{
                      uri:
                        'https://resource.paoche56.com/paochebang/mp_img/id_card/id_card_before_license.png',
                    }}
                  />
                </View>
                <View style={styles.bgWrapper}>
                  <View style={styles.bgIcon}>
                    <Text style={styles.iconStyle}>&#xe668;</Text>
                  </View>
                  <Text style={styles.textStyle}>拍摄驾驶证正面</Text>
                </View>
              </View>
              <View style={styles.imageStyle}>
                <View style={styles.bgStyle}>
                  <ImageBackground
                    style={styles.bgImgStyle}
                    source={{
                      uri:
                        'https://resource.paoche56.com/paochebang/mp_img/id_card/id_card_after_license.png',
                    }}
                  />
                </View>
                <View style={styles.bgWrapper}>
                  <View style={styles.bgIcon}>
                    <Text style={styles.iconStyle}>&#xe668;</Text>
                  </View>
                  <Text style={styles.textStyle}>拍摄驾驶证副页</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.bottomWrapper}>
            <View style={[styles.cardItem, styles.line]}>
              <Text style={MineStyles.contentText}>收款人姓名</Text>
              <TextInput
                style={[styles.input, MineStyles.contentText]}
                placeholder="请输入收款人姓名"
                maxLength={8}
                onChangeText={this.accountHolderOnInput.bind(this)}
                value={accountHolder}
              />
            </View>
            <View style={[styles.cardItem, styles.line]}>
              <Text style={MineStyles.contentText}>银行卡号</Text>
              <TextInput
                style={[styles.input, MineStyles.contentText]}
                placeholder="请输入银行卡号"
                maxLength={20}
                keyboardType={'number-pad'}
                onChangeText={this.accountNumOnInput.bind(this)}
                value={accountNum}
              />
            </View>
            <View style={styles.cardItem}>
              <Text style={MineStyles.contentText}>银行类型</Text>
              <TextInput
                style={[styles.input, MineStyles.contentText]}
                placeholder="请输入银行类型"
                maxLength={20}
                onChangeText={this.bankNameOnInput.bind(this)}
                value={bankName}
              />
            </View>
          </View>
          <View style={styles.btnWrapper}>
            <Button text={'提交'} type={'round'} />
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
  topWrapper: {
    paddingTop: 12,
    paddingLeft: 24,
    borderBottomWidth: 10,
    borderBottomColor: '#F7F7F7',
    backgroundColor: GlobalStyles.backgroundColor,
  },
  middleWrapper: {
    paddingVertical: 12,
    paddingLeft: 24,
    borderBottomWidth: 10,
    borderBottomColor: '#F7F7F7',
    backgroundColor: GlobalStyles.backgroundColor,
  },
  tipsStyle: {
    fontSize: 13,
    color: GlobalStyles.themeDisabled,
  },
  imageWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingRight: 24,
  },
  imageStyle: {
    flex: 1,
    height: 89,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: GlobalStyles.themeDisabled,
    borderRadius: 4,
    padding: 3,
  },
  marginRight: {
    marginRight: 15,
  },
  bgStyle: {
    flex: 1,
  },
  bgImgStyle: {
    flex: 1,
  },
  bgWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    margin: 0,
    right: 0,
    zIndex: 2,
    alignItems: 'center',
    paddingVertical: 16,
  },
  bgIcon: {
    width: 32,
    height: 32,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  iconStyle: {
    fontFamily: 'iconfont',
    color: GlobalStyles.backgroundColor,
    fontSize: 20,
  },
  textStyle: {
    fontSize: 13,
    color: GlobalStyles.themeHColor,
  },
  idCardWrapper: {
    marginTop: 20,
  },
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 24,
    paddingVertical: 16,
  },
  input: {
    padding: 0,
    textAlign: 'right',
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  bottomWrapper: {
    paddingLeft: 24,
    backgroundColor: GlobalStyles.backgroundColor,
  },
  btnWrapper: {
    height: 40,
    paddingHorizontal: 20,
    marginTop: 24,
  },
});

// 如果需要引入store
const mapStateToProps = state => {
  return {
    userInfo: state.user_info.userInfo,
    theme: state.theme.theme,
  };
};
export default connect(mapStateToProps)(Authentication);
