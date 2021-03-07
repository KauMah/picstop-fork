import { Image, SafeAreaView, StyleSheet, View } from 'react-native';
import {
  faComments,
  faEye,
  faTimesCircle,
  faUserCircle,
} from '@fortawesome/free-regular-svg-icons';

// @ts-ignore: Weirdness with react-native-dotenv
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomHeader from '../components/shared/CustomHeader';
import IconButton from '../components/shared/IconButton';
import ProfileSettings from './profileSettings';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import StyledButton from '../components/shared/StyledButton';
import { createStackNavigator } from '@react-navigation/stack';
import { logout } from '../redux/actions';
import { rollbar } from '../utils/rollbar';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import { useNavigation, useRoute } from '@react-navigation/native';
import CustomModal from '../components/shared/CustomModal';
import { exo } from '../utils/api';
import { User } from '../types';
import Toast from 'react-native-toast-message';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#FFF',
    height: '100%',
  },
  imageWrapper: {
    marginTop: 20,
    marginBottom: 10,
  },
  image: {
    width: 140,
    height: 115,
  },
  button: {
    paddingHorizontal: 20,
    width: '100%',
    marginVertical: 10,
  },
  scroll: {
    width: '100%',
  },
  modalButton: {
    alignSelf: 'stretch',
    marginVertical: 10,
  },
});

const SettingsStack = createStackNavigator();

const SettingsRoutes = () => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name={'Settings'}
        component={Settings}
        options={{ headerShown: false }}
      />
      <SettingsStack.Screen
        name={'Edit Profile'}
        component={ProfileSettings}
        options={{
          headerBackTitle: 'Back',
          headerTitleStyle: {
            fontSize: 20,
            fontFamily: 'Kumbh Sans',
            fontWeight: 'bold',
            paddingTop: 5,
            paddingHorizontal: 10,
          },
        }}
      />
    </SettingsStack.Navigator>
  );
};

const Settings = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const postLogout = () => {
    fetch(`${API_URL}/user/logout`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 200) {
        }
        dispatch(logout());
        AsyncStorage.removeItem('token');
      })
      .catch((err) => {
        dispatch(logout());
        AsyncStorage.removeItem('token');
        rollbar.error(`Failed to logout: ${err}`);
      });
  };

  const [privacyModalVisible, setPrivacyModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    if (loading) {
      exo
        .get('/user/')
        .then((res) => {
          const userRes = _.get(res, 'data.message', initial);
          setUser({ ...user, ...userRes.user });
          setLoading(false);
        })
        .catch((err) => rollbar.error(`Failed to load user: ${err}`));
    }
  }, [loading, route.params, user, initial]);

  const renderPrivacyModal = () => {
    return (
      <CustomModal
        modalVisible={privacyModalVisible}
        onPressOverlay={() => setPrivacyModalVisible(false)}>
        <View style={styles.modalButton}>
          <StyledButton
            type="blue"
            text="Public"
            disabled={!user.private}
            onPress={() => {
              setLoading(true);
              exo
                .patch('/user/privacy', { privacy: false })
                .then(() => {
                  setUser({ ...user, private: false });
                  Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: 'Successfully updated privacy settings',
                  });
                })
                .catch((err) => {
                  rollbar.error(`Failed to make user public: ${err}`);
                  Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: 'Error updating privacy settings',
                    text2: err.message,
                  });
                });
            }}
          />
        </View>
        <View style={styles.modalButton}>
          <StyledButton
            type="blue"
            text="Private"
            disabled={user.private}
            onPress={() => {
              setLoading(true);
              exo
                .patch('/user/privacy', { privacy: true })
                .then(() => {
                  setUser({ ...user, private: true });
                  Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: 'Successfully updated privacy settings',
                  });
                })
                .catch((err) => {
                  rollbar.error(`Failed to make user private: ${err}`);
                  Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: 'Error updating privacy settings',
                    text2: err.message,
                  });
                });
            }}
          />
        </View>
      </CustomModal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title={'Settings'} />
      {renderPrivacyModal()}
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <View style={styles.imageWrapper}>
            <Image
              source={require('../../assets/img/picstop-logo.png')}
              style={styles.image}
            />
          </View>

          <View style={styles.button}>
            <IconButton
              icon={faUserCircle}
              text="Profile"
              onPress={() => navigation.navigate('Edit Profile')}
              arrow={true}
              displayValue={user.username}
            />
          </View>
          <View style={styles.button}>
            <IconButton
              icon={faEye}
              text="Account Privacy"
              onPress={() => setPrivacyModalVisible(true)}
              displayValue={user.private ? 'Private' : 'Public'}
            />
          </View>
          <View style={styles.button}>
            <IconButton
              icon={faTimesCircle}
              text="Blocked"
              onPress={() => console.log('Blocked icon button clicked')}
              arrow={true}
              displayValue="5 Accounts"
              disabled={true}
            />
          </View>
          <View style={styles.button}>
            <IconButton
              icon={faComments}
              text="Language"
              onPress={() => console.log('Language icon button clicked')}
              displayValue="English"
            />
          </View>
          <View style={styles.button}>
            <StyledButton
              text={'Sign Out'}
              type={'blue'}
              onPress={postLogout}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsRoutes;
