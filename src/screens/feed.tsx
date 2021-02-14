import {
  PERMISSIONS,
  RESULTS,
  check,
  request,
  requestLocationAccuracy,
} from 'react-native-permissions';
import React, { useEffect, useState } from 'react';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';

import CustomHeader from '../components/shared/CustomHeader';
import EmptyPostState from '../components/Profile/emptyState';
import FeedItem from '../components/Feed/FeedItem';
import { Post } from '../types';
import _ from 'lodash';
import { exo } from '../utils/api';
import { rollbar } from '../utils/rollbar';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 2,
  },
});

const Feed = () => {
  const [posts, setPosts] = useState<Array<Post>>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState('');

  const onRefresh = React.useCallback(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  }, []);

  useEffect(() => {
    check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then((result) => {
      switch (result) {
        case RESULTS.DENIED:
          request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(() => {
            requestLocationAccuracy({
              purposeKey: 'MapLocations',
            }).then(() => {
              console.info('Location Services granted');
            });
          });
          break;
        default:
          break;
      }
    });
  }, []);

  useEffect(() => {
    if (loading) {
      exo
        .get('/user/')
        .then((response) => {
          const id = _.get(response, 'data.message._id', '');
          setUserId(id);
          exo
            .post('/posts/feed/', { userId: id })
            .then((res) => {
              const newPosts = _.get(res.data, 'message', []);
              newPosts.reverse();
              const formattedPosts = _.concat(newPosts, posts);
              setPosts(
                _.uniqBy(formattedPosts, (post) => {
                  post._id;
                }),
              );
            })
            .catch((e) => rollbar.error(`Failed to load basic user: ${e}`));
        })
        .catch((e) => rollbar.error(`Failed to load user: ${e}`));
      setLoading(false);
    }
  }, [loading, posts]);
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title={'Home'} />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }>
        {posts.length < 1 && <EmptyPostState />}
        {posts.length > 0 &&
          posts.map((post) => (
            <FeedItem post={post} userId={userId} key={`${post._id}`} />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Feed;
