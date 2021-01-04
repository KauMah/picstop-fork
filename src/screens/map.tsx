// @ts-ignore: Weirdness with react-native-dotenv
import { MAPBOX_TOKEN } from '@env';
import MapboxGL from '@react-native-mapbox-gl/maps';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

MapboxGL.setAccessToken(MAPBOX_TOKEN);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    top: -20,
    height: '100%',
    width: '100%',
  },
});

const MapView = () => {
  return (
    <SafeAreaView style={styles.container}>
      <MapboxGL.MapView
        style={styles.map}
        styleURL={'mapbox://styles/kaumah/ckjeur5kx7uud19mc0zr67xkm'}
        rotateEnabled={false}
      />
    </SafeAreaView>
  );
};
export default MapView;
