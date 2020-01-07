/*
 * @Author: guorui
 * @description: 我发布的卖板和空位
 * @Date: 2019-12-27 11:21:19
 * @LastEditors  : guorui
 * @LastEditTime : 2020-01-07 15:37:21
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import NavigationBar from '../../components/NavigatorBar/NavigationBar';
import SafeAreaViewPlus from '../../components/SafeAreaViewPlus/SafeAreaViewPlus';
import BackPressComponent from '../../components/BackPressComponent/BackPressComponent';
import NavigationUtil from '../../navigator/NavigationUtils';
import SellingList from './components/SellingList';
import VacancyList from './components/VacancyList';
import PropTypes from 'prop-types';
class MainPublish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageType: '',
      title: '',
    };
    this.backPress = new BackPressComponent({
      backPress: () => this.onBackPress(),
    });
  }

  componentDidMount() {
    const {navigation} = this.props;
    const {state} = navigation;
    const {params} = state;
    if (params) {
      this.getPageInfo(params);
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
  getPageInfo(params) {
    this.setState({
      pageType: params.pageType,
    });
    if (params.pageType === 'selling') {
      this.setState({
        title: '卖板信息',
      });
    } else {
      this.setState({
        title: '空位信息',
      });
    }
  }
  render() {
    const {theme, navigation} = this.props;
    let {title} = this.state;
    return (
      <SafeAreaViewPlus topColor={theme.themeColor}>
        <View style={styles.pageWrapper}>
          <NavigationBar
            navigation={navigation}
            leftViewShow={true}
            title={title}
          />
          {this.state.pageType === 'selling' ? (
            <SellingList />
          ) : (
            <VacancyList />
          )}
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
});

MainPublish.defaultProps = {
  onClick: () => {},
};

MainPublish.propTypes = {
  onClick: PropTypes.func.isRequired,
};
// 如果需要引入store
const mapStateToProps = state => {
  return {
    userInfo: state.user_info.userInfo,
    theme: state.theme.theme,
  };
};
export default connect(mapStateToProps)(MainPublish);
