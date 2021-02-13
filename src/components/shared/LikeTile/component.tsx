import { $lighterGray, $mainGray } from '../../../utils/colors';
import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import Toast from 'react-native-toast-message';
import { User } from '../../../types';
import { exo } from '../../../utils/api';
import { rollbar } from '../../../utils/rollbar';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flexDirection: 'row',
    borderBottomColor: $lighterGray,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  proPic: {
    height: 40,
    width: 40,
  },
  username: {
    fontFamily: 'Kumbh Sans',
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 24,
    color: $mainGray,
    marginLeft: 20,
  },
});

interface Props {
  userId: string;
}

const UserTile = (props: Props) => {
  const [loading, setLoading] = useState(true);
  const initialUser = {
    username: '',
    followers: [],
    following: [],
    private: false,
    profilePic: '',
    savedLocations: [],
    email: '',
    _id: '',
    blocked: [],
  };
  const [user, setUser] = useState<User>(initialUser);

  useEffect(() => {
    if (loading) {
      exo
        .get(`/user/getById/${props.userId}`)
        .then((res) => {
          setUser(res.data.message.user);
        })
        .catch((err) => {
          rollbar.error(`Failed to fetch user by id: ${err}`);
          Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Error loading user',
            text2: err.message,
          });
        });
      setLoading(false);
    }
  }, [loading, props.userId]);
  return (
    <View style={styles.container}>
      {user.profilePic !== '' ? (
        <Image style={styles.proPic} source={{ uri: user.profilePic }} />
      ) : (
        <View style={styles.proPic} />
      )}
      <Text style={styles.username}>{user.username}</Text>
    </View>
  );
};

export default UserTile;
