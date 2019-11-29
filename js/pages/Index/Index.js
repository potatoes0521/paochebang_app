/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-11-29 15:28:01
 * @LastEditors: liuYang
 * @LastEditTime: 2019-11-29 16:04:32
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import NavigationUtil from '../../navigator/NavigationUtils';
import BackPressComponent from '../../components/BackPressComponent/BackPressComponent';
import NavigationBar from '../../components/NavigatorBar/NavigationBar';
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.backPress = new BackPressComponent({
      backPress: () => this.onBackPress(),
    });
  }

  componentDidMount() {
    this.backPress.componentDidMount();
  }

  componentWillUnmount() {
    this.backPress.componentWillUnmount();
  }

  onBackPress() {
    NavigationUtil.goBack(this.props.navigation);
    return true;
  }

  render() {
    return (
      <View style={styles.pageWrapper}>
        <NavigationBar title={'跑车帮'} />
        <View style={styles.swiperWrapper}>
          <Text> 这里是swiper </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
  },
  viewBox: {
    flex: 1,
  },
  swiperWrapper: {
    width: '100%',
    height: 150,
    backgroundColor: 'red',
  },
});
// 如果需要引入store
const mapStateToProps = state => {
  return {
    // userInfo: state.user_msg.userInfo,
  };
};
export default connect(mapStateToProps)(Index);
