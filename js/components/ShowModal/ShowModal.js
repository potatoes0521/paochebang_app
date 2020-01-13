/*
 * @Author: guorui
 * @description: 删除线路提示框
 * @Date: 2020-01-13 15:16:39
 * @LastEditors  : guorui
 * @LastEditTime : 2020-01-13 17:26:46
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import GlobalStyles from '../../assets/css/GlobalStyles.js';
import Button from '../Button/Button';

export default class ShowModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}
  cancel() {
    this.props.onClick('cancel');
  }
  submit() {
    this.props.onClick('submit');
  }
  stopTipsCard(e) {
    e.stopPropagation();
  }
  render() {
    return (
      <View style={styles.alertWrapper}>
        <View style={styles.alertCard} onClick={this.stopTipsCard.bind(this)}>
          <View style={styles.titleStyle}>
            <Text style={styles.title}>标题</Text>
            <Text style={styles.tips}>是否删除选中的线路</Text>
          </View>
          <View style={styles.btnStyle}>
            <Button
              btnStyle={[styles.btnLeft]}
              fontStyles={[styles.leftFontStyle]}
              text={'取消'}
              onClick={this.cancel.bind(this, 'cancel')}
            />
            <Button
              fontStyles={[styles.btnRight]}
              text={'确定'}
              onClick={this.submit.bind(this, 'submit')}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  alertWrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 44,
    width: GlobalStyles.window_width,
    height: GlobalStyles.window_height,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 5,
  },
  alertCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    width: 287,
    height: 170,
    justifyContent: 'space-between',
  },
  titleStyle: {
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 24,
    marginBottom: 20,
    color: GlobalStyles.themeFontColor,
  },
  tips: {
    fontSize: 15,
    color: GlobalStyles.themeHColor,
  },
  btnStyle: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
  },
  btnLeft: {
    borderRightWidth: 1,
    borderRightColor: '#F5F5F5',
  },
  leftFontStyle: {
    fontSize: 16,
    fontWeight: '700',
    color: GlobalStyles.themeHColor,
  },
  btnRight: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2A80C0',
  },
});

ShowModal.defaultProps = {
  onClick: () => {},
};

ShowModal.propTypes = {
  onClick: PropTypes.func.isRequired,
};
