/*
 * @Author: guorui
 * @description: 请填写描述信息
 * @Date: 2019-12-25 11:00:24
 * @LastEditors  : guorui
 * @LastEditTime : 2020-01-07 17:17:17
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native';
import GlobalStyles from '../../../assets/css/GlobalStyles';
import DetailsStyle from '../../../assets/css/DetailsStyle';
import BackPressComponent from '../../../components/BackPressComponent/BackPressComponent';
import PropTypes from 'prop-types';
import NavigationUtil from '../../../navigator/NavigationUtils';

export default class DriverItem extends Component {
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
  navigatorDetails() {
    let {itemData} = this.props;
    let {type} = this.props;
    if (type === 'choose') {
      DeviceEventEmitter.emit('chooseDriver', itemData);
      NavigationUtil.goPage({}, 'DriverConfirmPage');
    } else {
      NavigationUtil.goPage({userId: itemData.userId}, 'DriverDetailsPage');
    }
  }
  render() {
    let {itemData} = this.props;
    return (
      <View style={styles.itemWrapper}>
        <TouchableOpacity onPress={this.navigatorDetails.bind(this, itemData)}>
          <View style={styles.item}>
            <View style={styles.itemLeft}>
              <View style={styles.userWrapper}>
                <Text style={[DetailsStyle.labelText, styles.marginRight]}>
                  {itemData.remarkName || ''}
                </Text>
                <Text style={DetailsStyle.labelText}>
                  {itemData.mobile || ''}
                </Text>
              </View>
              {itemData.carNum ? (
                <View style={styles.userWrapper}>
                  <Text style={styles.fontStyle}>{itemData.carNum || ''}</Text>
                </View>
              ) : null}
              {itemData.carTypeDesc ? (
                <View style={styles.userWrapper}>
                  <Text style={styles.fontStyle}>
                    {itemData.carTypeDesc || ''}
                  </Text>
                </View>
              ) : null}
            </View>
            <View style={styles.itemRight}>
              <Text style={styles.icon}>&#xe61d;</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemWrapper: {
    flex: 1,
    paddingLeft: 24,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
    paddingRight: 24,
    paddingVertical: 16,
  },
  userWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  fontStyle: {
    fontSize: 15,
    marginTop: 4,
    color: GlobalStyles.themeHColor,
  },
  marginRight: {
    marginRight: 10,
  },
  icon: {
    fontFamily: 'iconfont',
    fontSize: 15,
    color: GlobalStyles.themeDisabled,
  },
});

DriverItem.defaultProps = {
  itemData: {},
};

DriverItem.propTypes = {
  itemData: PropTypes.object,
};
