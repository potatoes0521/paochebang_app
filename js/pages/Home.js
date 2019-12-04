/*
 * @Author: liuYang
 * @description: 首页
 * @Date: 2019-11-22 16:48:04
 * @LastEditors: liuYang
 * @LastEditTime: 2019-12-03 17:53:04
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';
import NavigationUtil from '../navigator/NavigationUtils';
import BottomTabBarNavigator from '../navigator/BottomTabBarNavigator';
import BackPressComponent from '../components/BackPressComponent/BackPressComponent';
// import CustomTheme from '../page/CustomTheme';
import actions from '../store/action';
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
    this.backPress.componentDidMount();
  }

  componentWillUnmount() {
    this.backPress.componentWillUnmount();
  }

  onBackPress = () => {
    const {dispatch, nav} = this.props;
    if (nav.routes[1].index === 0) {
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  };

  render() {
    const {theme} = this.props;
    NavigationUtil.navigation = this.props.navigation;
    return (
      <SafeAreaViewPlus topColor={theme.themeColor}>
        <BottomTabBarNavigator />
      </SafeAreaViewPlus>
    );
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
  theme: state.theme.theme,
});

export default connect(mapStateToProps)(Home);
