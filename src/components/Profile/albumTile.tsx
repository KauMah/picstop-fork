import { $black, $mainGray } from '../../utils/colors';
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import React from 'react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    flexGrow: 1,
  },
  newContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  touchable: {
    borderRadius: 10,
  },
  image: {
    flex: 1,
    alignSelf: 'stretch',
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
  createNewText: {
    paddingTop: 5,
    fontFamily: 'Kumbh Sans',
    fontWeight: 'bold',
    fontSize: 14,
    textTransform: 'capitalize',
    color: $mainGray,
  },
});

interface Props {
  album: null | { name: string; imageUrl: string };
  index: number;
}

const AlbumTile = ({ album, index }: Props) => {
  if (!album) {
    return (
      <View style={styles.container} key={index}>
        <TouchableHighlight
          style={styles.touchable}
          activeOpacity={0.4}
          underlayColor="#eeeeee30"
          onPressOut={() => {
            console.log('new press');
          }}>
          <View style={styles.newContainer}>
            <Feather name={'plus-circle'} size={40} color={$mainGray} />
            <Text style={styles.createNewText}>Create New</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableHighlight
        activeOpacity={0.4}
        underlayColor="#eeeeee30"
        onPressOut={() => {
          console.log('album press');
        }}>
        <View style={styles.newContainer}>
          <Image
            style={styles.image}
            source={{ uri: album.imageUrl }}
            resizeMode="cover"
          />
          <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
            {album.name}
          </Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

export default AlbumTile;
