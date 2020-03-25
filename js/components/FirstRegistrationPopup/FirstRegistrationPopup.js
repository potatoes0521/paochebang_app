/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-03-25 17:38:06
 * @LastEditors: liuYang
 * @LastEditTime: 2020-03-25 19:00:32
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import GlobalStyles from '../../assets/css/GlobalStyles';
import Storage from '../../utils/Storage.js';
import Button from '../Button/Button';
import NavigationUtil from '../../navigator/NavigationUtils';
import RNExitApp from 'react-native-exit-app';

export default class FirstRegistrationPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFirstRegistrationPopup: false,
      ontAgree: false,
    };
  }

  componentDidMount() {
    Storage.getStorage('agreeAgreement').then(res => {
      console.log('res', res);
      if (res) {
        this.setState({
          showFirstRegistrationPopup: false,
        });
      } else {
        this.setState({
          showFirstRegistrationPopup: true,
        });
      }
    });
  }

  componentWillUnmount() {}

  agree() {
    Storage.setStorage('agreeAgreement', true);
    this.setState({
      showFirstRegistrationPopup: false,
    });
  }
  seeAgreement() {
    this.setState({
      ontAgree: false,
    });
  }
  notAgree() {
    this.setState({
      ontAgree: true,
    });
  }
  seeAgreementDetails(type) {
    NavigationUtil.goPage({type}, 'AgreementPage');
  }
  exitApp() {
    RNExitApp.exitApp();
  }
  render() {
    let {showFirstRegistrationPopup, ontAgree} = this.state;
    return (
      showFirstRegistrationPopup && (
        <View style={styles.wrapper}>
          <View style={styles.mainBox}>
            {!ontAgree ? (
              <>
                <View style={styles.titleWrapper}>
                  <Text style={styles.title}>温馨提示</Text>
                </View>
                <View style={styles.main}>
                  <Text style={[styles.oneLineText, styles.text]}>
                    感谢您信任并使用跑车帮!
                  </Text>
                  <View style={[styles.oneLineText, styles.langTextWrapper]}>
                    <Text style={styles.text}>
                      您在使用跑车帮前，
                      请认真阅读并充分了解我们对您个人信息的处理规则，
                      其中的重点条款已为您标注， 方便您了解自己的权利。
                      当您点击同意相关条款， 并开始使用产品或服务， 即表示您已经
                    </Text>
                    <Text style={styles.text}>理解并同意我们的</Text>
                    <TouchableOpacity
                      onPress={this.seeAgreementDetails.bind(this, 'privacy')}
                      style={styles.shotText}>
                      <Text style={[styles.text, styles.heighLight]}>
                        《隐私政策》
                      </Text>
                    </TouchableOpacity>
                    <Text>、</Text>
                    <TouchableOpacity
                      onPress={this.seeAgreementDetails.bind(this, 'register')}
                      style={styles.langText}>
                      <Text style={[styles.text, styles.heighLight]}>
                        《用户注册服务协议》
                      </Text>
                    </TouchableOpacity>
                    <Text>。</Text>
                  </View>
                </View>
                <View style={styles.btnWrapper}>
                  <View style={styles.btnAgree}>
                    <Button
                      type="round"
                      text={'同意'}
                      onClick={this.agree.bind(this)}
                    />
                  </View>
                  <View style={styles.notAgree}>
                    <TouchableOpacity
                      onPress={this.notAgree.bind(this)}
                      style={styles.notAgree}>
                      <Text style={styles.text}>不同意</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            ) : (
              <>
                <View style={styles.notAgreeTitleWrapper}>
                  <Text style={styles.title}>为了保证您正常使用跑车帮APP</Text>
                  <Text style={styles.title}>
                    您需要阅读并同意我们的隐私政策才能继续使用跑车帮
                  </Text>
                </View>
                <Text style={[styles.text, styles.textAlign]}>
                  若您不同意本隐私政策，很遗憾我们将无法为您提供服务。
                </Text>
                <View style={[styles.btnWrapper, styles.notAgreeBtnWrapper]}>
                  <View style={[styles.notAgree, styles.btnWrapperPublic]}>
                    <TouchableOpacity
                      onPress={this.exitApp.bind(this)}
                      style={styles.notAgreeBtn}>
                      <Text style={styles.text}>退出应用</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={[styles.btnAgree, styles.btnWrapperPublic]}>
                    <Button
                      type="round"
                      text={'查看协议'}
                      onClick={this.seeAgreement.bind(this)}
                    />
                  </View>
                </View>
              </>
            )}
          </View>
        </View>
      )
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  mainBox: {
    width: 286,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  titleWrapper: {
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#f5f5f5',
    borderBottomWidth: 1,
  },
  title: {
    color: GlobalStyles.themeFontColor,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  main: {
    padding: 10,
  },
  oneLineText: {
    paddingBottom: 10,
  },
  text: {
    fontSize: 14,
    color: GlobalStyles.themeTipColor,
  },
  langTextWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  shotText: {
    width: 84,
  },
  langText: {
    width: 140,
  },
  heighLight: {
    color: GlobalStyles.themeColor,
  },
  btnAgree: {
    height: 40,
    marginBottom: 10,
    textAlign: 'center',
  },
  notAgree: {
    height: 30,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notAgreeBtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  notAgreeTitleWrapper: {
    paddingTop: 20,
    paddingBottom: 10,
    alignItems: 'center',
  },
  textAlign: {
    textAlign: 'center',
    paddingBottom: 20,
  },
  notAgreeBtnWrapper: {
    flexDirection: 'row',
  },
  btnWrapperPublic: {
    flex: 1,
    height: 40,
  },
});

FirstRegistrationPopup.defaultProps = {
  onClick: () => {},
};

FirstRegistrationPopup.propTypes = {
  onClick: PropTypes.func.isRequired,
};
