/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-11-22 16:46:56
 * @LastEditors  : liuYang
 * @LastEditTime : 2019-12-20 14:08:07
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
// import GlobalStyles from '../../assets/css/GlobalStyles';
import NavigationBar from '../../components/NavigatorBar/NavigationBar';

class Offer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <View style={styles.pageWrapper}>
        <NavigationBar title={'报价/接单'} />
        <Text>Offer</Text>
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
    userInfo: state.user_info.userInfo,
  };
};
export default connect(mapStateToProps)(Offer);
