import React from 'react';
import { StyleSheet, Text, ViewStyle } from 'react-native';
import { $darkerGray } from '../../../utils/colors';
import BaseNotification from './BaseNotification';

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Kumbh Sans',
    fontWeight: 'bold',
    fontSize: 14,
    color: $darkerGray,
  },
  text: {
    fontFamily: 'Kumbh Sans',
    fontWeight: 'normal',
    fontSize: 12,
    color: $darkerGray,
    marginTop: 5,
  },
});

interface Props {
  username: string;
  style?: ViewStyle;
  url: string;
}

const CommentNotification = ({ username, url, style }: Props) => {
  return (
    <BaseNotification url={url} style={style}>
      <Text style={styles.title}>{username} commented on your photo.</Text>
      <Text style={styles.text}>
        "This is the comment that the user made on your photo"
      </Text>
    </BaseNotification>
  );
};

export default CommentNotification;
