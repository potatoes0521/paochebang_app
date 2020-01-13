/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-01-09 09:41:54
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-01-10 16:57:48
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import GlobalStyles from '../../assets/css/GlobalStyles';
import NavigationUtil from '../../navigator/NavigationUtils';
import BackPressComponent from '../../components/BackPressComponent/BackPressComponent';
import SafeAreaViewPlus from '../../components/SafeAreaViewPlus/SafeAreaViewPlus';
import LinearGradient from 'react-native-linear-gradient';

class Publish extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
    NavigationUtil.goBack(this.props.navigation);
    return true;
  }
  navigatorBack() {
    NavigationUtil.goBack(this.props.navigation);
  }
  navigatorTo(type) {
    console.log('this.props.navigation', this.props.navigation);
    if (type === 'selling') {
      this.props.navigation.replace('SellingPublishPage');
    } else {
      this.props.navigation.replace('VacancyPublishPage');
    }
  }
  render() {
    const {theme} = this.props;
    return (
      <SafeAreaViewPlus topColor={theme.themeColor}>
        <View style={styles.pageWrapper}>
          <View style={styles.publishBtnWrapper}>
            <TouchableOpacity
              onPress={this.navigatorTo.bind(this, 'selling')}
              style={styles.btnWrapper}>
              <LinearGradient
                style={styles.btn}
                colors={['#FFAD33', '#FF9A03', '#FF7800']}>
                <Text style={[GlobalStyles.icon, styles.icon]}>&#xe67e;</Text>
              </LinearGradient>
              <View style={styles.btnTextWrapper}>
                <Text style={styles.btnText}>卖板发布</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.navigatorTo.bind(this, 'vacancy')}
              style={styles.btnWrapper}>
              <LinearGradient
                style={styles.btn}
                colors={['#92B5FF', '#73A0FF', '#437FFF']}>
                <Text style={[GlobalStyles.icon, styles.icon]}>&#xe67f;</Text>
              </LinearGradient>
              <View style={styles.btnTextWrapper}>
                <Text style={styles.btnText}>空位发布</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.close}>
            <TouchableOpacity onPress={this.navigatorBack.bind(this)}>
              <Text style={[GlobalStyles.icon, styles.iconClose]}>
                &#xe666;
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaViewPlus>
    );
  }
}

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  publishBtnWrapper: {
    width: GlobalStyles.window_width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 70,
    marginBottom: 73,
  },
  btnWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  btn: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  close: {
    width: 78,
    height: 78,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTextWrapper: {
    marginTop: 6,
    alignItems: 'center',
    fontSize: 16,
    lineHeight: 22,
    color: GlobalStyles.themeFontColor,
  },
  icon: {
    color: '#ffffff',
    fontSize: 44,
  },
  iconClose: {
    color: GlobalStyles.themeDisabled,
    fontSize: 16,
  },
});
// 如果需要引入store
const mapStateToProps = state => {
  return {
    userInfo: state.user_info.userInfo,
    theme: state.theme.theme,
  };
};
export default connect(mapStateToProps)(Publish);
