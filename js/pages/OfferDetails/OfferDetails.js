/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-12-03 16:47:37
 * @LastEditors: liuYang
 * @LastEditTime: 2019-12-04 14:57:48
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import GlobalStyles from '../../assets/css/GlobalStyles';
import DetailsStyles from '../../assets/css/detailsStyles';
import BackPressComponent from '../../components/BackPressComponent/BackPressComponent';
import NavigationBar from '../../components/NavigatorBar/NavigationBar';
import SafeAreaViewPlus from '../../components/SafeAreaViewPlus/SafeAreaViewPlus';

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
    return true;
  }

  render() {
    const {theme} = this.props;
    return (
      <SafeAreaViewPlus topColor={theme.themeColor}>
        <View style={styles.pageWrapper}>
          <NavigationBar leftViewShow={true} title={'报价详情'} />
          <ScrollView>
            <View style={DetailsStyles.card}>
              <View style={DetailsStyles.formItem}>
                <View style={DetailsStyles.formLabel}>
                  <Text style={DetailsStyles.labelText}>报价状态:</Text>
                </View>
                <View style={DetailsStyles.formContent}>
                  <Text style={DetailsStyles.contentText}>已报价</Text>
                </View>
              </View>
              <View style={DetailsStyles.formItem}>
                <View style={DetailsStyles.formLabel}>
                  <Text style={DetailsStyles.labelText}>报价:</Text>
                </View>
                <View style={DetailsStyles.formContent}>
                  <Text style={DetailsStyles.contentText}>已报价</Text>
                </View>
              </View>
            </View>
            {/* <Text style={DetailsStyles.iconRight}>&#xe61d;</Text> */}
          </ScrollView>
        </View>
      </SafeAreaViewPlus>
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
export default connect(mapStateToProps)(OfferDetails);
