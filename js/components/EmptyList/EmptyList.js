/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2019-12-23 11:47:17
 * @LastEditors  : guorui
 * @LastEditTime : 2019-12-27 17:15:37
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
        break;
      case 'vacancy':
      case 'vacancy_index':
        break;
      case 'driver':
        navigation.navigate('DriverEdit');
        break;
      case 'order':
      case 'offer':
        navigation.navigate('Index');
        break;
      case 'login_offer':
        break;
      case 'line':
        break;
      case 'login_order':
        break;
    }
  }
  render() {
    let {pageType} = this.props;
    let imgSrc = noOrderImage;
    let text = '立即发布';
    let tips = '亲，您还未发布任何消息哦～';
    switch (pageType) {
      case 'selling_index':
        tips = '亲，没有相关消息哦～';
        break;
      case 'vacancy_index':
        tips = '亲，没有相关消息哦～';
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
        break;
      case 'login_order':
        imgSrc = noCustomer;
        tips = '亲，登录后才可以下单哦～';
        text = '去登录';
        break;
    }
    return (
      <View style={styles.pageWrapper}>
        <View style={styles.imageWrapper}>
          <Image style={styles.image} source={imgSrc} />
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
    justifyContent: 'center',
  },
  imageWrapper: {
    marginTop: 162,
  },
  image: {
    width: 132,
    height: 111,
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
