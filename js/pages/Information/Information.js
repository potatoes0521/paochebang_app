/*
 * @Author: liuYang
 * @description: 市场
 * @Date: 2019-11-22 16:11:20
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-01-13 20:17:03
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import {connect} from 'react-redux';
import GlobalStyles from '../../assets/css/GlobalStyles';
import NavigationBar from '../../components/NavigatorBar/NavigationBar';
import SafeAreaViewPlus from '../../components/SafeAreaViewPlus/SafeAreaViewPlus';
import SellingList from './components/SellingList.js';
import VacancyList from './components/VacancyList.js';
import NavigationUtils from '../../navigator/NavigationUtils';
import FloatPublishBtn from '../../components/FloatPublishBtn/FloatPublishBtn';
import BackPressComponent from '../../components/BackPressComponent/BackPressComponent';

class Information extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabType: 'selling',
    };
    this.backPress = new BackPressComponent({
      backPress: () => this.onBackPress(),
    });
    // this.tabType = 'selling';
  }

  componentDidMount() {
    this.backPress.componentDidMount();
  }

  componentWillUnmount() {
    this.backPress.componentWillUnmount();
  }

  onBackPress() {
    const {navigation} = this.props;
    navigation.goBack();
    return true;
  }

  render() {
    const {theme, navigation} = this.props;
    const {state} = navigation;
    const {params} = state;
    console.log('params', params);
    const NavigatorTab = createAppContainer(
      createMaterialTopTabNavigator(
        {
          SellingTab: {
            screen: props => <SellingList {...props} />,
            navigationOptions: {
              title: '卖板信息',
            },
          },
          VacancyTab: {
            screen: props => <VacancyList {...props} />,
            navigationOptions: {
              title: '空位信息',
            },
          },
        },
        {
          initialRouteName: params.type,
          tabBarOptions: {
            tabStyle: styles.tabStyle,
            activeTintColor: GlobalStyles.themeColor,
            inactiveTintColor: GlobalStyles.themeFontColor,
            style: {
              backgroundColor: '#fff', //TabBar 的背景颜色
              height: 44,
              borderRightWidth: 0,
              borderBottomWidth: 0,
              marginBottom: 10,
            },
            indicatorStyle: styles.indicatorStyle, //标签指示器的样式
            labelStyle: styles.labelStyle, //文字的样式
            lazy: true,
          },
        },
      ),
    );
    return (
      <SafeAreaViewPlus topColor={theme.themeColor}>
        <NavigationBar
          leftViewShow={true}
          navigation={navigation}
          title={'市场信息'}
        />
        <View style={styles.tabWrapper}>
          <NavigatorTab />
          <View style={styles.select}>
            <View style={styles.line} />
            <TouchableOpacity
              onPress={() => {
                NavigationUtils.goPage({}, 'SellingPublishPage');
              }}
              style={styles.selectMain}>
              <Text>筛选</Text>
            </TouchableOpacity>
          </View>
          <FloatPublishBtn type={this.tabType} />
        </View>
      </SafeAreaViewPlus>
    );
  }
}
const itemWidth = (GlobalStyles.window_width - 70) / 2;
const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  tabWrapper: {
    flex: 1,
  },
  select: {
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 2,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    height: 44,
    flexDirection: 'row',
  },
  line: {
    width: 1,
    height: 26,
    backgroundColor: '#f5f5f5',
  },
  selectMain: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabStyle: {
    borderBottomColor: GlobalStyles.themeColor,
    borderBottomWidth: 2,
    width: itemWidth,
    height: 44,
  },
  labelStyle: {
    fontSize: 16,
    fontWeight: '700',
  },
  indicatorStyle: {
    height: 3,
    width: 80,
    marginLeft: itemWidth - itemWidth / 2 - 40,
    backgroundColor: GlobalStyles.themeColor,
  },
});

const mapStateToProps = state => ({
  userInfo: state.user_info.userInfo,
  theme: state.theme.theme,
});
export default connect(mapStateToProps)(Information);
