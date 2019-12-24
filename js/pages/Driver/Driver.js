/*
 * @Author: guorui
 * @description: 司机列表页面
 * @Date: 2019-12-23 18:09:23
 * @LastEditors  : guorui
 * @LastEditTime : 2019-12-24 17:10:58
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {connect} from 'react-redux';
import NavigationBar from '../../components/NavigatorBar/NavigationBar';
import GlobalStyles from '../../assets/css/GlobalStyles';
import DetailsStyles from '../../assets/css/detailsStyles';
// import {TextInput} from 'react-native-gesture-handler';

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectParam: '',
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}
  /**
   * 搜索框
   * @param {Type} e 输入的值
   * @return void
   */
  searchInput(e) {
    console.log(e);
  }

  render() {
    const {navigation} = this.props;
    let {selectParam} = this.state;
    return (
      <View style={styles.pageWrapper}>
        <NavigationBar
          navigation={navigation}
          leftViewShow={true}
          title={'司机信息列表'}
        />
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.input}
            placeholder="输入姓名/联系方式进行搜索"
            onChangeText={this.searchInput.bind(this)}
            value={selectParam}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
  },
  searchWrapper: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  input: {
    height: 38,
    backgroundColor: '#F5F5F5',
    borderRadius: 4,
  },
});
// 如果需要引入store
const mapStateToProps = state => {
  return {
    userInfo: state.user_info.userInfo,
  };
};
export default connect(mapStateToProps)(Order);
