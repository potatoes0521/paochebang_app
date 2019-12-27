/*
 * @Author: guorui
 * @description: 实名认证
 * @Date: 2019-12-26 18:17:17
 * @LastEditors  : guorui
 * @LastEditTime : 2019-12-27 11:12:08
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text, ImageBackground, TextInput} from 'react-native';
import {connect} from 'react-redux';
import NavigationBar from '../../components/NavigatorBar/NavigationBar';
import GlobalStyles from '../../assets/css/GlobalStyles';
import DetailsStyles from '../../assets/css/DetailsStyles';
import Button from '../../components/Button/Button.js';
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
    };
  }
  componentDidMount() {}
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
  render() {
    const {navigation} = this.props;
    let {realName, idCard, accountHolder, accountNum, bankName} = this.state;
    return (
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
              <Text style={DetailsStyles.contentText}>真实姓名</Text>
              <TextInput
                style={[styles.input, DetailsStyles.contentText]}
                placeholder="请输入真实姓名"
                onChangeText={this.realNameOnInput.bind(this)}
                value={realName}
              />
            </View>
            <View style={styles.cardItem}>
              <Text style={DetailsStyles.contentText}>身份证号</Text>
              <TextInput
                style={[styles.input, DetailsStyles.contentText]}
                placeholder="请输入身份证号"
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
            <Text style={DetailsStyles.contentText}>收款人姓名</Text>
            <TextInput
              style={[styles.input, DetailsStyles.contentText]}
              placeholder="请输入收款人姓名"
              onChangeText={this.accountHolderOnInput.bind(this)}
              value={accountHolder}
            />
          </View>
          <View style={[styles.cardItem, styles.line]}>
            <Text style={DetailsStyles.contentText}>银行卡号</Text>
            <TextInput
              style={[styles.input, DetailsStyles.contentText]}
              placeholder="请输入银行卡号"
              onChangeText={this.accountNumOnInput.bind(this)}
              value={accountNum}
            />
          </View>
          <View style={styles.cardItem}>
            <Text style={DetailsStyles.contentText}>银行类型</Text>
            <TextInput
              style={[styles.input, DetailsStyles.contentText]}
              placeholder="请输入银行类型"
              onChangeText={this.bankNameOnInput.bind(this)}
              value={bankName}
            />
          </View>
        </View>
        <View style={styles.btnWrapper}>
          <Button text={'提交'} type={'round'} />
        </View>
      </View>
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
  };
};
export default connect(mapStateToProps)(Authentication);
