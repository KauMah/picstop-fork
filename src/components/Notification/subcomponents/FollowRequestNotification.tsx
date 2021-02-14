import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { $darkerGray } from '../../../utils/colors';
import StyledButton from '../../shared/StyledButton';
import BaseNotification from './BaseNotification';

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Kumbh Sans',
    fontWeight: 'bold',
    fontSize: 14,
    color: $darkerGray,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    width: '48%',
    marginRight: 5,
  },
});

interface Props {
  username: string;
  style?: ViewStyle;
  url: string;
}

const FollowRequestNotification = ({ username, url, style }: Props) => {
  return (
    <BaseNotification url={url} style={style}>
      <Text style={styles.title}>{username} requested to follow you.</Text>
      <View style={styles.buttonContainer}>
        <StyledButton
          type="blue"
          text="Accept"
          onPress={() => console.log('Accepted')}
          small={true}
          style={styles.button}
        />
        <StyledButton
          type="red"
          text="Reject"
          onPress={() => console.log('Denied')}
          small={true}
          style={styles.button}
        />
      </View>
    </BaseNotification>
  );
};

export default FollowRequestNotification;
