import React, { useRef } from 'react';

import CustomHeader from '../components/shared/CustomHeader';
// @ts-ignore: Weirdness with react-native-dotenv
import { MAPBOX_TOKEN } from '@env';
import MapThumbnail from '../components/shared/MapThumbnail';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

MapboxGL.setAccessToken(MAPBOX_TOKEN);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    height: '100%',
  },
  map: {
    height: '99%',
    width: '100%',
    bottom: 0,
  },
  thumbnail: {
    width: 20,
    height: 20,
  },
});

interface LocState {
  coordinates: Array<number>;
  heading: number;
  shouldShowUserLocation: boolean;
}

const MapView = () => {
  const _map = useRef<MapboxGL.MapView>(null);
  const _camera = useRef<MapboxGL.Camera>(null);
  const _loc = useRef<MapboxGL.UserLocation>(null);
  console.log(JSON.stringify(_map.current?.state));
  _camera.current?.zoomTo(6);
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title={'Map'} />
      <MapboxGL.MapView
        ref={_map}
        style={styles.map}
        onLongPress={() => {
          const state: LocState = JSON.parse(
            JSON.stringify(_loc.current?.state),
          );
          _camera.current?.flyTo(state.coordinates);
          _camera.current?.zoomTo(4);
        }}
        styleURL={'mapbox://styles/kaumah/ckjeur5kx7uud19mc0zr67xkm'}
        rotateEnabled={false}
        animated>
        <MapboxGL.MarkerView id={'test'} coordinate={[-74.090656, 40.8490999]}>
          <MapThumbnail
            iconUrl={
              'https://www.kenblakemoreartdesign.com/wp-content/uploads/2017/07/fullsizeoutput_696.jpeg'
            }
          />
        </MapboxGL.MarkerView>
        <MapboxGL.UserLocation visible animated ref={_loc} />
        <MapboxGL.Camera ref={_camera} />
      </MapboxGL.MapView>
    </SafeAreaView>
  );
};
export default MapView;
