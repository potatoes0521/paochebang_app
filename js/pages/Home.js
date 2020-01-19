/*
 * @Author: liuYang
 * @description: 首页
 * @Date: 2019-11-22 16:48:04
 * @LastEditors: liuYang
 * @LastEditTime: 2019-11-29 15:46:13
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
    //if (nav.index === 0) {
    if (nav.routes[1].index === 0) {
      //如果RootNavigator中的MainNavigator的index为0，则不处理返回事件
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
        {/* {this.renderCustomThemeView()} */}
      </SafeAreaViewPlus>
    );
  }
}

const mapStateToProps = state => ({
  // nav: state.nav,
  // customThemeViewVisible: state.theme.customThemeViewVisible,
  theme: state.theme.theme,
});

// const mapDispatchToProps = dispatch => ({
//   onShowCustomThemeView: show => dispatch(actions.onShowCustomThemeView(show)),
// });

export default connect(
  mapStateToProps,
  // mapDispatchToProps,
)(Home);
