/*
 * @Author: guorui
 * @description: 实名认证
 * @Date: 2019-12-26 18:17:17
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-01-17 10:38:25
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
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
import {defaultResourceImgURL} from '../../config/requestConfig';
import ActionSheet from '../../components/ActionSheet/ActionSheet';
import {uploadFile} from '../../utils/uploadFile.js';
import Storage from '../../utils/Storage.js';
import Loading from '../../components/Loading/Loading.js';

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
      beforeImage: null,
      afterImage: null,
      licenseBeforeImage: null, // 驾驶证 1行驶本左面，2 右面
      licenseAfterImage: null, // 行驶证
      realFlag: false,
      uploadLoading: false,
      showText: '',
    };
    this.toastRef = React.createRef();
    this.backPress = new BackPressComponent({
      backPress: () => this.onBackPress(),
    });
    this.chooseType = '';
    this.businessType = 0;
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
      if (!res.data) {
        return;
      }
      const data = res.data;
      let licenseBeforeImage = '';
      let licenseAfterImage = '';
      if (data && data.imageList) {
        licenseBeforeImage =
          data.imageList
            .filter(item => +item.imgType === 1)
            .map(item => {
              return item.imageUrl;
            })[0] || '';
        licenseAfterImage =
          data.imageList
            .filter(item => +item.imgType === 2)
            .map(item => {
              return item.imageUrl;
            })[0] || '';
      }
      this.setState({
        beforeImage: data.idCardFace || '',
        afterImage: data.idCardBack || '',
        idCard: data.idCard || '',
        realName: data.realName || '',
        bankName: data.bankName || '', // 银行类型
        openingBank: data.openingBank || '', // 开户行
        accountNum: data.accountNum || '', // 银行卡号
        accountHolder: data.accountHolder || '', // 开户人
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
   * 输入支行
   * @param {Type} value 参数描述
   * @return void
   */
  openingBankOnInput(value) {
    this.setState({
      openingBank: value,
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
      if (!res.data) {
        return;
      }
      this.toastRef.current.show('实名认证成功');
      if (licenseBeforeImage) {
        this.props.changeUserInfo({
          realNameAuthStatus: 2,
        });
      } else {
        this.props.changeUserInfo({
          realNameAuthStatus: 1,
        });
      }
      Storage.setStorage('userInfo', this.props.userInfo);
      this.handleAlreadyAuthorize();
      setTimeout(() => {
        NavigationUtil.goBack(this.props.navigation);
      }, 1800);
    });
  }
  openActionSheet(type) {
    this.chooseType = type;
    if (type === 'afterImage' || type === 'beforeImage') {
      this.businessType = 1;
    } else {
      this.businessType = 5;
    }
    this.ActionSheet.show();
  }
  chooseActionSheet(index) {
    if (index === 2) {
      return;
    }
    let type = '';
    if (index === 0) {
      type = 'camera';
    } else if (index === 1) {
      type = 'album';
    }
    this.chooseImage(type);
  }
  chooseImage(type = 'album') {
    uploadFile({
      multiple: false,
      that: this,
      businessType: this.businessType,
      openType: type,
    }).then(res => {
      if (this.chooseType === 'beforeImage') {
        this.setState({
          beforeImage: res[0],
        });
        this.imageOCR(res[0]);
      } else if (this.chooseType === 'afterImage') {
        this.setState({
          afterImage: res[0],
        });
      } else if (this.chooseType === 'licenseBeforeImage') {
        this.setState({
          licenseBeforeImage: res[0],
        });
      } else if (this.chooseType === 'licenseAfterImage') {
        this.setState({
          licenseAfterImage: res[0],
        });
      }
    });
  }
  /**
   * 身份证ocr识别
   * @param {String} imageUrl url
   * @return void
   */
  imageOCR(imageUrl) {
    let sendData = {
      idCardFace: imageUrl,
    };
    api.user.OCR(sendData, this).then(res => {
      console.log('res', res.data);
      const data = JSON.parse(res.data);
      if (data.errcode === 0 && data.errmsg === 'ok') {
        this.setState({
          idCard: data.id,
          realName: data.name,
          realFlag: false,
        });
      } else {
        this.setState({
          realFlag: true,
        });
        this.toastRef.current.show('识别失败,请换一张试试~');
      }
    });
  }
  render() {
    const {theme, navigation, userInfo} = this.props;
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
      uploadLoading,
      showText,
    } = this.state;
    // let showEditIdCard = userInfo.realNameAuthStatus >= 0;
    // let showEditLicenseCard = userInfo.realNameAuthStatus >= 1;
    let showEditIdCard = 1;
    let showEditLicenseCard = 1;
    return (
      <SafeAreaViewPlus topColor={theme.themeColor}>
        <View style={styles.pageWrapper}>
          <NavigationBar
            navigation={navigation}
            leftViewShow={true}
            title={'实名认证'}
          />
          <ScrollView style={styles.wrapper}>
            {showEditIdCard && (
              <>
                <View style={styles.msgWrapper}>
                  <View style={styles.tipsWrapper}>
                    <Text style={styles.tipsStyle}>
                      {userInfo.realNameAuthStatus
                        ? '身份证照片'
                        : '拍摄二代身份证原件，请确保图片清晰，四角完整'}
                    </Text>
                  </View>
                  <View style={styles.imageWrapper}>
                    <View style={[styles.imageStyle, styles.imageLeft]}>
                      {beforeImage ? (
                        <Image
                          style={styles.image}
                          resizeMode={'contain'}
                          source={{
                            uri: beforeImage || '',
                          }}
                        />
                      ) : null}
                      {beforeImage && !realFlag ? null : (
                        <TouchableOpacity
                          onPress={this.openActionSheet.bind(
                            this,
                            'beforeImage',
                          )}
                          style={styles.bgStyle}>
                          <ImageBackground
                            style={styles.bgImgStyle}
                            source={{
                              uri: `${defaultResourceImgURL}id_card/id_card_before.png`,
                            }}>
                            <View style={styles.bgIcon}>
                              <Text style={styles.iconStyle}>&#xe668;</Text>
                            </View>
                            <Text style={styles.textStyle}>拍摄人像页</Text>
                          </ImageBackground>
                        </TouchableOpacity>
                      )}
                    </View>
                    <View style={[styles.imageStyle, styles.imageRight]}>
                      {afterImage ? (
                        <Image
                          style={styles.image}
                          resizeMode={'contain'}
                          source={{
                            uri: afterImage || '',
                          }}
                        />
                      ) : null}
                      {afterImage ? null : (
                        <TouchableOpacity
                          onPress={this.openActionSheet.bind(
                            this,
                            'afterImage',
                          )}
                          style={styles.bgStyle}>
                          <ImageBackground
                            style={styles.bgImgStyle}
                            source={{
                              uri: `${defaultResourceImgURL}id_card/id_card_after.png`,
                            }}>
                            <View style={styles.bgIcon}>
                              <Text style={styles.iconStyle}>&#xe668;</Text>
                            </View>
                            <Text style={styles.textStyle}>拍摄国徽页</Text>
                          </ImageBackground>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                </View>
                <View style={styles.idCardWrapper}>
                  <View style={[styles.cardItem, styles.line]}>
                    <View style={styles.itemStyle}>
                      <Text style={styles.isRequired}>*</Text>
                      <Text style={MineStyles.contentText}>真实姓名</Text>
                    </View>
                    <View style={styles.inputWrapper}>
                      {userInfo.realNameAuthStatus ? (
                        <Text>{realName}</Text>
                      ) : (
                        <TextInput
                          style={[styles.input, MineStyles.contentText]}
                          placeholder="请输入真实姓名"
                          maxLength={8}
                          onChangeText={this.realNameOnInput.bind(this)}
                          value={realName}
                        />
                      )}
                    </View>
                  </View>
                  <View style={styles.cardItem}>
                    <View style={styles.itemStyle}>
                      <Text style={styles.isRequired}>*</Text>
                      <Text style={MineStyles.contentText}>身份证号</Text>
                    </View>
                    <View style={styles.inputWrapper}>
                      {userInfo.realNameAuthStatus ? (
                        <Text>{idCard}</Text>
                      ) : (
                        <TextInput
                          style={[styles.input, MineStyles.contentText]}
                          placeholder="请输入身份证号"
                          maxLength={20}
                          onChangeText={this.idCardOnInput.bind(this)}
                          value={idCard}
                        />
                      )}
                    </View>
                  </View>
                </View>
                <View style={styles.wrapperLine} />
              </>
            )}
            {showEditLicenseCard && (
              <View style={styles.msgWrapper}>
                <View style={styles.tipsWrapper}>
                  <Text style={styles.tipsStyle}>
                    {userInfo.realNameAuthStatus
                      ? '行驶证照片'
                      : '拍摄行驶证原件，请确保图片清晰，四角完整'}
                  </Text>
                </View>
                <View style={styles.imageWrapper}>
                  <View style={[styles.imageStyle, styles.imageLeft]}>
                    {licenseBeforeImage ? (
                      <Image
                        style={styles.image}
                        resizeMode={'contain'}
                        source={{
                          uri: licenseBeforeImage || '',
                        }}
                      />
                    ) : null}
                    {licenseBeforeImage ? null : (
                      <TouchableOpacity
                        onPress={this.openActionSheet.bind(
                          this,
                          'licenseBeforeImage',
                        )}
                        style={styles.bgStyle}>
                        <ImageBackground
                          style={styles.bgImgStyle}
                          source={{
                            uri: `${defaultResourceImgURL}id_card/id_card_before_license.png`,
                          }}>
                          <View style={styles.bgIcon}>
                            <Text style={styles.iconStyle}>&#xe668;</Text>
                          </View>
                          <Text style={styles.textStyle}>拍摄驾驶证正面</Text>
                        </ImageBackground>
                      </TouchableOpacity>
                    )}
                  </View>
                  <View style={[styles.imageStyle, styles.imageRight]}>
                    {licenseAfterImage ? (
                      <Image
                        style={styles.image}
                        resizeMode={'contain'}
                        source={{
                          uri: licenseAfterImage,
                        }}
                      />
                    ) : null}
                    {licenseAfterImage ? null : (
                      <TouchableOpacity
                        onPress={this.openActionSheet.bind(
                          this,
                          'licenseAfterImage',
                        )}
                        style={styles.bgStyle}>
                        <ImageBackground
                          style={styles.bgImgStyle}
                          source={{
                            uri: `${defaultResourceImgURL}id_card/id_card_after_license.png`,
                          }}>
                          <View style={styles.bgIcon}>
                            <Text style={styles.iconStyle}>&#xe668;</Text>
                          </View>
                          <Text style={styles.textStyle}>拍摄驾驶证副页</Text>
                        </ImageBackground>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
            )}
            <View style={styles.wrapperLine} />
            <View style={styles.idCardWrapper}>
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
              <View style={styles.cardItem}>
                <Text style={MineStyles.contentText}>支行名称</Text>
                <TextInput
                  style={[styles.input, MineStyles.contentText]}
                  placeholder="请输入支行名称"
                  maxLength={20}
                  onChangeText={this.openingBankOnInput.bind(this)}
                  value={openingBank}
                />
              </View>
            </View>
            <View style={styles.btnWrapper}>
              <Button
                onClick={this.submit.bind(this)}
                text={'提交'}
                type={'round'}
              />
            </View>
          </ScrollView>
          <Toast
            ref={this.toastRef}
            position={'center'}
            defaultCloseDelay={3000}
          />
          {/* 动作指示器 */}
          <ActionSheet
            ref={o => (this.ActionSheet = o)}
            title={'请选择结算方式'}
            options={['相机', '相册', '取消']}
            tintColor={GlobalStyles.themeFontColor}
            cancelButtonIndex={2}
            onPress={this.chooseActionSheet.bind(this)}
          />
          {uploadLoading && <Loading LoadingText={showText} />}
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
  msgWrapper: {
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  wrapperLine: {
    height: 10,
    backgroundColor: '#f7f7f7',
  },
  tipsStyle: {
    fontSize: 13,
    paddingTop: 12,
    color: GlobalStyles.themeDisabled,
  },
  imageWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  imageStyle: {
    position: 'relative',
    flex: 1,
    height: 89,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: GlobalStyles.themeDisabled,
    borderRadius: 4,
    padding: 3,
  },
  image: {
    flex: 1,
  },
  imageLeft: {
    marginRight: 9,
  },
  imageRight: {
    marginLeft: 9,
  },
  bgStyle: {
    flex: 1,
    padding: 3,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  bgImgStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgIcon: {
    width: 32,
    height: 32,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  iconStyle: {
    fontFamily: 'iconfont',
    color: '#fff',
    fontSize: 20,
  },
  textStyle: {
    fontSize: 13,
    color: GlobalStyles.themeHColor,
  },
  idCardWrapper: {
    paddingLeft: 24,
    backgroundColor: '#fff',
  },
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 54,
    paddingRight: 24,
  },
  input: {
    padding: 0,
    textAlign: 'right',
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  btnWrapper: {
    height: 40,
    paddingHorizontal: 20,
    marginTop: 24,
  },
  isRequired: {
    color: '#FF672A',
    width: 9,
    marginRight: 4,
  },
  itemStyle: {
    width: 120,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

// 如果需要引入store
const mapStateToProps = state => {
  return {
    userInfo: state.user_info.userInfo,
    theme: state.theme.theme,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    changeUserInfo: userInfo => dispatch(Actions.changeUserInfo(userInfo)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Authentication);
