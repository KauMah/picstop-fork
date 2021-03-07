import { RefreshControl, StyleSheet, View } from 'react-native';

import AlbumTile from './albumTile';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import MapTile from './mapTile';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 30,
  },
  scroll: {
    height: '80%',
  },
  mapTile: {
    flexBasis: '66.6%',
    height: 300,
    padding: 5,
  },
  mapAdjacentContainer: {
    flexBasis: '33.3%',
    height: 300,
    flexDirection: 'column',
  },
  mapAdjacentTile: {
    width: '100%',
    flexBasis: '50%',
    flexGrow: 1,
    padding: 5,
  },
  tile: {
    flexBasis: '33.33%',
    height: 150,
    padding: 5,
  },
  content: {
    width: '100%',
    height: '100%',
    backgroundColor: 'red',
  },
});

interface Props {
  loading: boolean;
  onRefresh: () => void;
  albums: string[];
  userLocations: string[];
}

const TileContainer = ({ loading, onRefresh, userLocations }: Props) => {
  return (
    <ScrollView
      style={styles.scroll}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={onRefresh} />
      }>
      <View style={styles.container}>
        <View style={styles.mapTile}>
          <MapTile userLocations={userLocations} />
        </View>
        <View style={styles.mapAdjacentContainer}>
          <View style={styles.mapAdjacentTile}>
            <AlbumTile
              album={{
                name: 'testing long title name',
                imageUrl:
                  'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fallhdwallpapers.com%2Fwp-content%2Fuploads%2F2015%2F05%2FLandscape-9.jpg&f=1&nofb=1',
              }}
              index={20}
            />
          </View>
          <View style={styles.mapAdjacentTile}>
            <AlbumTile
              album={{
                name: 'Title',
                imageUrl:
                  'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fallhdwallpapers.com%2Fwp-content%2Fuploads%2F2015%2F05%2FLandscape-9.jpg&f=1&nofb=1',
              }}
              index={21}
            />
          </View>
        </View>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((num, index) => {
          return (
            <View style={styles.tile} key={index}>
              <AlbumTile
                album={{
                  name: `Album: ${num}`,
                  imageUrl:
                    'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fallhdwallpapers.com%2Fwp-content%2Fuploads%2F2015%2F05%2FLandscape-9.jpg&f=1&nofb=1',
                }}
                index={index}
              />
            </View>
          );
        })}
        <View style={styles.tile}>
          <AlbumTile album={null} index={1029383892} />
        </View>
      </View>
    </ScrollView>
  );
};

export default TileContainer;
