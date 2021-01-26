import { $mainBlue, $white } from '../../../utils/colors';
import { Image, StyleSheet, Text, View } from 'react-native';

import React from 'react';

const styles = StyleSheet.create({
  container: {
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
    marginTop: 7,
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
  numPhotos: number;
  new?: boolean;
  onTouchEndCapture?: () => void;
}

const MapThumbnail = (props: Props) => {
  console.log(props.iconUrl);
  return (
    <View onTouchEndCapture={props.onTouchEndCapture}>
      <View style={styles.container}>
        {props.iconUrl ? (
          <Image
            style={styles.image}
            source={{ uri: props.iconUrl }}
            resizeMode={'cover'}
          />
        ) : (
          <Image
            style={styles.container}
            source={require('../../../../assets/img/picstop-no-text.png')}
            resizeMode={'cover'}
          />
        )}
      </View>
      {props.numPhotos > 0 && (
        <View style={styles.bubble}>
          <Text style={styles.text}>
            {props.numPhotos > 1
              ? `${props.numPhotos} Photos`
              : `${props.numPhotos} Photo`}
          </Text>
        </View>
      )}
    </View>
  );
};

export default MapThumbnail;
