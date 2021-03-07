import { Image, StyleSheet, View, ViewStyle } from 'react-native';
import React, { PropsWithChildren } from 'react';

import { TapGestureHandler } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  container: {
    minHeight: 72,
    width: '95%',
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingVertical: 6,
    marginVertical: 3,
    marginHorizontal: 5,
    backgroundColor: '#FFF',
    borderRadius: 9,
  },
  image: {
    width: '25%',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    flexGrow: 1,
    paddingVertical: 3,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

interface Props extends PropsWithChildren<{}> {
  style?: ViewStyle;
  url: string;
  onInteraction: () => void;
}

const BaseNotification = ({ children, style, url, onInteraction }: Props) => {
  return (
    <TapGestureHandler shouldCancelWhenOutside onEnded={onInteraction}>
      <View style={[styles.container, style]}>
        <Image
          source={{ uri: url }}
          style={styles.image}
          resizeMode={'contain'}
        />
        <View style={styles.textContainer}>{children}</View>
      </View>
    </TapGestureHandler>
  );
};

export default BaseNotification;
