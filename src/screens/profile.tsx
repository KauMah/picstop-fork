import React, { useEffect, useState } from 'react';

import CustomHeader from '../components/shared/CustomHeader/component';
import { SafeAreaView } from 'react-native';
import StatsHeader from '../components/Profile/StatsHeader';
import _ from 'lodash';
import { exo } from '../utils/api';
import { reduxState } from '../redux/actionTypes';
import { useSelector } from 'react-redux';

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const initial = {
    username: '',
    followers: [],
    following: [],
    private: false,
    savedLocations: [],
    email: '',
    _id: '',
    blocked: [],
  };
  const [user, setUser] = useState(initial);
  const tok: string = useSelector((state: reduxState) => state.token);

  useEffect(() => {
    if (loading) {
      exo
        .get('/user/', {})
        .then((res) => {
          const usr = _.get(res, 'data.message.username', '');
          exo
            .get(`/user/get/${usr}`, {})
            .then((result) => setUser(result.data.message.user));
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [loading, tok]);

  return (
    <SafeAreaView>
      <CustomHeader title={'Profile'} />
      <StatsHeader
        username={user.username}
        location={'Boston, MA'}
        followers={user.followers.length}
        following={user.following.length}
        savedLocation={user.savedLocations.length}
      />
    </SafeAreaView>
  );
};

export default Profile;
