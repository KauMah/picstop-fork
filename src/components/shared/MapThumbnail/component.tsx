import { Image, StyleSheet, View } from 'react-native';

import React from 'react';
import { white } from '../../../utils/colors';

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: white,
    borderRadius: 5,
    height: 60,
    width: 60,
  },
  image: {
    height: 60,
    width: 60,
  },
});

interface Props {
  iconUrl: string;
}

const MapThumbnail = (props: Props) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.container}
        source={{ uri: props.iconUrl }}
        resizeMode={'cover'}
      />
    </View>
  );
};

export default MapThumbnail;
