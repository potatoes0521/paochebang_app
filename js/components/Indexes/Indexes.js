/*
 * @Author: liuYang
 * @description: 索引选择器
 * @path: 引入路径
 * @Date: 2019-12-26 09:42:31
 * @LastEditors  : liuYang
 * @LastEditTime : 2019-12-26 11:59:34
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View, SectionList} from 'react-native';
import PropTypes from 'prop-types';
import GlobalStyles from '../../assets/css/GlobalStyles';

export default class Indexes extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    console.log('this.props.data', this.props.data);
    let {data} = this.props;
    return (
      <View style={styles.pageWrapper}>
        <SectionList
          sections={data}
          renderItem={({item}, index) => {
            console.log('item, index', item);
            return <Text key={index}>{item.cityName}</Text>;
          }}
          renderSectionHeader={({section}) => {
            console.log('sections', section);
            return <Text>{section.initial}</Text>;
          }}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
  },
});

Indexes.defaultProps = {
  data: {},
  onClick: () => {},
};

Indexes.propTypes = {
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};
