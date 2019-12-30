/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2019-12-30 16:09:01
 * @LastEditors  : liuYang
 * @LastEditTime : 2019-12-30 16:50:19
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  DeviceEventEmitter,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';
import GlobalStyles from '../../assets/css/GlobalStyles';
import NavigationUtil from '../../navigator/NavigationUtils';
import BackPressComponent from '../../components/BackPressComponent/BackPressComponent';
import NavigationBar from '../../components/NavigatorBar/NavigationBar';
import SafeAreaViewPlus from '../../components/SafeAreaViewPlus/SafeAreaViewPlus';
import Button from '../../components/Button/Button';
class Remark extends Component {
  constructor(props) {
    super(props);
    this.state = {
      remarkValue: '',
    };
    this.backPress = new BackPressComponent({
      backPress: () => this.onBackPress(),
    });
  }

  componentDidMount() {
    this.backPress.componentDidMount();
  }

  componentWillUnmount() {
    this.backPress.componentWillUnmount();
  }

  onBackPress() {
    return true;
  }
  submit() {
    DeviceEventEmitter.emit('submitRemark', this.state.remarkValue);
    NavigationUtil.goBack(this.props.navigation);
  }
  remarkInput(value) {
    this.setState({
      remarkValue: value,
    });
  }
  render() {
    const {theme, navigation} = this.props;
    let {remarkValue} = this.state;
    return (
      <SafeAreaViewPlus topColor={theme.themeColor}>
        <View style={styles.pageWrapper}>
          <NavigationBar
            navigation={navigation}
            leftViewShow={true}
            title={'填写备注'}
          />
          <View style={styles.remarkInputWrapper}>
            <TextInput
              style={styles.input}
              multiline={true}
              numberOfLines={5}
              placeholder={'请输入备注，最多50个字哦~'}
              placeholderTextColor={GlobalStyles.themeHColor}
              maxLength={50}
              value={remarkValue}
              onChangeText={this.remarkInput.bind(this)}
            />
            <View style={styles.textNumberTip}>
              <Text style={styles.textNumberTipText}>
                {remarkValue.length}/50
              </Text>
            </View>
          </View>
          <View style={styles.btnWrapper}>
            <Button
              text={'完成'}
              type={'round'}
              onClick={this.submit.bind(this)}
            />
          </View>
        </View>
      </SafeAreaViewPlus>
    );
  }
}

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
  },
  remarkInputWrapper: {
    marginHorizontal: 12,
    marginTop: 19,
    backgroundColor: '#f9f9f9',
    borderRadius: 4,
    height: 148,
    paddingHorizontal: 10,
    paddingVertical: 5,
    position: 'relative',
    borderColor: GlobalStyles.themeDisabled,
    borderWidth: 1,
  },
  input: {
    textAlignVertical: 'top',
    padding: 0,
    margin: 0,
    fontSize: 14,
    flex: 1,
    color: GlobalStyles.themeFontColor,
  },
  btnWrapper: {
    marginHorizontal: 12,
    height: 40,
    marginVertical: 24,
  },
  textNumberTip: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  textNumberTipText: {
    color: GlobalStyles.themeHColor,
    fontSize: 14,
  },
});
// 如果需要引入store
const mapStateToProps = state => {
  return {
    userInfo: state.user_info.userInfo,
    theme: state.theme.theme,
  };
};
export default connect(mapStateToProps)(Remark);
