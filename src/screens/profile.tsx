import { Post, User } from '../types';
import React, { useEffect, useState } from 'react';

import CustomHeader from '../components/shared/CustomHeader/';
import { SafeAreaView } from 'react-native';
import StatsHeader from '../components/Profile/StatsHeader';
import TileContainer from '../components/Profile/tileContainer';
import UserList from './followList';
import _ from 'lodash';
import { createStackNavigator } from '@react-navigation/stack';
import { exo } from '../utils/api';
import { rollbar } from '../utils/rollbar';
import { useRoute } from '@react-navigation/native';

const ProfileStack = createStackNavigator();

const ProfileRoutes = () => {
  const route = useRoute();
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name={'Profile'}
        initialParams={{ username: _.get(route.params, 'username', '') }}
        component={Profile}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen name={'Followers'} component={UserList} />
      <ProfileStack.Screen name={'Following'} component={UserList} />
    </ProfileStack.Navigator>
  );
};

const Profile = () => {
  const route = useRoute();
  const [meId, setMeId] = useState('');
  const [own, setOwn] = useState(true);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Array<Post>>([]);
  const initial = {
    username: '',
    followers: [],
    following: [],
    followerRequests: [],
    private: false,
    profilePic: '',
    savedLocations: [],
    email: '',
    _id: '',
    blocked: [],
  };
  const [user, setUser] = useState<User>(initial);

  const onRefresh = React.useCallback(() => {
    setLoading(true);

    setTimeout(() => setLoading(false), 1000);
  }, []);

  const getPosts = async (username: string) => {
    exo.get(`/user/get/${username}`).then((result) => {
      setUser(result.data.message.user);
      exo
        .post('/posts/getUserPosts', {
          userId: result.data.message.user._id,
        })
        .then((resp) => {
          const thePosts = resp.data.message.posts;
          setPosts(thePosts.reverse());
        })
        .catch((err) => rollbar.error(`Failed to load user posts: ${err}`));
    });
  };

  useEffect(() => {
    const username = _.get(route.params, 'username', '');
    console.log(username);
    setOwn(username === '');
    if (loading) {
      exo
        .get('/user/')
        .then((res) => {
          const usr = _.get(res, 'data.message.username', '');
          const userId = _.get(res, 'data.message._id', '');
          getPosts(username ? username : usr);
          setMeId(userId);
          setLoading(false);
        })
        .catch((err) => rollbar.error(`Failed to load basic user: ${err}`));
    }
  }, [loading, route.params, user]);

  return (
    <SafeAreaView>
      <CustomHeader title={'Profile'} />
      <StatsHeader
        _id={user._id}
        username={user.username}
        me={meId}
        location={'Boston, MA'}
        profileUrl={user.profilePic}
        followers={user.followers}
        following={user.following}
        blocked={user.blocked}
        private={user.private}
        requests={user.followerRequests}
        savedLocation={user.savedLocations.length}
        onPfpUpdated={() => {
          setLoading(true);
        }}
        own={own}
      />
      <TileContainer loading={loading} onRefresh={onRefresh} />
      {/* Keeping this in right now to pass commit linting */}
      {posts.map(() => null)}
    </SafeAreaView>
  );
};

export default ProfileRoutes;
