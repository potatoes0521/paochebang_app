/*
 * @Author: guorui
 * @description: 常跑线路
 * @Date: 2019-12-27 15:19:24
 * @LastEditors  : guorui
 * @LastEditTime : 2019-12-30 10:53:05
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {connect} from 'react-redux';
import NavigationBar from '../../components/NavigatorBar/NavigationBar';
import DetailsStyles from '../../assets/css/DetailsStyles';
import GlobalStyles from '../../assets/css/GlobalStyles';
import NavigationUtil from '../../navigator/NavigationUtils';
import BackPressComponent from '../../components/BackPressComponent/BackPressComponent';
import Button from '../../components/Button/Button.js';
import Toast from 'react-native-easy-toast';
import ArrowImage from '../../assets/image/line/arrow.png';
import EmptyList from '../../components/EmptyList/EmptyList.js';
import SafeAreaViewPlus from '../../components/SafeAreaViewPlus/SafeAreaViewPlus';
import api from '../../api';

class Line extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routeNumber: 0,
      lineList: [],
    };
    this.pageParams = {};
    this.toastRef = React.createRef();
    this.backPress = new BackPressComponent({
      backPress: () => this.onBackPress(),
    });
  }

  componentDidMount() {
    const {navigation} = this.props;
    const {state} = navigation;
    const {params} = state;
    console.log('params', params);
    this.pageParams = params || {};
    this.backPress.componentDidMount();
  }
  componentWillUnmount() {
    this.backPress.componentWillUnmount();
    this.getAllLineList();
  }
  onBackPress() {
    NavigationUtil.goBack(this.props.navigation);
    return true;
  }
  /**
   * 获取线路列表
   * @return void
   */
  getAllLineList() {
    api.line.getLineList({}, this).then(res => {
      if (res) {
        this.setState({
          lineList: res.transferLineVO,
          routeNumber: res.routeNumber,
        });
      }
    });
  }
  /**
   * 编辑线路
   * @return void
   */
  editLine() {
    console.log('choose');
  }
  /**
   * 添加线路
   * @return void
   */
  addLine() {
    NavigationUtil.goPage({}, 'LineEditPage');
  }
  /**
   * 删除线路
   * @return void
   */
  deleteLine() {
    console.log('delete');
  }
  render() {
    const {theme, navigation} = this.props;
    let {routeNumber, lineList} = this.state;
    const lineListData =
      lineList &&
      lineList.map(item => {
        const key = item.lineId;
        return (
          <View key={key} item={item}>
            <View style={styles.listItem}>
              <View
                style={styles.listCity}
                onPress={this.editLine.bind(this, item)}>
                <Text style={styles.cityStyle}>北京</Text>
                <Image style={styles.arrowImage} source={ArrowImage} />
                <Text style={styles.cityStyle}>成都</Text>
              </View>
              <View style={styles.deleteIcon}>
                <Text
                  style={styles.iconStyle}
                  onPress={this.deleteLine.bind(this, item.lineId)}>
                  &#xe673;
                </Text>
              </View>
            </View>
          </View>
        );
      });
    return (
      <SafeAreaViewPlus topColor={theme.themeColor}>
        <View style={styles.pageWrapper}>
          <NavigationBar
            navigation={navigation}
            leftViewShow={true}
            title={'常跑线路'}
          />
          {lineList.length ? (
            <View style={styles.lineWrapper}>
              <View style={styles.lineTitle}>
                <View style={styles.lineStyle} />
                <View>
                  <Text style={DetailsStyles.contentText}>
                    我的线路（{routeNumber}/3）
                  </Text>
                </View>
              </View>
              <View style={styles.listWrapper}>{lineListData}</View>
              {routeNumber < 3 ? (
                <View style={styles.btnWrapper}>
                  <Button
                    btnStyle={[styles.btnStyle]}
                    text={'新增线路'}
                    type={'round'}
                    onClick={this.addLine.bind(this)}
                  />
                </View>
              ) : (
                <View style={styles.tipsWrapper}>
                  <Text style={styles.tipsStyle}>
                    点击线路中城市即可完成线路修改或删除线路中任意一条进行添加线路
                  </Text>
                </View>
              )}
            </View>
          ) : (
            <EmptyList {...this.props} pageType={'line'} />
          )}
          <Toast
            ref={this.toastRef}
            position={'center'}
            defaultCloseDelay={3000}
          />
        </View>
      </SafeAreaViewPlus>
    );
  }
}

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
  },
  lineTitle: {
    backgroundColor: '#F5F5F5',
    height: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  lineStyle: {
    width: 4,
    height: 36,
    marginRight: 16,
    backgroundColor: GlobalStyles.themeColor,
  },
  listWrapper: {
    paddingHorizontal: 12,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  listCity: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  cityStyle: {
    fontSize: 18,
    fontWeight: '700',
    color: GlobalStyles.themeFontColor,
  },
  arrowImage: {
    width: 49,
    height: 9,
    marginHorizontal: 8,
  },
  iconStyle: {
    fontFamily: 'iconfont',
    fontSize: 16,
    color: GlobalStyles.themeDisabled,
  },
  btnWrapper: {
    marginHorizontal: 20,
    marginTop: 36,
    height: 40,
  },
  tipsWrapper: {
    marginHorizontal: 12,
    marginTop: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#FEF6E9',
    borderRadius: 4,
  },
  tipsStyle: {
    fontSize: 14,
    color: GlobalStyles.themeHColor,
    lineHeight: 20,
  },
});

// 如果需要引入store
const mapStateToProps = state => {
  return {
    userInfo: state.user_info.userInfo,
    theme: state.theme.theme,
  };
};
export default connect(mapStateToProps)(Line);
