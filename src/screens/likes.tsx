import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

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
});

const Likes = () => {
  const route = useRoute();
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState([]);
  const postId = _.get(route.params, 'postId', '');

  useEffect(() => {
    if (loading && postId !== '') {
      exo
        .get(`/posts/get/${postId}`)
        .then((response) => {
          setLikes(_.get(response.data, 'message.likes'));
        })
        .catch((err) => {
          rollbar.error(`Failed to load post by id: ${err}`);
          Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Network error',
            text2: err.message,
          });
        });
    }
    return () => {
      setLoading(false);
    };
  }, [loading, postId]);

  return (
    <ScrollView style={styles.container}>
      {likes.length < 1 && <Text>No one likes this</Text>}
      {likes.length > 0 &&
        likes.map((like) => <UserTile userId={like} key={like} />)}
    </ScrollView>
  );
};

export default Likes;
