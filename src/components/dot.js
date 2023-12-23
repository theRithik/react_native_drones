import {StyleSheet, useWindowDimensions} from 'react-native';
import React from 'react';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {useWindowDimensions} from 'react-native';
const Dot = ({index, x}) => {
  const {width,height} = useWindowDimensions();

  const animatedDotStyle = useAnimatedStyle(() => {
    const widthAnimation = interpolate(
      x.value,
      [
        (index - 1) * width,
        index * width,
        (index + 1) * width,
      ],
      [10, 20, 10],
      Extrapolation.CLAMP,
    );

    const opacityAnimation = interpolate(
      x.value,
      [
        (index - 1) * width,
        index *width,
        (index + 1) *width,
      ],
      [0.5, 1, 0.5],
      Extrapolation.CLAMP,
    );
    return {
      width: widthAnimation,
      opacity: opacityAnimation,
    };
  });

  const animatedColor = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      x.value,
      [0, width, 2 * width],
      ['#005b4f', '#1e2169', '#F15937'],
    );

    return {
      backgroundColor: backgroundColor,
    };
  });

  return (
    <Animated.View style={[styles.dots, animatedDotStyle, animatedColor]} />
  );
};

export default Dot;

const styles = StyleSheet.create({
  dots: {
    height: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },
});