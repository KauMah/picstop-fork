import { Image, SafeAreaView, StyleSheet, View } from 'react-native';

// @ts-ignore: Weirdness with react-native-dotenv
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomHeader from '../components/shared/CustomHeader';
import React from 'react';
import StyledButton from '../components/shared/StyledButton';
import { logout } from '../redux/actions';
import { useDispatch } from 'react-redux';
import IconButton from '../components/shared/IconButton';

import {
  faUserCircle,
  faEye,
  faTimesCircle,
  faComments,
} from '@fortawesome/free-regular-svg-icons';
import { ScrollView } from 'react-native-gesture-handler';

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
});

const Settings = () => {
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
          console.log('Route Worked');
        }
        dispatch(logout());
        AsyncStorage.removeItem('token');
      })
      .catch((err) => {
        dispatch(logout());
        AsyncStorage.removeItem('token');
        console.log(err);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title={'Settings'} />
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
              onPress={() => console.log('Profile icon button clicked')}
              arrow={true}
              displayValue="Username"
            />
          </View>
          <View style={styles.button}>
            <IconButton
              icon={faEye}
              text="Account Privacy"
              onPress={() => console.log('Privacy icon button clicked')}
              arrow={true}
              displayValue="Public"
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
export default Settings;
