/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2019-12-27 15:33:23
 * @LastEditors  : liuYang
 * @LastEditTime : 2019-12-29 10:52:24
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  PixelRatio,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
// import GlobalStyles from '../../assets/css/GlobalStyles';
import NavigationUtil from '../../navigator/NavigationUtils';
import BackPressComponent from '../../components/BackPressComponent/BackPressComponent';
import NavigationBar from '../../components/NavigatorBar/NavigationBar';
import SafeAreaViewPlus from '../../components/SafeAreaViewPlus/SafeAreaViewPlus';
import ImagePicker from 'react-native-image-crop-picker';
class UploadImage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.backPress = new BackPressComponent({
      backPress: () => this.onBackPress(),
    });
  }

  componentDidMount() {
    const {navigation} = this.props;
    const {state} = navigation;
    const {params} = state;
    console.log('params', params);
    this.backPress.componentDidMount();
  }

  componentWillUnmount() {
    this.backPress.componentWillUnmount();
  }

  onBackPress() {
    NavigationUtil.goBack(this.props.navigation);
    return true;
  }

  pickImage() {
    ImagePicker.openPicker({
      multiple: true,
    })
      .then(images => {
        console.log(images);
      })
      .catch(error => {
        console.log('error', error);
      });
  }

  render() {
    const {theme, navigation} = this.props;
    return (
      <SafeAreaViewPlus topColor={theme.themeColor}>
        <View style={styles.pageWrapper}>
          <NavigationBar
            navigation={navigation}
            leftViewShow={true}
            title={'UploadImage'}
          />
          <TouchableOpacity
            onPress={this.pickImage.bind(this)}
            style={{
              width: 100,
              height: 100,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f7f7f7',
            }}>
            <Text>choose image</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaViewPlus>
    );
  }
}

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150,
  },
});
// 如果需要引入store
const mapStateToProps = state => {
  return {
    userInfo: state.user_info.userInfo,
    theme: state.theme.theme,
  };
};
export default connect(mapStateToProps)(UploadImage);
