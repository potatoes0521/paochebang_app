/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2019-12-23 11:47:17
 * @LastEditors  : liuYang
 * @LastEditTime : 2020-01-17 10:40:47
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import PropTypes from 'prop-types';
import GlobalStyles from '../../assets/css/GlobalStyles';
import noOrderImage from '../../assets/image/no_data/no_order.png';
import noLineImage from '../../assets/image/no_data/no_line.png';
import noCustomer from '../../assets/image/no_data/no_customer.png';
import NavigationUtil from '../../navigator/NavigationUtils';
import Button from '../Button/Button.js';

export default class EmptyList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}
  navigatorTo() {
    let {pageType, navigation} = this.props;
    switch (pageType) {
      case 'selling':
      case 'selling_index':
        NavigationUtil.goPage({}, 'SellingPublishPage');
        break;
      case 'vacancy':
      case 'vacancy_index':
        NavigationUtil.goPage({}, 'VacancyPublishPage');
        break;
      case 'driver':
        NavigationUtil.goPage({}, 'DriverEditPage');
        break;
      case 'order':
      case 'offer':
        navigation.navigate('Index');
        break;
      case 'login_offer':
        NavigationUtil.goPage({}, 'RegisterPage');
        break;
      case 'line':
        NavigationUtil.goPage({}, 'LineEditPage');
        break;
      case 'login_order':
        NavigationUtil.goPage({}, 'RegisterPage');
        break;
    }
  }
  render() {
    let {pageType} = this.props;
    let imgSrc = noOrderImage;
    let text = '立即发布';
    let tips = '亲，您还未发布任何消息哦～';
    let imageClassName = styles.image;
    switch (pageType) {
      case 'selling_index':
        tips = '亲，没有相关消息哦～';
        text = '去发布';
        break;
      case 'vacancy_index':
        tips = '亲，没有相关消息哦～';
        text = '去发布';
        break;
      case 'driver':
        imgSrc = noCustomer;
        text = '立即添加';
        tips = '亲，您还未添加司机哦～';
        break;
      case 'offer':
        text = '去报价';
        tips = '亲，您还没有相关报价单哦～';
        break;
      case 'order':
        text = '去报价';
        tips = '亲，您还没有相关订单哦～';
        break;
      case 'line':
        imgSrc = noLineImage;
        text = '去添加';
        tips = '亲，您还未添加常跑线路哦～';
        break;
      case 'account':
        tips = '亲，您还没有收支明细哦～';
        text = '';
        break;
      case 'login_offer':
        imgSrc = noCustomer;
        tips = '亲，登录后才可以报价哦～';
        text = '去登录';
        imageClassName = styles.imageLogin;
        break;
      case 'login_order':
        imgSrc = noCustomer;
        tips = '亲，登录后才可以下单哦～';
        text = '去登录';
        imageClassName = styles.imageLogin;
        break;
    }

    return (
      <View style={styles.pageWrapper}>
        <View style={styles.imageWrapper}>
          <Image style={imageClassName} source={imgSrc} />
        </View>
        <Text style={styles.tips}>{tips}</Text>
        {text ? (
          <Button
            text={text}
            type={'round'}
            btnStyle={[styles.btn]}
            notFlex={true}
            onClick={this.navigatorTo.bind(this)}
          />
        ) : null}
      </View>
    );
  }
}

EmptyList.defaultProps = {
  pageType: 'order',
  onClick: () => {},
};

EmptyList.propTypes = {
  pageType: PropTypes.string,
  onClick: PropTypes.func,
};

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  imageWrapper: {
    marginTop: 162,
  },
  image: {
    width: 132,
    height: 111,
  },
  imageLogin: {
    width: 132,
    height: 123,
  },
  tips: {
    fontSize: 16,
    color: GlobalStyles.themeHColor,
    marginTop: 24,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 142,
    height: 38,
    marginTop: 20,
  },
});
