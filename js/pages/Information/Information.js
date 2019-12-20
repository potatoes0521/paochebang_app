/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-11-22 16:11:20
 * @LastEditors  : liuYang
 * @LastEditTime : 2019-12-20 14:16:40
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import {connect} from 'react-redux';

class Information extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const {theme} = this.props;
    const NavigatorTab = createAppContainer(
      createMaterialTopTabNavigator({
        SellingTab: {
          screen: props => <Selling {...props} theme={theme} />,
          navigationOptions: {
            title: '卖板信息',
          },
        },
        VacancyTab: {
          screen: Vacancy,
          navigationOptions: {
            title: '空位信息',
          },
        },
      }),
    );
    return (
      <View style={styles.pageWrapper}>
        <NavigatorTab />
      </View>
    );
  }
}
class Selling extends Component {
  constructor(props) {
    super(props);
  }
  changeTheme() {
    this.props.onThemeChange('red');
  }
  render() {
    return <View style={styles.viewBox} />;
  }
}
class Vacancy extends Component {
  render() {
    return (
      <View>
        <Text>空位信息</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
  },
  icon: {},
});

const mapStateToProps = state => ({
  userInfo: state.user_info.userInfo,
});
export default connect(mapStateToProps)(Information);
