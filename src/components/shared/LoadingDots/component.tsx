import Animated, {
  useAnimatedStyle,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { $mainGray } from '../../../utils/colors';
import React from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  dot: {
    backgroundColor: $mainGray,
    height: 20,
    width: 20,
    borderRadius: 10,
    margin: 2,
  },
});

const LoadingDots = () => {
  const step = 100;

  const d1 = useAnimatedStyle(() => ({
    opacity: withRepeat(
      withSequence(
        withDelay(step * 3, withTiming(0.6)),
        withDelay(step * 5, withTiming(0)),
      ),
      -1,
    ),
  }));
  const d2 = useAnimatedStyle(() => ({
    opacity: withRepeat(
      withSequence(
        withDelay(step * 4, withTiming(0.6)),
        withDelay(step * 4, withTiming(0)),
      ),
      -1,
    ),
    transform: [
      {
        translateX: withRepeat(
          withSequence(
            withDelay(step * 4, withTiming(0)),
            withDelay(step * 4, withTiming(-24)),
          ),
          -1,
        ),
      },
    ],
  }));
  const d3 = useAnimatedStyle(() => ({
    opacity: withRepeat(
      withSequence(
        withDelay(step * 6, withTiming(0.6)),
        withDelay(step * 2, withTiming(0)),
      ),
      -1,
    ),
    transform: [
      {
        translateX: withRepeat(
          withSequence(
            withDelay(step * 6, withTiming(0)),
            withDelay(step * 2, withTiming(-24)),
          ),
          -1,
        ),
      },
    ],
  }));
  return (
    <>
      <Animated.View style={[styles.dot, d1]} />
      <Animated.View style={[styles.dot, d2]} />
      <Animated.View style={[styles.dot, d3]} />
    </>
  );
};

export default LoadingDots;
