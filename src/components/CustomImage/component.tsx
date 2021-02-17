import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Image, StyleSheet, ViewStyle } from 'react-native';
import {
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: undefined,
  },
});

type Props = {
  url: string;
  style: ViewStyle;
};

const CustomImage: React.FC<Props> = (props) => {
  const [ratio, setRatio] = useState(1);
  const size = useSharedValue(1);

  const getRatio = () => {
    return { aspectRatio: ratio };
  };
  useEffect(() => {
    setRatio(
      Image.getSize(props.url, (width, height) => {
        setRatio(width / height);
      }),
    );
  }, [props.url]);

  const imgStyle = useAnimatedStyle(() => ({
    transform: [{ scale: size.value }],
  }));

  const handler = useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
    onActive: ({ scale }) => {
      size.value = scale;
    },
    onEnd: () => {
      size.value = withTiming(1);
    },
  });

  return (
    <PinchGestureHandler onHandlerStateChange={handler}>
      <Animated.Image
        source={{ uri: props.url }}
        style={[styles.image, getRatio(), imgStyle]}
      />
    </PinchGestureHandler>
  );
};

export default CustomImage;
