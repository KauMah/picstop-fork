import React, { useEffect, useState } from 'react';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';

import CustomHeader from '../components/shared/CustomHeader/';
import EmptyPostState from '../components/Profile/emptyState';
import FeedItem from '../components/Feed/FeedItem/';
import Loading from './loading';
import { Post } from '../types';
import StatsHeader from '../components/Profile/StatsHeader';
import _ from 'lodash';
import { createStackNavigator } from '@react-navigation/stack';
import { exo } from '../utils/api';

const ProfileStack = createStackNavigator();

const ProfileRoutes = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name={'Profile'}
        component={Profile}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen name={'Likes'} component={Loading} />
      <ProfileStack.Screen name={'Comments'} component={Loading} />
      <ProfileStack.Screen name={'Report'} component={Loading} />
    </ProfileStack.Navigator>
  );
};

const styles = StyleSheet.create({
  scroll: {
    height: '75%',
  },
});

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Array<Post>>([]);
  const initial = {
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
  const [user, setUser] = useState(initial);

  const onRefresh = React.useCallback(() => {
    setLoading(true);
    console.log('refreshed');

    setTimeout(() => setLoading(false), 1000);
  }, []);

  useEffect(() => {
    if (loading) {
      exo
        .get('/user/')
        .then((res) => {
          const usr = _.get(res, 'data.message.username', '');
          exo.get(`/user/get/${usr}`).then((result) => {
            setUser(result.data.message.user);
            exo
              .post('/posts/getUserPosts', {
                userId: result.data.message.user._id,
              })
              .then((resp) => {
                console.log(resp.data.message.posts);
                setPosts(resp.data.message.posts);
              })
              .catch((err) => console.log(err));
          });
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [loading, user]);

  return (
    <SafeAreaView>
      <CustomHeader title={'Profile'} />
      <StatsHeader
        _id={user._id}
        username={user.username}
        location={'Boston, MA'}
        profileUrl={user.profilePic}
        followers={user.followers.length}
        following={user.following.length}
        savedLocation={user.savedLocations.length}
        onPfpUpdated={() => {
          setLoading(true);
        }}
      />
      <ScrollView
        style={styles.scroll}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }>
        {posts.length < 1 && <EmptyPostState />}
        {posts.reverse().map((post) => {
          return (
            <FeedItem
              post={post}
              userId={user._id}
              key={`${user.profilePic}${post._id}`}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileRoutes;
