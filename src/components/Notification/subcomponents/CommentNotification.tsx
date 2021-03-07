import { StyleSheet, Text, ViewStyle } from 'react-native';

import { $darkerGray } from '../../../utils/colors';
import BaseNotification from './BaseNotification';
import React from 'react';

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
  comment: string;
}

const CommentNotification = ({ username, url, style, comment }: Props) => {
  return (
    <BaseNotification url={url} style={style}>
      <Text style={styles.title}>{username} commented on your photo.</Text>
      <Text style={styles.text}> {comment}</Text>
    </BaseNotification>
  );
};

export default CommentNotification;
