import React, { useRef, useState } from 'react';

import CreateLocation from './createLocation';
import CustomHeader from '../components/shared/CustomHeader';
import { Location } from '../types';
// @ts-ignore: Weirdness with react-native-dotenv
import { MAPBOX_TOKEN } from '@env';
import MapThumbnail from '../components/shared/MapThumbnail';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import _ from 'lodash';
import { createStackNavigator } from '@react-navigation/stack';
import { exo } from '../utils/api';
import { rollbar } from '../utils/rollbar';
import { useNavigation } from '@react-navigation/native';

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

const LocationStack = createStackNavigator();

const LocationCreateRoutes = () => {
  return (
    <LocationStack.Navigator>
      <LocationStack.Screen
        name="Map"
        component={MapView}
        options={{ headerShown: false }}
      />
      <LocationStack.Screen
        name="NewLocation"
        component={CreateLocation}
        options={{ headerTitle: 'Save New Location' }}
      />
    </LocationStack.Navigator>
  );
};

const MapView = () => {
  const navigation = useNavigation();
  const _map = useRef<MapboxGL.MapView>(null);
  const _camera = useRef<MapboxGL.Camera>(null);
  const _loc = useRef<MapboxGL.UserLocation>(null);
  const [locations, setLocations] = useState<Array<Location>>([]);

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title={'Map'} />
      <MapboxGL.MapView
        ref={_map}
        style={styles.map}
        onRegionDidChange={_.throttle(async (feature) => {
          const coords = feature.geometry.coordinates;
          if (!coords[0] || !coords[1]) {
            return;
          }
          exo
            .post('/locations/near', {
              long: coords[0],
              lat: coords[1],
              maxDistance: 1000,
            })
            .then((response) => {
              const allLocations = _.concat(
                locations,
                _.get(response.data, 'message', []),
              );
              console.log(allLocations);
              setLocations(_.uniqBy(allLocations, (loc) => loc._id));
            })
            .catch((err) => {
              rollbar.error(`Failed to load nearby locations: ${err}`);
              Toast.show({
                type: 'error',
                position: 'top',
                text1:
                  'Something went wrong, please close the app and try again',
              });
            });
        }, 1000)}
        onLongPress={(feature) => {
          navigation.navigate('NewLocation', {
            coords: _.get(feature, 'geometry.coordinates', [0, 0]),
          });
        }}
        onDidFinishRenderingMapFully={async () => {
          const coords = _.get(_loc.current?.state, 'coordinates', [0, 0]);
          const long = coords ? coords[0] : 0;
          const lat = coords ? coords[1] : 0;
          if (!lat || !long) {
            return;
          }
          exo
            .post('/locations/near', {
              long: long,
              lat: lat,
              maxDistance: 1000,
            })
            .then((response) => {
              setLocations(_.get(response.data, 'message', []));
            })
            .catch((err) => {
              rollbar.error(`Failed to load nearby locations: ${err}`);
              Toast.show({
                type: 'error',
                position: 'top',
                text1:
                  'Something went wrong, please close the app and try again',
              });
            });
          _camera.current?.zoomTo(12, 1);
          setTimeout(() => {
            _camera.current?.moveTo(coords);
          }, 50);
        }}
        styleURL={'mapbox://styles/kaumah/ckjeur5kx7uud19mc0zr67xkm'}
        rotateEnabled={false}
        animated>
        {locations.map((loc) => {
          return (
            <MapThumbnail
              key={loc._id}
              location={loc}
              onPress={() => {
                navigation.navigate('Location', { locationId: loc._id });
              }}
            />
          );
        })}

        <MapboxGL.UserLocation visible animated ref={_loc} />
        <MapboxGL.Camera ref={_camera} zoomLevel={15} />
      </MapboxGL.MapView>
    </SafeAreaView>
  );
};
export default LocationCreateRoutes;
