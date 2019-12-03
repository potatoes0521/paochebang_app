/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-12-03 16:47:37
 * @LastEditors: liuYang
 * @LastEditTime: 2019-12-03 16:50:22
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import GlobalStyles from '../../../assets/css/GlobalStyles';
import NavigationUtil from '../../navigator/NavigationUtil';
import BackPressComponent from '../../components/BackPressComponent';
import NavigationBar from '../../components/NavigatorBar/NavigationBar';

class OfferDetails extends Component {
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
        <Text>OfferDetials</Text>
      </View>
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
    userInfo: state.user_msg.userInfo,
  };
};
export default connect(mapStateToProps)(OfferDetails);
