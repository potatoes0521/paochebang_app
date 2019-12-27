/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2019-12-27 14:52:01
 * @LastEditors  : liuYang
 * @LastEditTime : 2019-12-27 15:17:50
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import GlobalStyles from '../../../assets/css/GlobalStyles.js';
import Button from '../../../components/Button/Button';

export default class Buttons extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}
  handleClick(key) {
    this.props.onClick(key);
  }
  render() {
    let {item} = this.props;
    let btnType = 'plain';
    let fontStyles = [styles.fontStyle];
    let btnStyle = [styles.btnStyle, styles.btnRight, styles.btnBorder];
    if (item.key === 'receiptOrder') {
      btnType = 'round';
      btnStyle = [styles.btnStyle];
      fontStyles = [];
    }
    if (item.key === 'confirmDriverInfo') {
      btnStyle = [styles.btnStyle, styles.btnBorder];
    }
    return (
      <Button
        btnStyle={btnStyle}
        fontStyles={fontStyles}
        type={btnType}
        text={item.name}
        notFlex={true}
        onClick={this.handleClick.bind(this, item.key)}
      />
    );
  }
}

const styles = StyleSheet.create({
  btnStyle: {
    width: 100,
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnBorder: {
    borderWidth: 1,
    borderColor: GlobalStyles.themeDisabled,
  },
  fontStyle: {
    color: GlobalStyles.themeFontColor,
    fontSize: 14,
  },
  btnRight: {
    marginRight: 16,
  },
});

Buttons.defaultProps = {
  item: {},
  onClick: () => {},
};

Buttons.propTypes = {
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};
