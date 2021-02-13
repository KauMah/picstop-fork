import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import IconButton from '../components/shared/IconButton';
import IconTextField from '../components/shared/IconTextField';
import { SafeAreaView } from 'react-native-safe-area-context';
import _ from 'lodash';
import { exo } from '../utils/api';
import { faMapPin } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { rollbar } from '../utils/rollbar';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#FFF',
    height: '100%',
  },
  button: {
    paddingHorizontal: 20,
    width: '100%',
    marginVertical: 10,
  },
});

const ProfileSettings = () => {
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    if (loading) {
      exo
        .get('/user/')
        .then((res) => {
          const usr = _.get(res, 'data.message.username', '');
          exo.get(`/user/get/${usr}`).then((result) => {
            setUser(result.data.message.user);
          });
          setLoading(false);
        })
        .catch((err) => rollbar.error(`Failed to load basic user: ${err}`));
    }
  }, [loading, user]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.button}>
        <IconTextField
          icon={faUserCircle}
          //value={user.username}
          //onChangeText={(text) => setCaption(text)}
          placeholder={user.username}
        />
      </View>
      <View style={styles.button}>
        <IconButton
          icon={faMapPin}
          text="Location"
          onPress={() => console.log('pressed')}
          arrow={false}
          displayValue="Boston, MA"
        />
      </View>
    </SafeAreaView>
  );
};

export default ProfileSettings;
