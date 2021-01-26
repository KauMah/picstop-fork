import { $mainBlue, $white } from '../../../utils/colors';
import { Image, StyleSheet, Text, View } from 'react-native';

import React from 'react';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  imgContainer: {
    height: 60,
    width: 60,
  },
  image: {
    height: 60,
    width: 60,
    borderWidth: 1,
    borderColor: $white,
    borderRadius: 5,
  },
  bubble: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    backgroundColor: $mainBlue,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: $white,
  },
  text: {
    fontFamily: 'Kumbh Sans',
    fontWeight: 'bold',
    color: $white,
    fontSize: 14,
  },
});

interface Props {
  iconUrl: string;
  name: string;
  new?: boolean;
  onTouchEndCapture?: () => void;
}

const MapThumbnail = (props: Props) => {
  console.log(props.iconUrl);
  return (
    <View style={styles.container} onTouchEndCapture={props.onTouchEndCapture}>
      <View style={styles.imgContainer}>
        {props.iconUrl ? (
          <Image
            style={styles.image}
            source={{ uri: props.iconUrl }}
            resizeMode={'cover'}
          />
        ) : (
          <Image
            style={styles.imgContainer}
            source={require('../../../../assets/img/picstop-no-text.png')}
            resizeMode={'cover'}
          />
        )}
      </View>
      <View style={styles.bubble}>
        <Text style={styles.text}>{props.name}</Text>
      </View>
    </View>
  );
};

export default MapThumbnail;
