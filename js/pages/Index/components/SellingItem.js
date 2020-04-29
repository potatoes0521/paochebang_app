/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @Date: 2019-12-02 14:14:44
 * @LastEditors: liuYang
 * @LastEditTime: 2019-12-02 15:54:53
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

export default class SellingItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}
  handleOnPress() {
    this.props.onPress(this.props.itemData);
  }
  render() {
    let {itemData} = this.props;
    return (
      <TouchableOpacity onPress={this.handleOnPress.bind(this, itemData)}>
        <View style={styles.itemWrapper}>
          <View style={styles.item}>
            <View style={styles.itemMsg}>
              <View style={styles.citys}>
                <Text style={styles.citysText}>城市</Text>
                <Text style={styles.icon}>&#xe60f;</Text>
              </View>
            </View>
            <View style={styles.itemBtn}>
              <View style={styles.quoteBtn}>
                <Text>报价</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  itemWrapper: {
    flex: 1,
    paddingLeft: 12,
    paddingRight: 12,
  },
  item: {
    flex: 1,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 16,
    paddingBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    fontSize: 30,
    fontFamily: 'iconfont',
  },
});

SellingItem.defaultProps = {
  itemData: {},
  onPress: () => {},
};

SellingItem.propTypes = {
  itemData: PropTypes.object,
  onPress: PropTypes.func.isRequired,
};
