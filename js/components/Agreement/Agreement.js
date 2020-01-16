/*
 * @Author: guorui
 * @description: 注册协议
 * @Date: 2020-01-16 19:17:26
 * @LastEditors  : guorui
 * @LastEditTime : 2020-01-16 19:32:06
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, Text, ScrollView, View} from 'react-native';
import PropTypes from 'prop-types';
import Button from '../Button/Button.js';
import GlobalStyles from '../../assets/css/GlobalStyles';
import api from '../../api';

export default class Agreement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agreementsParagraphList: [], //协议内容，weight:0  字体加粗， weight:1 字体不加错
      agreementsMainList: [],
    };
  }

  componentDidMount() {
    this.getAgreementFile();
  }

  componentWillUnmount() {}
  handleClickModel() {
    this.props.onClick();
  }
  /**
   * 获取注册协议
   * @return void
   */
  getAgreementFile() {
    api.user.getAgreementFile({}, this).then(res => {
      if (!res) {
        return;
      }
      this.setState({
        agreementsMainList: res.main,
        agreementsParagraphList: res.paragraph,
      });
    });
  }
  render() {
    let {agreementsMainList, agreementsParagraphList} = this.state;
    const agreementsParagraphListR =
      agreementsParagraphList &&
      agreementsParagraphList.map(item => (
        <Text style={[styles.paragraph, styles.agreementsFont]} key={item}>
          {item.text}
        </Text>
      ));
    const agreementsList =
      agreementsMainList &&
      agreementsMainList.map((item, index) => {
        const textClassName = [styles.agreementsFont];
        if (item.weight === '1') {
          textClassName.push(styles.agreementsFontBold);
        }
        return (
          <Text style={textClassName} key={index}>
            {item.text}
          </Text>
        );
      });
    return this.props.visible ? (
      <View style={styles.agreementsWrapper}>
        <View style={styles.agreementsBox}>
          <Text style={styles.agreementsTitle}>跑车帮用户注册服务协议</Text>
          <View style={styles.line} />
          <ScrollView>
            <View style={styles.agreementsContent}>
              {agreementsParagraphListR}
              {agreementsList}
            </View>
          </ScrollView>
          <View style={styles.agreementBtn}>
            <Button
              btnStyle={[styles.agreementsButton]}
              type={'round'}
              text={'我知道了'}
              onClick={this.handleClickModel.bind(this)}
            />
          </View>
        </View>
      </View>
    ) : null;
  }
}

const styles = StyleSheet.create({
  agreementsWrapper: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 5,
  },
  agreementsBox: {
    flex: 1,
    height: 381,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 0,
    // bottom: 0,
    left: 0,
    right: 0,
    marginHorizontal: 44,
    paddingHorizontal: 11,
    paddingVertical: 16,
    borderRadius: 8,
    marginTop: 152,
  },
  agreementsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: GlobalStyles.themeFontColor,
    textAlign: 'center',
  },
  line: {
    height: 1,
    marginVertical: 14,
    backgroundColor: '#F5F5F5',
  },
  agreementsContent: {
    flex: 1,
  },
  agreementBtn: {
    height: 40,
    marginTop: 16,
  },
  agreementsButton: {
    flex: 1,
  },
  paragraph: {
    marginBottom: 10,
    lineHeight: 22,
  },
  agreementsFont: {
    color: GlobalStyles.themeTipColor,
    textAlign: 'justify',
    lineHeight: 22,
  },
  agreementsFontBold: {
    fontWeight: '700',
    color: GlobalStyles.themeFontColor,
  },
});

Agreement.defaultProps = {
  visible: false,
  onClick: () => {},
};

Agreement.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
};
