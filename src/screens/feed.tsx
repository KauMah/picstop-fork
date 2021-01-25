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
import Likes from './likes';
import Loading from './loading';
import { Post } from '../types';
import _ from 'lodash';
import { createStackNavigator } from '@react-navigation/stack';
import { exo } from '../utils/api';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 2,
  },
});

const PostStack = createStackNavigator();

const FeedRoutes = () => {
  return (
    <PostStack.Navigator>
      <PostStack.Screen
        name="Feed"
        component={Feed}
        options={{ headerShown: false }}
      />
      <PostStack.Screen name="Post" component={Loading} />
      <PostStack.Screen name="Likes" component={Likes} />
      <PostStack.Screen name="Comments" component={Loading} />
    </PostStack.Navigator>
  );
};

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
              setPosts(_.concat(newPosts, posts));
            })
            .catch((e) => console.log(e));
        })
        .catch((e) => console.log(e));
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

export default FeedRoutes;
