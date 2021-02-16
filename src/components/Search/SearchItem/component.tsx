import { Image, StyleSheet, Text, View } from 'react-native';
import { Location, User } from '../../../types';
import { State, TapGestureHandler } from 'react-native-gesture-handler';

import { $white } from '../../../utils/colors';
import React from 'react';
import { runOnJS } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

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
  exit: () => void;
}

const SearchItem: React.FC<SearchItemProps> = (props) => {
  const navigation = useNavigation();
  const locWrap = () => {
    navigation.navigate('Location', { locationId: props.location?._id });
    props.exit();
  };
  const usrWrap = () => {
    navigation.navigate('userProfile', { userId: props.user?._id });
    props.exit();
  };
  switch (props.type) {
    case 'location':
      return (
        <TapGestureHandler
          onHandlerStateChange={({ nativeEvent }) => {
            if (nativeEvent.state === State.END) {
              runOnJS(locWrap)();
            }
          }}>
          <View style={styles.container}>
            <Text style={styles.text}>{props.text}</Text>
          </View>
        </TapGestureHandler>
      );
    case 'user':
      return (
        <TapGestureHandler
          onHandlerStateChange={({ nativeEvent }) => {
            if (nativeEvent.state === State.END) {
              runOnJS(usrWrap)();
            }
          }}>
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
        </TapGestureHandler>
      );
  }
};

export default SearchItem;
