import { Image, StyleSheet, Text, View } from 'react-native';
import { Location, User } from '../../../types';

import { $white } from '../../../utils/colors';
import React from 'react';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: $white,
    height: 40,
    marginVertical: 2,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pic: {
    height: 30,
    width: 30,
    margin: 5,
    borderRadius: 5,
  },
  text: {
    fontFamily: 'Kumbh Sans',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 10,
  },
});
interface SearchItemProps {
  type: 'user' | 'location';
  text: string;
  picUrl?: string;
  user?: User;
  location?: Location;
}
// navigation.navigate('Location', { locationId: props.location?._id })
// navigation.navigate('userProfile', { userId: props.user?._id })

const SearchItem: React.FC<SearchItemProps> = (props) => {
  // const navigation = useNavigation();
  switch (props.type) {
    case 'location':
      return (
        <View style={styles.container}>
          <Text style={styles.text}>{props.text}</Text>
        </View>
      );
    case 'user':
      return (
        <View style={styles.container}>
          {props.picUrl !== '' ? (
            <Image style={styles.pic} source={{ uri: props.picUrl }} />
          ) : (
            <Image
              style={styles.pic}
              source={require('../../../../assets/img/picstop-no-text.png')}
            />
          )}
          <Text style={styles.text}>{props.text}</Text>
        </View>
      );
  }
};

export default SearchItem;
