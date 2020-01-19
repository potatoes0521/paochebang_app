/*
 * @Author: liuYang
 * @description: 索引选择器
 * @path: 引入路径
 * @Date: 2019-12-26 09:42:31
 * @LastEditors  : liuYang
 * @LastEditTime : 2019-12-26 18:09:08
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import GlobalStyles from '../../assets/css/GlobalStyles';
const ITEM_HEIGHT = 50; //item的高度
const HEADER_HEIGHT = 24; //分组头部的高度
const SEPARATOR_HEIGHT = 0; //分割线的高度

export default class Indexes extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.indexes = React.createRef();
  }

  componentDidMount() {}

  componentWillUnmount() {}
  _getItemLayout(data, index) {
    let [length, separator, header] = [
      ITEM_HEIGHT,
      SEPARATOR_HEIGHT,
      HEADER_HEIGHT,
    ];
    return {
      length,
      offset: (length + separator) * index + header,
      index,
    };
  }
  jumpTarget(index) {
    console.log('this.indexes.current', this.indexes.current);
    this.indexes.current.scrollToLocation({
      animated: true,
      sectionIndex: Math.round(index),
      itemIndex: 0,
      viewOffset: 75,
    });
  }
  render() {
    console.log('this.props.data', this.props.data);
    let {data} = this.props;
    const keyList = data.map((item, index) => (
      <TouchableOpacity
        onPress={this.jumpTarget.bind(this, index)}
        style={styles.listItem}>
        <Text style={styles.listItemText}>{item.initial}</Text>
      </TouchableOpacity>
    ));
    return (
      <View style={styles.pageWrapper}>
        <SectionList
          ref={this.indexes}
          sections={data}
          initialNumToRender={50}
          renderItem={({item, index, section}) => {
            return (
              <>
                <View style={styles.sectionItem}>
                  <Text style={styles.sectionItemText} key={index}>
                    {item.cityName}
                  </Text>
                </View>
                {index !== section.data.length - 1 && (
                  <View style={styles.line} />
                )}
              </>
            );
          }}
          renderSectionHeader={({section}) => {
            return (
              <View style={styles.sectionTitle}>
                <Text style={styles.sectionTitleText}>{section.initial}</Text>
              </View>
            );
          }}
          keyExtractor={(item, index) => {
            return item.cityId;
          }}
          getItemLayout={this._getItemLayout}
          onScrollToIndexFailed={() => {
            console.log('object');
          }}
        />
        <View style={styles.keyList}>{keyList}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
  },
  sectionTitle: {
    flexDirection: 'row',
    height: 25,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    paddingLeft: 12,
  },
  sectionTitleText: {
    color: GlobalStyles.themeHColor,
    fontSize: 16,
  },
  sectionItem: {
    marginLeft: 12,
    marginRight: 30,
    paddingVertical: 13,
  },
  line: {
    height: 1,
    backgroundColor: '#f5f5f5',
    marginLeft: 12,
    marginRight: 30,
  },
  keyList: {
    position: 'absolute',
    right: 12,
    height: GlobalStyles.window_height,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItem: {
    height: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 2,
  },
  listItemText: {
    color: GlobalStyles.themeColor,
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
