/*
 * @Author: liuYang
 * @description: 首页
 * @Date: 2019-11-22 16:48:04
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-01-10 11:04:20
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';
import NavigationUtil from '../navigator/NavigationUtils';
import BottomTabBarNavigator from '../navigator/BottomTabBarNavigator';
import BackPressComponent from '../components/BackPressComponent/BackPressComponent';
// import actions from '../store/action';
import SafeAreaViewPlus from '../components/SafeAreaViewPlus/SafeAreaViewPlus';
class Home extends Component {
  constructor(props) {
    super(props);
    this.backPress = new BackPressComponent({
      backPress: this.onBackPress,
    });
    console.disableYellowBox = true;
  }

  componentDidMount() {
    console.log('this.props.userInfo', this.props.userInfo);
    this.backPress.componentDidMount();
  }

  componentWillUnmount() {
    this.backPress.componentWillUnmount();
  }

  onBackPress = () => {
    const {dispatch} = this.props;
    dispatch(NavigationActions.back());
    return true;
  };

  render() {
    const {theme} = this.props;
    NavigationUtil.navigation = this.props.navigation;
    return (
      <SafeAreaViewPlus topColor={theme.themeColor}>
        <BottomTabBarNavigator {...this.props} />
      </SafeAreaViewPlus>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.theme.theme,
  userInfo: state.user_info.userInfo,
});

export default connect(mapStateToProps)(Home);
