import { RefreshControl, StyleSheet, View } from 'react-native';

import { $lighterGray } from '../../utils/colors';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';

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
    backgroundColor: $lighterGray,
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
    backgroundColor: $lighterGray,
    flexGrow: 1,
    padding: 5,
  },
  tile: {
    flexBasis: '33.33%',
    height: 150,
    backgroundColor: $lighterGray,
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
}

const TileContainer = ({ loading, onRefresh }: Props) => {
  return (
    <ScrollView
      style={styles.scroll}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={onRefresh} />
      }>
      <View style={styles.container}>
        <View style={styles.mapTile}>
          <View style={styles.content} />
        </View>
        <View style={styles.mapAdjacentContainer}>
          <View style={styles.mapAdjacentTile}>
            <View style={styles.content} />
          </View>
          <View style={styles.mapAdjacentTile}>
            <View style={styles.content} />
          </View>
        </View>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((index) => {
          return (
            <View style={styles.tile} key={index}>
              <View style={styles.content} />
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default TileContainer;
