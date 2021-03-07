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
  postId: string;
}

const LikeNotification = ({ username, url, style, postId }: Props) => {
  const navigation = useNavigation();
  return (
    <BaseNotification
      url={url}
      style={style}
      onInteraction={() => {
        navigation.navigate('Likes', { postId });
      }}>
      <Text style={styles.title}>{username} liked your photo.</Text>
    </BaseNotification>
  );
};

export default LikeNotification;
