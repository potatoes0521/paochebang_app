/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2019-12-30 09:54:07
 * @LastEditors  : liuYang
 * @LastEditTime : 2019-12-30 10:27:07
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import GlobalStyles from '../../assets/css/GlobalStyles';

export default class Radio extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  chooseRadio(index) {
    let {options} = this.props;
    this.props.onClick(options[index], index);
  }
  render() {
    let {options, activeIndex} = this.props;
    const optionsList = options.map((item, index) => {
      let radioClassName = [styles.radio];
      if (activeIndex === index) {
        radioClassName.push(styles.activeRadio);
      }
      return (
        <TouchableOpacity
          onPress={this.chooseRadio.bind(this, index)}
          style={styles.listItem}
          key={index}>
          <View style={radioClassName}>
            {activeIndex === index ? (
              <View style={styles.radioPadding} />
            ) : null}
          </View>
          <Text style={styles.label}>{item.label}</Text>
        </TouchableOpacity>
      );
    });
    return <View style={styles.listWrapper}>{optionsList}</View>;
  }
}

const styles = StyleSheet.create({
  listWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  listItem: {
    height: 20,
    marginLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radio: {
    width: 14,
    height: 14,
    borderColor: GlobalStyles.themeHColor,
    borderWidth: 1,
    borderRadius: 7,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeRadio: {
    borderColor: GlobalStyles.themeColor,
  },
  radioPadding: {
    width: 6,
    height: 6,
    backgroundColor: GlobalStyles.themeColor,
    borderRadius: 3,
  },
  label: {
    color: GlobalStyles.themeFontColor,
    fontSize: 14,
  },
});

Radio.defaultProps = {
  options: [],
  activeIndex: 0,
  onClick: () => {},
};

Radio.propTypes = {
  activeIndex: PropTypes.number.isRequired,
  options: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};
