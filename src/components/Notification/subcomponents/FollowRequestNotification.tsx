import { StyleSheet, Text, View, ViewStyle } from 'react-native';

import { $darkerGray } from '../../../utils/colors';
import BaseNotification from './BaseNotification';
import React from 'react';
import StyledButton from '../../shared/StyledButton';
import Toast from 'react-native-toast-message';
import { exo } from '../../../utils/api';
import { rollbar } from '../../../utils/rollbar';
import { useNavigation } from '@react-navigation/native';

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
  userId: string;
}

const FollowRequestNotification = ({ username, url, style, userId }: Props) => {
  const navigation = useNavigation();
  return (
    <BaseNotification
      url={url}
      style={style}
      onInteraction={() => {
        navigation.navigate('User', { username: username });
      }}>
      <Text style={styles.title}>{username} requested to follow you.</Text>
      <View style={styles.buttonContainer}>
        <StyledButton
          type="blue"
          text="Accept"
          onPress={() => {
            exo
              .post('/user/request/accept', { id: userId })
              .then(() => {
                Toast.show({
                  type: 'success',
                  position: 'top',
                  text1: 'Success!',
                  text2: `You are now following ${username}`,
                });
              })
              .catch((err) => {
                rollbar.error(`Failed to accept follow request: ${err}`);
                Toast.show({
                  type: 'error',
                  position: 'top',
                  text1: 'Error!',
                  text2: 'Something went wrong',
                });
              });
          }}
          small={true}
          style={styles.button}
        />
        <StyledButton
          type="red"
          text="Reject"
          onPress={() => {
            exo
              .post('/user/request/remove', { id: userId })
              .then(() => {
                Toast.show({
                  type: 'success',
                  position: 'top',
                  text1: 'Success!',
                  text2: `You are now following ${username}`,
                });
              })
              .catch((err) => {
                rollbar.error(`Failed to remove follow request: ${err}`);
                Toast.show({
                  type: 'error',
                  position: 'top',
                  text1: 'Error!',
                  text2: 'Something went wrong',
                });
              });
          }}
          small={true}
          style={styles.button}
        />
      </View>
    </BaseNotification>
  );
};

export default FollowRequestNotification;
