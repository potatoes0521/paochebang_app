/*
 * @Author: guorui
 * @description: 常跑线路
 * @Date: 2019-12-27 15:19:24
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-01-17 18:48:54
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native';
import {connect} from 'react-redux';
import NavigationBar from '../../components/NavigatorBar/NavigationBar';
import MineStyles from '../../assets/css/MineStyles';
import GlobalStyles from '../../assets/css/GlobalStyles';
import NavigationUtil from '../../navigator/NavigationUtils';
import BackPressComponent from '../../components/BackPressComponent/BackPressComponent';
import Button from '../../components/Button/Button.js';
import Toast from 'react-native-easy-toast';
import ArrowImage from '../../assets/image/line/arrow.png';
import EmptyList from '../../components/EmptyList/EmptyList.js';
import ShowModal from '../../components/ShowModal/ShowModal.js';
import SafeAreaViewPlus from '../../components/SafeAreaViewPlus/SafeAreaViewPlus';
import api from '../../api';

class Line extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routeNumber: 0,
      lineList: [],
      isShow: false,
      lineId: '',
    };
    this.lineId = '';
    this.toastRef = React.createRef();
    this.backPress = new BackPressComponent({
      backPress: () => this.onBackPress(),
    });
  }

  componentDidMount() {
    this.getAllLineList();
    this.handleEmit();
    this.backPress.componentDidMount();
  }
  componentWillUnmount() {
    this.emitRefreshLineList.remove();
    this.backPress.componentWillUnmount();
  }
  onBackPress() {
    NavigationUtil.goBack(this.props.navigation);
    return true;
  }
  /**
   * 处理事件通知
   * @return void
   */
  handleEmit() {
    // 选择城市时候的通知
    this.emitRefreshLineList = DeviceEventEmitter.addListener(
      'refreshLineList',
      () => {
        this.getAllLineList();
      },
    );
  }
  /**
   * 获取线路列表
   * @return void
   */
  getAllLineList() {
    api.line.getLineList({}, this).then(res => {
      let data = res.data;
      if (!data) {
        return;
      }
      this.setState({
        lineList: data.transferLineVO,
        routeNumber: data.routeNumber,
      });
    });
  }
  /**
   * 编辑线路
   * @return void
   */
  editLine(item) {
    NavigationUtil.goPage({pageType: 'edit', lineItem: item}, 'LineEditPage');
  }
  /**
   * 添加线路
   * @return void
   */
  addLine() {
    NavigationUtil.goPage({}, 'LineEditPage');
  }
  showAlert(item) {
    this.setState({
      isShow: true,
      lineId: item,
    });
  }
  closeModal(type) {
    this.setState({
      isShow: false,
    });
    if (type === 'submit') {
      this.deleteLine(this.state.lineId);
    }
  }
  /**
   * 删除线路
   * @return void
   */
  deleteLine(item) {
    let sendData = {
      lineId: item,
    };
    api.line.deleteList(sendData, this).then(res => {
      this.toastRef.current.show('删除成功');
      this.getAllLineList();
    });
  }
  render() {
    const {theme, navigation} = this.props;
    let {routeNumber, lineList, isShow} = this.state;
    const lineListData =
      lineList &&
      lineList.map(item => {
        const key = item.lineId;
        return (
          <View key={key} item={item}>
            <View style={styles.listItem}>
              <TouchableOpacity onPress={this.editLine.bind(this, item)}>
                <View style={styles.listCity}>
                  <Text style={styles.cityStyle}>
                    {item.fromCityName && item.fromCityName.length > 4
                      ? item.fromCityName.substr(0, 4) + '...'
                      : item.fromCityName || ''}
                  </Text>
                  <Image style={styles.arrowImage} source={ArrowImage} />
                  <Text style={styles.cityStyle}>
                    {item.toCityName && item.toCityName.length > 4
                      ? item.toCityName.substr(0, 4) + '...'
                      : item.toCityName || ''}
                  </Text>
                </View>
              </TouchableOpacity>
              <View style={styles.deleteIcon}>
                <TouchableOpacity
                  onPress={this.showAlert.bind(this, item.lineId)}>
                  <Text style={styles.iconStyle}>&#xe673;</Text>
                </TouchableOpacity>
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
          {lineList && lineList.length ? (
            <View style={styles.lineWrapper}>
              <View style={styles.lineTitle}>
                <View style={styles.lineStyle} />
                <View>
                  <Text style={MineStyles.contentText}>
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
          {isShow ? <ShowModal onClick={this.closeModal.bind(this)} /> : null}
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
