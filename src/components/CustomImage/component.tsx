import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Image, ImageStyle, StyleSheet } from 'react-native';
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
  style: ImageStyle;
};

const CustomImage: React.FC<Props> = (props) => {
  const [ratio, setRatio] = useState(1);
  const size = useSharedValue(1);
  const cx = useSharedValue(0);
  const cy = useSharedValue(0);

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
    transform: [
      { translateX: cx.value },
      { translateY: cy.value },
      { scale: size.value < 1 ? 1 : size.value },
    ],
  }));

  const handler = useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
    onActive: ({ scale, focalX, focalY }) => {
      cx.value = Math.abs(focalX);
      cy.value = Math.abs(focalY);
      size.value = scale;
    },
    onFinish: () => {
      size.value = withTiming(1);
      cx.value = withSpring(0);
      cy.value = withSpring(0);
    },
  });

  return (
    <PinchGestureHandler onHandlerStateChange={handler}>
      <Animated.Image
        source={{ uri: props.url }}
        style={[styles.image, getRatio(), imgStyle, props.style]}
      />
    </PinchGestureHandler>
  );
};

export default CustomImage;
