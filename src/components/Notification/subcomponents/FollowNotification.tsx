import { StyleSheet, Text, ViewStyle } from 'react-native';

import { $darkerGray } from '../../../utils/colors';
import BaseNotification from './BaseNotification';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Kumbh Sans',
    fontWeight: 'bold',
    fontSize: 14,
    color: $darkerGray,
  },
});

interface Props {
  username: string;
  style?: ViewStyle;
  url: string;
}

const FollowNotification = ({ username, url, style }: Props) => {
  const navigation = useNavigation();
  return (
    <BaseNotification
      url={url}
      style={style}
      onInteraction={() => {
        navigation.navigate('User', { username: username });
      }}>
      <Text style={styles.title}>{username} followed you.</Text>
    </BaseNotification>
  );
};

export default FollowNotification;
