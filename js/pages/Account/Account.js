/*
 * @Author: guorui
 * @description: 账户体系
 * @Date: 2019-12-25 15:25:16
 * @LastEditors  : guorui
 * @LastEditTime : 2019-12-25 15:26:14
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import NavigationBar from '../../components/NavigatorBar/NavigationBar';
import api from '../../api';

class AccountDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}
  componentWillUnmount() {}
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.pageWrapper}>
        <NavigationBar
          navigation={navigation}
          leftViewShow={true}
          title={'账户体系'}
        />
        <Text>账户体系</Text>
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
    theme: state.theme.theme,
  };
};
export default connect(mapStateToProps)(AccountDetails);
