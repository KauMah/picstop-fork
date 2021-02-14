import React, { useEffect, useState } from 'react';

import CustomHeader from '../components/shared/CustomHeader/';
import { Post } from '../types';
import { SafeAreaView } from 'react-native';
import StatsHeader from '../components/Profile/StatsHeader';
import TileContainer from '../components/Profile/tileContainer';
import UserList from './followList';
import _ from 'lodash';
import { createStackNavigator } from '@react-navigation/stack';
import { exo } from '../utils/api';
import { rollbar } from '../utils/rollbar';

const ProfileStack = createStackNavigator();

const ProfileRoutes = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name={'Profile'}
        component={Profile}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen name={'Followers'} component={UserList} />
      <ProfileStack.Screen name={'Following'} component={UserList} />
    </ProfileStack.Navigator>
  );
};

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
                const thePosts = resp.data.message.posts;
                setPosts(thePosts.reverse());
              })
              .catch((err) =>
                rollbar.error(`Failed to load user posts: ${err}`),
              );
          });
          setLoading(false);
        })
        .catch((err) => rollbar.error(`Failed to load basic user: ${err}`));
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
      <TileContainer loading={loading} onRefresh={onRefresh} />
      {/* Keeping this in right now to pass commit linting */}
      {posts.map(() => null)}
    </SafeAreaView>
  );
};

export default ProfileRoutes;
