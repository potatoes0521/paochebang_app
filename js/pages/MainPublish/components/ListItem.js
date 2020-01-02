/*
 * @Author: guorui
 * @description: 我发布的卖板
 * @Date: 2019-12-27 11:34:26
 * @LastEditors  : guorui
 * @LastEditTime : 2020-01-02 14:08:55
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import GlobalStyles from '../../../assets/css/GlobalStyles';
import NavigationUtil from '../../../navigator/NavigationUtils.js';
import DetailsStyle from '../../../assets/css/DetailsStyle';
import CardListItemStyles from '../../../assets/css/CardListItemStyle';
export default class PublishItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}
  navigatorTo() {
    let {item} = this.props.item;
    let {type} = this.props;
    let pageUrl = 'SellingDetailsPage';
    if (type === 'vacancy') {
      pageUrl = 'VacancyDetailsPage';
    }
    NavigationUtil.goPage(item, pageUrl);
  }
  render() {
    let {item} = this.props.item;
    let {type} = this.props;
    let time = '';
    let statusClassNames = [styles.status];
    let itemTextClassNames = [styles.itemText];
    let cityTextClassNames = [styles.cityText];
    let iconClassName = [GlobalStyles.icon, styles.icon];
    let timeClassName = [styles.time];
    if (type === 'selling') {
      time = item.inquiryTimeDesc;
      if (item.status === 10 || item.takeStatus === 10) {
        statusClassNames.push(styles.themeSubColor);
      } else if (item.status === 20 || item.takeStatus === 20) {
        statusClassNames.push(styles.themeColor);
      }
    } else if (type === 'vacancy') {
      time = item.inquiryTimeDesc;
    }
    if (
      item.status === 30 ||
      item.status === 40 ||
      item.takeStatus === 30 ||
      item.takeStatus === 40
    ) {
      statusClassNames.push(DetailsStyle.textThemeDisabled);
      itemTextClassNames.push(DetailsStyle.textThemeDisabled);
      cityTextClassNames.push(DetailsStyle.textThemeDisabled);
      iconClassName.push(DetailsStyle.textThemeDisabled);
      timeClassName.push(DetailsStyle.textThemeDisabled);
    }
    return (
      <View style={styles.itemWrapper}>
        <TouchableOpacity onPress={this.navigatorTo.bind(this)}>
          <View style={styles.title}>
            <Text style={timeClassName}>{time || ''}</Text>
            <Text style={statusClassNames}>{item.statusDesc || ''}</Text>
          </View>
          <View style={styles.main}>
            <View style={styles.city}>
              <Text style={cityTextClassNames}>{item.sendCityName || ''}</Text>
              <Text style={iconClassName}>&#xe60f;</Text>
              <Text style={cityTextClassNames}>
                {item.receiveCityName || ''}
              </Text>
            </View>
            <View style={styles.item}>
              <Text style={itemTextClassNames}>
                车辆信息:{item.carAmount || 0} 台 {item.carInfo || ''}待发
              </Text>
            </View>
            <View style={styles.item}>
              <Text style={itemTextClassNames}>
                有效期至:{(item.dueTime && item.dueTime.split('T')[0]) || ''}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create(CardListItemStyles);

PublishItem.defaultProps = {
  item: {},
  type: 'selling',
  onClick: () => {},
};

PublishItem.propTypes = {
  item: PropTypes.object,
  onClick: PropTypes.func.isRequired,
};
