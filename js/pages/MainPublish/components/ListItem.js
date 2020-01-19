/*
 * @Author: guorui
 * @description: 我发布的卖板
 * @Date: 2019-12-27 11:34:26
 * @LastEditors  : guorui
 * @LastEditTime : 2020-01-02 15:37:48
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
    let statusClassNames = [styles.statusDesc];
    let itemTextClassNames = [styles.itemText];
    let cityTextClassNames = [styles.cityText];
    let iconClassName = [GlobalStyles.icon, styles.icon];
    let timeClassName = [styles.time];
    if (type === 'selling') {
      const timeArray = item.pubTime.split('T');
      time = timeArray[0] + ' ' + timeArray[1].split('.')[0];
    } else if (type === 'vacancy') {
      const timeArray = item.pubTime.split('T');
      time = timeArray[0] + ' ' + timeArray[1].split('.')[0];
    }
    if (item.isActive !== 1) {
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
            {type === 'selling' ? (
              <Text style={statusClassNames}>
                {item.statusOfMySaleToPalletList || ''}
              </Text>
            ) : (
              <Text style={statusClassNames}>
                {item.statusOfMyVacantPalletList || ''}
              </Text>
            )}
          </View>
          <View style={styles.main}>
            <View style={styles.city}>
              <Text style={cityTextClassNames}>{item.sendCityName || ''}</Text>
              <Text style={iconClassName}>&#xe60f;</Text>
              <Text style={cityTextClassNames}>
                {item.receiveCityName || ''}
              </Text>
            </View>
            {type === 'selling' ? (
              <View style={styles.item}>
                <Text style={itemTextClassNames}>
                  车辆信息:{item.carAmount || 0} 台 {item.carInfo || ''}待发
                </Text>
              </View>
            ) : (
              <View style={styles.item}>
                <Text style={itemTextClassNames}>
                  余位:{item.vacantAmount || 0}
                </Text>
              </View>
            )}
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
