import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { $mainGray } from '../utils/colors';
import Toast from 'react-native-toast-message';
import UserTile from '../components/shared/LikeTile';
import _ from 'lodash';
import { exo } from '../utils/api';
import { rollbar } from '../utils/rollbar';
import { useRoute } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flexDirection: 'column',
    height: '100%',
  },
  textContainer: {
    padding: 20,
    width: '100%',
  },
  text: {
    textAlign: 'center',
    fontFamily: 'Kumbh Sans',
    fontWeight: 'bold',
    fontSize: 24,
    color: $mainGray,
  },
});

const UserList = () => {
  const route = useRoute();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const userId = _.get(route.params, 'userId', '');
  const which = _.get(route.params, 'which', 'following');

  useEffect(() => {
    if (loading && userId !== '') {
      exo
        .get(`/user/getById/${userId}`)
        .then((response) => {
          setUsers(_.get(response.data, `message.user.${which}`));
        })
        .catch((err) => {
          Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Network error',
            text2: err.message,
          });
          rollbar.error(`Failed to get user by id: ${err}`);
        });
    }
    return () => {
      setLoading(false);
    };
  }, [loading, userId, which]);

  return (
    <ScrollView style={styles.container}>
      {users.length < 1 && (
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            {which === 'following'
              ? "You don't follow anyone"
              : 'No one follows you'}
          </Text>
        </View>
      )}
      {users.length > 0 &&
        users.map((user) => <UserTile userId={user} key={user} />)}
    </ScrollView>
  );
};

export default UserList;
