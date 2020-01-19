import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View, Animated, Dimensions} from 'react-native';
import {
  alignItemsMap,
  getTouchableComponent,
  isAndroid,
  touchableBackground,
  DEFAULT_ACTIVE_OPACITY,
} from './shared';

const {width: WIDTH} = Dimensions.get('window');
const SHADOW_SPACE = 10;
const TEXT_HEIGHT = 22;

export default class ActionButtonItem extends Component {
  static get defaultProps() {
    return {
      active: true,
      spaceBetween: 15,
      useNativeFeedback: true,
      activeOpacity: DEFAULT_ACTIVE_OPACITY,
      fixNativeFeedbackRadius: false,
      nativeFeedbackRippleColor: 'rgba(255,255,255,0.75)',
    };
  }

  static get propTypes() {
    return {
      active: PropTypes.bool,
      useNativeFeedback: PropTypes.bool,
      fixNativeFeedbackRadius: PropTypes.bool,
      nativeFeedbackRippleColor: PropTypes.string,
      activeOpacity: PropTypes.number,
    };
  }

  render() {
    const {size, position, verticalOrientation, spacing} = this.props;

    if (!this.props.active) {
      return null;
    }

    const animatedViewStyle = {
      marginBottom: -SHADOW_SPACE,
      alignItems: alignItemsMap[position],

      // backgroundColor: this.props.buttonColor,
      opacity: this.props.anim,
      transform: [
        {
          translateY: this.props.anim.interpolate({
            inputRange: [0, 1],
            outputRange: [verticalOrientation === 'down' ? -40 : 40, 0],
          }),
        },
      ],
    };

    const buttonStyle = {
      justifyContent: 'center',
      alignItems: 'center',
      color: '#fff',
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: this.props.buttonColor || this.props.btnColor,
    };

    if (position !== 'center') {
      buttonStyle[position] = (this.props.parentSize - size) / 2;
    }

    const Touchable = getTouchableComponent(this.props.useNativeFeedback);

    const parentStyle =
      isAndroid && this.props.fixNativeFeedbackRadius
        ? {
            height: size,
            marginBottom: spacing,
            right: this.props.offsetX,
            borderRadius: this.props.size / 2,
          }
        : {
            paddingHorizontal: this.props.offsetX,
            height: size + SHADOW_SPACE + spacing,
          };
    return (
      <Animated.View
        pointerEvents="box-none"
        style={[animatedViewStyle, parentStyle]}>
        <View>
          <Touchable
            testID={this.props.testID}
            accessibilityLabel={this.props.accessibilityLabel}
            background={touchableBackground(
              this.props.nativeFeedbackRippleColor,
              this.props.fixNativeFeedbackRadius,
            )}
            activeOpacity={this.props.activeOpacity || DEFAULT_ACTIVE_OPACITY}
            onPress={this.props.onPress}>
            <View style={buttonStyle}>
              <Text style={styles.btnText}>{this.props.title}</Text>
            </View>
          </Touchable>
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  textContainer: {
    position: 'absolute',
    paddingVertical: isAndroid ? 2 : 3,
    paddingHorizontal: 8,
    borderRadius: 3,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#eee',
    backgroundColor: 'white',
    height: TEXT_HEIGHT,
  },
  text: {
    flex: 1,
    fontSize: 12,
    color: '#444',
  },
  btnText: {
    color: '#fff',
  },
});
