/*
 * @Author: guorui
 * @description: 我发布的卖板和空位
 * @Date: 2019-12-27 11:21:19
 * @LastEditors  : guorui
 * @LastEditTime : 2020-01-14 19:09:04
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
import FloatPublishBtn from '../../components/FloatPublishBtn/FloatPublishBtn';
import SellingList from './components/SellingList';
import VacancyList from './components/VacancyList';
import PropTypes from 'prop-types';
class MainPublish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      tabType: 'selling',
    };
    this.pageType = {};
    this.backPress = new BackPressComponent({
      backPress: () => this.onBackPress(),
    });
  }

  componentDidMount() {
    const {navigation} = this.props;
    const {state} = navigation;
    const {params} = state;
    console.log('params', params);
    this.pageType = params.pageType;
    this.handleTitle(this.pageType);
    this.backPress.componentDidMount();
  }

  componentWillUnmount() {
    this.backPress.componentWillUnmount();
  }
  onBackPress() {
    NavigationUtil.goBack(this.props.navigation);
    return true;
  }
  handleTitle(pageType) {
    if (pageType === 'selling') {
      this.setState({
        title: '卖板信息',
      });
    } else if (pageType === 'vacancy') {
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
          {this.pageType === 'selling' ? <SellingList /> : <VacancyList />}
          <FloatPublishBtn type={this.tabType} />
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
