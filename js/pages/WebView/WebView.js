/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-01-16 14:11:35
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-01-16 14:46:22
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import NavigationUtil from '../../navigator/NavigationUtils';
import BackPressComponent from '../../components/BackPressComponent/BackPressComponent';
import NavigationBar from '../../components/NavigatorBar/NavigationBar';
import SafeAreaViewPlus from '../../components/SafeAreaViewPlus/SafeAreaViewPlus';
import {WebView} from 'react-native-webview';

class WebViewPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      canGoBack: false,
    };
    this.backPress = new BackPressComponent({
      backPress: () => this.onBackPress(),
    });
  }

  componentDidMount() {
    const {navigation} = this.props;
    const {state} = navigation;
    const {params} = state;
    console.log('params', params);
    this.handleData(params);
    this.backPress.componentDidMount();
  }

  componentWillUnmount() {
    this.backPress.componentWillUnmount();
  }

  onBackPress() {
    console.log('this.state.canGoBack', this.state.canGoBack);
    console.log('this.state.url', this.state.url);
    if (this.state.canGoBack) {
      this.webView.goBack();
    } else {
      NavigationUtil.goBack(this.props.navigation);
    }
    return true;
  }
  handleData(params) {
    this.setState({
      url: decodeURIComponent(params.locationUrl),
    });
  }
  onNavigationStateChange(navState) {
    console.log('navState', navState);
    this.setState({
      canGoBack: navState.canGoBack,
      url: navState.url,
    });
  }
  render() {
    const {theme, navigation} = this.props;
    return (
      <SafeAreaViewPlus topColor={theme.themeColor}>
        <View style={styles.pageWrapper}>
          <NavigationBar
            navigation={navigation}
            leftViewShow={true}
            title={'跑车帮'}
          />
          {this.state.url ? (
            <WebView
              // style={{marginTop: NAVIGATION_BAR_HEIGHT}}
              ref={webView => (this.webView = webView)}
              startInLoadingState={true}
              onNavigationStateChange={e => this.onNavigationStateChange(e)}
              source={{uri: this.state.url}}
            />
          ) : null}
        </View>
      </SafeAreaViewPlus>
    );
  }
}

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
  },
});
// 如果需要引入store
const mapStateToProps = state => {
  return {
    userInfo: state.user_info.userInfo,
    theme: state.theme.theme,
  };
};
export default connect(mapStateToProps)(WebViewPage);
