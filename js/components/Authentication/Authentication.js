/*
 * @Author: guorui
 * @description: 实名认证弹框
 * @Date: 2020-01-04 10:45:41
 * @LastEditors  : guorui
 * @LastEditTime : 2020-01-04 14:28:30
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import GlobalStyles from '../../assets/css/GlobalStyles';
import NavigationUtil from '../../navigator/NavigationUtils';
import authenticationImage from '../../assets/image/authentication/certification_img.png';

export default class Authentication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}
  goToAuthentication() {
    this.setState({
      visible: false,
    });
    NavigationUtil.goPage({pageBack: '1'}, 'AuthenticationPage');
  }
  _cancel() {}
  render() {
    let {visible} = this.state;
    return (
      <Modal
        visible={visible}
        animationType="none"
        transparent
        onRequestClose={this._cancel}>
        <View style={styles.AuthenticationWrapper}>
          <View style={styles.cardStyle}>
            <Image style={styles.imgStyle} source={authenticationImage} />
            <Text style={styles.titleStyle}>实名认证</Text>
            <Text style={styles.tipsStyle}>请提交身份信息，完成认证</Text>
            <TouchableOpacity onPress={this.goToAuthentication.bind(this)}>
              <View style={styles.btnWrapper}>
                <Text style={styles.btnStyle}>去认证</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  AuthenticationWrapper: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 5,
  },
  cardStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 163,
    bottom: 0,
    height: 242,
    marginHorizontal: 55,
    paddingVertical: 20,
    backgroundColor: GlobalStyles.backgroundColor,
    borderRadius: 8,
    alignItems: 'center',
  },
  imgStyle: {
    width: 80,
    height: 80,
  },
  titleStyle: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 7,
    marginBottom: 18,
    color: GlobalStyles.themeFontColor,
  },
  tipsStyle: {
    fontSize: 15,
    marginBottom: 20,
    color: GlobalStyles.themeFontColor,
  },
  btnWrapper: {
    width: 211,
    height: 34,
    backgroundColor: GlobalStyles.themeColor,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnStyle: {
    fontSize: 15,
    fontWeight: '700',
    color: GlobalStyles.backgroundColor,
  },
});
