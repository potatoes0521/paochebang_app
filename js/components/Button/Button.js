/*
 * @Author: liuYang
 * @description: 封装按钮组件
 * @path: 引入路径
 * @Date: 2019-12-20 11:47:21
 * @LastEditors  : liuYang
 * @LastEditTime : 2019-12-20 11:47:48
 * @mustParam: 必传参数
 *  btnStyle 样式 数组 数组里是类名或者是个对象
 *  type plain 镂空 round 充满
 *  text 要展示的文字 字符串
 *  fontStyles 文字样式 数组 数组里是类名或者是个对象
 *  onClick 被点击的时候
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import GlobalStyles from '../../assets/css/GlobalStyles';

export default class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}
  handleClick() {
    this.props.onClick();
  }
  render() {
    const {btnStyle, text, type, fontStyles} = this.props;
    let btnStyles = [styles.btnDefault];
    let textStyle = [styles.textColor];
    if (type === 'plain') {
      btnStyles.push(styles.plain);
      textStyle.push(styles.textColorPlain);
    } else if (type === 'round') {
      btnStyles.push(styles.round);
      textStyle.push(styles.textColorRound);
    }
    if (btnStyle && btnStyle.length) {
      btnStyles = [...btnStyles, ...btnStyle];
    }
    if (fontStyles) {
      textStyle = [...textStyle, ...fontStyles];
    }
    return (
      <TouchableOpacity style={btnStyles} onPress={this.handleClick.bind(this)}>
        <Text style={textStyle}>{text}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  btnDefault: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 4,
  },
  plain: {
    borderWidth: 1,
    borderColor: GlobalStyles.themeColor,
    height: 38,
    backgroundColor: '#fff',
  },
  round: {
    height: 40,
    backgroundColor: GlobalStyles.themeColor,
  },
  textColorPlain: {
    color: GlobalStyles.themeColor,
  },
  textColorRound: {
    color: '#ffffff',
  },
  textColor: {
    color: GlobalStyles.themeFontColor,
    fontSize: 15,
    fontWeight: '700',
  },
});

Button.defaultProps = {
  type: '',
  btnStyle: [],
  text: '按钮',
  fontStyle: [],
  onClick: () => {},
};

Button.propTypes = {
  type: PropTypes.string,
  btnStyle: PropTypes.array.isRequired,
  text: PropTypes.string.isRequired,
  fontStyle: PropTypes.array,
  onClick: PropTypes.func.isRequired,
};
