import MapboxGL from '@react-native-mapbox-gl/maps';
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { exo } from '../../utils/api';
import { $black } from '../../utils/colors';
import _ from 'lodash';
import { Location } from '../../types';
import { rollbar } from '../../utils/rollbar';
import MapThumbnail from '../shared/MapThumbnail';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    flexGrow: 1,
  },
  touchable: {
    borderRadius: 10,
  },
  newContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  text: {
    paddingTop: 5,
    fontFamily: 'Kumbh Sans',
    fontWeight: '500',
    fontSize: 13,
    textTransform: 'capitalize',
    color: $black,
    alignSelf: 'center',
  },
  map: {
    overflow: 'hidden',
    width: '100%',
    height: '94%',
    top: 0,
    borderRadius: 10,
  },
});

interface Props {
  userLocations: string[];
}

const getBoundsFromLocations = (locations: Location[]) => {
  let north = 0; // positive [0]
  let south = 0; // negative [0]
  let east = 0; // negative [1]
  let west = 0; // positive [1]

  locations.forEach((location: Location) => {
    let coords = location.geoLocation.coordinates;

    if (coords[0] >= north) {
      north = coords[0];
    }
    if (coords[0] <= south) {
      south = coords[0];
    }
    if (coords[1] >= west) {
      west = coords[1];
    }
    if (coords[1] <= east) {
      east = coords[1];
    }
  });

  return {
    ne: [north, east],
    sw: [south, west],
  };
};

const MapTile = ({ userLocations }: Props) => {
  const navigation = useNavigation();
  const [locations, setLocations] = useState<Array<Location>>([]);
  const _map = useRef<MapboxGL.MapView>(null);
  const _camera = useRef<MapboxGL.Camera>(null);
  const _loc = useRef<MapboxGL.UserLocation>(null);

  const [shownAllLocations, setShownAllLocations] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableHighlight
        activeOpacity={0.4}
        underlayColor="#eeeeee30"
        onPress={(event) => {
          event.preventDefault();
          navigation.navigate('Map');
        }}>
        <View style={styles.newContainer}>
          <MapboxGL.MapView
            ref={_map}
            style={styles.map}
            styleURL={'mapbox://styles/kaumah/ckjeur5kx7uud19mc0zr67xkm'}
            rotateEnabled={false}
            zoomEnabled={false}
            scrollEnabled={false}
            pitchEnabled={false}
            logoEnabled={false}
            onDidFinishRenderingFrameFully={async () => {
              const coords = _.get(_loc.current?.state, 'coordinates', [0, 0]);

              if (!shownAllLocations) {
                var loadedLocations: Location[] = [];

                for (var locationID of userLocations) {
                  await exo
                    .get(`/locations/${locationID}`)
                    .then((response) => {
                      let location = _.get(
                        response,
                        'data.message.location',
                        null,
                      );
                      if (location) {
                        loadedLocations.push(location);
                      }
                    })
                    .catch((error) => {
                      rollbar.error(
                        `Failed to load location for MapTile. Error: ${error}`,
                      );
                    });
                }

                setLocations(loadedLocations);
              }

              if (locations) {
                let bounds = getBoundsFromLocations(locations);
                _camera.current?.fitBounds(bounds.ne, bounds.sw, 50);
                setShownAllLocations(true);
              } else {
                _camera.current?.moveTo(coords);
                setTimeout(() => {
                  _camera.current?.zoomTo(10);
                }, 500);
              }
            }}
            animated>
            <MapboxGL.Camera ref={_camera} maxZoomLevel={150} />
            <MapboxGL.UserLocation visible animated ref={_loc} />
            {locations.map((loc: Location) => (
              <MapThumbnail
                key={loc._id}
                location={loc}
                onPress={() => {
                  console.log('LOCATION HIT');
                }}
              />
            ))}
          </MapboxGL.MapView>
          <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
            Map
          </Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

export default MapTile;
