import React, { PropsWithChildren } from 'react';
import { Image, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { $darkerGray } from '../../utils/colors';

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: '95%',
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingVertical: 6,
    marginVertical: 3,
    marginHorizontal: 5,
    backgroundColor: '#FFF',
    borderRadius: 9,
  },
  image: {
    width: '25%',
  },
  textContainer: {
    flexDirection: 'column',
    flexGrow: 1,
    paddingVertical: 3,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    fontFamily: 'Kumbh Sans',
    fontWeight: 'bold',
    fontSize: 14,
    color: $darkerGray,
  },
});

interface Props extends PropsWithChildren<{}> {
  url: string;
  type: 'like' | 'comment' | 'follow' | 'request';
  username: string;
  style?: ViewStyle;
}

const Notification = ({ url, username, type, style, children }: Props) => {
  switch (type) {
    case 'like':
      return (
        <View style={[styles.container, style]}>
          <Image
            source={{ uri: url }}
            style={styles.image}
            resizeMode={'contain'}
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{username} liked your photo.</Text>
            {children}
          </View>
        </View>
      );
    case 'comment':
      return (
        <View style={styles.container}>
          <Image
            source={{ uri: url }}
            style={styles.image}
            resizeMode={'contain'}
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>
              {username} commented on your profile.
            </Text>
            {children}
          </View>
        </View>
      );
    case 'follow':
      return (
        <View style={styles.container}>
          <Image
            source={{ uri: url }}
            style={styles.image}
            resizeMode={'contain'}
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{username} followed you.</Text>
            {children}
          </View>
        </View>
      );
    case 'request':
      return (
        <View style={styles.container}>
          <Image
            source={{ uri: url }}
            style={styles.image}
            resizeMode={'contain'}
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>
              {username} requested to follow you.
            </Text>
            {children}
          </View>
        </View>
      );
  }
};

export default Notification;
