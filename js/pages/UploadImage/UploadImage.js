/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2019-12-27 15:33:23
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-01-17 18:27:49
 * @mustParam: 必传参数
 * // pageType = delivery 交车单  pickUp 提车单
    // type=edit 编辑  see 看
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
  ScrollView,
  DeviceEventEmitter,
} from 'react-native';
import {connect} from 'react-redux';
// import GlobalStyles from '../../assets/css/GlobalStyles';
import NavigationUtil from '../../navigator/NavigationUtils';
import BackPressComponent from '../../components/BackPressComponent/BackPressComponent';
import NavigationBar from '../../components/NavigatorBar/NavigationBar';
import SafeAreaViewPlus from '../../components/SafeAreaViewPlus/SafeAreaViewPlus';
import {uploadFile} from '../../utils/uploadFile.js';
import Title from './components/Title.js';
import GlobalStyles from '../../assets/css/GlobalStyles';
import api from '../../api/index.js';
import Toast from 'react-native-easy-toast';
import Button from '../../components/Button/Button.js';
import ActionSheet from '../../components/ActionSheet/ActionSheet';
import Loading from '../../components/Loading/Loading.js';
import PreviewImage from '../../components/PreviewImage/PreviewImage';

class UploadImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickUpCarList: [], // 提车单
      carList: [], // 验车照片
      deliveryCarList: [], // 交车单
      pageParams: {},
      showPreviewImage: false,
      currentArray: [],
      current: 0,
      uploadLoading: false,
      showText: '',
      image: '',
    };
    this.backPress = new BackPressComponent({
      backPress: () => this.onBackPress(),
    });
    this.toastRef = React.createRef();
  }

  componentDidMount() {
    const {navigation} = this.props;
    const {state} = navigation;
    const {params} = state;
    console.log('params', params);
    this.handleType(params);
    this.backPress.componentDidMount();
  }

  componentWillUnmount() {
    this.backPress.componentWillUnmount();
  }

  onBackPress() {
    NavigationUtil.goBack(this.props.navigation);
    return true;
  }
  handleType(params) {
    // pageType = delivery 交车单  pickUp 提车单
    // type=edit 编辑  see 看
    this.setState(
      {
        pageParams: params,
      },
      () => {
        if (params.type === 'see') {
          this.handleSeeDetails();
        }
      },
    );
  }
  handleSeeDetails() {
    let {pageParams} = this.state;
    let sendData = {
      orderCode: pageParams.orderCode,
    };
    if (pageParams.pageType === 'pickUp') {
      api.order.seePickUpCarFilesDetails(sendData, this).then(res => {
        if (!res.data) {
          return;
        }
        const pickUpCarList = res.data
          .filter(item => +item.fileType === 1)
          .map(item => {
            return item.fileUrl;
          });
        const carList = res.data
          .filter(item => +item.fileType === 2)
          .map(item => {
            return item.fileUrl;
          });
        this.setState({
          pickUpCarList,
          carList,
        });
      });
    } else {
      api.order.seeDeliveryCarFilesDetails(sendData, this).then(res => {
        if (!res.data) {
          return;
        }
        const deliveryCarList = res.data.map(item => item.fileUrl);
        this.setState({
          deliveryCarList,
        });
      });
    }
  }
  chooseImage(type) {
    let {carList, pickUpCarList, deliveryCarList} = this.state;
    // let count = 9;
    // 判断是那个要添加图片
    if (this.chooseType === 'delivery') {
      // count -= deliveryCarList.length;
    } else if (this.chooseType === 'car') {
      // count -= carList.length;
    } else if (this.chooseType === 'pickUp') {
      // count -= pickUpCarList.length;
    }
    uploadFile({
      multiple: true,
      that: this,
      businessType: this.businessType,
      openType: type,
    })
      .then(res => {
        let data = {};
        console.log('res', res);
        // 判断更新哪个数组
        if (this.chooseType === 'delivery') {
          data = {
            deliveryCarList: [...deliveryCarList, ...res],
          };
        } else if (this.chooseType === 'car') {
          data = {
            carList: [...carList, ...res],
          };
        } else if (this.chooseType === 'pickUp') {
          data = {
            pickUpCarList: [...pickUpCarList, ...res],
          };
        }
        console.log('data', data);
        this.setState(data);
      })
      .catch(error => {
        console.log('error', error);
      });
  }
  deleteImage(type, index) {
    let {carList, pickUpCarList, deliveryCarList} = this.state;
    let data = {};
    // 判断更新哪个数组
    if (type === 'delivery') {
      if (deliveryCarList.length <= 0) {
        return;
      }
      deliveryCarList.splice(index, 1);
      data = {
        deliveryCarList,
      };
    } else if (type === 'car') {
      if (carList.length <= 0) {
        return;
      }
      carList.splice(index, 1);
      data = {
        carList,
      };
    } else if (type === 'pickUp') {
      if (pickUpCarList.length <= 0) {
        return;
      }
      pickUpCarList.splice(index, 1);
      data = {
        pickUpCarList,
      };
    }
    this.setState(data);
  }
  submit() {
    let {carList, pickUpCarList, deliveryCarList, pageParams} = this.state;
    if (
      pageParams.pageType === 'pickUp' &&
      !pickUpCarList.length &&
      !carList.length
    ) {
      this.toastRef.current.show('至少上传一张照片');
      return;
    }
    if (pageParams.pageType === 'delivery' && !deliveryCarList.length) {
      this.toastRef.current.show('至少上传一张照片');
      return;
    }
    let orderFileList = [];
    if (pageParams.pageType === 'pickUp') {
      const pickUpCarListMap = pickUpCarList.map(item => {
        return {
          fileType: 1,
          fileUrl: item,
        };
      });
      const carListMap = carList.map(item => {
        return {
          fileType: 2,
          fileUrl: item,
        };
      });
      orderFileList = [...pickUpCarListMap, ...carListMap];
    } else {
      orderFileList = deliveryCarList.map(item => {
        return {
          fileType: 3,
          fileUrl: item,
        };
      });
    }
    let sendData = {
      orderCode: pageParams.orderCode,
      orderFileList: orderFileList,
    };
    api.order.editOrderFiles(sendData, this).then(() => {
      this.toastRef.current.show('提交成功');
      DeviceEventEmitter.emit('refreshOrderDetails', {});
      DeviceEventEmitter.emit('refreshOrderList', {});
      setTimeout(() => {
        NavigationUtil.goBack(this.props.navigation);
      }, 1800);
    });
  }
  openActionSheet(type) {
    this.chooseType = type;
    if (type === 'pickUp') {
      this.businessType = 2;
    } else if (type === 'car') {
      this.businessType = 3;
    } else {
      this.businessType = 4;
    }
    this.ActionSheet.show();
  }
  chooseActionSheet(index) {
    if (index === 2) {
      return;
    }
    let type = '';
    if (index === 0) {
      type = 'camera';
    } else if (index === 1) {
      type = 'album';
    }
    this.chooseImage(type);
  }
  previewImageShow(image) {
    this.setState({
      image,
    });
  }
  previewImageHide() {
    this.setState({
      image: '',
    });
  }
  render() {
    const {theme, navigation} = this.props;
    const {
      image,
      carList,
      pickUpCarList,
      deliveryCarList,
      pageParams,
      uploadLoading,
      showText,
    } = this.state;
    console.log('currentArray', carList, pickUpCarList, deliveryCarList);
    // 验车照片
    const carListRender = carList.map((item, index) => {
      return (
        <View style={styles.itemWrapper} key={index}>
          {pageParams.type !== 'see' ? (
            <TouchableOpacity
              onPress={this.deleteImage.bind(this, 'car', index)}
              style={styles.delete}>
              <Text style={[GlobalStyles.icon, styles.deleteIcon]}>
                &#xe666;
              </Text>
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity
            onPress={this.previewImageShow.bind(this, item)}
            style={styles.imageItem}>
            <Image
              style={styles.image}
              resizeMode={'contain'}
              source={{
                uri: item || '',
              }}
            />
          </TouchableOpacity>
        </View>
      );
    });
    const pickUpCarListRender = pickUpCarList.map((item, index) => {
      return (
        <View style={styles.itemWrapper} key={index}>
          {pageParams.type !== 'see' ? (
            <TouchableOpacity
              onPress={this.deleteImage.bind(this, 'pickUp', index)}
              style={styles.delete}>
              <Text style={[GlobalStyles.icon, styles.deleteIcon]}>
                &#xe666;
              </Text>
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity
            onPress={this.previewImageShow.bind(this, item)}
            style={styles.imageItem}>
            <Image
              style={styles.image}
              resizeMode={'contain'}
              source={{
                uri: item,
              }}
            />
          </TouchableOpacity>
        </View>
      );
    });
    const deliveryCarListRender = deliveryCarList.map((item, index) => {
      console.log('item', item);
      return (
        <View style={styles.itemWrapper}>
          {pageParams.type !== 'see' ? (
            <TouchableOpacity
              onPress={this.deleteImage.bind(this, 'delivery', index)}
              style={styles.delete}>
              <Text style={[GlobalStyles.icon, styles.deleteIcon]}>
                &#xe666;
              </Text>
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity
            onPress={this.previewImageShow.bind(this, item)}
            style={styles.imageItem}>
            <Image
              style={styles.image}
              resizeMode={'contain'}
              source={{
                uri: item,
              }}
            />
          </TouchableOpacity>
        </View>
      );
    });
    return (
      <SafeAreaViewPlus topColor={theme.themeColor}>
        <View style={styles.pageWrapper}>
          <NavigationBar
            navigation={navigation}
            leftViewShow={true}
            title={'上传照片'}
          />
          <ScrollView>
            {pageParams.pageType === 'pickUp' ? (
              <>
                <Title title={'提车单照片'} />
                <View style={styles.imagesWrapper}>
                  {pickUpCarListRender}
                  {pageParams.type !== 'see' ? (
                    <TouchableOpacity
                      onPress={this.openActionSheet.bind(this, 'pickUp')}
                      style={[styles.imageItem, styles.addItem]}>
                      <View style={styles.imageAdd}>
                        <Text style={[GlobalStyles.icon, styles.addIcon]}>
                          &#xe668;
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ) : null}
                </View>
                <Title title={'验车照片'} />
                <View style={styles.imagesWrapper}>
                  {carListRender}
                  {pageParams.type !== 'see' ? (
                    <TouchableOpacity
                      onPress={this.openActionSheet.bind(this, 'car')}
                      style={[styles.imageItem, styles.addItem]}>
                      <View style={styles.imageAdd}>
                        <Text style={[GlobalStyles.icon, styles.addIcon]}>
                          &#xe668;
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ) : null}
                </View>
              </>
            ) : (
              <>
                <Title title={'交车单照片'} />
                <View style={styles.imagesWrapper}>
                  {deliveryCarListRender}
                  {pageParams.type !== 'see' ? (
                    <TouchableOpacity
                      onPress={this.openActionSheet.bind(this, 'delivery')}
                      style={[styles.imageItem, styles.addItem]}>
                      <View style={styles.imageAdd}>
                        <Text style={[GlobalStyles.icon, styles.addIcon]}>
                          &#xe668;
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ) : null}
                </View>
              </>
            )}
          </ScrollView>
          {pageParams.type === 'see' ? null : (
            <View style={styles.btnWrapper}>
              <Button
                text={'提交'}
                type={'round'}
                onClick={this.submit.bind(this)}
              />
            </View>
          )}
          <Toast
            ref={this.toastRef}
            position={'center'}
            defaultCloseDelay={3000}
          />
          {/* 动作指示器 */}
          <ActionSheet
            ref={o => (this.ActionSheet = o)}
            title={'请选择结算方式'}
            options={['相机', '相册', '取消']}
            tintColor={GlobalStyles.themeFontColor}
            cancelButtonIndex={2}
            onPress={this.chooseActionSheet.bind(this)}
          />
          <PreviewImage
            image={image}
            onClose={this.previewImageHide.bind(this)}
          />
          {uploadLoading && <Loading LoadingText={showText} />}
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
  imagesWrapper: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  itemWrapper: {
    width: parseInt((GlobalStyles.window_width - 80) / 3, 10),
    height: parseInt((GlobalStyles.window_width - 80) / 3, 10),
    margin: 10,
    position: 'relative',
  },
  imageItem: {
    backgroundColor: '#F5FAFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  delete: {
    width: 12,
    height: 12,
    borderWidth: 1,
    borderColor: '#fff',
    position: 'absolute',
    right: -5,
    top: -5,
    backgroundColor: '#EF4E4E',
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  deleteIcon: {
    color: '#fff',
    fontSize: 7,
  },
  imageAdd: {
    width: 62,
    height: 62,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 31,
  },
  image: {
    width: parseInt((GlobalStyles.window_width - 80) / 3, 10),
    height: parseInt((GlobalStyles.window_width - 80) / 3, 10),
    borderRadius: 4,
    backgroundColor: '#F5FAFF',
  },
  addItem: {
    width: parseInt((GlobalStyles.window_width - 80) / 3, 10),
    height: parseInt((GlobalStyles.window_width - 80) / 3, 10),
    margin: 10,
  },
  addIcon: {
    fontSize: 32,
    color: '#fff',
  },
  btnWrapper: {
    height: 70,
    paddingVertical: 15,
    paddingHorizontal: 20,
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
