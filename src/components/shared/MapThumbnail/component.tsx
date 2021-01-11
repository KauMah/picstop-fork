import { Image, StyleSheet, View } from 'react-native';

import React from 'react';
import { white } from '../../../utils/colors';

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: white,
    borderRadius: 5,
    height: 50,
    width: 50,
  },
  image: {
    height: 50,
    width: 50,
  },
});

const MapThumbnail = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../../../assets/img/picstop-logo.png')}
        resizeMode={'contain'}
      />
    </View>
  );
};

export default MapThumbnail;
